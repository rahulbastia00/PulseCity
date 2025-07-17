package com.hack.entities;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserNews {
	
	private String imageUrl;
	private String videoUrl;
	private String audioUrl;
	private String description;
	private String audioText;
	private Date pubDate;
	private double latitude;
	private double longitude;
}
