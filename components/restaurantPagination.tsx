import React from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

type RestaurantPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function RestaurantPagination({
  currentPage,
  totalPages,
  onPageChange
}: RestaurantPaginationProps) {
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => {
            if (p === 1 || p === totalPages) return true;
            if (Math.abs(p - currentPage) <= 2) return true;
            return false;
          })
          .map((p, index, array) => (
            <React.Fragment key={p}>
              {index > 0 && array[index - 1] !== p - 1 && (
                <PaginationItem>
                  <PaginationLink className="cursor-default">...</PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  onClick={() => onPageChange(p)}
                  isActive={p === currentPage}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            </React.Fragment>
          ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
