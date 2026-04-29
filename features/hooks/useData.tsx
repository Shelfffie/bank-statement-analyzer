"use client";

import { useCallback, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { reducer } from "../statements/reducer";

export function useData(id: string) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, {
    data: [],
    filteredData: [],
    skippedFields: [],
    isLoading: true,
    search: "",
    selectedItem: "default",
    category: "default",
  });

  function loadDataFromStorage(id: string) {
    const raw = sessionStorage.getItem(decodeURIComponent(id));
    if (!raw) return null;

    return JSON.parse(raw);
  }

  useEffect(() => {
    const data = loadDataFromStorage(id);
    if (!data) {
      router.push("/");
      return;
    }
    dispatch({
      type: "init",
      payload: {
        data: data.data,
        filteredData: data.data,
        skippedFields: data.skippedFields,
      },
    });
    dispatch({ type: "setLoading", payload: false });
  }, [router, id]);

  return {
    data: state.data,
    filteredData: state.filteredData,
    skippedFields: state.skippedFields,
    isLoading: state.isLoading,
    setSearch: useCallback(
      (
        value: string,
        selectedItem: "default" | "counterparty" | "description"
      ) => {
        dispatch({
          type: "setSearch",
          payload: { value, selectedItem },
        });
      },
      []
    ),
    setCategory: useCallback((value: "default" | "profit" | "expenses") => {
      dispatch({
        type: "setCategory",
        payload: { value },
      });
    }, []),
    setLoading: (value: boolean) =>
      dispatch({
        type: "setLoading",
        payload: value,
      }),
  };
}
