import { fetchCategoryRanking } from "@/lib/rakuten-api";
import type { Recipe } from "@/types/recipe";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faBowlRice,
  faClock,
  faUpRightFromSquare,
  faYenSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { TwitterShareButton } from "react-share";
import { ErrorAlert } from "./error-alert";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Props = {
  selected: { id: string; name: string } | undefined;
  categoryId: string;
};

export function ShowRecipe({ selected, categoryId }: Props) {
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

  // 楽天レシピへ遷移
  const goToRakutenRecipe = (url: string) => {
    window.open(url, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="text-3xl mb-5">
        {selected.name}のレシピ4選！
        {isFetching && (
          <span className="ml-2 text-sm text-muted-foreground">更新中…</span>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid sm:grid-cols-1 md:grid-cols-2 gap-2 w-[90vw]"
      >
        {recipes.map((item, index) => (
          <motion.div
            key={item.recipeId}
            variants={cardVariants}
            transition={{
              delay: (index % 2) * 0.15 + Math.floor(index / 2) * 0.15,
            }}
          >
            <Dialog key={item.recipeId}>
              <DialogTrigger asChild>
                <Card
                  key={item.recipeId}
                  className="md:h-[360px] flex flex-col w-full mx-auto"
                >
                  <CardHeader>
                    <CardTitle className="line-clamp-2">
                      {item.recipeTitle}
                    </CardTitle>
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
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader className="grid gap-5">
                  <DialogTitle className="text-xl">
                    {item.recipeTitle}
                  </DialogTitle>
                  <DialogDescription>
                    {item.recipeDescription}
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <p className="text-sm font-bold">
                    <FontAwesomeIcon icon={faBowlRice} /> 材料
                  </p>
                  <hr />
                  <ul
                    className="grid grid-cols-3 mt-2
                    [&>li]:px-2 [&>li]:py-1 [&>li]:rounded
                  [&>li:nth-child(6n+1)]:bg-amber-50
                  [&>li:nth-child(6n+2)]:bg-amber-50
                  [&>li:nth-child(6n+3)]:bg-amber-50
                  [&>li:nth-child(6n+4)]:bg-stone-50
                  [&>li:nth-child(6n+5)]:bg-stone-50
                  [&>li:nth-child(6n+6)]:bg-stone-50"
                  >
                    {item.recipeMaterial?.map((m, index) => (
                      <li key={index}>{m}</li>
                    ))}
                  </ul>
                </div>
                <DialogFooter className="mt-5">
                  <Button
                    className="!bg-orange-500 text-white rounded-lg shadow"
                    onClick={() => goToRakutenRecipe(item.recipeUrl)}
                  >
                    作り方を『楽天レシピ』で確認する
                    <FontAwesomeIcon icon={faUpRightFromSquare} />
                  </Button>
                  <TwitterShareButton
                    url="https://autumn-recipe.onrender.com/"
                    title={`秋の食材レシピ🍁で\n『${item.recipeTitle}』をチェックしたよ👀\n\n#秋の食材レシピ🍁\n`}
                  >
                    <span className="rounded-lg p-2 px-4 bg-black text-white shadow">
                      <FontAwesomeIcon icon={faXTwitter} />
                      でシェア
                    </span>
                  </TwitterShareButton>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
