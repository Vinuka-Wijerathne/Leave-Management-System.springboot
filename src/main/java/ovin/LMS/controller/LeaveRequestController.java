package ovin.LMS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ovin.LMS.dto.LeaveRequestDto;
import ovin.LMS.dto.ResponseMessage;
import ovin.LMS.service.EmailService;
import ovin.LMS.service.LeaveRequestService;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;
    private final EmailService emailService;
    private static final Logger LOGGER = Logger.getLogger(LeaveRequestController.class.getName());

    @Autowired
    public LeaveRequestController(LeaveRequestService leaveRequestService, EmailService emailService) {
        this.leaveRequestService = leaveRequestService;
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<ResponseMessage> createLeaveRequest(@RequestBody LeaveRequestDto leaveRequestDto) {
        leaveRequestService.createLeaveRequest(leaveRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseMessage("Leave request created successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLeaveRequestById(@PathVariable Long id) {
        LeaveRequestDto leaveRequestDto = leaveRequestService.getLeaveRequestById(id);
        if (leaveRequestDto != null) {
            return ResponseEntity.ok(leaveRequestDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<LeaveRequestDto>> getAllLeaveRequests() {
        List<LeaveRequestDto> leaveRequests = leaveRequestService.getAllLeaveRequests();
        return ResponseEntity.ok(leaveRequests);
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<ResponseMessage> approveLeaveRequest(@PathVariable Long id) {
        LeaveRequestDto leaveRequestDto = leaveRequestService.getLeaveRequestById(id);
        if (leaveRequestDto == null) {
            return ResponseEntity.notFound().build();
        }

        leaveRequestService.approveLeaveRequest(id);
        LOGGER.log(Level.INFO, "Leave request approved with ID: " + id);
        LOGGER.log(Level.INFO, "Sending approval email to HR user...");

        String hrEmail = "falconblue2002@gmail.com"; // Replace with actual HR email
        String emailContent = "Leave Description: " + leaveRequestDto.getDescription() + "\n\n" +
                "Your leave request has been approved.";

        emailService.sendEmail(hrEmail, "Leave Request Approved", emailContent);
        LOGGER.log(Level.INFO, "Approval email sent successfully.");

        return ResponseEntity.ok(new ResponseMessage("Leave request approved successfully"));
    }

    @PutMapping("/{id}/deny")
    public ResponseEntity<ResponseMessage> denyLeaveRequest(@PathVariable Long id) {
        LeaveRequestDto leaveRequestDto = leaveRequestService.getLeaveRequestById(id);
        if (leaveRequestDto == null) {
            return ResponseEntity.notFound().build();
        }

        leaveRequestService.denyLeaveRequest(id);
        LOGGER.log(Level.INFO, "Leave request denied with ID: " + id);
        LOGGER.log(Level.INFO, "Sending denial email to HR user...");

        String hrEmail = "falconblue2002@gmail.com"; // Replace with actual HR email
        String emailContent = "Leave Description: " + leaveRequestDto.getDescription() + "\n\n" +
                "Your leave request has been denied.";

        emailService.sendEmail(hrEmail, "Leave Request Denied", emailContent);
        LOGGER.log(Level.INFO, "Denial email sent successfully.");

        return ResponseEntity.ok(new ResponseMessage("Leave request denied successfully"));
    }
}
