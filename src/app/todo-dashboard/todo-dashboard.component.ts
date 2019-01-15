import { CLEAR_TODOS } from "./../actions";
import { IAppState } from "./../store";
import { NgRedux, select } from "ng2-redux";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-todo-dashboard",
  templateUrl: "./todo-dashboard.component.html",
  styleUrls: ["./todo-dashboard.component.css"]
})
export class TodoDashboardComponent implements OnInit {
  @select() todos;
  @select() lastUpdate;

  constructor(private ngRedux: NgRedux<IAppState>) {}

  clearTodos() {
    this.ngRedux.dispatch({ type: CLEAR_TODOS });
  }
  ngOnInit() {}
}
