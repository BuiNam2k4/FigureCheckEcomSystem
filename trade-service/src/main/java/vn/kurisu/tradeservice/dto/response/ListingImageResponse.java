package vn.kurisu.tradeservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingImageResponse {
    private Long id;
    private String imageUrl;
    private boolean isThumbnail;
}
