package com.silverviking.controller;


import com.silverviking.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class FileUploadController {

    private final CloudinaryService cloudinaryService;

    @PostMapping("/upload")
    public com.silverviking.dto.ApiResponse<Map> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        Map data = cloudinaryService.uploadImage(file);
        return com.silverviking.dto.ApiResponse.<Map>builder()
                .result(Map.of("imageUrl", data.get("url")))
                .build();
    }
}
