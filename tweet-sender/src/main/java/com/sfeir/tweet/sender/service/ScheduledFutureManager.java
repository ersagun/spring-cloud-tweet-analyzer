package com.sfeir.tweet.sender.service;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
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


    // @HystrixCommand(fallbackMethod = "fallbackCreateUserThreadAndAddToList")
    @HystrixCommand(fallbackMethod = "fallbackCreateUserThreadAndAddToList",commandProperties = {@HystrixProperty(name="execution.isolation.thread.timeoutInMilliseconds", value="10000")})
    public void createUserThreadAndAddToList(User user) {
        if(! this.scheduledFutureConcurrentHashMap.containsKey(user)) {
            Date date = new Date();
            ScheduledFuture scheduledFuture = threadPoolTaskScheduler.schedule(new TwitterCaller(tweetSourceChannel, user),date);
            this.scheduledFutureConcurrentHashMap.put(user, scheduledFuture);
            LOGGER.log(Level.INFO,"User connection for "+user.getName()+" is created and added to scheduled future list");
        } // else throw  new RuntimeException("Connection is already exist for user " + user.getName());
    }

    public void fallbackCreateUserThreadAndAddToList(User user, Throwable throwable){
        LOGGER.log(Level.WARNING, "Thread creation and storage of user " + user.getName()+"  failed. Operation is catched by circuit breaker: " +throwable.toString());
        this.stopUserThread(user);
    }

    @HystrixCommand(fallbackMethod = "fallbackStopUserThread")
    public void stopUserThread(User user) {
        if (this.scheduledFutureConcurrentHashMap.containsKey(user)) {
            boolean stopped = this.scheduledFutureConcurrentHashMap.get(user).cancel(false);
            this.scheduledFutureConcurrentHashMap.remove(user);
            LOGGER.log(Level.INFO,"User connection for "+user.getName()+" is stopped");
        }else throw new RuntimeException("User not found");

    }

   public void fallbackStopUserThread(User user, Throwable throwable){
       LOGGER.log(Level.WARNING,"User connection for "+user.getName()+" is not found in the list. Detected by circuit breaker: "+ throwable.toString());
    }
}
