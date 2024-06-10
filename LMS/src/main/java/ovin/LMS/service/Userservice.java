package ovin.LMS.service;

import ovin.LMS.dto.Userdto;

import java.util.List;

public interface Userservice {
    Userdto createUser(Userdto userdto);
    List<Userdto> getAllUsers();
    void deleteUser(Long id); // Add the deleteUser method

    Userdto updateUser(Long id, Userdto userdto);
}
