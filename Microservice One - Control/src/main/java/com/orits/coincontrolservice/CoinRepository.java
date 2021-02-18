package com.orits.coincontrolservice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CoinRepository
        extends JpaRepository<Coin, Long> {

    List<Coin> findAllByCoinType(Coin.CoinType type);

}
