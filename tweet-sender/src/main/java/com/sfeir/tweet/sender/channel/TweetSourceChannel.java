package com.sfeir.tweet.sender.channel;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.cloud.stream.annotation.Output;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.SubscribableChannel;

public interface TweetSourceChannel {
    String OUTPUT_USER_TWEET_DATA = "output-user-tweet-data";
    @Output(TweetSourceChannel.OUTPUT_USER_TWEET_DATA)
    MessageChannel outputUserTweetData();


    String INPUT_SUBSCRIPTION_USER_TWEET = "input-subscription-user-tweet";
    @Input(TweetSourceChannel.INPUT_SUBSCRIPTION_USER_TWEET)
    SubscribableChannel inputSubscriptionUserTweet();
}
