package com.orits.coincontrolservice;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Transient;
import java.util.Date;
import java.util.List;


@Service
public class CoinService {

    private final CoinRepository coinRepository;

    @Autowired
    public CoinService(CoinRepository coinRepository) {
        this.coinRepository = coinRepository;
    }

    public List<Coin> getCoins() {
        return coinRepository.findAll();
    }

    public Coin addNewCoin(Coin coin) {
        Coin newCoin = new Coin(coin.getCoinType(), coin.getPrice(), coin.getCurrency());
        coinRepository.save(newCoin); // add coin to db.
        return newCoin;
    }

    public void deleteCoin(Long coinId) {
        if (coinRepository.existsById(coinId)) {
            coinRepository.deleteById(coinId);
        } else
            throw new IllegalStateException("coin id: " + coinId + " does not exist!");
    }

    @Transient
    public Coin updateCoin(Coin coin, Long coinId) {
        Coin coinToUpdate = coinRepository.findById(coinId)
                .orElseThrow(() -> new IllegalStateException(
                        "coin id: " + coinId + " does not exist!"));

        if (coin.getCoinType() != null &&
                coin.getPrice() > 0 &&
                coin.getCurrency() != null) {
            coinToUpdate.setCoinType(coin.getCoinType());
            coinToUpdate.setPrice(coin.getPrice());
            coinToUpdate.setCurrency(coin.getCurrency());
            coinToUpdate.setUnixTime(new Date().getTime() / 1000L);
        }
        coinRepository.save(coinToUpdate);
        return coinToUpdate;
    }

    public List<Coin> getAllCoinsByType(Coin.CoinType type) {
        return coinRepository.findAllByCoinType(type);
    }
}
