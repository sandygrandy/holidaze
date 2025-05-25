export interface ApiResponse<T> {
    data: T;
    meta: ApiResponseMetadata;
}

export interface ApiResponseMetadata {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
}