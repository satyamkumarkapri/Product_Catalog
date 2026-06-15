package com.productcatalog.app.mapper;

import com.productcatalog.app.dto.ProductDTO;
import com.productcatalog.app.entity.Category;
import com.productcatalog.app.entity.Inventory;
import com.productcatalog.app.entity.Pricing;
import com.productcatalog.app.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductDTO toDto(Product product) {
        if (product == null) {
            return null;
        }
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setBrand(product.getBrand());
        dto.setSku(product.getSku());
        dto.setImageUrl(product.getImageUrl());

        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId());
            dto.setCategoryName(product.getCategory().getName());
        }

        if (product.getPricing() != null) {
            dto.setBasePrice(product.getPricing().getBasePrice());
            dto.setDiscountPrice(product.getPricing().getDiscountPrice());
            dto.setCurrency(product.getPricing().getCurrency());
        }

        if (product.getInventory() != null) {
            dto.setStockQuantity(product.getInventory().getStockQuantity());
        }

        return dto;
    }

    public Product toEntity(ProductDTO productDTO) {
        if (productDTO == null) {
            return null;
        }
        Product product = new Product();
        product.setId(productDTO.getId());
        product.setName(productDTO.getName());
        product.setBrand(productDTO.getBrand());
        product.setSku(productDTO.getSku());
        product.setImageUrl(productDTO.getImageUrl());

        if (productDTO.getCategoryId() != null) {
            Category category = new Category();
            category.setId(productDTO.getCategoryId());
            product.setCategory(category);
        }

        return product;
    }
}
