package com.orits.coincontrolservice;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;


import java.net.ConnectException;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping(path = "api/coin")
public class Controller {

    private final RestTemplate restTemplate;

    private final CoinService coinService;

    @Autowired
    public Controller(RestTemplate restTemplate, CoinService coinService) {
        this.restTemplate = restTemplate;
        this.coinService = coinService;
    }

    @CrossOrigin
    @GetMapping(path = "/pie")
    @ResponseBody
    public HashMap<String, Double> getCoinsPie() {
        return clacCoinsPie();
    }

    @CrossOrigin
    @GetMapping
    public List<Coin> getCoins() {
        System.out.println("@@@getCoins@@@");
        return coinService.getCoins();
    }

    @CrossOrigin
    @PostMapping
    public Coin addNewCoin(@RequestBody Coin coin) {
        System.out.println("###addNewCoin###");
        return coinService.addNewCoin(coin);
    }

    @CrossOrigin
    @DeleteMapping(path = "{coinId}")
    public void deleteCoin(@PathVariable("coinId") Long coinId) {
        System.out.println("$$$deleteCoin$$$");
        coinService.deleteCoin(coinId);
    }

    @CrossOrigin
    @PutMapping(path = "{coinId}")
    public Coin updateCoin(@RequestBody Coin coin, @PathVariable("coinId") Long coinId) {
        return coinService.updateCoin(coin, coinId);
    }

    @CrossOrigin
    @GetMapping(path = "{type}")
    public List<Coin> getCoinsByType(@PathVariable("type") Coin.CoinType type) {
        return coinService.getAllCoinsByType(type);
    }

    @CrossOrigin
    @GetMapping(path = "/types")
    public List<String> getCoinsTypes() {
        return Stream.of(Coin.CoinType.values())
                .map(Coin.CoinType::getValue)
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @GetMapping(path = "/conversion/from/{from}/to/{to}/quantity/{quantity}")
    public ResponseEntity<Conversion> getConversion(@PathVariable("from") String from,
                                                   @PathVariable("to") String to,
                                                   @PathVariable("quantity") Double quantity) {

        String url = "http://localhost:9090/api/conversion/from/" + from + "/to/" + to + "/quantity/" + quantity;

//        ResponseEntity<Conversion> r = restTemplate.getForEntity(url, Conversion.class);
        ResponseEntity<Conversion> response = null;
        try {
            response = restTemplate.getForEntity(url, Conversion.class);
        } catch (RestClientException e) {
            if (e.getCause() instanceof ConnectException) {
                // handle connect exception
                System.out.println("LALA");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new Conversion());
            }
//            throw e; // rethrow if not a ConnectException
        } catch (Exception e){
            if(e.getMessage().equals("Client Error")){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Conversion());
            }
            else if(e.getMessage().equals("Server Error")) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Conversion());
            }
        }
        return response;
    }


    @CrossOrigin
    @GetMapping(path = "/currency")
    public List<String> getConversion() {
        return Stream.of(Coin.Currency.values())
                .map(Coin.Currency::getValue)
                .collect(Collectors.toList());
    }

    private HashMap<String, Double> clacCoinsPie() {
        double total = coinService.getCoins().size();
        HashMap<String, Double> map = new HashMap<>();
        for (Coin.CoinType type : Coin.CoinType.values()) {
            double coins_size = coinService.getAllCoinsByType(type).size();
            if (coins_size > 0)
                map.put(type.getValue(), (coins_size / total) * 100);
        }
        return map;
    }
}
