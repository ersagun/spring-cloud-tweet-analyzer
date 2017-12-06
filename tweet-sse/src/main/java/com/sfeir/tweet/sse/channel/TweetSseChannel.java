package com.sfeir.tweet.sse.channel;


import org.springframework.cloud.stream.annotation.Input;
import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.SubscribableChannel;

public interface TweetSseChannel {

    String OUTPUT_SUBSCRIPTION_USER_TWEET = "output-subscription-user-tweet";
    @Output(TweetSseChannel.OUTPUT_SUBSCRIPTION_USER_TWEET)
    MessageChannel outputSubscriptionUserTweet();

    String INPUT_USER_TWEET_DATA = "input-user-tweet-data";
    @Input(TweetSseChannel.INPUT_USER_TWEET_DATA)
    SubscribableChannel inputUserTweetData();


    String INPUT_USER_TWEET_STATS_DATA = "input-user-tweet-stats-data";
    @Input(TweetSseChannel.INPUT_USER_TWEET_STATS_DATA)
    SubscribableChannel inputUserTweetStatsData();


}
