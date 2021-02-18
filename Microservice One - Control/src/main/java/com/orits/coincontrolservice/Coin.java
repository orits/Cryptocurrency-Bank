package com.orits.coincontrolservice;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
@NoArgsConstructor
public class Coin {

    public static enum CoinType {
        BTC("BTC"), ETH("ETH"), DOGE("DOGE");

        private String coinType;

        CoinType(String coinType) {
            this.coinType = coinType;
        }

        String getValue() {
            return coinType;
        }
    }

    public static enum Currency {
        USD("USD"), ILS("ILS"), EUR("EUR");

        private String typeCurrency;

        Currency(String typeCurrency) {
            this.typeCurrency = typeCurrency;
        }

        String getValue() {
            return typeCurrency;
        }
    }

    @Id
    @SequenceGenerator(
            name = "coin_sequence",
            sequenceName = "coin_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "coin_sequence"
    )
    private long id;
    private CoinType coinType;
    private double price;
    private Currency currency;

    @Transient
    private long unixTime;

    public Coin(CoinType coinType, double price, Currency currency) {
        this.coinType = coinType;
        this.price = price;
        this.currency = currency;
        this.unixTime = new Date().getTime() / 1000L;
    }

    public long getId() {
        return id;
    }

    public CoinType getCoinType() {
        return coinType;
    }

    public void setCoinType(CoinType coinType) {
        this.coinType = coinType;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public long getUnixTime() {
        return unixTime;
    }

    public void setUnixTime(long unixTime) {
        this.unixTime = unixTime;
    }

    @Override
    public String toString() {
        return "Coin{" +
                "id=" + id +
                ", coinType=" + coinType +
                ", price=" + price +
                ", currency=" + currency +
                ", unixTime=" + unixTime +
                '}';
    }
}
