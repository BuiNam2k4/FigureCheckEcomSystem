package com.silverviking.controller;

import com.silverviking.dto.ApiResponse;
import com.silverviking.dto.request.SeriesRequest;
import com.silverviking.dto.response.SeriesResponse;
import com.silverviking.service.SeriesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/series")
@RequiredArgsConstructor
public class SeriesController {

    private final SeriesService seriesService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<SeriesResponse>>> getAllSeries() {
        return ResponseEntity.ok(ApiResponse.success(seriesService.getAllSeries(), "Series retrieved successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SeriesResponse>> getSeriesById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(seriesService.getSeriesById(id), "Series found"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SeriesResponse>> createSeries(@Valid @RequestBody SeriesRequest request) {
        return new ResponseEntity<>(ApiResponse.success(seriesService.createSeries(request), "Series created successfully"), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SeriesResponse>> updateSeries(@PathVariable Long id, @Valid @RequestBody SeriesRequest request) {
        return ResponseEntity.ok(ApiResponse.success(seriesService.updateSeries(id, request), "Series updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSeries(@PathVariable Long id) {
        seriesService.deleteSeries(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Series deleted successfully"));
    }
    
    @GetMapping("/manufacturer/{manufacturerId}")
    public ResponseEntity<ApiResponse<List<SeriesResponse>>> getSeriesByManufacturer(@PathVariable Long manufacturerId) {
        return ResponseEntity.ok(ApiResponse.success(seriesService.getSeriesByManufacturerId(manufacturerId), "Series retrieved successfully"));
    }
}
