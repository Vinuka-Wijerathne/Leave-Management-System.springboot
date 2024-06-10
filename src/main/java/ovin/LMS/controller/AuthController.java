package ovin.LMS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ovin.LMS.service.AuthenticationService;

import ovin.LMS.entity.LoginForm; // Import LoginForm class

@RestController
public class AuthController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/api/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm) {
        boolean isAuthenticated = authenticationService.authenticate(loginForm.getEmail(), loginForm.getPassword());
        String role = authenticationService.getUserRole(loginForm.getEmail()); // Assuming a method to get user's role

        if (isAuthenticated && role != null) {
            return ResponseEntity.ok().body("{\"message\": \"Login successful\", \"role\": \"" + role + "\"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Invalid credentials\"}");
        }
    }

    // Define other endpoints as needed
}
