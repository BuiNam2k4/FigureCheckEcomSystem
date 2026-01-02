package com.silverviking.controller;

import com.silverviking.dto.ApiResponse;
import com.silverviking.dto.request.ManufacturerRequest;
import com.silverviking.dto.response.ManufacturerResponse;
import com.silverviking.service.ManufacturerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manufacturers")
@RequiredArgsConstructor
public class ManufacturerController {

    private final ManufacturerService manufacturerService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ManufacturerResponse>>> getAllManufacturers() {
        List<ManufacturerResponse> manufacturers = manufacturerService.getAllManufacturers();
        return ResponseEntity.ok(ApiResponse.success(manufacturers, "Manufacturers retrieved successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ManufacturerResponse>> getManufacturerById(@PathVariable Long id) {
        ManufacturerResponse manufacturer = manufacturerService.getManufacturerById(id);
        return ResponseEntity.ok(ApiResponse.success(manufacturer, "Manufacturer found"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ManufacturerResponse>> createManufacturer(@Valid @RequestBody ManufacturerRequest request) {
        ManufacturerResponse created = manufacturerService.createManufacturer(request);
        return new ResponseEntity<>(ApiResponse.success(created, "Manufacturer created successfully"), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ManufacturerResponse>> updateManufacturer(@PathVariable Long id, @Valid @RequestBody ManufacturerRequest request) {
        ManufacturerResponse updated = manufacturerService.updateManufacturer(id, request);
        return ResponseEntity.ok(ApiResponse.success(updated, "Manufacturer updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteManufacturer(@PathVariable Long id) {
        manufacturerService.deleteManufacturer(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Manufacturer deleted successfully"));
    }
}
