package vn.kurisu.tradeservice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.kurisu.tradeservice.dto.request.OrderRequest;
import vn.kurisu.tradeservice.dto.response.OrderItemResponse;
import vn.kurisu.tradeservice.dto.response.OrderResponse;
import vn.kurisu.tradeservice.entity.Order;
import vn.kurisu.tradeservice.entity.OrderItem;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "buyerId", ignore = true) // Set from logic
    @Mapping(target = "totalAmount", ignore = true)
    @Mapping(target = "shippingFee", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "orderItems", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Order toOrder(OrderRequest request);

    OrderResponse toOrderResponse(Order order);

    OrderItemResponse toOrderItemResponse(OrderItem orderItem);
}
