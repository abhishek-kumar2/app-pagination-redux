import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DataService {
  posts: any[];

  constructor(private http: HttpClient) {}

  getPosts(page: number, limit: number) {
    return this.http
      .get(
        `http://jsonplaceholder.typicode.com/posts?_start=${page}&_limit=${limit}`
      )
      .map(response => response);
  }
}
