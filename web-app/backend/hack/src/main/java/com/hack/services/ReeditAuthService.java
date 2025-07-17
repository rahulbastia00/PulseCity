package com.hack.services;

import java.time.Instant;
import org.springframework.http.*;
import org.apache.logging.log4j.util.Base64Util;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class ReeditAuthService {
	
	private RestTemplate restTemplate;
	
	public ReeditAuthService(RestTemplate restTemplate){
		this.restTemplate=restTemplate;
	}

    private String accessToken;
    private Instant expiryTime;

    private final String clientId = "qbKTbDQzfYFcH1fpB-xhfA";         // Replace with yours
    private final String clientSecret = "0OxGF3bRag6ykYnL6cfSsZg8sY1z1Q"; // Replace with yours

    public String getAccessToken() {
        if (accessToken == null || Instant.now().isAfter(expiryTime)) {
            fetchAccessToken();
        }
        return accessToken;
    }

    private void fetchAccessToken() {
        String credentials = clientId + ":" + clientSecret;
        String encodedCredentials = Base64Util.encode(credentials);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Basic " + encodedCredentials);

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("grant_type", "client_credentials");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(formData, headers);
        ResponseEntity<RedditTokenResponse> response = restTemplate.postForEntity(
                "https://www.reddit.com/api/v1/access_token",
                request,
                RedditTokenResponse.class
        );

        if (response.getStatusCode().is2xxSuccessful()) {
            RedditTokenResponse body = response.getBody();
            this.accessToken = body.getAccess_token();
            this.expiryTime = Instant.now().plusSeconds(body.getExpires_in() - 60); // subtract 60s buffer
        } else {
            throw new RuntimeException("Failed to fetch Reddit access token");
        }
    }

    // Helper class to map JSON response
    private static class RedditTokenResponse {
        private String access_token;
        private String token_type;
        private long expires_in;

        public String getAccess_token() { return access_token; }
        public long getExpires_in() { return expires_in; }
    }

}
