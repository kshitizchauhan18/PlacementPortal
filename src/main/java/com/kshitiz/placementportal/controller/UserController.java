package com.kshitiz.placementportal.controller;

import com.kshitiz.placementportal.model.AppUser;
import com.kshitiz.placementportal.repository.AppUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final AppUserRepository userRepository;

    public UserController(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AppUser user) {
        try {
            // Validate required fields
            if (user.getName() == null || user.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Name is required");
            }
            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required");
            }
            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Password is required");
            }
            if (user.getRole() == null || user.getRole().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Role is required");
            }

            // Validate role
            String role = user.getRole().toUpperCase();
            if (!role.equals("STUDENT") && !role.equals("COMPANY")) {
                return ResponseEntity.badRequest().body("Role must be either STUDENT or COMPANY");
            }
            user.setRole(role);

            // Check if email already exists
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Email already registered");
            }

            // Save the user
            AppUser savedUser = userRepository.save(user);
            
            // Return success response with user info
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("email", savedUser.getEmail());
            response.put("role", savedUser.getRole());
            response.put("userId", savedUser.getId());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        try {
            String email = loginRequest.get("email");
            String password = loginRequest.get("password");

            logger.debug("Login attempt for email: {}", email);

            return userRepository.findByEmail(email)
                    .map(user -> {
                        logger.debug("User found in database: {}", user.getEmail());
                        logger.debug("Authentication attempt for user: {}", user.getEmail());

                        if (password != null && password.equals(user.getPassword())) {
                            // Build a response with user info
                            Map<String, Object> response = new HashMap<>();
                            response.put("email", user.getEmail());
                            response.put("role", user.getRole());
                            response.put("userId", user.getId());
                            return ResponseEntity.ok(response);
                        } else {
                            return ResponseEntity.status(401).body("Invalid password");
                        }
                    })
                    .orElse(ResponseEntity.status(401).body("User not found with email: " + email));
        } catch (Exception e) {
            logger.error("Login error: {}", e.getMessage());
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }
}
