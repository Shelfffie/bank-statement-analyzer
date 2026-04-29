import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { visiblePages } from "../statements/visible-pages-pagination";

export default function PaginationComponent({
  setPage,
  page,
  totalPages,
}: {
  setPage: (page: number) => void;
  page: number;
  totalPages: number;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage(Math.max(page - 1, 1))}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
            text="Минула"
          />
        </PaginationItem>

        {visiblePages(page, totalPages).map((i) => (
          <PaginationItem key={i}>
            <PaginationLink isActive={page === i} onClick={() => setPage(i)}>
              {i}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(Math.min(page + 1, totalPages))}
            className={
              page === totalPages ? "pointer-events-none opacity-50" : ""
            }
            text="Наступна"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
