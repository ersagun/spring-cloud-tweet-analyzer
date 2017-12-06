package com.sfeir.tweet.sse.event;

import com.sfeir.tweet.sse.channel.TweetSseChannel;
import com.sfeir.tweet.sse.service.SseManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import shared.Tweet;
import shared.TweetStats;

import java.util.logging.Logger;

@EnableBinding(TweetSseChannel.class)
public class TweetLogger {

    private static final Logger LOGGER = Logger.getLogger(TweetLogger.class.getName());
    private final TweetSseChannel tweetSseChannel;
    private SseManager sseManager;

    @Autowired
    public TweetLogger(TweetSseChannel tweetSseChannel, SseManager sseManager) {
        this.tweetSseChannel = tweetSseChannel;
        this.sseManager = sseManager;
    }


    @StreamListener(target = TweetSseChannel.INPUT_USER_TWEET_DATA, condition = "headers['type']=='tweet-data'")
    public void sendTweetToSee(Tweet tweet) {
        this.sseManager.sendTweetToSseUser(tweet);
    }

    @StreamListener(TweetSseChannel.INPUT_USER_TWEET_STATS_DATA)
    public void sendTweetStatsToSee(TweetStats tweetStats) {
        this.sseManager.sendTweetStatsToSseUser(tweetStats);
    }
}
