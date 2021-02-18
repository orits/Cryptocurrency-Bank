package com.orits.coincontrolservice;


public class Conversion {

    private double quantity;
    private String from;
    private String to;
    private double result;

    public Conversion() {

    }

    public Conversion(double quantity, String from, String to) {
        this.quantity = quantity;
        this.from = from;
        this.to = to;
    }

    public Conversion(double quantity, String from, String to, double result) {
        this.quantity = quantity;
        this.from = from;
        this.to = to;
        this.result = result;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public double getResult() {
        return result;
    }

    public void setResult(double result) {
        this.result = result;
    }

    @Override
    public String toString() {
        return "Conversion{" +
                "quantity=" + quantity +
                ", from='" + from + '\'' +
                ", to='" + to + '\'' +
                ", result=" + result +
                '}';
    }
}