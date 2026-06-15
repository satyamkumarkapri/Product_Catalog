import mongoose from 'mongoose';
import { pipeline } from '@xenova/transformers';

const MONGO_URI = 'mongodb://satyam:satyam@ac-9yht7ed-shard-00-00.vw83dw2.mongodb.net:27017,ac-9yht7ed-shard-00-01.vw83dw2.mongodb.net:27017,ac-9yht7ed-shard-00-02.vw83dw2.mongodb.net:27017/product_catalog?ssl=true&replicaSet=atlas-7bbd67-shard-0&authSource=admin&appName=Cluster0';

const productsToSeed = [
    { productId: 1, textContent: "Apple MacBook Pro M3 Laptop 14-inch, high-performance laptop for gaming and work. Space Gray." },
    { productId: 2, textContent: "Lenovo ThinkPad X1 Carbon Business Laptop, lightweight, durable, excellent keyboard." },
    { productId: 3, textContent: "Apple iPhone 15 Pro Max Smartphone, best phone for photography and video, titanium design." },
    { productId: 4, textContent: "Samsung Galaxy S24 Ultra Android Smartphone, great camera, stylus included, high performance." },
    { productId: 5, textContent: "Sony WH-1000XM5 Noise Cancelling Headphones, over-ear wireless bluetooth, long battery life." },
    { productId: 6, textContent: "Bose QuietComfort Ultra Headphones, premium noise cancellation, comfortable over-ear design." },
    { productId: 7, textContent: "Apple Watch Series 9 Smartwatch, health and fitness tracker, ECG, blood oxygen." },
    { productId: 8, textContent: "Samsung Galaxy Watch 6 Classic Smartwatch, rotating bezel, fitness tracking, wear OS." },
    { productId: 9, textContent: "Apple iPad Pro M2 Tablet, 12.9-inch Liquid Retina display, fast performance for creative professionals." },
    { productId: 10, textContent: "Canon EOS R5 Mirrorless Camera, 45MP full-frame, 8K video recording, professional photography." }
];

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);
        const db = mongoose.connection.db;

        console.log("Loading AI model...");
        const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

        const collection = db.collection('product_embeddings');
        
        console.log("Clearing existing embeddings...");
        await collection.deleteMany({});

        console.log("Generating embeddings and inserting...");
        for (const product of productsToSeed) {
            const output = await extractor(product.textContent, { pooling: 'mean', normalize: true });
            const embeddingVector = Array.from(output.data);

            await collection.insertOne({
                productId: product.productId,
                textContent: product.textContent,
                embedding: embeddingVector
            });
            console.log(`Inserted embedding for Product ID: ${product.productId}`);
        }

        console.log("✅ Seeding complete!");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
