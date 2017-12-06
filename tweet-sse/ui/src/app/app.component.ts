import {Component, OnInit} from '@angular/core';
import 'rxjs/Rx';
import {SearchService} from "./service/search.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private searchService: SearchService) {
  }

  setSearchQuery(searchQuery:string){
    this.searchService.setSearchQuery(searchQuery);
  }

}
