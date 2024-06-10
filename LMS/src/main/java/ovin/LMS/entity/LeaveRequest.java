package ovin.LMS.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "leave_requests")
public class LeaveRequest {
    // Getters and Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String description;

    private LocalDateTime dateTime;

    private String status = "pending"; // Default status is pending

    // Constructors
    public LeaveRequest() {
    }

    public LeaveRequest(String name, String email, String description, LocalDateTime dateTime) {
        this.name = name;
        this.email = email;
        this.description = description;
        this.dateTime = dateTime;
    }

    // toString() method
    @Override
    public String toString() {
        return "LeaveRequest{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", description='" + description + '\'' +
                ", dateTime=" + dateTime +
                ", status='" + status + '\'' +
                '}';
    }
}
