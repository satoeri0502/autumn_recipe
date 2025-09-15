import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function Top() {
  const controls = useAnimationControls();
  const textAnimation = {
    init: {
      color: "transparent",
      textShadow: "0 0 100px #333, 0 0 100px #333",
      opacity: 0,
    },
  };

  useEffect(() => {
    controls.start((i) => ({
      textShadow: [
        "0 0 90px #333, 0 0 90px #333",
        "0 0 3px #333, 0 0 3px #333",
        "0 0 0 #333",
      ],
      opacity: [0, 1, 1],
      transition: {
        ease: "linear",
        duration: 2,
        delay: i * 0.1,
      },
    }));
  }, []);

  return (
    <>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        🍁このアプリについて🍁
      </h2>

      <div className="mt-10">
        <motion.div
          custom={0}
          initial="init"
          animate={controls}
          variants={textAnimation}
          className="mb-10"
        >
          このアプリは楽天レシピAPIを使い、各食材の人気レシピTOP4を取得するアプリです。
          <br />
          秋が旬の「野菜」 「くだもの」「魚」のレシピを集めました。
          <br />
          早速レシピを見てみましょう！
        </motion.div>
        <motion.div
          custom={1}
          initial="init"
          animate={controls}
          variants={textAnimation}
        >
          <Link to="/recipe" className="text-2xl">
            <span className="text-pink-400 underline">レシピを見に行く</span>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
