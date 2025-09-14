import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TriangleAlert } from "lucide-react";

type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorAlert({
  title = "エラーが発生しました",
  message = "時間をおいて再度お試しください。",
  onRetry,
}: Props) {
  return (
    <Alert variant="destructive" className="justify-items-start">
      <TriangleAlert />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-1 space-y-3">
        <p className="text-sm text-muted-foreground">{message}</p>
        <p>
          {onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry}>
              再読み込み
            </Button>
          )}
        </p>
        <p className="text-left">
          再読み込みしてもエラーが発生する場合は、
          <br />
          製作者の
          <a target="_blank" href="https://x.com/satoeri_63b">
            <FontAwesomeIcon icon={faXTwitter} />
            アカウント
          </a>
          までご連絡いただけますと幸いです。
        </p>
      </AlertDescription>
    </Alert>
  );
}
