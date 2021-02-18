package com.orits.coinconversionservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.net.ConnectException;


@RestController
@RequestMapping(path = "api/conversion")
public class Controller {

    private final String apiKey = "d503dde4b176adf9265d92bb080165a7effad921686b1ebc6c56064f093cb9e4";

    private final RestTemplate restTemplate;

    @Autowired
    public Controller(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @CrossOrigin
    @GetMapping(path = "from/{from}/to/{to}/quantity/{quantity}")
    public ResponseEntity<Conversion> getConversion(@PathVariable("from") String from,
                                           @PathVariable("to") String to,
                                           @PathVariable("quantity") Double quantity) {
        ResponseEntity<Double> r = convert(from, to);
        if(r.getStatusCode() == HttpStatus.OK)
            return ResponseEntity.ok(new Conversion(quantity, from, to, (quantity * (r.getBody()))));
        return ResponseEntity.status(r.getStatusCode()).body(new Conversion());
    }

    private ResponseEntity<Double> convert(String from, String to){
        String url = "https://min-api.cryptocompare.com/data/price?fsym=" + from + "&tsyms=" + to + "&pi_key=" + apiKey;
//        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        ResponseEntity<Double> response = null;
        try {
            ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
            response = ResponseEntity.ok(
                    Double.parseDouble(responseEntity.getBody().split(":")[1].replace("}", "")));
            return response;

        } catch (RestClientException e) {
            if (e.getCause() instanceof ConnectException) {
                // handle connect exception
                return ResponseEntity.status(HttpStatus.CONFLICT).body(0.0);
            }
//            throw e; // rethrow if not a ConnectException
        } catch (Exception e){
            if(e.getMessage().equals("Client Error")){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(0.0);
            }
            else if(e.getMessage().equals("Server Error")) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0.0);
            }
        }
        return response;
    }
}
