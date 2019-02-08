import { Component, OnInit } from "@angular/core";

import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ListComponent } from "../list/list.component";
import { PostService } from "../../services/post.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  private subject: Subject<string> = new Subject();
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.subject.pipe(debounceTime(500)).subscribe(searchTextValue => {
      let params = {
        page: 1,
        per_page: this.postService.per_page
      };
      let query = searchTextValue.replace(/ /g, "+");
      this.postService.getList(params, query).subscribe();
    });
  }
  onKeyUp(searchTextValue: string) {
    this.subject.next(searchTextValue);
  }
}
