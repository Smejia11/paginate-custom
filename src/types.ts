import { z } from 'zod';
import { PaginateParamsSchema } from './schema.js';

export type PaginateParams<T> = {
  page: number;
  limit: number;
  data: T[];
  url: string;
};

export type PaginateParamsType = z.infer<typeof PaginateParamsSchema>; // infer type

export type PaginateResult<T> = {
  data: T[];
  pagination: {
    totalPage: number;
    nextPage: number | null;
    prevPage: number | null;
    firstPage: number;
    lastPage: number;
    from: number;
    to: number;
    perPage: number;
    total: number;
    currentPage: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    url: string;
  };
};

// export type CursorPaginateParams<T> = {
//   data: T[];
//   perPage: number;
//   identifier: string | number;
//   after?: string | number;
//   before?: string | number;
// };

// export type CursorPaginateResult<T> = {
//   data: T[];
//   pagination: {
//     hasPrevPage: boolean;
//     hasNextPage: boolean;
//     startCursor: string | number;
//     endCursor: string | number;
//     totalPages: number;
//   };
// };
