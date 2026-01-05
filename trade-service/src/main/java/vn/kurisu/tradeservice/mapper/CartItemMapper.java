package vn.kurisu.tradeservice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.kurisu.tradeservice.dto.response.CartItemResponse;
import vn.kurisu.tradeservice.entity.CartItem;

@Mapper(componentModel = "spring", uses = {ListingMapper.class})
public interface CartItemMapper {
    CartItemResponse toCartItemResponse(CartItem cartItem);
}
