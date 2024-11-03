import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import {
  actGetCategories,
  categoriesCleanUp,
} from "@store/categories/categoriesSlice";
export default function useCategories() {
  const { records, error, loading } = useAppSelector(
    (state) => state.categories
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(actGetCategories());

    return () => {
      dispatch(categoriesCleanUp());
      promise.abort();
    };
  }, [dispatch]);
  return { records, error, loading };
}
