package vn.kurisu.tradeservice.service;

import vn.kurisu.tradeservice.dto.request.OrderRequest;
import vn.kurisu.tradeservice.dto.response.OrderResponse;

import java.util.List;
import java.util.UUID;

public interface OrderService {
    OrderResponse createOrder(UUID buyerId, OrderRequest request);
    OrderResponse getOrder(UUID id);
    List<OrderResponse> getOrdersByBuyer(UUID buyerId);
}
