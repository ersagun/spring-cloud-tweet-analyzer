webpackJsonp([1,5],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_search_service__ = __webpack_require__(67);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TweetComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TweetComponent = (function () {
    function TweetComponent(http, route, searchService) {
        this.http = http;
        this.route = route;
        this.searchService = searchService;
        this.EventSource = window['EventSource'];
        this.tweets = [];
        this.tweetStats = [];
        this.tweetObservable;
        this.tweetStatsObservable = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(this.tweetStats);
        this.zone = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["N" /* NgZone */]({ enableLongStackTrace: false });
    }
    TweetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchService.searchQuery.subscribe(function (searchQuery) {
            if (_this.searchService.key && _this.searchService.name && searchQuery) {
                _this.tweets = [];
                _this.tweetStats = [];
                _this.tweetObservable = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(_this.tweets);
                _this.tweetStatsObservable = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(_this.tweetStats);
                _this.score = 0;
                _this.magnitude = 0;
                _this.eventSource = new _this.EventSource(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].url + "/api/stream/" + _this.searchService.key + "/" + _this.searchService.name + "/" + searchQuery);
                if (_this.eventSource) {
                    // this.getTweetStream();
                    // this.getTweetStatsStream();
                    _this.eventSource.onmessage = function (event) {
                        _this.zone.run(function () {
                            _this.getTweetStream(event) ? _this.tweetObservable = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].of(_this.tweets) : null;
                            _this.getTweetStatsStream(event);
                        });
                    };
                    _this.eventSource.oncomplete = function () {
                        _this.eventSource.close();
                    };
                    _this.eventSource.onerror = function (error) {
                        _this.eventSource.close();
                    };
                    _this.eventSource.onopen = function (open) { return _this.http.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].url + "/api/subscribe/tweet/" + _this.searchService.key + "/" + _this.searchService.name + "/" + searchQuery).subscribe(function (user) { return console.log(user); }); };
                }
            }
        });
    };
    TweetComponent.prototype.getTweetStream = function (event) {
        var tweet = JSON.parse(event.data);
        if (tweet.user && tweet.text) {
            this.tweets.push(tweet);
            return true;
        }
        else
            return false;
    };
    TweetComponent.prototype.getTweetStatsStream = function (event) {
        var tweetStats = JSON.parse(event.data);
        if (tweetStats.magnitude && tweetStats.score) {
            this.tweetStats.push(tweetStats);
            if (tweetStats.score && tweetStats.magnitude) {
                this.score = tweetStats.score;
                this.magnitude = tweetStats.magnitude;
            }
        }
    };
    TweetComponent.prototype.beforeunloadHandler = function () {
        this.eventSource.close();
    };
    TweetComponent.prototype.ngOnDestroy = function () {
        this.eventSource.close();
    };
    return TweetComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* HostListener */])('window:unload', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TweetComponent.prototype, "beforeunloadHandler", null);
TweetComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'app-tweet',
        template: __webpack_require__(312),
        styles: [__webpack_require__(306)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__service_search_service__["a" /* SearchService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__service_search_service__["a" /* SearchService */]) === "function" && _c || Object])
], TweetComponent);

var _a, _b, _c;
//# sourceMappingURL=tweet.component.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    url: "http://localhost:8080",
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 237:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 237;


/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(111);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tweet_tweet_component__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__tweet_tweet_component__["a" /* TweetComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_search_service__ = __webpack_require__(67);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(searchService) {
        this.searchService = searchService;
    }
    AppComponent.prototype.setSearchQuery = function (searchQuery) {
        this.searchService.setSearchQuery(searchQuery);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(311),
        styles: [__webpack_require__(305)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__service_search_service__["a" /* SearchService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__service_search_service__["a" /* SearchService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_routing_module__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tweet_tweet_component__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_gauge__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_search_service__ = __webpack_require__(67);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__tweet_tweet_component__["a" /* TweetComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_6__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_8_ngx_gauge__["a" /* NgxGaugeModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_9__service_search_service__["a" /* SearchService */]
        ],
        exports: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(36)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(36)(false);
