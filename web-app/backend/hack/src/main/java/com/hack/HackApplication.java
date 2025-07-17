package com.hack;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Objects;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.client.RestTemplate;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@SpringBootApplication
public class HackApplication {

    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }

    public static void main(String[] args) throws IOException {
        initializeFirebase();
        SpringApplication.run(HackApplication.class, args);
    }

    private static void initializeFirebase() throws IOException {
        // Load service account key file from resources
        ClassPathResource resource = new ClassPathResource("serviceAccountKey.json");

        // Only initialize Firebase once
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(resource.getInputStream()))
                    // Uncomment this if you are using Realtime Database (not required for Firestore only)
                    .setDatabaseUrl("https://pulsecity-465916.firebaseio.com")

                    .setStorageBucket("pulsecity-465916.firebasestorage.app")
                    .build();

            FirebaseApp.initializeApp(options);
            System.out.println("✅ Firebase initialized");
        } else {
            System.out.println("⚠️ Firebase already initialized");
        }
    }
}
