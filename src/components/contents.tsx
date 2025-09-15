// src/components/Contents.tsx
import { fish, fruit, vegetables } from "@/lib/category-list";

import { useEffect, useMemo, useState } from "react";

import { SelectList } from "./select-list";
import { ShowRecipe } from "./show-recipe";

export function Contents() {
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    // 描画時に初期値を設定
    setCategoryId("12-447");
  }, []);

  // 食材リスト
  const ingredientList = useMemo(() => [...vegetables, ...fruit, ...fish], []);
  const selected = useMemo(
    () => ingredientList.find((i) => i.id === categoryId),
    [ingredientList, categoryId]
  );

  return (
    <>
      <SelectList setCategoryId={setCategoryId} />
      <ShowRecipe selected={selected} categoryId={categoryId} />
    </>
  );
}