// imports


// module
exports.push([module.i, ".scrollit { height: 90vh; overflow-y:scroll; }\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 311:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar sticky-top navbar-light navbar-collapse p-0 align-self-center w-100\">\n  <div class=\"row w-100 no-gutters\" style=\"background-color: rgb(230, 195, 0)\">\n    <div class=\"col-sm-3 align-self-center\">\n      <a class=\"navbar-brand\" href=\"#\">\n        <img src=\"/assets/twitter.svg\" height=\"15\" class=\" align-self-center pl-3\" alt=\"\">\n        Tweet Sentiment Analyzer\n      </a>\n    </div>\n    <div class=\"col-sm-6 align-self-center\">\n      <input class=\"form-control form-control-sm\" type=\"text\" (keyup.enter)=\"setSearchQuery(item.value);\" #item\n             placeholder=\"Search subject\">\n    </div>\n    <div class=\"col-sm-3 align-self-center\">\n      <img src=\"/assets/sfeir-logo.png\" height=\"40\" class=\"align-self-center float-right pr-3\" alt=\"\">\n    </div>\n  </div>\n</nav>\n\n<div class=\"container-fluid\">\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ 312:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" >\n  <div class=\"col-sm-6 jumbotron scrollit p-2\">\n    <h3 class=\"display-5 text-center\">User tweets</h3>\n    <hr class=\"my-4\">\n    <div class=\"row\" *ngIf=\"(tweetObservable | async)?.length > 0 \">\n      <div class=\"card w-100 p-2\" *ngFor=\"let tweet of (tweetObservable | async)\" >\n        <div class=\"card-block p-3\">\n          <h4 class=\"card-title\">{{tweet?.name}}</h4>\n          <h6 class=\"card-subtitle mb-2 text-muted\">Number of followers : {{tweet?.numberOfFollower}}</h6>\n          <p class=\"card-text\">{{tweet?.text}}</p>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row\" *ngIf=\"! (tweetObservable | async) \">\n      <div class=\"card w-100 p-2\">\n        <div class=\"card-block align-self-center\">\n          <h4 class=\"card-title\">Welcome to Tweet Sentiment Analyzer</h4>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row\" *ngIf=\"(tweetObservable | async)?.length <= 0 && (tweetObservable | async) \">\n      <div class=\"card w-100 p-2\">\n        <div class=\"card-block align-self-center\">\n          <h4 class=\"card-title\">No tweet for this subject</h4>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n  <div class=\"col-sm-6 jumbotron p-2\">\n    <h3 class=\"display-5 text-center\">User sentiments</h3>\n    <hr class=\"my-4\">\n    <div class=\"row justify-content-center align-self-center w-100 p-2\">\n      <ngx-gauge size=\"240\" type=\"full\" thick=\"2\" min=\"-0.5\" max=\"0.5\" value={{score}} cap=\"round\" label=\"Score\" append=\"%\" foregroundColor=\"#ffcc66\" backgroundColor=\"#EEE\">\n      </ngx-gauge>\n    </div>\n    <div class=\"row justify-content-center w-100 p-2\">\n      <ngx-gauge size=\"240\" type=\"full\" thick=\"2\" min=\"0\" max=\"10\" value={{magnitude}} cap=\"round\" label=\"Magnitude\" append=\"%\" foregroundColor=\"#ffcc66\" backgroundColor=\"#EEE\">\n      </ngx-gauge>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(238);


/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchService = (function () {
    function SearchService() {
        this.name = "leo";
        var strKey = Date.now() + Math.random() + "";
        this.key = parseInt(strKey.substr(0, 10));
        this.searchQuery = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    SearchService.prototype.setSearchQuery = function (searchQuery) {
        this.searchQuery.next(searchQuery);
    };
    return SearchService;
}());
SearchService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], SearchService);

//# sourceMappingURL=search.service.js.map

/***/ })

},[592]);
//# sourceMappingURL=main.bundle.js.map