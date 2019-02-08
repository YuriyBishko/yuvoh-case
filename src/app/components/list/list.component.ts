import { Component, OnInit } from "@angular/core";
import { PostService } from "../../services/post.service";
import { Subscription } from "rxjs";
import { query } from "@angular/animations";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  subscription: Subscription;
  items: Array<any>;
  per_page: Number = 8;
  page: Number = 1;
  total: Number;
  query: String;
  loaded: Boolean = false;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.populateRepos();
    this.initSubscribers();
    this.initStates();
  }
  initStates() {
    this.per_page = this.postService.per_page;
    this.total = this.postService.total;
  }
  initSubscribers() {
    this.postService.data.subscribe(items => {
      if (items) {
        console.log(items);
        this.items = items["items"];
        this.total = items["total_count"];
      }
    });
    this.postService.loaded.subscribe(loaded => {
      this.loaded = loaded;
    });
    this.postService.query.subscribe(query => {
      this.query = query;
    });
  }
  populateRepos(query?) {
    if (!query) {
      query = "";
    }
    let params = {
      page: this.page,
      per_page: this.per_page
    };
    this.loaded = false;
    this.postService.getList(params, query).subscribe();
  }
  counter(i: number) {
    return new Array(i);
  }
  search(query) {
    this.page = 1;
    this.populateRepos(query);
  }

  onPageChange(page) {
    this.page = page;
    this.populateRepos(this.query);
    window.scrollTo(0, 0);
  }
}
