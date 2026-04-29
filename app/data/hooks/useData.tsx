"use client";

import { useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { reducer } from "../utils/reducer";

export function useData() {
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

  useEffect(() => {
    const sessionStorageData = sessionStorage.getItem("data");
    if (!sessionStorageData) {
      router.push("/");
      return;
    }
    const data = JSON.parse(sessionStorageData);
    dispatch({
      type: "init",
      payload: {
        data: data.returnedData,
        filteredData: data.returnedData,
        skippedFields: data.skippedFields,
      },
    });
    dispatch({ type: "setLoading", payload: false });
  }, [router]);

  return {
    data: state.data,
    filteredData: state.filteredData,
    skippedFields: state.skippedFields,
    isLoading: state.isLoading,
    setSearch: (
      value: string,
      selectedItem: "default" | "counterparty" | "description"
    ) => {
      dispatch({
        type: "setSearch",
        payload: { value, selectedItem },
      });
    },
    setCategory: (value: "default" | "profit" | "exprenses") => {
      dispatch({
        type: "setCategory",
        payload: { value },
      });
    },
    setLoading: (value: boolean) =>
      dispatch({
        type: "setLoading",
        payload: value,
      }),
  };
}
