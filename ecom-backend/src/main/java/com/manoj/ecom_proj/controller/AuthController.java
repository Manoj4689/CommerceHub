package com.manoj.ecom_proj.controller;

import com.manoj.ecom_proj.dto.AuthRequest;
import com.manoj.ecom_proj.dto.AuthResponse;
import com.manoj.ecom_proj.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${jwt.expiration}")
    private Long expiration;

    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "admin";
    private static final String ADMIN_ROLE = "ADMIN";

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        if (ADMIN_USERNAME.equals(authRequest.getUsername())
                && ADMIN_PASSWORD.equals(authRequest.getPassword())) {

            String token = jwtUtil.generateToken(authRequest.getUsername(), ADMIN_ROLE);
            AuthResponse response = new AuthResponse(token, authRequest.getUsername(), ADMIN_ROLE, expiration);
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid username or password");
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);

        if (jwtUtil.isValidToken(token)) {
            String username = jwtUtil.extractUsername(token);
            String role = jwtUtil.extractRole(token);
            return ResponseEntity.ok(new AuthResponse(token, username, role, expiration));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
    }
}
