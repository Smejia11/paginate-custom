import path, { resolve } from 'node:path';
import { fileName, filenameWorkerPaginate } from './paginate-worker.js';
import type { PaginateParams, PaginateResult } from './types.js';
import { fileURLToPath } from 'node:url';
import { Piscina } from 'piscina';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PaginateUtilsAsync {
  _piscina: Piscina;
  constructor() {
    const piscina = new Piscina({
      filename: resolve(__dirname, `${fileName}`),
      workerData: { fullpath: filenameWorkerPaginate },
      minThreads: 1,
      maxThreads: 2,
    });
    this._piscina = piscina;
  }
  /**
   * The function `getPaginateAsync` takes in parameters for pagination and returns a Promise with the
   * paginated result.
   * @param  - The `getPaginateAsync` function takes in the following parameters:
   * @returns A Promise that resolves to a @PaginateResult<T> object.
   */
  getPaginateAsync<T>({
    data,
    page,
    limit,
    url,
  }: PaginateParams<T>): Promise<PaginateResult<T>> {
    return this._piscina.run({
      data,
      page,
      limit,
      url,
    });
  }
}
