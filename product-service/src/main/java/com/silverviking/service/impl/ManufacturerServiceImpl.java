package com.silverviking.service.impl;

import com.silverviking.domain.Manufacturer;
import com.silverviking.dto.request.ManufacturerRequest;
import com.silverviking.dto.response.ManufacturerResponse;
import com.silverviking.exception.EntityNotFoundException;
import com.silverviking.repository.ManufacturerRepository;
import com.silverviking.service.ManufacturerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ManufacturerServiceImpl implements ManufacturerService {

    private final ManufacturerRepository manufacturerRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ManufacturerResponse> getAllManufacturers() {
        return manufacturerRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ManufacturerResponse getManufacturerById(Long id) {
        Manufacturer manufacturer = manufacturerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Manufacturer not found with id: " + id));
        return mapToResponse(manufacturer);
    }

    @Override
    @Transactional
    public ManufacturerResponse createManufacturer(ManufacturerRequest request) {
        Manufacturer manufacturer = Manufacturer.builder()
                .name(request.getName())
                .originCountry(request.getOriginCountry())
                .build();
        Manufacturer saved = manufacturerRepository.save(manufacturer);
        return mapToResponse(saved);
    }

    @Override
    @Transactional
    public ManufacturerResponse updateManufacturer(Long id, ManufacturerRequest request) {
        Manufacturer manufacturer = manufacturerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Manufacturer not found with id: " + id));
        
        manufacturer.setName(request.getName());
        manufacturer.setOriginCountry(request.getOriginCountry());
        
        Manufacturer updated = manufacturerRepository.save(manufacturer);
        return mapToResponse(updated);
    }

    @Override
    @Transactional
    public void deleteManufacturer(Long id) {
        if (!manufacturerRepository.existsById(id)) {
            throw new EntityNotFoundException("Manufacturer not found with id: " + id);
        }
        manufacturerRepository.deleteById(id);
    }

    private ManufacturerResponse mapToResponse(Manufacturer manufacturer) {
        return ManufacturerResponse.builder()
                .id(manufacturer.getId())
                .name(manufacturer.getName())
                .originCountry(manufacturer.getOriginCountry())
                .build();
    }
}
