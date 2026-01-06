package vn.kurisu.tradeservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import vn.kurisu.tradeservice.dto.response.ApiResponse;
import vn.kurisu.tradeservice.dto.response.UserResponse;

@FeignClient(name = "identity-service")
public interface IdentityClient {
    @GetMapping("/users/{userId}")
    ApiResponse<UserResponse> getUser(@PathVariable("userId") String userId);
}
