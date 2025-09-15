import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fish, fruit, vegetables } from "@/lib/category-list";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SelectList({
  setCategoryId,
}: {
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const onPick = (id: string) => setCategoryId(id);

  return (
    <div className="flex gap-3 items-center mb-5">
      {/* 野菜 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            野菜 <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-40">
          {vegetables.map((v) => (
            <DropdownMenuItem key={v.id} onClick={() => onPick(v.id)}>
              {v.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* くだもの */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            くだもの <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-40">
          {fruit.map((f) => (
            <DropdownMenuItem key={f.id} onClick={() => onPick(f.id)}>
              {f.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 魚 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            魚 <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="start" className="w-40">
          {fish.map((x) => (
            <DropdownMenuItem key={x.id} onClick={() => onPick(x.id)}>
              {x.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
