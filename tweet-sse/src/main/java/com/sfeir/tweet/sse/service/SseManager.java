package com.sfeir.tweet.sse.service;

//import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import shared.Tweet;
import shared.TweetStats;
import shared.User;

import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class SseManager {
    private volatile Map<User, SseEmitter> sseTweet;

    private static final Logger LOGGER = Logger.getLogger(SseManager.class.getName());

    public SseManager() {
        this.sseTweet = Collections.synchronizedMap(new ConcurrentHashMap<User, SseEmitter>());
    }


    public Map<User, SseEmitter> getSseTweet() {
        return sseTweet;
    }

    public void setSseTweet(Map<User, SseEmitter> sseTweet) {
        this.sseTweet = sseTweet;
    }


    public  SseEmitter addAndReturnSseEmitter(User user) {
        SseEmitter sseEmitter = new SseEmitter(600 * 1000L);
        sseTweet.put(user, sseEmitter);
        return sseEmitter;
    }

    public  SseEmitter getSseEmitterFromUser(User user) {
        return sseTweet.get(user);
    }


    public  void removeUserFromSseTweet(User user) {
        if(this.sseContainsUser(user)) {
            LOGGER.log(Level.INFO,"User is removed from sset tweet list");
            this.sseTweet.get(user).complete();
            this.sseTweet.remove(user);
        }
    }

    @HystrixCommand(fallbackMethod = "fallbackSendTweetToSseUser")
    public void sendTweetToSseUser(Tweet tweet){
        if(this.sseTweet.containsKey(tweet.getUser())) {
            try {
                LOGGER.log(Level.INFO, "Tweet are sending to " + tweet.getUser().getName());
                this.sseTweet.get(tweet.getUser()).send(tweet);
            } catch (Exception e) {
                throw new RuntimeException("Simulating downstream system failure");
            }
        }
    }

    public void fallbackSendTweetToSseUser(Tweet tweet, Throwable throwable) {
        LOGGER.log(Level.INFO, "User "+tweet.getUser()+ "'s connection is broken. Failure catched by circuit breaker, message is not sended to "+ tweet.getUser().getId());
    }


    @HystrixCommand(fallbackMethod = "fallbackSendTweetStatsToSseUser")
    public  void sendTweetStatsToSseUser(TweetStats tweetStats){
        if(this.sseTweet.containsKey(tweetStats.getUser())) {
            try {
                LOGGER.log(Level.INFO, "Tweet Stats are sending to " + tweetStats.getUser().getName());
                this.sseTweet.get(tweetStats.getUser()).send(tweetStats);
            } catch (Exception e) {
                throw new RuntimeException("Simulating downstream system failure");
            }
        }
    }

    public void fallbackSendTweetStatsToSseUser(TweetStats tweetStats, Throwable throwable) {
        LOGGER.log(Level.INFO, "User "+tweetStats.getUser()+ "'s connection is broken. Failure catched by circuit breaker, message is not sended to "+ tweetStats.getUser().getId());
    }

    public  boolean sseContainsUser(User user) {
        return this.sseTweet.containsKey(user);
    }
}
