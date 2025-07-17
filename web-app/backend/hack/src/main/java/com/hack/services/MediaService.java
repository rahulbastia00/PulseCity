package com.hack.services;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.cloud.speech.v1.SpeechRecognitionResult;
import com.google.cloud.speech.v1.SpeechSettings;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import com.google.protobuf.ByteString;

@Service
public class MediaService {
	
	public String uploadToFirebase(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Bucket bucket = StorageClient.getInstance().bucket();
        bucket.create(fileName, file.getInputStream(), file.getContentType());
        return String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media",
                bucket.getName(), URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }

public String audioToText(MultipartFile audioFile) throws IOException {
    // Load the same service account key
    GoogleCredentials credentials = GoogleCredentials
        .fromStream(new ClassPathResource("serviceAccountKey.json").getInputStream());

    SpeechSettings speechSettings = SpeechSettings.newBuilder()
        .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
        .build();

    try (SpeechClient speechClient = SpeechClient.create(speechSettings)) {
        ByteString audioBytes = ByteString.readFrom(audioFile.getInputStream());

        RecognitionConfig config = RecognitionConfig.newBuilder()
                .setEncoding(RecognitionConfig.AudioEncoding.MP3)
                .setLanguageCode("en-US")
                .build();

        RecognitionAudio audio = RecognitionAudio.newBuilder()
                .setContent(audioBytes)
                .build();

        RecognizeResponse response = speechClient.recognize(config, audio);
        StringBuilder transcript = new StringBuilder();
        for (SpeechRecognitionResult result : response.getResultsList()) {
            transcript.append(result.getAlternatives(0).getTranscript());
        }

        return transcript.toString();
//    }
//		 try (SpeechClient speechClient = SpeechClient.create()) {
//
//		      // The path to the audio file to transcribe
//		      String gcsUri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw";
//
//		      // Builds the sync recognize request
//		      RecognitionConfig config =
//		          RecognitionConfig.newBuilder()
//		              .setEncoding(AudioEncoding.LINEAR16)
//		              .setSampleRateHertz(16000)
//		              .setLanguageCode("en-US")
//		              .build();
//		      RecognitionAudio audio = RecognitionAudio.newBuilder().setUri(gcsUri).build();
//
//		      // Performs speech recognition on the audio file
//		      RecognizeResponse response = speechClient.recognize(config, audio);
//		      List<SpeechRecognitionResult> results = response.getResultsList();
//
//		      for (SpeechRecognitionResult result : results) {
//		        // There can be several alternative transcripts for a given chunk of speech. Just use the
//		        // first (most likely) one here.
//		        SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
//		        System.out.printf("Transcription: %s%n", alternative.getTranscript());
	}
	}
}
