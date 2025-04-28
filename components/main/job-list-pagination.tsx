import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface JobListPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function JobListPagination({
    currentPage,
    totalPages,
    onPageChange,
}: JobListPaginationProps) {
    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pages = [];
        const visiblePageCount = 5; // Số lượng trang tối đa hiển thị (bao gồm cả ellipsis)

        if (totalPages <= visiblePageCount) {
            // Hiển thị tất cả các trang nếu tổng số trang nhỏ hơn hoặc bằng số trang hiển thị tối đa
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            onClick={() => handlePageClick(i)}
                            isActive={i === currentPage}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            // Hiển thị trang đầu, ellipsis, trang hiện tại +/- 1, ellipsis, trang cuối
            pages.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        href="#"
                        onClick={() => handlePageClick(1)}
                        isActive={1 === currentPage}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            if (currentPage > 3) {
                pages.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            onClick={() => handlePageClick(i)}
                            isActive={i === currentPage}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (currentPage < totalPages - 2) {
                pages.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            pages.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        href="#"
                        onClick={() => handlePageClick(totalPages)}
                        isActive={totalPages === currentPage}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return pages;
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => handlePageClick(currentPage - 1)}
                        // disabled={currentPage === 1}
                    />
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => handlePageClick(currentPage + 1)}
                        // disabled={currentPage === totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
