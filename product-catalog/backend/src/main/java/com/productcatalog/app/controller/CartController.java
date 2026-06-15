package com.productcatalog.app.controller;

import com.productcatalog.app.dto.CartDTO;
import com.productcatalog.app.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @Operation(summary = "Get current user's cart")
    @GetMapping
    public ResponseEntity<CartDTO> getCart(Authentication authentication) {
        return ResponseEntity.ok(cartService.getCartForUser(authentication.getName()));
    }

    @Operation(summary = "Add item to cart")
    @PostMapping("/add")
    public ResponseEntity<CartDTO> addToCart(@RequestBody Map<String, Object> payload, Authentication authentication) {
        Long productId = Long.valueOf(payload.get("productId").toString());
        Integer quantity = Integer.valueOf(payload.getOrDefault("quantity", 1).toString());
        return ResponseEntity.ok(cartService.addProductToCart(authentication.getName(), productId, quantity));
    }

    @Operation(summary = "Remove item from cart")
    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<CartDTO> removeFromCart(@PathVariable Long itemId, Authentication authentication) {
        return ResponseEntity.ok(cartService.removeProductFromCart(authentication.getName(), itemId));
    }
}
