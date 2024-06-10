package ovin.LMS.mapper;

import ovin.LMS.dto.Userdto;
import ovin.LMS.entity.User;

public class UserMapper {
    public static Userdto mapToUserDto(User user) {
        return new Userdto(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.getRole() // Include the role field in the Userdto constructor
        );
    }

    public static User mapToUser(Userdto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole()); // Set the role field
        return user;
    }
}
