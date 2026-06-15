package com.productcatalog.app.service;

import com.productcatalog.app.dto.CartDTO;
import com.productcatalog.app.dto.CartItemDTO;
import com.productcatalog.app.entity.*;
import com.productcatalog.app.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PricingRepository pricingRepository;
    private final InventoryRepository inventoryRepository;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository,
                       UserRepository userRepository, ProductRepository productRepository,
                       PricingRepository pricingRepository, InventoryRepository inventoryRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.pricingRepository = pricingRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @Transactional
    public CartDTO getCartForUser(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepository.findByUser(user).orElseGet(() -> cartRepository.save(new Cart(user)));
        return mapToDTO(cart);
    }

    @Transactional
    public CartDTO addProductToCart(String email, Long productId, Integer quantity) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepository.findByUser(user).orElseGet(() -> cartRepository.save(new Cart(user)));
        
        Product product = productRepository.findById(productId).orElseThrow();
        
        Inventory inventory = inventoryRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Inventory not found for product"));
                
        if (inventory.getStockQuantity() < quantity) {
            throw new RuntimeException("Not enough stock available");
        }
        
        // Deduct from inventory (reserve stock)
        inventory.setStockQuantity(inventory.getStockQuantity() - quantity);
        inventoryRepository.save(inventory);
        
        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst().orElse(null);
                
        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem(cart, product, quantity);
            cart.addItem(newItem);
        }
        
        return mapToDTO(cartRepository.save(cart));
    }

    @Transactional
    public CartDTO removeProductFromCart(String email, Long cartItemId) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepository.findByUser(user).orElseThrow();
        
        CartItem itemToRemove = cart.getItems().stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst().orElseThrow();
                
        Inventory inventory = inventoryRepository.findById(itemToRemove.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Inventory not found for product"));
                
        // Restore inventory
        inventory.setStockQuantity(inventory.getStockQuantity() + itemToRemove.getQuantity());
        inventoryRepository.save(inventory);
                
        cart.removeItem(itemToRemove);
        cartItemRepository.delete(itemToRemove);
        
        return mapToDTO(cartRepository.save(cart));
    }

    private CartDTO mapToDTO(Cart cart) {
        CartDTO dto = new CartDTO();
        dto.setId(cart.getId());
        dto.setUserId(cart.getUser().getId());
        dto.setItems(cart.getItems().stream().map(this::mapItemToDTO).collect(Collectors.toList()));
        return dto;
    }

    private CartItemDTO mapItemToDTO(CartItem item) {
        CartItemDTO dto = new CartItemDTO();
        dto.setId(item.getId());
        dto.setProductId(item.getProduct().getId());
        dto.setProductName(item.getProduct().getName());
        dto.setQuantity(item.getQuantity());
        
        Pricing pricing = pricingRepository.findById(item.getProduct().getId()).orElse(null);
        if (pricing != null) {
            dto.setPrice(pricing.getDiscountPrice() != null ? pricing.getDiscountPrice() : pricing.getBasePrice());
        } else {
            dto.setPrice(BigDecimal.ZERO);
        }
        return dto;
    }
}
