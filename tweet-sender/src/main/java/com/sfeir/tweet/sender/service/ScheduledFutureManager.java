package com.sfeir.tweet.sender.service;

import com.sfeir.tweet.sender.channel.TweetSourceChannel;
import com.sfeir.tweet.sender.thread.TwitterCaller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Service;
import shared.User;

import java.util.Date;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class ScheduledFutureManager {
    private ConcurrentHashMap<User, ScheduledFuture> scheduledFutureConcurrentHashMap;
    private ThreadPoolTaskScheduler threadPoolTaskScheduler;
    private TweetSourceChannel tweetSourceChannel;
    private static final Logger LOGGER = Logger.getLogger( ScheduledFutureManager.class.getName() );

    @Autowired
    public ScheduledFutureManager(TweetSourceChannel tweetSourceChannel,ThreadPoolTaskScheduler threadPoolTaskScheduler) {
        this.tweetSourceChannel = tweetSourceChannel;
        this.scheduledFutureConcurrentHashMap = new ConcurrentHashMap<User, ScheduledFuture>();
        this.threadPoolTaskScheduler = threadPoolTaskScheduler;
    }

    public ConcurrentHashMap<User, ScheduledFuture> getScheduledFutureConcurrentHashMap() {
        return scheduledFutureConcurrentHashMap;
    }

    public void setScheduledFutureConcurrentHashMap(ConcurrentHashMap<User, ScheduledFuture> scheduledFutureConcurrentHashMap) {
        this.scheduledFutureConcurrentHashMap = scheduledFutureConcurrentHashMap;
    }

    public void createUserThreadAndAddToList(User user) {
        if(! this.scheduledFutureConcurrentHashMap.containsKey(user)) {
            Date date = new Date();
            ScheduledFuture scheduledFuture = threadPoolTaskScheduler.schedule(new TwitterCaller(tweetSourceChannel, user),date);
            this.scheduledFutureConcurrentHashMap.put(user, scheduledFuture);
            LOGGER.log(Level.INFO,"User connection for "+user.getName()+" is created and added to scheduled future list");
        }
    }


    public void stopUserThread(User user) {
        if (this.scheduledFutureConcurrentHashMap.containsKey(user)) {
            boolean stopped = this.scheduledFutureConcurrentHashMap.get(user).cancel(false);
            this.scheduledFutureConcurrentHashMap.remove(user);
            LOGGER.log(Level.INFO,"User connection for "+user.getName()+" is stopped");
        }

    }

}
