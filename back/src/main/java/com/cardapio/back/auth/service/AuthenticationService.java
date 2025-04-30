package com.cardapio.back.auth.service;

import com.cardapio.back.auth.config.JwtTokenProvider;
import com.cardapio.back.auth.dto.AuthenticationRequest;
import com.cardapio.back.auth.dto.AuthenticationResponse;
import com.cardapio.back.user.domain.dto.ConsumerRegistrationRequest;
import com.cardapio.back.user.domain.dto.RestaurantAdminRegistrationRequest;
import com.cardapio.back.user.domain.model.Consumer;
import com.cardapio.back.user.domain.model.RestaurantAdmin;
import com.cardapio.back.user.domain.model.User;
import com.cardapio.back.user.domain.model.UserRole;
import com.cardapio.back.user.domain.repository.ConsumerRepository;
import com.cardapio.back.user.domain.repository.RestaurantAdminRepository;
import com.cardapio.back.user.domain.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final RestaurantAdminRepository restaurantAdminRepository;
    private final ConsumerRepository consumerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;


    @Transactional
    public AuthenticationResponse registerRestaurantAdmin(RestaurantAdminRegistrationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        // Create user entity
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .role(UserRole.RESTAURANT)
                //.tenantId(request.getRestaurantId())
                .active(true)
                .build();

        userRepository.save(user);

        // Create restaurant admin entity
        RestaurantAdmin restaurantAdmin = RestaurantAdmin.builder()
                .user(user)
                .restaurantId(request.getRestaurantId())
                .position(request.getPosition())
                .owner(request.isOwner())
                .build();

        restaurantAdminRepository.save(restaurantAdmin);

        // Generate JWT token
        String jwtToken = jwtTokenProvider.generateToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .user(user)
                .build();
    }


    @Transactional
    public AuthenticationResponse registerConsumer(ConsumerRegistrationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        // Create user entity
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .role(UserRole.CONSUMER)
                .active(true)
                .build();

        userRepository.save(user);

        // Create consumer entity
        Consumer consumer = Consumer.builder()
                .user(user)
                .dateOfBirth(request.getBirthday())
                .numberOfOrders(0)
                .build();

        consumerRepository.save(consumer);

        // Generate JWT token
        String jwtToken = jwtTokenProvider.generateToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .user(user)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Get user from repository
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        // Update last login timestamp
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        // Generate JWT token
        String jwtToken = jwtTokenProvider.generateToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .user(user)
                .build();
    }

    public AuthenticationResponse refreshToken(String refreshToken) {
        String userEmail = jwtTokenProvider.extractUsername(refreshToken);

        if (userEmail != null) {
            User user = (User) this.userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            if (jwtTokenProvider.isTokenValid(refreshToken, user)) {
                String newAccessToken = jwtTokenProvider.generateToken(user);

                return AuthenticationResponse.builder()
                        .token(newAccessToken)
                        .refreshToken(refreshToken)
                        .user(user)
                        .build();
            }
        }

        throw new IllegalArgumentException("Invalid refresh token");
    }
}
