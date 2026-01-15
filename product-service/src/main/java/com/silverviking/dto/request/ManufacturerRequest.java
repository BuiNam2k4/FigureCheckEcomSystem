package com.silverviking.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ManufacturerRequest {
    @NotBlank(message = "Name is required")
    private String name;
    
    private String originCountry;
    private String description;
    private String logoUrl;
    private String website;
}
