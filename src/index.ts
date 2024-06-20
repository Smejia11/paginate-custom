import { PaginateParamsSchema } from "./schema";
import { PaginateParams, PaginateResult } from "./types";

export class PaginateUtils {
  constructor() {
    this.getPaginateAsync = this.getPaginateAsync.bind(this);
  }
  /**
   * The function `getPaginate` takes in pagination data, calculates pagination details, and returns
   * paginated data along with pagination information.
   * @param paginateData - The `paginateData` parameter in the `getPaginate` method is of type
   * `PaginateParams<T>`. This parameter is used to provide the data needed for pagination, including the
   * array of items to paginate, the current page number, the number of items per page, and the base URL
   * @returns The `getPaginate` method returns an object with two properties: `data` and `pagination`.
   * The `data` property contains the paginated items based on the provided `paginateData`, while the
   * `pagination` property contains information about the pagination such as total pages, next page
   * number, previous page number, current page number, total number of items, etc.
   */
  public getPaginate<T>(paginateData: PaginateParams<T>): PaginateResult<T> {
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

    const urlWithPage = (page: number): string => `${url}?page=${page}`;

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
      url: urlWithPage(page),
    };

    return {
      data: paginatedItems,
      pagination,
    };
  }
  /**
   * The function `getPaginateAsync` returns a Promise that resolves to a PaginateResult based on the
   * provided PaginateParams.
   * @param  - The `getPaginateAsync` method is a generic asynchronous function that takes in an object
   * with the following parameters:
   * @returns A Promise that resolves to a PaginateResult<T> object.
   */
  public getPaginateAsync<T>({
    data,
    page,
    limit,
    url,
  }: PaginateParams<T>): Promise<PaginateResult<T>> {
    return Promise.resolve(this.getPaginate({ data, page, limit, url }));
  }
}
