package ovin.LMS.service.impl;

import ovin.LMS.dto.LeaveRequestDto;
import ovin.LMS.entity.LeaveRequest;
import ovin.LMS.mapper.LeaveRequestMapper;
import ovin.LMS.repository.LeaveRequestRepository;
import ovin.LMS.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaveRequestServiceImpl implements LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;

    @Autowired
    public LeaveRequestServiceImpl(LeaveRequestRepository leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }

    @Override
    public void createLeaveRequest(LeaveRequestDto leaveRequestDto) {
        LeaveRequest leaveRequest = LeaveRequestMapper.mapToLeaveRequest(leaveRequestDto);
        leaveRequest.setDateTime(LocalDateTime.now()); // Set current date and time
        leaveRequest.setStatus("Pending"); // Set the default status to "Pending"
        LeaveRequest savedLeaveRequest = leaveRequestRepository.save(leaveRequest);
        LeaveRequestMapper.mapToLeaveRequestDto(savedLeaveRequest);
    }

    @Override
    public LeaveRequestDto getLeaveRequestById(Long id) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id)
                .orElse(null);
        assert leaveRequest != null;
        return LeaveRequestMapper.mapToLeaveRequestDto(leaveRequest);
    }

    @Override
    public List<LeaveRequestDto> getAllLeaveRequests() {
        List<LeaveRequest> leaveRequests = leaveRequestRepository.findAll();
        return leaveRequests.stream()
                .map(LeaveRequestMapper::mapToLeaveRequestDto)
                .collect(Collectors.toList());
    }

    @Override
    public void denyLeaveRequest(Long id) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found with id: " + id));
        leaveRequest.setStatus("Denied");
        leaveRequestRepository.save(leaveRequest);
    }

    @Override
    public void approveLeaveRequest(Long id) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found with id: " + id));
        leaveRequest.setStatus("Approved");
        leaveRequestRepository.save(leaveRequest);
    }
}
