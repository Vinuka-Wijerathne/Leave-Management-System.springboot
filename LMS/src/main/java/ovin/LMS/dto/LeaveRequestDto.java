package ovin.LMS.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LeaveRequestDto {
    // Getters and Setters
    private Long id; // Add id field
    private String name;
    private String email;
    private String description;
    private String status; // New field for status
    private String dateTime; // New field for dateTime

    // Constructors
    public LeaveRequestDto() {
    }

    public LeaveRequestDto(Long id, String name, String email, String description, String status, String dateTime) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.description = description;
        this.status = status;
        this.dateTime = dateTime; // Initialize dateTime
    }

    // toString() method
    @Override
    public String toString() {
        return "LeaveRequestDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                ", dateTime='" + dateTime + '\'' +
                '}';
    }
}
