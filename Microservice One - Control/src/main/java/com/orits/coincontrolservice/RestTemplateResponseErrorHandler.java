package com.orits.coincontrolservice;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResponseErrorHandler;


import java.io.IOException;


@Component
public class RestTemplateResponseErrorHandler implements ResponseErrorHandler {
    private static final Log logger = LogFactory.getLog(RestTemplateResponseErrorHandler.class);
    @Override
    public boolean hasError(ClientHttpResponse clientHttpResponse) throws IOException {
        return (
                clientHttpResponse.getStatusCode().is4xxClientError()
                || clientHttpResponse.getStatusCode().is5xxServerError());
    }


    @Override
    public void handleError(ClientHttpResponse clientHttpResponse) throws IOException {
        if (clientHttpResponse.getStatusCode().is4xxClientError()) {
            // handle CLIENT_ERROR
            logger.error("Client Error: status code(" + clientHttpResponse.getStatusCode() +")");
            logger.debug("Status code: " + clientHttpResponse.getStatusCode());
            logger.debug("Response" + clientHttpResponse.getStatusText());
            logger.debug(clientHttpResponse.getBody());

            throw new IOException("Client Error");
        } else if (clientHttpResponse.getStatusCode().is5xxServerError()) {
            // handle SERVER_ERROR
            logger.error("Server Error: status code(" + clientHttpResponse.getStatusCode() +")");
            logger.debug("Status code: " + clientHttpResponse.getStatusCode());
            logger.debug("Response" + clientHttpResponse.getStatusText());
            logger.debug(clientHttpResponse.getBody());
            throw new IOException("Server Error");
        }
    }
}
