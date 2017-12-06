import {Component, HostListener, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Tweet} from "../model/tweet";
import {environment} from "../../environments/environment";
import {TweetStats} from "../model/tweetStats";
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import {SearchService} from "../service/search.service";

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit, OnDestroy {

  tweets: Tweet[];
  tweetStats: TweetStats[];
  //tweets: Observable<Tweet>;
  //tweetsObserver: Observer<Tweet>;

  tweetObservable: Observable<Tweet[]>;
  tweetStatsObservable: Observable<TweetStats[]>;
  EventSource: any = window['EventSource'];
  eventSource: any;
  zone: NgZone;
  score: number;
  magnitude: number;


  constructor(private http: Http, private route: ActivatedRoute, private searchService: SearchService) {
    this.tweets = [];
    this.tweetStats = [];
    this.tweetObservable;
    this.tweetStatsObservable = Observable.of(this.tweetStats);
    this.zone = new NgZone({enableLongStackTrace: false});
  }

  ngOnInit(): void {
    this.searchService.searchQuery.subscribe(searchQuery => {

      if (this.searchService.key && this.searchService.name && searchQuery) {
        this.tweets = [];
        this.tweetStats = [];
        this.tweetObservable= Observable.of(this.tweets);
        this.tweetStatsObservable = Observable.of(this.tweetStats);
        this.score=0;
        this.magnitude=0;
        this.eventSource = new this.EventSource(environment.url + "/api/stream/" + this.searchService.key + "/" + this.searchService.name + "/" + searchQuery);
        if (this.eventSource) {
          // this.getTweetStream();
          // this.getTweetStatsStream();

          this.eventSource.onmessage = (event) => {

            this.zone.run(() => {
              this.getTweetStream(event) ? this.tweetObservable = Observable.of(this.tweets) : null;
              this.getTweetStatsStream(event);
            });
          };

          this.eventSource.oncomplete = () => {
            this.eventSource.close();
          };
          this.eventSource.onerror = (error) => {
            this.eventSource.close();
          };

          this.eventSource.onopen = (open) => this.http.get(environment.url + "/api/subscribe/tweet/" + this.searchService.key + "/" + this.searchService.name + "/" + searchQuery).subscribe(user => console.log(user));
        }
      }

    });
  }


  getTweetStream(event): boolean {
    let tweet: Tweet = JSON.parse(event.data);
    if (tweet.user && tweet.text) {
      this.tweets.push(tweet);
      return true;
    } else return false;
  }

  getTweetStatsStream(event) {
    let tweetStats: TweetStats = JSON.parse(event.data);
    if (tweetStats.magnitude && tweetStats.score) {
      this.tweetStats.push(tweetStats);
      if (tweetStats.score && tweetStats.magnitude) {
        this.score = tweetStats.score;
        this.magnitude = tweetStats.magnitude;
      }
    }
  }

  @HostListener('window:unload', ['$event'])
  beforeunloadHandler() {
    this.eventSource.close();
  }

  ngOnDestroy(): void {
    this.eventSource.close();
  }
}
