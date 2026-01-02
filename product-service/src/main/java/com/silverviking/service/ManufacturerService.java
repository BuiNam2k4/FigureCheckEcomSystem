package com.silverviking.service;

import com.silverviking.dto.request.ManufacturerRequest;
import com.silverviking.dto.response.ManufacturerResponse;
import java.util.List;

public interface ManufacturerService {
    List<ManufacturerResponse> getAllManufacturers();
    ManufacturerResponse getManufacturerById(Long id);
    ManufacturerResponse createManufacturer(ManufacturerRequest request);
    ManufacturerResponse updateManufacturer(Long id, ManufacturerRequest request);
    void deleteManufacturer(Long id);
}
