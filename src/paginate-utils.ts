import { PaginateParamsSchema } from './schema.js';
import type { PaginateParams, PaginateResult } from './types.js';

export class PaginateUtils {
  constructor() {}

  /**
   * The function `getPaginate` takes in pagination data, calculates pagination details, and returns
   * paginated data along with pagination information.
   * @param paginateData - The `paginateData` parameter is an object of type `PaginateParams<T>`, which
   * contains the following properties:
   * @returns The `getPaginate` function returns an object with two properties: `data` and `pagination`.
   * The `data` property contains the paginated items based on the provided `paginateData`, while the
   * `pagination` property contains information about the pagination such as total number of pages, next
   * and previous page numbers, current page number, total number of items, etc.
   */
  getPaginate<T>(paginateData: PaginateParams<T>): PaginateResult<T> {
    const paginateParams = PaginateParamsSchema.safeParse(paginateData);
    if (!paginateParams.success) throw new Error(paginateParams.error.message);

    const { data, page, limit, url } = paginateParams.data;

    const offset = (page - 1) * limit;
    const paginatedItems = data.slice(offset, page * limit);

    const totalPage = Math.ceil(data.length / limit);
    const nextPage = page < totalPage ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    const firstPage = 1;
    const lastPage = totalPage;

    const from = offset + 1;
    const to = offset + paginatedItems.length;

    const pagination = {
      totalPage,
      nextPage,
      prevPage,
      firstPage,
      lastPage,
      from,
      to,
      perPage: limit,
      total: data.length,
      currentPage: page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPage,
      url: this.urlWithPage({ page, url, limit }),
    };

    return {
      data: paginatedItems,
      pagination,
    };
  }
  private urlWithPage({
    page,
    url,
    limit,
  }: {
    page: number;
    limit: number;
    url: string;
  }): string {
    const uri = new URL(url);
    const parseLimit = limit.toString();
    const parsePage = page.toString();
    uri.search = new URLSearchParams({
      page: parsePage,
      limit: parseLimit,
    }).toString();
    return uri.href;
  }
}
