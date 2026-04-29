import { Action, State } from "@/app/_utils/types";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setData":
      return {
        ...state,
        data: action.payload,
      };
    case "setSearch":
      return {
        ...state,
        search: action.payload,
      };
    case "setCategory":
      return {
        ...state,
        category: action.payload,
      };
    case "resetFilters":
      return {
        ...state,
        search: "",
        category: null,
      };
    default:
      return state;
  }
}
