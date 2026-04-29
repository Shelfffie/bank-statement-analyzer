import { Action, State } from "@/app/_utils/types";
import { filterByItem, searchFilter } from "./statement";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "init":
      return {
        ...state,
        data: action.payload.data,
        skippedFields: action.payload.skippedFields,
        filteredData: action.payload.filteredData,
      };
    case "setSearch": {
      const search = action.payload.value;
      const selectedItem = action.payload.selectedItem;

      let result = state.data;
      result = filterByItem(state.category, result);
      result = searchFilter(search, result, selectedItem);
      return {
        ...state,
        filteredData: result,
        search: search,
        selectedItem: selectedItem,
      };
    }
    case "setCategory": {
      const category = action.payload.value;

      let result = state.data;
      result = filterByItem(category, result);
      result = searchFilter(state.search, result, state.selectedItem);

      return {
        ...state,
        filteredData: result,
        category: category,
      };
    }
    case "setLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
