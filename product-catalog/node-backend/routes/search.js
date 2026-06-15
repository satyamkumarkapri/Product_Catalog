import express from 'express';
import mongoose from 'mongoose';
import { pipeline } from '@xenova/transformers';

const router = express.Router();

// Lazy load the embedding model so it only downloads once
let extractor;
async function getExtractor() {
    if (!extractor) {
        console.log("Loading AI Embedding Model...");
        // Use a lightweight feature extraction model (sentence-transformers/all-MiniLM-L6-v2)
        extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        console.log("AI Model Loaded!");
    }
    return extractor;
}

// Ensure the collection is accessible even without a strict Mongoose schema for the product_embeddings
const getEmbeddingsCollection = () => {
    return mongoose.connection.collection('product_embeddings');
};

router.post('/semantic', async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: "Query string is required" });
        }

        console.log(`Performing semantic search for: "${query}"`);

        // 1. Generate Embedding for the Search Query
        const generateEmbedding = await getExtractor();
        
        // Output is a tensor. We extract the array of floats.
        const output = await generateEmbedding(query, { pooling: 'mean', normalize: true });
        const queryVector = Array.from(output.data);

        // 2. Perform MongoDB Vector Search
        const collection = getEmbeddingsCollection();
        
        // Note: This requires an Atlas Vector Search index named "default" configured on the embedding field.
        const searchResults = await collection.aggregate([
            {
                $vectorSearch: {
                    index: "default", // The name of the Vector Search index in Atlas
                    path: "embedding", // The field containing the vector array
                    queryVector: queryVector,
                    numCandidates: 100, // How many candidates to consider
                    limit: 10 // How many results to return
                }
            },
            {
                $project: {
                    _id: 1,
                    productId: 1,
                    textContent: 1,
                    score: { $meta: "vectorSearchScore" } // Include the similarity score
                }
            }
        ]).toArray();

        // Filter out results that are not very relevant (score < 0.65)
        const filteredResults = searchResults.filter(result => result.score >= 0.65);

        // If the frontend needs full product details, it can fetch them from the Spring Boot 
        // backend using the returned pgProductId array.
        res.status(200).json({ 
            success: true, 
            results: filteredResults 
        });

    } catch (error) {
        console.error("Semantic Search Error:", error);
        res.status(500).json({ error: "An error occurred during semantic search", details: error.message });
    }
});

export default router;
