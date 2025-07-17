package com.hack.externals;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.hack.entities.NewsDTO;
import com.hack.services.ReeditAuthService;

@Service
public class ExternalApis {
	private RestTemplate restTemplate;
	private ReeditAuthService reeditAuthService;
	public ExternalApis(RestTemplate restTemplate,ReeditAuthService reeditAuthService) {
		this.restTemplate=restTemplate;
		this.reeditAuthService=reeditAuthService;
	}
    public List<NewsDTO> fetchAllFusedNews(String city) {
        List<NewsDTO> fusedNews = new ArrayList<>();
        fusedNews.addAll(fetchNewsFromNewsData( city));
        fusedNews.addAll(fetchNewsFromGNews( city));
        return fusedNews;
    }

    public List<NewsDTO> fetchNewsFromNewsData(String city) {
    	 String apiUrl = "https://newsdata.io/api/1/latest?language=en&country=in&apikey=pub_cd3796e035514eb591c7442dcd204376";
         List<NewsDTO> newsList = new ArrayList<>();

        try {
            Map<String, Object> response = restTemplate.getForObject(apiUrl, Map.class);
            List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
            for (Map<String, Object> item : results) {
                newsList.add(new NewsDTO((String) item.get("title"), (String) item.get("description"), (String) item.get("image_url"), (String)item.get("video_url"),(String)item.get("pubDate"),""));
                
            }

        } catch (Exception e) {
            System.out.println("Error fetching from NewsData.io: " + e.getMessage());
        }

        return newsList;
    }

    public List<NewsDTO> fetchNewsFromGNews(String city) {
    	String apiUrl="https://gnews.io/api/v4/top-headlines?q="+city+"&lang=en&country=in&apikey=0386f5372099ac789ad0c34560c454a5";
        List<NewsDTO> newsList = new ArrayList<>();
        try {
            Map<String, Object> response = restTemplate.getForObject(apiUrl, Map.class);
            List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("articles");

            for (Map<String, Object> item : results) {

                newsList.add(new NewsDTO((String) item.get("title"), (String) item.get("description"), (String) item.get("image"), (String)item.get("video_url"),(String)item.get("publishedAt"),""));
            }

        } catch (Exception e) {
            System.out.println("Error fetching from Another API: " + e.getMessage());
        }

        return newsList;
    }
    
    public String fetchRedditPosts() {
        String token = reeditAuthService.getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("User-Agent", "Java Reddit Client");

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(
            "https://oauth.reddit.com/r/bangalore/new?limit=10", // example
            HttpMethod.GET,
            entity,
            String.class
        );

        return response.getBody();
    }


}
