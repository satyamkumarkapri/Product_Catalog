# MongoDB Atlas Vector Search Setup Guide

Follow these steps to configure MongoDB Atlas for the semantic search capabilities of the Product Catalog Application.

## Step 1: Create a Cluster
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Project (e.g., "ProductCatalog").
3. Click **Build a Database** and select the **FREE** (M0) tier.
4. Choose a cloud provider and region close to you.
5. Click **Create Cluster**.

## Step 2: Create Database User
1. When prompted for Security Quickstart, under **How would you like to authenticate your connection?**, select **Username and Password**.
2. Username: `satyam`
3. Password: `satyam`
4. Click **Create User**.

## Step 3: Configure Network Access
1. Under **Where would you like to connect from?**, select **My Local Environment**.
2. Click **Add My Current IP Address** to whitelist your IP. (For development, you can also allow access from anywhere `0.0.0.0/0`, but restrict this in production).
3. Click **Finish and Close**.

## Step 4: Obtain Connection String
1. Go to your Cluster overview.
2. Click **Connect**.
3. Select **Drivers** (Node.js or Java).
4. Copy the connection string. It will look something like:
   `mongodb+srv://satyam:satyam@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
5. **CRITICAL**: Edit the connection string to include the database name (`product_catalog`).
   `mongodb+srv://satyam:satyam@cluster0.xxxxx.mongodb.net/product_catalog?retryWrites=true&w=majority`
6. Paste this updated string into your `backend/src/main/resources/application.yml` file.

## Step 5: Create Database and Collections
1. Click **Browse Collections** on your cluster.
2. Click **Add My Own Data**.
3. Database Name: `product_catalog`
4. Collection Name: `product_embeddings`
5. Click **Create**.
6. Repeat the process to create collections: `product_descriptions` and `user_search_logs`.

## Step 6: Create Atlas Vector Search Index
1. In the Atlas UI, go to **Search** (under the Services menu).
2. Click **Create Search Index**.
3. Select **JSON Editor** and click Next.
4. Select Database: `product_catalog` and Collection: `product_embeddings`.
5. Index Name: `vector_index`
6. Paste the following JSON configuration:

```json
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "embedding": {
        "dimensions": 384,
        "similarity": "cosine",
        "type": "knnVector"
      }
    }
  }
}
```

7. Click **Next** and then **Create Search Index**.
8. Wait for the index status to become **Active**.

You are now ready to run semantic vector searches from the Spring Boot backend!
