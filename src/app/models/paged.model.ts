export interface Paged<T>
{
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    entities: T[];
}