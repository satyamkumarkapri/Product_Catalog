package com.productcatalog.app.config;

import com.productcatalog.app.entity.User;
import com.productcatalog.app.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        // Create a role authority string based on the integer role level.
        // Role 3 = ROLE_ADMIN, Role 2 = ROLE_MANAGER, Role 1 = ROLE_USER
        String roleStr = "ROLE_USER";
        if (user.getRoleLevel() == 3) roleStr = "ROLE_ADMIN";
        else if (user.getRoleLevel() == 2) roleStr = "ROLE_MANAGER";

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(roleStr))
        );
    }
}
