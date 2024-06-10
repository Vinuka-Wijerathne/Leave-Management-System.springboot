package ovin.LMS.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ovin.LMS.dto.Userdto;
import ovin.LMS.service.Userservice;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final Userservice userservice;

    public UserController(Userservice userservice) {
        this.userservice = userservice;
    }

    @PostMapping
    public ResponseEntity<Userdto> createUser(@RequestBody Userdto userdto) {
        Userdto savedUser = this.userservice.createUser(userdto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Userdto>> getAllUsers() {
        List<Userdto> users = this.userservice.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        this.userservice.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Userdto> updateUser(@PathVariable Long id, @RequestBody Userdto userdto) {
        Userdto updatedUser = this.userservice.updateUser(id, userdto);
        return ResponseEntity.ok(updatedUser);
    }
}
