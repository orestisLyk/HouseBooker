export type PaginatedObject<T> = {
    data: T[];
    totalCount: number;
    page: number;
    size: number;
    totalPages: number;
}