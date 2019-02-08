import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Subject, BehaviorSubject } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PostService {
  // eventChanged = new Subject<Object>();
  public data = new BehaviorSubject(null);
  public loaded = new Subject<Boolean>();
  public query = new Subject<String>();
  per_page: Number = 8;
  page: Number = 1;
  total: Number;
  constructor(private http: HttpClient) {}

  getList(params?, query?) {
    if (!query) {
      query = "{query}";
    }
    // ?q={query}&page={page_number}&per_page={results_per_page}

    this.loaded.next(false);
    const url = `https://api.github.com/search/repositories?q=${query}`;

    return this.http.get(url, { params: params }).pipe(
      map(res => {
        this.query.next(query);
        this.loaded.next(true);
        this.data.next(res);
      }),
      catchError(err => of([]))
    );
  }
}
