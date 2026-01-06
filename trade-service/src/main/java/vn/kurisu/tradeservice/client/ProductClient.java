package vn.kurisu.tradeservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import vn.kurisu.tradeservice.dto.response.ApiResponse;
import vn.kurisu.tradeservice.dto.response.ProductResponse;

import java.util.UUID;

@FeignClient(name = "product-service")
public interface ProductClient {
    @GetMapping("/api/products/{id}")
    ApiResponse<ProductResponse> getProductById(@PathVariable("id") UUID id);
}
