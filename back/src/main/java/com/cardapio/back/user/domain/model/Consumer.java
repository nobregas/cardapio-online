package com.cardapio.back.user.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "consumers")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Consumer {

    @Id
    @Column(name = "user_id")
    private UUID userId;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "default_address_id")
    private UUID defaultAddressId;

    @Column(name = "favorite_restaurant_id")
    private UUID favoriteRestaurantId;

    @Column(name = "number_of_orders")
    private Integer numberOfOrders;

    @Column(name = "first_order_date")
    private LocalDate firstOrderDate;

    @Column(name = "last_order_date")
    private LocalDate lastOrderDate;

}
