package com.cardapio.back.user.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "restaurant_admins")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantAdmin {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "restaurant_id", nullable = false)
    private UUID restaurantId;

    @Column(name = "position")
    private String position;

    @Column(name = "is_owner")
    private boolean owner;
}
