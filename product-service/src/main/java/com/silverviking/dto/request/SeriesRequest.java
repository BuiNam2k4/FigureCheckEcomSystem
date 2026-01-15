package com.silverviking.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SeriesRequest {
    @NotBlank(message = "Name is required")
    private String name;
    private String description;
    private Long manufacturerId;
}
