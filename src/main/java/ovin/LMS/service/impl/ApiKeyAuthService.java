package ovin.LMS.service.impl;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ApiKeyAuthService {

    // Use ConcurrentHashMap for thread safety
    private final Map<String, Long> apiKeyToUserIdMap;

    public ApiKeyAuthService() {
        // Initialize the ConcurrentHashMap
        this.apiKeyToUserIdMap = new ConcurrentHashMap<>();
    }

    // Method to generate a new API key for a user
    public String generateApiKey(Long userId) {
        // Generate a random API key using UUID
        String apiKey = UUID.randomUUID().toString();
        // Store the API key along with the user ID in the map
        apiKeyToUserIdMap.put(apiKey, userId);
        return apiKey;
    }

    // Method to validate an API key and retrieve the associated user ID
    public Long getUserIdFromApiKey(String apiKey) {
        // Check if the API key exists in the map
        // If it exists, return the associated user ID
        // If it doesn't exist, return null indicating invalid API key
        return apiKeyToUserIdMap.get(apiKey);
    }

    // Additional methods for API key expiry and management can be added here
}
