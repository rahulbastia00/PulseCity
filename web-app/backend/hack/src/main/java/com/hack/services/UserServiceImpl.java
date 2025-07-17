package com.hack.services;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.util.ThrowableCauseExtractor;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.cloud.FirestoreClient;
import com.hack.entities.User;
import com.hack.exceptions.UserAlreadyExists;
import com.hack.exceptions.UserNotFound;
@Service
public class UserServiceImpl{

	private  Firestore db ;
//	public String registerUser(User user) throws InterruptedException, ExecutionException {
//		
//		DocumentReference docRef = db.collection("user").document(user.getEmail());
//	    DocumentSnapshot snapshot = docRef.get().get();
//	    if (snapshot.exists()) {
//	        throw new UserAlreadyExists("user already exist by this email");
//	    }
//	    ApiFuture<WriteResult> result = docRef.set(user);
//	    return "User saved at: " + result.get();
//		
//	}

	public String registerUser(User user) throws InterruptedException, ExecutionException {
		
		db=FirestoreClient.getFirestore();
	    
	    // 1. ✅ Check if user already exists in Firebase Auth
	    try {
	        FirebaseAuth.getInstance().getUserByEmail(user.getEmail());
	        throw new UserAlreadyExists("User already exists with this email");
	    } catch (FirebaseAuthException e) {
	        if (e.getAuthErrorCode() == null || !e.getAuthErrorCode().name().equals("USER_NOT_FOUND")) {
	            throw new RuntimeException("Error checking existing user: " + e.getMessage(), e);
	        }
	    }

	    // 2. ✅ Create user in Firebase Auth
	    UserRecord.CreateRequest request = new UserRecord.CreateRequest()
	        .setEmail(user.getEmail())
	        .setPassword(user.getPassword()); // 🔐 Use strong password in real use

	    UserRecord userRecord;
	    try {
	        userRecord = FirebaseAuth.getInstance().createUser(request);
	     // Set custom claim "role" on the token
	        Map<String, Object> claims = new HashMap<>();
	        claims.put("role", "ADMIN");  // or "ADMIN", "REPORTER"
	        FirebaseAuth.getInstance().setCustomUserClaims(userRecord.getUid(), claims);
	    } catch (FirebaseAuthException e) {
	        throw new RuntimeException("Error creating Firebase Auth user: " + e.getMessage());
	    }

	    // Optional: remove password from Firestore object before storing
	    user.setPassword(null);  // Don’t store plain password
	    user.setRole("USER");
	    // Save user profile in Firestore (using UID as doc ID)
	    DocumentReference docRef = db.collection("user").document(userRecord.getUid());
	    ApiFuture<WriteResult> result = docRef.set(user);

	    return "User registered successfully at: " + result.get().getUpdateTime();
	}
	
	public User getProfile() throws InterruptedException, ExecutionException {
		db=FirestoreClient.getFirestore();

		  String uid = SecurityContextHolder.getContext().getAuthentication().getName();
	        DocumentSnapshot snapshot = db.collection("user").document(uid).get().get();

	        if (!snapshot.exists()) {
	            throw new UserNotFound("please logged in !!!!");
	        }

	        User user = snapshot.toObject(User.class);
	        return user;
	}

}
