package com.hack.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsDTO {
	
	private String title;
	private String description;
	private String imageUrl;
	private String videoUrl;
	private String pubDate;
	private String location;
}
