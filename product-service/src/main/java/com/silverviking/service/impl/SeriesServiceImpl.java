package com.silverviking.service.impl;

import com.silverviking.domain.Series;
import com.silverviking.dto.request.SeriesRequest;
import com.silverviking.dto.response.SeriesResponse;
import com.silverviking.exception.EntityNotFoundException;
import com.silverviking.repository.SeriesRepository;
import com.silverviking.service.SeriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SeriesServiceImpl implements SeriesService {

    private final SeriesRepository seriesRepository;

    @Override
    @Transactional(readOnly = true)
    public List<SeriesResponse> getAllSeries() {
        return seriesRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public SeriesResponse getSeriesById(Long id) {
        Series series = seriesRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Series not found with id: " + id));
        return mapToResponse(series);
    }

    @Override
    @Transactional
    public SeriesResponse createSeries(SeriesRequest request) {
        Series series = Series.builder()
                .name(request.getName())
                .build();
        Series saved = seriesRepository.save(series);
        return mapToResponse(saved);
    }

    @Override
    @Transactional
    public SeriesResponse updateSeries(Long id, SeriesRequest request) {
        Series series = seriesRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Series not found with id: " + id));
        
        series.setName(request.getName());
        
        Series updated = seriesRepository.save(series);
        return mapToResponse(updated);
    }

    @Override
    @Transactional
    public void deleteSeries(Long id) {
        if (!seriesRepository.existsById(id)) {
            throw new EntityNotFoundException("Series not found with id: " + id);
        }
        seriesRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SeriesResponse> getSeriesByManufacturerId(Long manufacturerId) {
       // Series no longer belongs to Manufacturer directly
       // This method should be removed or deprecated. 
       // For now returning empty list or throwing unsupported.
       // User schema implies decoupling.
       return List.of();
    }

    private SeriesResponse mapToResponse(Series series) {
        return SeriesResponse.builder()
                .id(series.getId())
                .name(series.getName())
                .build();
    }
}
