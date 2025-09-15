import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Top() {
  return (
    <>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        🍁このアプリについて🍁
      </h2>

      <div className="mt-10 space-y-8">
        {/* 説明テキスト */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.2, delay: 0 }}
          className="text-lg leading-relaxed"
        >
          このアプリは楽天レシピAPIを使い、各食材の人気レシピTOP4を取得するアプリです。
          <br />
          秋が旬の「野菜」 「くだもの」「魚」のレシピを集めました。
          <br />
          早速レシピを見てみましょう！
        </motion.div>

        {/* リンクボタン */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.2, delay: 0.3 }} // ← こっちだけ遅らせる
        >
          <Link
            to="/recipe"
            className="text-2xl text-pink-500 underline font-semibold"
          >
            レシピを見に行く
          </Link>
        </motion.div>
      </div>
    </>
  );
}
