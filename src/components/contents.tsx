// src/components/Contents.tsx
import { fish, fruit, vegetables } from "@/lib/category-list";
import { fetchCategoryRanking } from "@/lib/rakuten-api";
import type { Recipe } from "@/types/recipe";
import { faClock, faYenSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ErrorAlert } from "./error-alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  categoryId: string;
};

export function Contents({ categoryId }: Props) {
  // 食材リスト
  const ingredientList = useMemo(() => [...vegetables, ...fruit, ...fish], []);
  const selected = useMemo(
    () => ingredientList.find((i) => i.id === categoryId),
    [ingredientList, categoryId]
  );

  const {
    data: recipes = [], // Recipe[]
    isLoading,
    isError,
    error,
    refetch, // 再試行用
    isFetching, // 背景再取得中フラグ
  } = useQuery({
    queryKey: ["ranking", categoryId],
    // queryFn には Query が渡す signal を受け取りたいので引数の形に注意
    queryFn: ({ signal }) => {
      if (!selected?.id) return Promise.resolve<Recipe[]>([]);
      return fetchCategoryRanking(selected.id, signal);
    },
    enabled: !!selected?.id, // idがなければ走らない
    // 429等での追加バックオフ（任意）
    retryDelay: (attempt, err: any) => err?.retryAfterMs ?? 500 * 2 ** attempt,
  });

  if (!selected) {
    return <div>カテゴリが見つかりません。</div>;
  }

  if (isLoading) {
    return <div>読み込み中…{/* Skeleton に置き換え可 */}</div>;
  }

  if (isError) {
    return (
      <div className="p-4">
        <ErrorAlert
          message={
            (error as Error)?.message ?? "時間をおいて再度お試しください。"
          }
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <>
      <div className="text-3xl mb-5">
        {selected.name}のレシピ4選！
        {isFetching && (
          <span className="ml-2 text-sm text-muted-foreground">更新中…</span>
        )}
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
        {recipes.map((item) => (
          <Card key={item.recipeId} className="w-[360px] h-[360px]">
            <CardHeader>
              <CardTitle className="line-clamp-2">{item.recipeTitle}</CardTitle>
            </CardHeader>
            <CardContent className="h-full flex justify-center">
              {item.foodImageUrl && (
                <img
                  width={160}
                  height={160}
                  className="object-contain items-center"
                  src={item.foodImageUrl}
                  alt={item.recipeTitle}
                />
              )}
            </CardContent>
            <CardFooter className="flex gap-4 mt-auto text-sm">
              <p>
                <FontAwesomeIcon icon={faClock} />
                {item.recipeIndication ?? "-"}
              </p>
              <p>
                <FontAwesomeIcon icon={faYenSign} />
                {item.recipeCost ?? "-"}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
