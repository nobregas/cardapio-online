package com.cardapio.back.auth.dto;

import com.cardapio.back.user.domain.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private String token;
    private String refreshToken;

    @JsonIgnore
    private User user;

    private String userRole;

    public String getUserRole() {
        return user != null ? user.getRole().toString() : null;
    }
}
