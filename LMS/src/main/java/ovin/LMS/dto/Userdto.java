package ovin.LMS.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Userdto {

    private Long id;
    private String username;
    private String password;
    private String email;
    private String role; // Include the role field

}
