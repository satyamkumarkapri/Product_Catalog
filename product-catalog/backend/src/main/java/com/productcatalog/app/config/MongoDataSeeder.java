package com.productcatalog.app.config;

import com.productcatalog.app.mongo.ProductDescription;
import com.productcatalog.app.mongo.ProductDescriptionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class MongoDataSeeder implements CommandLineRunner {

    private final ProductDescriptionRepository productDescriptionRepository;

    public MongoDataSeeder(ProductDescriptionRepository productDescriptionRepository) {
        this.productDescriptionRepository = productDescriptionRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Only seed if the collection is empty
        if (productDescriptionRepository.count() == 0) {
            System.out.println("Seeding MongoDB with Product Descriptions...");

            ProductDescription p1 = new ProductDescription();
            p1.setProductId(1L);
            p1.setDetailedDescription("The MacBook Pro M3 delivers game-changing performance and the longest battery life ever in a Mac.");
            p1.setFeatures("M3 Pro Chip, Liquid Retina XDR Display, Up to 22 hours battery life");
            p1.setSpecifications("14-inch, 18GB Unified Memory, 512GB SSD");

            ProductDescription p2 = new ProductDescription();
            p2.setProductId(2L);
            p2.setDetailedDescription("Lenovo ThinkPad X1 Carbon Gen 11 is ultra-light, incredibly powerful, and built for business.");
            p2.setFeatures("Intel Core i7 13th Gen, Carbon Fiber Chassis, Dolby Atmos Audio");
            p2.setSpecifications("14-inch WUXGA, 16GB LPDDR5, 1TB NVMe SSD");

            ProductDescription p3 = new ProductDescription();
            p3.setProductId(3L);
            p3.setDetailedDescription("iPhone 15 Pro Max features a strong and light aerospace-grade titanium design and the A17 Pro chip.");
            p3.setFeatures("Titanium Design, A17 Pro Chip, 48MP Main Camera, Action Button");
            p3.setSpecifications("6.7-inch Super Retina XDR, 256GB Storage");

            ProductDescription p4 = new ProductDescription();
            p4.setProductId(4L);
            p4.setDetailedDescription("Galaxy S24 Ultra introduces Galaxy AI, making everyday tasks smoother and photography stunning.");
            p4.setFeatures("Snapdragon 8 Gen 3, 200MP Camera, S Pen Included, Live Translate");
            p4.setSpecifications("6.8-inch Dynamic AMOLED, 12GB RAM, 256GB Storage");

            ProductDescription p5 = new ProductDescription();
            p5.setProductId(5L);
            p5.setDetailedDescription("Sony WH-1000XM5 wireless headphones with industry-leading noise canceling.");
            p5.setFeatures("Auto NC Optimizer, 8 Microphones, 30 hours battery life");
            p5.setSpecifications("Over-Ear, Bluetooth 5.2, Hi-Res Audio");

            productDescriptionRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5));
            System.out.println("MongoDB Seeding Complete! 'product_catalog' database created in Atlas.");
        } else {
            System.out.println("MongoDB already contains data. Skipping seed.");
        }
    }
}
