# AppToDoReDux

Angular Redux containt management:

1. npm install ng2-redux redux rxjs@6.2.2 rxjs-compat@6.2.2 tassign

2. in app folder crate actions.ts => export const keywords
   e.g.
   export const ADD_TODO = "ADD_TODO";
   export const REMOVE_TODO = "REMOVE_TODO"

3. in app folder crate store.ts => assign app state interface, initial state and rootReducer
   e.g.
   import { ADD_TODO, REMOVE_TODO ....} from "./actions";
   import { tassign } from "tassign";

   export interface IAppState {
   todos: any[];
   lastUpdate: Date;
   }

   export const INITIAL_STATE: IAppState = {
   todos: [],
   lastUpdate: null
   };

   export function rootReducer(state: IAppState, action): IAppState {
   switch (action.type) {
   case ADD_TODO:
   let newTodo = { id: state.todos.length + 1, title: action.title };
   return tassign(state, {
   todos: state.todos.concat(newTodo),
   lastUpdate: new Date()
   });
   ....
   }
   return state;
   }

4. in app.module.ts => import esentials, dev mode, constructor's setting INITIAL_STATE of rootReducer
   e.g.
   import { IAppState, rootReducer, INITIAL_STATE } from "./store";
   import { NgModule, isDevMode } from "@angular/core";
   import { NgRedux, NgReduxModule, DevToolsExtension } from "ng2-redux";
   ...
   imports: [.... NgReduxModule ]
   ...
   export class AppModule {
   constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension) {
   let enhancers = isDevMode() ? [devTools.enhancer()] : [];
   ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
   }
   }

5. main part to use and dispatch redux contains
   1st use @select interface elements, that we can directly in templates
   2nd dispatch to push data that controled by stor.ts with the help of switch case
   e.g.
   todo-list.component.ts
   import { ADD_TODO, REMOVE_TODO } from "./../actions";
   import { IAppState } from "./../store";
   import { NgRedux, select } from "ng2-redux";

   ....

   export class TodoListComponent {
   @select() todos;
   @select() lastUpdate;
   constructor(private ngRedux: NgRedux<IAppState>){}
   addTodo(input){
   if (!input.value) return;
   this.ngRedux.dispatch({ type: ADD_TODO, title: input.value });
   input.value = "";
   }
   ....
   }

   todo-list.component.html
   ....
   <input type="text" #title><button (click)="addTodo(title)">Add</button>
   ....

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
