package com.orits.coincontrolservice;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;


import java.util.Arrays;

@Configuration
public class Config {
    @Bean
    CommandLineRunner commandLineRunner(CoinRepository repository) {
        return args -> {
//            Coin btc = new Coin(
//                    Coin.CoinType.BTC,
//                    10000,
//                    Coin.Currency.USD
//            );
//
//            Coin eth = new Coin(
//                    Coin.CoinType.ETH,
//                    30,
//                    Coin.Currency.USD
//            );
//
//            repository.saveAll(
//                    Arrays.asList(btc, eth)
//            );
        };
    }

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setErrorHandler(new RestTemplateResponseErrorHandler());
        return restTemplate;
//        return new RestTemplateBuilder()
//                .errorHandler(new RestTemplateResponseErrorHandler())
//                .build();
    }

}
