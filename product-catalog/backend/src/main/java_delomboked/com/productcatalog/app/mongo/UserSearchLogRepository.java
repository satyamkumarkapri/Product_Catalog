package com.productcatalog.app.mongo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSearchLogRepository extends MongoRepository<UserSearchLog, String> {
}
