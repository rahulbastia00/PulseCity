package com.hack.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hack.entities.NewsDTO;
import com.hack.externals.ExternalApis;

@RestController
@RequestMapping("/news")
public class NewsController {
	
	private ExternalApis externalApis;
	public NewsController(ExternalApis externalApis) {
		this.externalApis=externalApis;
	}
	
    @GetMapping("/fused")
    public List<NewsDTO> getFusedNews() {
        return externalApis.fetchAllFusedNews("banglore");
    }
    @GetMapping("/redditnews")
    public String getRedditNews() {
    	return externalApis.fetchRedditPosts();
    }
    
    
}
