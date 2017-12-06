package com.sfeir.tweet.sse.controller;


import com.sfeir.tweet.sse.channel.TweetSseChannel;
import com.sfeir.tweet.sse.service.SseManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.integration.support.MessageBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import shared.User;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
public class SseController {

    public static Map<User, SseEmitter> sseTranslation = new ConcurrentHashMap<>();
    public static Map<User, SseEmitter> sseWiki = new ConcurrentHashMap<>();


    private static final Logger LOGGER = Logger.getLogger(SseController.class.getName());
    private static final AtomicInteger counter = new AtomicInteger();
    private TweetSseChannel tweetSseChannel;
    private SseManager sseManager;


    @Autowired
    public SseController(TweetSseChannel tweetSseChannel, SseManager sseManager) {
        this.tweetSseChannel = tweetSseChannel;
        this.sseManager = sseManager;
    }

    @CrossOrigin("http://localhost:4200")
    @GetMapping("/api/subscribe/tweet/{key}/{name}/{searchQuery}")
    @ResponseBody
    User tweetStart(@PathVariable int key, @PathVariable String name, @PathVariable String searchQuery) {
        User user = new User(key, name, searchQuery);
        if (this.sseManager.sseContainsUser(user)) {
            LOGGER.log(Level.INFO, "Tweet subscription : /api/subscribe/tweet/{key}/{name}/{searchQuery}");
            tweetSseChannel.outputSubscriptionUserTweet().send(MessageBuilder.withPayload(user).setHeader("type", "create-user").build());
            LOGGER.log(Level.INFO, "User " + name + " subscribed to tweet");
        } else {
            LOGGER.log(Level.WARNING, "User " + name + " not found in the sse list");
        }
        return user;
    }


    @CrossOrigin("http://localhost:4200")
    @GetMapping("/api/stream/{key}/{name}/{searchQuery}")
    @ResponseBody
    SseEmitter streamConnection(@PathVariable String name, @PathVariable String searchQuery, @PathVariable int key) {
        SseEmitter sseEmitter = new SseEmitter(1L);
        User user = new User(key, name, searchQuery);

        if (!this.sseManager.sseContainsUser(user)) {
            LOGGER.log(Level.INFO, "Stream connection is created : /api/stream/{key}/{name}/{searchQuery}");
            sseEmitter = this.sseManager.addAndReturnSseEmitter(user);
            LOGGER.log(Level.INFO, "User " + name + " subscribed");

            sseEmitter.onCompletion(() -> {
                LOGGER.log(Level.INFO, "User " + name + " connection is COMPLETED");
                boolean closed = this.tweetSseChannel.outputSubscriptionUserTweet().send(MessageBuilder.withPayload(user).setHeader("type", "stop-user").build());
                this.sseManager.removeUserFromSseTweet(user);
            });

            sseEmitter.onTimeout(() -> {
                LOGGER.log(Level.INFO, "User " + name + " connection is TIMEOUT");
                boolean closed = this.tweetSseChannel.outputSubscriptionUserTweet().send(MessageBuilder.withPayload(user).setHeader("type", "stop-user").build());
                this.sseManager.removeUserFromSseTweet(user);
            });

        } else {
            LOGGER.log(Level.INFO, "User " + user + " found and returned");
            sseEmitter = this.sseManager.getSseEmitterFromUser(user);
        }

        return sseEmitter;
    }
}
