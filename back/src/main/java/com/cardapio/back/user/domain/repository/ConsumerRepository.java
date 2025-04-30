package com.cardapio.back.user.domain.repository;

import com.cardapio.back.user.domain.model.Consumer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ConsumerRepository extends JpaRepository<Consumer, UUID> {
    List<Consumer> findByFavoriteRestaurantId(UUID restaurantID);
}
