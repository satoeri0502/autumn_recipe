import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Footer() {
  return (
    <>
      <div className="justify-start items-center flex mx-3">
        <p>秋の食材レシピ🍁</p>
        <a target="_blank" href="https://x.com/satoeri_63b">
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
      </div>
    </>
  );
}
