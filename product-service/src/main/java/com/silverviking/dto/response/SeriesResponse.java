package com.silverviking.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SeriesResponse {
    private Long id;
    private String name;
}
