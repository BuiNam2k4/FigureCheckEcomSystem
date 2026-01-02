package com.silverviking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    private int code;
    private T result;
    private String message;

    public static <T> ApiResponse<T> success(T result, String message) {
        return ApiResponse.<T>builder()
                .code(200)
                .result(result)
                .message(message)
                .build();
    }

    public static <T> ApiResponse<T> error(int code, String message) {
        return ApiResponse.<T>builder()
                .code(code)
                .message(message)
                .build();
    }
}
