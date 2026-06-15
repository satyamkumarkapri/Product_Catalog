package com.productcatalog.app.repository;

import com.productcatalog.app.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.EntityGraph;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    @EntityGraph(attributePaths = {"category", "pricing", "inventory"})
    List<Product> findAll();

    @EntityGraph(attributePaths = {"category", "pricing", "inventory"})
    List<Product> findAll(org.springframework.data.jpa.domain.Specification<Product> spec);
}
