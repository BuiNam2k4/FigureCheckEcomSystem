package vn.kurisu.tradeservice.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import vn.kurisu.tradeservice.dto.request.OrderRequest;
import vn.kurisu.tradeservice.dto.response.OrderItemResponse;
import vn.kurisu.tradeservice.dto.response.OrderResponse;
import vn.kurisu.tradeservice.entity.Order;
import vn.kurisu.tradeservice.entity.OrderItem;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-01-05T19:52:16+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251118-1623, environment: Java 21.0.9 (Eclipse Adoptium)"
)
@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public Order toOrder(OrderRequest request) {
        if ( request == null ) {
            return null;
        }

        Order.OrderBuilder order = Order.builder();

        order.paymentMethod( request.getPaymentMethod() );
        order.phoneNumber( request.getPhoneNumber() );
        order.shippingAddress( request.getShippingAddress() );

        return order.build();
    }

    @Override
    public OrderResponse toOrderResponse(Order order) {
        if ( order == null ) {
            return null;
        }

        OrderResponse.OrderResponseBuilder orderResponse = OrderResponse.builder();

        orderResponse.buyerId( order.getBuyerId() );
        orderResponse.createdAt( order.getCreatedAt() );
        orderResponse.id( order.getId() );
        orderResponse.orderItems( orderItemListToOrderItemResponseList( order.getOrderItems() ) );
        orderResponse.paymentMethod( order.getPaymentMethod() );
        orderResponse.phoneNumber( order.getPhoneNumber() );
        orderResponse.shippingAddress( order.getShippingAddress() );
        orderResponse.shippingFee( order.getShippingFee() );
        orderResponse.status( order.getStatus() );
        orderResponse.totalAmount( order.getTotalAmount() );
        orderResponse.updatedAt( order.getUpdatedAt() );

        return orderResponse.build();
    }

    @Override
    public OrderItemResponse toOrderItemResponse(OrderItem orderItem) {
        if ( orderItem == null ) {
            return null;
        }

        OrderItemResponse.OrderItemResponseBuilder orderItemResponse = OrderItemResponse.builder();

        orderItemResponse.id( orderItem.getId() );
        orderItemResponse.listingId( orderItem.getListingId() );
        orderItemResponse.price( orderItem.getPrice() );
        orderItemResponse.productImageUrl( orderItem.getProductImageUrl() );
        orderItemResponse.productName( orderItem.getProductName() );
        orderItemResponse.sellerId( orderItem.getSellerId() );

        return orderItemResponse.build();
    }

    protected List<OrderItemResponse> orderItemListToOrderItemResponseList(List<OrderItem> list) {
        if ( list == null ) {
            return null;
        }

        List<OrderItemResponse> list1 = new ArrayList<OrderItemResponse>( list.size() );
        for ( OrderItem orderItem : list ) {
            list1.add( toOrderItemResponse( orderItem ) );
        }

        return list1;
    }
}
