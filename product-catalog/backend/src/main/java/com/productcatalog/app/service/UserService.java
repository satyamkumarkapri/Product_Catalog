package com.productcatalog.app.service;

import com.productcatalog.app.dto.UserDTO;
import com.productcatalog.app.entity.User;
import com.productcatalog.app.mongo.MongoUser;
import com.productcatalog.app.mongo.MongoUserRepository;
import com.productcatalog.app.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final MongoUserRepository mongoUserRepository;

    public UserService(UserRepository userRepository, MongoUserRepository mongoUserRepository) {
        this.userRepository = userRepository;
        this.mongoUserRepository = mongoUserRepository;
    }

    public List<UserDTO> getAllManagers() {
        return userRepository.findAll().stream()
                .filter(u -> u.getRoleLevel() == 2)
                .map(u -> new UserDTO(u.getId(), u.getEmail(), u.getFullName(), u.getRoleLevel()))
                .collect(Collectors.toList());
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
        mongoUserRepository.findByPgUserId(id).ifPresent(mongoUserRepository::delete);
    }
}
