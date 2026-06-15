from fastapi import FastAPI, Request, Response, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx
import uvicorn

app = FastAPI(title="CatalogX API Gateway")

import os

# Allow requests from any origin for ease of deployment, or specify FRONTEND_URL
FRONTEND_URL = os.getenv("FRONTEND_URL", "*")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for Render
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SPRING_BOOT_URL = os.getenv("SPRING_BOOT_URL", "http://localhost:8080")
NODE_BACKEND_URL = os.getenv("NODE_BACKEND_URL", "http://localhost:4000")

@app.get("/")
async def root():
    """
    Root endpoint to verify the gateway is running.
    """
    html_content = """
    <html>
        <body style="font-family: sans-serif; padding: 2rem; text-align: center;">
            <h1 style="color: #0078D7;">🚀 FastAPI Gateway is Running!</h1>
            <p>Intelligently routing traffic between the Frontend, Spring Boot, and Node.js.</p>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)

@app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"])
async def reverse_proxy(request: Request, path: str):
    """
    Reverse proxy requests to the appropriate backend.
    """
    if path.startswith("api/search") or path.startswith("api/logs"):
        url = f"{NODE_BACKEND_URL}/{path}"
    else:
        url = f"{SPRING_BOOT_URL}/{path}"

    
    # Extract query parameters
    query_params = dict(request.query_params)
    
    # Extract headers. We need to filter out some headers like 'host' that httpx will set automatically,
    # but we definitely want to pass through Authorization, Content-Type, etc.
    headers = {
        k: v for k, v in request.headers.items() 
        if k.lower() not in ('host', 'content-length')
    }
    
    body = await request.body()
    
    async with httpx.AsyncClient(timeout=60.0) as client:
        try:
            # Forward the request
            proxy_req = client.build_request(
                method=request.method,
                url=url,
                headers=headers,
                params=query_params,
                content=body
            )
            
            response = await client.send(proxy_req)
            
            # Return the response back to the client
            return Response(
                content=response.content,
                status_code=response.status_code,
                headers={
                    k: v for k, v in response.headers.items()
                    # Filter out headers that FastAPI/Uvicorn will handle
                    if k.lower() not in ('content-length', 'content-encoding', 'transfer-encoding', 'connection')
                }
            )
        except httpx.RequestError as exc:
            print(f"An error occurred while requesting {exc.request.url!r}.")
            raise HTTPException(status_code=502, detail="Bad Gateway: Could not connect to downstream service.")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
