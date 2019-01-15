import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  CLEAR_TODOS,
  ADD_POSTS
} from "./actions";
import { tassign } from "tassign";

export interface IAppState {
  todos: any[];
  lastUpdate: Date;
  posts: any[];
}

export const INITIAL_STATE: IAppState = {
  todos: [],
  lastUpdate: null,
  posts: []
};

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case ADD_TODO:
      let newTodo = { id: state.todos.length + 1, title: action.title };

      return tassign(state, {
        todos: state.todos.concat(newTodo),
        lastUpdate: new Date()
      });

    case TOGGLE_TODO:
      let todo = state.todos.find(t => t.id === action.id);
      let index = state.todos.indexOf(todo);

      return tassign(state, {
        todos: [
          ...state.todos.slice(0, index),
          tassign(todo, { isCompleted: !todo.isCompleted }),
          ...state.todos.slice(index + 1)
        ],
        lastUpdate: new Date()
      });

    case REMOVE_TODO:
      return tassign(state, {
        todos: state.todos.filter(t => t.id !== action.id),
        lastUpdate: new Date()
      });

    case CLEAR_TODOS:
      return tassign(state, {
        todos: [],
        lastUpdate: new Date()
      });

    case ADD_POSTS:
      let newPost = { page: action.page, pagePosts: action.posts };

      return tassign(state, { posts: state.posts.concat(newPost) });
  }
  return state;
}
