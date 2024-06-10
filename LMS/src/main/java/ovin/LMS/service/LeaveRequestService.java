package ovin.LMS.service;

import ovin.LMS.dto.LeaveRequestDto;
import java.util.List;

public interface LeaveRequestService {
    void createLeaveRequest(LeaveRequestDto leaveRequestDto);

    LeaveRequestDto getLeaveRequestById(Long id);

    List<LeaveRequestDto> getAllLeaveRequests();

    void deleteLeaveRequest(Long id);

    void denyLeaveRequest(Long id);

    void approveLeaveRequest(Long id);
}
