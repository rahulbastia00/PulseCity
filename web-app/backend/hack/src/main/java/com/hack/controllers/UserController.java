package com.hack.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.hack.entities.User;
import com.hack.services.MediaService;
import com.hack.services.UserServiceImpl;


@RestController
@RequestMapping("/user")
public class UserController {

	private UserServiceImpl userServiceImpl;
	private MediaService mediaService;
//	@Autowired
	public UserController(UserServiceImpl userServiceImpl,MediaService mediaService) {
		this.userServiceImpl=userServiceImpl;
		this.mediaService=mediaService;
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody User user) throws InterruptedException, ExecutionException{
		String res=userServiceImpl.registerUser(user);  //user stored in firebase
		return ResponseEntity.ok(res);
	}
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/onlyuser")
	public ResponseEntity<?> onlyUser(){
		return ResponseEntity.ok("hello user");
	}
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/onlyAdmin")
	public ResponseEntity<?> onlyAdmin(){
		return ResponseEntity.ok("hello admin");
	}

	@GetMapping("/any")
	public ResponseEntity<?> hello(){
		return ResponseEntity.ok("hello");
	}
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	@GetMapping("/profile")
	public ResponseEntity<?> getProfile() throws InterruptedException, ExecutionException{
		
		User user=	userServiceImpl.getProfile();
		return ResponseEntity.ok(user);
	}
	@PostMapping("/post")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<?> postNews(
	        @RequestParam(required = false) MultipartFile image,
	        @RequestParam(required = false) MultipartFile video,
	        @RequestParam(required = false) MultipartFile audio,
	        @RequestParam String description,
	        @RequestParam double latitude,
	        @RequestParam double longitude
	) throws Exception {

	    Map<String, Object> data = new HashMap<>();

	    if (image != null && !image.isEmpty()) {
	        String imageUrl = mediaService.uploadToFirebase(image);
	        data.put("imageUrl", imageUrl);
	    }

	    if (video != null && !video.isEmpty()) {
	        String videoUrl = mediaService.uploadToFirebase(video);
	        data.put("videoUrl", videoUrl);
	    }

	    if (audio != null && !audio.isEmpty()) {
	        String audioUrl = mediaService.uploadToFirebase(audio);
	        String audioText = mediaService.audioToText(audio);
	        data.put("audioUrl", audioUrl);
	        data.put("audioText", audioText);
	    }   

	    if (description != null && !description.trim().isEmpty()) {
	        data.put("description", description);
	    }

	    data.put("pubDate", FieldValue.serverTimestamp());
	    data.put("latitude", latitude);
	    data.put("longitude",longitude);

	    Firestore firestore = FirestoreClient.getFirestore();
	    firestore.collection("user_post").add(data);

	    return ResponseEntity.ok("Uploaded successfully!!!");
	
	}

	
	
	
	
}
