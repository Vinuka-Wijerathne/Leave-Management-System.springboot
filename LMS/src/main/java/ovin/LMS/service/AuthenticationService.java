package ovin.LMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ovin.LMS.entity.User;
import ovin.LMS.repository.UserRepository;

import java.util.Optional;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    public boolean authenticate(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Compare plain text password with password from database
            return password.equals(user.getPassword());
        }
        return false;
    }

    public String getUserRole(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.getRole(); // Assuming User class has a method to get the role
        }
        return null;
    }
}
