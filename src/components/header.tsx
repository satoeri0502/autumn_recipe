import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="flex items-center">
      <Link to="/">
        <p className="text-xl text-gray-700">秋の食材レシピ🍁</p>
      </Link>
    </div>
  );
}
