package com.sfeir.tweet.sender.thread;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.sfeir.tweet.sender.channel.TweetSourceChannel;
import org.springframework.integration.support.MessageBuilder;
import shared.Tweet;
import shared.User;
import twitter4j.*;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.logging.Level;
import java.util.logging.Logger;

public class TwitterCaller implements Runnable {

    private User user;


    private TweetSourceChannel tweetSourceChannel;
    private AtomicInteger counter;
    private static final Logger LOGGER = Logger.getLogger(TwitterCaller.class.getName());
    private Twitter twitter = TwitterFactory.getSingleton();

    public TwitterCaller(TweetSourceChannel tweetSourceChannel, User user) {
        this.user = user;
        this.counter = new AtomicInteger();
        this.tweetSourceChannel = tweetSourceChannel;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public void run() {

/*
        Tweet tweet = new Tweet(this.counter.getAndIncrement(),
                ( this.user.getName() != null) ?  this.user.getName() : "",
                21,
                "hello",
                2002,
                this.user
        );

        for (int i=0;i<100;i++) {
            boolean sended = this.tweetSourceChannel.outputUserTweetData().send(MessageBuilder.withPayload(tweet).setHeader("type", "tweet-data").build());
            try {
                TimeUnit.MILLISECONDS.sleep(500);
            } catch (InterruptedException e) {
                LOGGER.log(Level.WARNING, "Connection is stopped for " + user.getName());
            }
        }
*/


        Query query = new Query("track:" + this.user.getSearchQuery());
        query.setCount(100);
        QueryResult result = this.getTweets(query);

        if (result != null && result.getTweets() != null) {
            for (Status status : result.getTweets()) {
                Tweet tweet = new Tweet(this.counter.getAndIncrement(),
                        (status.getUser().getName() != null) ? status.getUser().getName() : "",
                        status.getUser().getFavouritesCount(),
                        (status.getText() != null) ? status.getText() : "",
                        status.getUser().getFollowersCount(),
                        this.user
                );

                if (!Thread.currentThread().isInterrupted()) {
                    boolean sended = this.tweetSourceChannel.outputUserTweetData().send(MessageBuilder.withPayload(tweet).setHeader("type", "tweet-data").build());

                    if (sended) {
                        LOGGER.log(Level.INFO, "Message is sended to user " + user.getName());
                        try {
                            TimeUnit.MILLISECONDS.sleep(500);
                        } catch (InterruptedException e) {
                            LOGGER.log(Level.WARNING, "Connection is stopped for " + user.getName());
                        }
                    } else LOGGER.log(Level.WARNING, "Message is not sended");
                } else {
                    LOGGER.log(Level.INFO, "Thread is stopped");
                }
            }
        }
    }

    @HystrixCommand(fallbackMethod = "fallbackGetTweets")
    public QueryResult getTweets(Query query) {
        QueryResult queryResult = null;
        try {
            LOGGER.log(Level.INFO, "Twit search");
            queryResult = this.twitter.search(query);
        } catch (TwitterException e) {
            LOGGER.log(Level.WARNING, "Twitter has exception");
        }
        return queryResult;
    }

    public QueryResult fallbackGetTweets(Query query, Throwable throwable){
        LOGGER.log(Level.WARNING, "Twitter is not accessible => managed by fallback method");
        QueryResult queryResult =null;
        return queryResult;
    }


}

