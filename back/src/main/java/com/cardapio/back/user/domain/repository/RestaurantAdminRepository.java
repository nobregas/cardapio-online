package com.cardapio.back.user.domain.repository;

import com.cardapio.back.user.domain.model.RestaurantAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RestaurantAdminRepository extends JpaRepository<RestaurantAdmin, UUID> {
    List<RestaurantAdmin> findByRestaurantId(UUID restaurantID);
    List<RestaurantAdmin> findByOwnerTrue();
}
