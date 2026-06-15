package com.productcatalog.app.mongo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductEmbeddingRepository extends MongoRepository<ProductEmbedding, String> {
    Optional<ProductEmbedding> findByProductId(Long productId);
}
