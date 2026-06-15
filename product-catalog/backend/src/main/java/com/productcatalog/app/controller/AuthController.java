package com.productcatalog.app.controller;

import com.productcatalog.app.config.JwtUtil;
import com.productcatalog.app.entity.User;
import com.productcatalog.app.mongo.MongoUser;
import com.productcatalog.app.mongo.MongoUserRepository;
import com.productcatalog.app.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final MongoUserRepository mongoUserRepository;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                          PasswordEncoder passwordEncoder, JwtUtil jwtUtil, MongoUserRepository mongoUserRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.mongoUserRepository = mongoUserRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        User user = userRepository.findByEmail(email).orElseThrow();
        String token = jwtUtil.generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("email", user.getEmail());
        response.put("fullName", user.getFullName());
        response.put("address", user.getAddress());
        response.put("roleLevel", user.getRoleLevel());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String fullName = data.get("fullName");
        String password = data.get("password");
        int roleLevel = Integer.parseInt(data.getOrDefault("roleLevel", "1")); // default to user

        if (email == null || !email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            return ResponseEntity.badRequest().body("Invalid email format");
        }

        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        User user = new User(email, fullName, "{noop}" + password, roleLevel);
        user = userRepository.save(user);

        // Sync to MongoDB
        MongoUser mongoUser = new MongoUser(user.getId(), email, fullName, null, password);
        mongoUserRepository.save(mongoUser);

        return ResponseEntity.ok("User registered successfully");
    }
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> data, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String currentEmail = authentication.getName();
        User user = userRepository.findByEmail(currentEmail).orElseThrow();

        String email = data.get("email");
        String fullName = data.get("fullName");
        String password = data.get("password");
        String address = data.get("address");

        if (email != null && !email.isEmpty() && !email.equals(currentEmail)) {
            if (userRepository.findByEmail(email).isPresent()) {
                return ResponseEntity.badRequest().body("Email already registered");
            }
            user.setEmail(email);
        }

        if (fullName != null && !fullName.isEmpty()) {
            user.setFullName(fullName);
        }

        if (address != null) {
            user.setAddress(address);
        }

        String plainPassword = null;
        if (password != null && !password.isEmpty()) {
            user.setPassword("{noop}" + password);
            plainPassword = password;
        }

        userRepository.save(user);

        // Sync to MongoDB
        MongoUser mongoUser = mongoUserRepository.findByPgUserId(user.getId()).orElse(new MongoUser());
        mongoUser.setPgUserId(user.getId());
        mongoUser.setEmail(user.getEmail());
        mongoUser.setFullName(user.getFullName());
        mongoUser.setAddress(user.getAddress());
        if (plainPassword != null) {
            mongoUser.setPassword(plainPassword);
        } else if (mongoUser.getPassword() == null && user.getPassword() != null && user.getPassword().startsWith("{noop}")) {
            mongoUser.setPassword(user.getPassword().substring(6));
        }
        mongoUserRepository.save(mongoUser);

        // Generate a new token with updated details
        String token = jwtUtil.generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("email", user.getEmail());
        response.put("fullName", user.getFullName());
        response.put("address", user.getAddress());
        response.put("roleLevel", user.getRoleLevel());
        response.put("message", "Profile updated successfully");

        return ResponseEntity.ok(response);
    }
}
