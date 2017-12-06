package com.sfeir.tweet.analyzer.event;


import com.google.cloud.language.v1.Sentiment;
import com.sfeir.tweet.analyzer.channel.TweetAnalyzerChannel;
import com.sfeir.tweet.analyzer.service.GoogleSentimentAnalyzer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.messaging.handler.annotation.SendTo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.GroupedFlux;
import reactor.core.publisher.Mono;
import shared.Tweet;
import shared.TweetStats;
import shared.User;

import java.time.Duration;
import java.util.logging.Level;
import java.util.logging.Logger;

@EnableBinding(TweetAnalyzerChannel.class)
public class TweetSentimentEmitter {
    private static final Logger LOGGER = Logger.getLogger(TweetSentimentEmitter.class.getName());
    private GoogleSentimentAnalyzer googleSentimentAnalyzer;

    @Autowired
    public TweetSentimentEmitter(GoogleSentimentAnalyzer googleSentimentAnalyzer) {
        this.googleSentimentAnalyzer = googleSentimentAnalyzer;
    }


    @StreamListener(target = TweetAnalyzerChannel.INPUT_USER_TWEET_DATA)
    @SendTo(TweetAnalyzerChannel.OUTPUT_USER_TWEET_STATS_DATA)
    public Flux<TweetStats> calculateSentimentsForTweets(Flux<Tweet> tweet) {
        return tweet.log().window(Duration.ofSeconds(10), Duration.ofSeconds(10))
                .flatMap(window -> window.groupBy(tweetValue -> tweetValue.getUser().getId())
                        .flatMap(groupTweet -> this.calculateAverageSentimentForTweets(groupTweet)));
    }


    private Mono<TweetStats> calculateAverageSentimentForTweets(GroupedFlux<Integer, Tweet> group) {
        LOGGER.log(Level.INFO, "calculate average sentiment for tweets");
        return group
                .reduce(new TweetStats(0, 0, 0f, 0f, new User()), (ts, d) -> {
                    Sentiment sentiment = this.googleSentimentAnalyzer.sentimentAnalyzer(d.getText());
                    return new TweetStats(d.getUser().getId(), ts.getNbTweet() + 1, sentiment.getScore(), sentiment.getMagnitude(), d.getUser());
                }).map(accumulator -> new TweetStats(accumulator.getId(), accumulator.getNbTweet(), (accumulator.getScore() / accumulator.getNbTweet()), (accumulator.getMagnitude() / accumulator.getNbTweet()), accumulator.getUser()));
    }
}
