package vn.kurisu.tradeservice.dto.response;

import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate dob;
    // We don't need roles for now
}
