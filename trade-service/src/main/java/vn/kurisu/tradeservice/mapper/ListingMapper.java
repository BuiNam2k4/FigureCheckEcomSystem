package vn.kurisu.tradeservice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.kurisu.tradeservice.dto.request.ListingRequest;
import vn.kurisu.tradeservice.dto.response.ListingImageResponse;
import vn.kurisu.tradeservice.dto.response.ListingResponse;
import vn.kurisu.tradeservice.entity.Listing;
import vn.kurisu.tradeservice.entity.ListingImage;

@Mapper(componentModel = "spring")
public interface ListingMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "images", ignore = true) // Handled separately or in service
    Listing toListing(ListingRequest request);

    ListingResponse toListingResponse(Listing listing);

    ListingImageResponse toListingImageResponse(ListingImage listingImage);
}
