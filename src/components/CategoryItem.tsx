import { Button } from "@/src/components/ui/Button";
import { cn } from "@/src/lib/utils";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import qs from "query-string";

interface CategoryItemProps {
  label: String;
  value: any;
}

const CategoryItem = ({ label, value }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");

  const isSelected = currentCategory === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          category: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        "min-w-max rounded-md px-4"
        // TODO: change style if active
      )}
      variant={"subtle"}
      size={"sm"}
    >
      {label}
    </Button>
  );
};

export default CategoryItem;
