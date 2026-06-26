import type { PaginationProps } from "../types/pagination";

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {

    // if( totalPages <= 1) {
    //     return null;
    // }

    return (
        <>
            <div className="flex justify-center my-4">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

        </>
    )
}
export default Pagination;