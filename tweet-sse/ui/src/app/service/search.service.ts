import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class SearchService {

  key: number;
  name: string;
  searchQuery: Subject<string>;

  constructor() {
    this.name="leo";

    let strKey = Date.now() + Math.random()+"";
    this.key = parseInt(strKey.substr(0,10));
    this.searchQuery = new Subject<string>();
  }


  setSearchQuery(searchQuery:string){
    this.searchQuery.next(searchQuery);
  }

}
