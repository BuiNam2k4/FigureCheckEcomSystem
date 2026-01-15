package com.silverviking.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ManufacturerResponse {
    private Long id;
    private String name;
    private String originCountry;
    private String description;
    private String logoUrl;
    private String website;
}
