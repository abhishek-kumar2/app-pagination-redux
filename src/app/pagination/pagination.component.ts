import { ADD_POSTS } from "./../actions";
import { NgRedux, select } from "ng2-redux";
import { DataService } from "./../services/data.service";
import { Component, OnInit } from "@angular/core";
import { IAppState } from "../store";
import { Observable } from "rxjs";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent implements OnInit {
  pages: number[];
  limit = 10;
  totalPage = 10;
  posts: any[] = [];
  selectedPage = 0;
  pageError = null;

  constructor(
    private dataService: DataService,
    private ngRedux: NgRedux<IAppState>
  ) {
    this.pages = Array(this.totalPage)
      .fill(0)
      .map((x, i) => i);

    this.getPostOfPage(this.pages[0]);
  }

  getPostOfPage(page) {
    let p = this.ngRedux.getState().posts;
    let postOfPage = p.filter(p => p.page == page);
    this.selectedPage = page;

    if (postOfPage.length < 1) {
      this.dataService.getPosts(page * this.limit, this.limit).subscribe(
        response => {
          this.posts = response as Array<{}>;
          this.ngRedux.dispatch({
            type: ADD_POSTS,
            page: page,
            posts: this.posts
          });
        },
        error => (this.pageError = error.message)
      );
    } else {
      this.posts = postOfPage[0].pagePosts;
    }
  }

  ngOnInit() {}
}
