package com.sfeir.tweet.analyzer.channel;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.SubscribableChannel;

public interface TweetAnalyzerChannel {

    String INPUT_USER_TWEET_DATA = "input-user-tweet-data";
    @Input(TweetAnalyzerChannel.INPUT_USER_TWEET_DATA)
    SubscribableChannel inputUserTweetData();


    String OUTPUT_USER_TWEET_STATS_DATA = "output-user-tweet-stats-data";
    @Output(TweetAnalyzerChannel.OUTPUT_USER_TWEET_STATS_DATA)
    MessageChannel outputUserTweetStatsData();

}
