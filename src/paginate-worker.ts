import { fileURLToPath } from 'url';
import path from 'path';
import { PaginateUtils } from './paginate-utils.js';
import type { PaginateParams } from './types.js';

function workerFunc<T>({ data, page, limit, url }: PaginateParams<T>) {
  const result = new PaginateUtils().getPaginate({ data, page, limit, url });
  return result;
}

const __filename = fileURLToPath(import.meta.url);
export const fileName = path.basename(__filename);
export const filenameWorkerPaginate = path.resolve(__filename);
export default workerFunc;
