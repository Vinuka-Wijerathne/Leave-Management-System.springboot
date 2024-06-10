package ovin.LMS.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ResponseMessage {
    private String message;

    public ResponseMessage(String message) {
        this.message = message;
    }

}
