package com.productcatalog.app.service;

import com.productcatalog.app.dto.OrderRequestDTO;
import com.productcatalog.app.entity.*;
import com.productcatalog.app.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, CartRepository cartRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Order placeOrder(String email, OrderRequestDTO request) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartRepository.findByUser(user).orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        BigDecimal totalAmount = BigDecimal.ZERO;
        for (CartItem item : cart.getItems()) {
            BigDecimal price = item.getProduct().getPricing().getDiscountPrice() != null 
                ? item.getProduct().getPricing().getDiscountPrice() 
                : item.getProduct().getPricing().getBasePrice();
            totalAmount = totalAmount.add(price.multiply(new BigDecimal(item.getQuantity())));
        }

        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(request.getShippingAddress());
        order.setPhoneNumber(request.getPhoneNumber());
        order.setTotalAmount(totalAmount);

        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            BigDecimal price = cartItem.getProduct().getPricing().getDiscountPrice() != null 
                ? cartItem.getProduct().getPricing().getDiscountPrice() 
                : cartItem.getProduct().getPricing().getBasePrice();
            orderItem.setPriceAtPurchase(price);
            
            order.getItems().add(orderItem);
        }

        orderRepository.save(order);
        
        // Clear the cart
        cart.getItems().clear();
        cartRepository.save(cart);

        return order;
    }

    @Transactional(readOnly = true)
    public List<com.productcatalog.app.dto.OrderResponseDTO> getUserOrders(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        List<Order> orders = orderRepository.findByUserId(user.getId());
        return orders.stream().map(this::mapToDTO).collect(java.util.stream.Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<com.productcatalog.app.dto.OrderResponseDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAllByOrderByCreatedAtDesc();
        return orders.stream().map(this::mapToDTO).collect(java.util.stream.Collectors.toList());
    }

    @Transactional
    public com.productcatalog.app.dto.OrderResponseDTO updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(newStatus);
        orderRepository.save(order);
        return mapToDTO(order);
    }

    private com.productcatalog.app.dto.OrderResponseDTO mapToDTO(Order order) {
        com.productcatalog.app.dto.OrderResponseDTO dto = new com.productcatalog.app.dto.OrderResponseDTO();
        dto.setId(order.getId());
        dto.setOrderDate(order.getCreatedAt());
        dto.setStatus(order.getStatus());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setShippingAddress(order.getShippingAddress());
        
        List<com.productcatalog.app.dto.OrderItemDTO> itemDTOs = order.getItems().stream().map(item -> {
            com.productcatalog.app.dto.OrderItemDTO itemDto = new com.productcatalog.app.dto.OrderItemDTO();
            itemDto.setProductId(item.getProduct().getId());
            itemDto.setProductName(item.getProduct().getName());
            itemDto.setImageUrl(item.getProduct().getImageUrl());
            itemDto.setQuantity(item.getQuantity());
            itemDto.setPriceAtPurchase(item.getPriceAtPurchase());
            return itemDto;
        }).collect(java.util.stream.Collectors.toList());
        
        dto.setItems(itemDTOs);
        return dto;
    }
}
