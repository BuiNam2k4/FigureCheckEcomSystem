package com.silverviking.service;

import com.silverviking.dto.request.SeriesRequest;
import com.silverviking.dto.response.SeriesResponse;
import java.util.List;

public interface SeriesService {
    List<SeriesResponse> getAllSeries();
    SeriesResponse getSeriesById(Long id);
    SeriesResponse createSeries(SeriesRequest request);
    SeriesResponse updateSeries(Long id, SeriesRequest request);
    void deleteSeries(Long id);
    List<SeriesResponse> getSeriesByManufacturerId(Long manufacturerId);
}
