package ovin.LMS.mapper;

import ovin.LMS.dto.LeaveRequestDto;
import ovin.LMS.entity.LeaveRequest;

import java.time.LocalDateTime;

public class LeaveRequestMapper {

    public static LeaveRequest mapToLeaveRequest(LeaveRequestDto leaveRequestDto) {
        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setName(leaveRequestDto.getName());
        leaveRequest.setEmail(leaveRequestDto.getEmail());
        leaveRequest.setDescription(leaveRequestDto.getDescription());
        leaveRequest.setStatus(leaveRequestDto.getStatus());
        if (leaveRequestDto.getDateTime() != null) {
            leaveRequest.setDateTime(LocalDateTime.parse(leaveRequestDto.getDateTime())); // Map dateTime field
        }
        return leaveRequest;
    }

    public static LeaveRequestDto mapToLeaveRequestDto(LeaveRequest leaveRequest) {

        LeaveRequestDto leaveRequestDto = new LeaveRequestDto();
        leaveRequestDto.setId(leaveRequest.getId());
        leaveRequestDto.setName(leaveRequest.getName());
        leaveRequestDto.setEmail(leaveRequest.getEmail());
        leaveRequestDto.setDescription(leaveRequest.getDescription());
        leaveRequestDto.setStatus(leaveRequest.getStatus());
        if (leaveRequest.getDateTime() != null) {
            leaveRequestDto.setDateTime(String.valueOf(leaveRequest.getDateTime())); // Map dateTime field
        }
        return leaveRequestDto;
    }
}
