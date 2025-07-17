//package com.hack.config;
//
//
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.firebase.FirebaseApp;
//import com.google.firebase.FirebaseOptions;
//import jakarta.annotation.PostConstruct;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.io.ClassPathResource;
//
//import java.io.IOException;
//
//@Configuration
//public class FirebaseConfig {
//
//    @PostConstruct
//    public void init() throws IOException {
//        ClassPathResource resource = new ClassPathResource("serviceAccountKey.json");
//
//        if (FirebaseApp.getApps().isEmpty()) {
//            FirebaseOptions options = FirebaseOptions.builder()
//                    .setCredentials(GoogleCredentials.fromStream(resource.getInputStream()))
//                    // Remove or add DB URL if you’re using Realtime DB
//                    .build();
//
//            FirebaseApp.initializeApp(options);
//            System.out.println("✅ Firebase initialized from config");
//        }
//    }
//}
