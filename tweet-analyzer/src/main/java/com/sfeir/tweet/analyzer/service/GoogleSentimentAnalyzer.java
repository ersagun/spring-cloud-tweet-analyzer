package com.sfeir.tweet.analyzer.service;

import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import org.springframework.stereotype.Service;

import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class GoogleSentimentAnalyzer {
    private static final Logger LOGGER = Logger.getLogger(GoogleSentimentAnalyzer.class.getName());

    public Sentiment sentimentAnalyzer(String text) {
        Sentiment sentiment = null;

        try (LanguageServiceClient language = LanguageServiceClient.create()) {
            Document doc = Document.newBuilder()
                    .setContent(text).setType(Document.Type.PLAIN_TEXT).build();
            // Detects the sentiment of the text
            sentiment = language.analyzeSentiment(doc).getDocumentSentiment();
            if (sentiment == null)
                System.out.println("sentiment not found");

        } catch (Exception e) {
            LOGGER.log(Level.WARNING, "Seniment analyzer has a problem to analyze :" + text);
        }
        return sentiment;
    }

}
