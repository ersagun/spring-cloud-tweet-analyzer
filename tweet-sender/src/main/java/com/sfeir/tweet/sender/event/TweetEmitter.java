package com.sfeir.tweet.sender.event;

import com.sfeir.tweet.sender.channel.TweetSourceChannel;
import com.sfeir.tweet.sender.service.ScheduledFutureManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import shared.User;

import java.util.logging.Logger;

@EnableBinding(TweetSourceChannel.class)
public class TweetEmitter {

    private static final Logger LOGGER = Logger.getLogger( TweetEmitter.class.getName() );
    private ScheduledFutureManager scheduledFutureManager;


    @Autowired
    public TweetEmitter(ScheduledFutureManager scheduledFutureManager) {
        this.scheduledFutureManager = scheduledFutureManager;
    }

    @StreamListener(
            target = TweetSourceChannel.INPUT_SUBSCRIPTION_USER_TWEET, condition = "headers['type']=='create-user'")
    public void createUserConnection(User user) {
        this.scheduledFutureManager.createUserThreadAndAddToList(user);
    }

    @StreamListener(target = TweetSourceChannel.INPUT_SUBSCRIPTION_USER_TWEET, condition = "headers['type']=='stop-user'")
    public void stopTweet(User user) {
        this.scheduledFutureManager.stopUserThread(user);
    }






}

