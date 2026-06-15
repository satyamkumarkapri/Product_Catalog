package com.productcatalog.app.controller;

import com.productcatalog.app.dto.UserDTO;
import com.productcatalog.app.entity.User;
import com.productcatalog.app.mongo.MongoUser;
import com.productcatalog.app.mongo.MongoUserRepository;
import com.productcatalog.app.repository.UserRepository;
import com.productcatalog.app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final MongoUserRepository mongoUserRepository;

    public UserController(UserService userService, UserRepository userRepository, MongoUserRepository mongoUserRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.mongoUserRepository = mongoUserRepository;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/managers")
    public ResponseEntity<List<UserDTO>> getAllManagers() {
        return ResponseEntity.ok(userService.getAllManagers());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/register-manager")
    public ResponseEntity<?> registerManager(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String fullName = data.get("fullName");
        String password = data.get("password");

        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        User user = new User(email, fullName, "{noop}" + password, 2); // 2 is manager role
        user = userRepository.save(user);

        MongoUser mongoUser = new MongoUser(user.getId(), email, fullName, null, password);
        mongoUserRepository.save(mongoUser);

        return ResponseEntity.ok(new UserDTO(user.getId(), user.getEmail(), user.getFullName(), user.getRoleLevel()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
