package com.productcatalog.app.mongo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductDescriptionRepository extends MongoRepository<ProductDescription, String> {
    Optional<ProductDescription> findByProductId(Long productId);
}
