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
    date = "2026-01-06T22:42:03+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public Order toOrder(OrderRequest request) {
        if ( request == null ) {
            return null;
        }

        Order.OrderBuilder order = Order.builder();

        order.shippingAddress( request.getShippingAddress() );
        order.phoneNumber( request.getPhoneNumber() );
        order.paymentMethod( request.getPaymentMethod() );

        return order.build();
    }

    @Override
    public OrderResponse toOrderResponse(Order order) {
        if ( order == null ) {
            return null;
        }

        OrderResponse.OrderResponseBuilder orderResponse = OrderResponse.builder();

        orderResponse.id( order.getId() );
        orderResponse.buyerId( order.getBuyerId() );
        orderResponse.totalAmount( order.getTotalAmount() );
        orderResponse.shippingFee( order.getShippingFee() );
        orderResponse.shippingAddress( order.getShippingAddress() );
        orderResponse.phoneNumber( order.getPhoneNumber() );
        orderResponse.paymentMethod( order.getPaymentMethod() );
        orderResponse.status( order.getStatus() );
        orderResponse.orderItems( orderItemListToOrderItemResponseList( order.getOrderItems() ) );
        orderResponse.createdAt( order.getCreatedAt() );
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
        orderItemResponse.sellerId( orderItem.getSellerId() );
        orderItemResponse.productName( orderItem.getProductName() );
        orderItemResponse.productImageUrl( orderItem.getProductImageUrl() );
        orderItemResponse.price( orderItem.getPrice() );

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
