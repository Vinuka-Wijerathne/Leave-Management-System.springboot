package ovin.LMS.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ovin.LMS.dto.Userdto;
import ovin.LMS.entity.User;
import ovin.LMS.mapper.UserMapper;
import ovin.LMS.repository.UserRepository;
import ovin.LMS.service.Userservice;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements Userservice {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Userdto createUser(Userdto userdto) {
        User user = UserMapper.mapToUser(userdto);
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public List<Userdto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(UserMapper::mapToUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Userdto updateUser(Long id, Userdto userdto) {
        // First, check if the user with the given id exists in the database
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Update the existing user entity with the new data from the DTO
        existingUser.setEmail(userdto.getEmail());
        existingUser.setUsername(userdto.getUsername());
        existingUser.setRole(userdto.getRole()); // Assuming role is a field in the User entity

        // Save the updated user entity
        User updatedUser = userRepository.save(existingUser);

        // Map the updated user entity to a DTO and return it
        return UserMapper.mapToUserDto(updatedUser);
    }

}
