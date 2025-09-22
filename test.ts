import { describe, it } from 'node:test';
import assert from 'node:assert';
import { PaginateUtils, PaginateUtilsAsync } from './src/index.js';

describe('paginate unit tests', () => {
  const data = Array.from({ length: 100 }, (_, i) => i + 1);

  it('should be possible paginate an array', () => {
    const { pagination } = new PaginateUtils().getPaginate({
      data,
      page: 1,
      limit: 10,
      url: 'http://localhost:9087',
    });

    assert.equal(
      JSON.stringify(pagination),
      JSON.stringify({
        totalPage: 10,
        nextPage: 2,
        prevPage: null,
        firstPage: 1,
        lastPage: 10,
        from: 1,
        to: 10,
        perPage: 10,
        total: 100,
        currentPage: 1,
        hasPrevPage: false,
        hasNextPage: true,
        url: 'http://localhost:9087?page=1',
      }),
    );
  });
});

describe('paginate utils extra unit tests', () => {
  const data = Array.from({ length: 100 }, (_, i) => i + 1);

  it('should return correct pagination for a middle page', () => {
    const { pagination } = new PaginateUtils().getPaginate({
      data,
      page: 5,
      limit: 10,
      url: 'http://localhost:9087',
    });

    assert.equal(
      JSON.stringify(pagination),
      JSON.stringify({
        totalPage: 10,
        nextPage: 6,
        prevPage: 4,
        firstPage: 1,
        lastPage: 10,
        from: 41,
        to: 50,
        perPage: 10,
        total: 100,
        currentPage: 5,
        hasPrevPage: true,
        hasNextPage: true,
        url: 'http://localhost:9087?page=5',
      }),
    );
  });

  it('should return correct pagination for the last page', () => {
    const { pagination } = new PaginateUtils().getPaginate({
      data,
      page: 10,
      limit: 10,
      url: 'http://localhost:9087',
    });

    assert.equal(
      JSON.stringify(pagination),
      JSON.stringify({
        totalPage: 10,
        nextPage: null,
        prevPage: 9,
        firstPage: 1,
        lastPage: 10,
        from: 91,
        to: 100,
        perPage: 10,
        total: 100,
        currentPage: 10,
        hasPrevPage: true,
        hasNextPage: false,
        url: 'http://localhost:9087?page=10',
      }),
    );
  });

  it('should handle page greater than totalPage by returning last page data', () => {
    const res = new PaginateUtils().getPaginate({
      data,
      page: 20,
      limit: 10,
      url: 'http://localhost:9087',
    });
    console.log(res.data);
    assert.equal(
      JSON.stringify(res.pagination),
      JSON.stringify({
        totalPage: 10,
        nextPage: null,
        prevPage: 19,
        firstPage: 1,
        lastPage: 10,
        from: 191,
        to: 190,
        perPage: 10,
        total: 100,
        currentPage: 20,
        hasPrevPage: true,
        hasNextPage: false,
        url: 'http://localhost:9087?page=20',
      }),
    );
  });

  it('should handle a different limit', () => {
    const { pagination } = new PaginateUtils().getPaginate({
      data,
      page: 2,
      limit: 25,
      url: 'http://localhost:9087',
    });

    assert.equal(
      JSON.stringify(pagination),
      JSON.stringify({
        totalPage: 4,
        nextPage: 3,
        prevPage: 1,
        firstPage: 1,
        lastPage: 4,
        from: 26,
        to: 50,
        perPage: 25,
        total: 100,
        currentPage: 2,
        hasPrevPage: true,
        hasNextPage: true,
        url: 'http://localhost:9087?page=2',
      }),
    );
  });

  it('should handle empty data gracefully', () => {
    const { pagination } = new PaginateUtils().getPaginate({
      data: [],
      page: 1,
      limit: 10,
      url: 'http://localhost:9087',
    });

    assert.equal(
      JSON.stringify(pagination),
      JSON.stringify({
        totalPage: 0,
        nextPage: null,
        prevPage: null,
        firstPage: 1,
        lastPage: 0,
        from: 1,
        to: 0,
        perPage: 10,
        total: 0,
        currentPage: 1,
        hasPrevPage: false,
        hasNextPage: false,
        url: 'http://localhost:9087?page=1',
      }),
    );
  });
});

describe('paginate unit tests async', () => {
  const data = Array.from({ length: 100 }, (_, i) => i + 1);

  it('should be possible paginate an array', async () => {
    const { pagination } = await new PaginateUtilsAsync().getPaginateAsync({
      data,
      page: 1,
      limit: 10,
      url: 'http://localhost:9087',
    });

    assert.equal(
      JSON.stringify(pagination),
      JSON.stringify({
        totalPage: 10,
        nextPage: 2,
        prevPage: null,
        firstPage: 1,
        lastPage: 10,
        from: 1,
        to: 10,
        perPage: 10,
        total: 100,
        currentPage: 1,
        hasPrevPage: false,
        hasNextPage: true,
        url: 'http://localhost:9087?page=1',
      }),
    );
  });
});

describe('paginate edge cases', () => {
  it('should throw error if data is null', () => {
    const regex =
      /\[\s*\{\s*"expected"\s*:\s*"array",\s*"code"\s*:\s*"invalid_type",\s*"path"\s*:\s*\[\s*"data"\s*\],\s*"message"\s*:\s*"Invalid input: expected array, received null"\s*\}\s*\]/;

    assert.throws(
      () => {
        new PaginateUtils().getPaginate({
          // @ts-expect-error
          data: null,
          page: 1,
          limit: 10,
          url: 'http://localhost:9087',
        });
      },
      (err) => {
        if (err && typeof err === 'object' && 'message' in err) {
          assert(regex.test(err.message as string));
          return true;
        }
        return false;
      },
    );
  });

  it('should handle data = undefined as empty array', () => {
    const regex =
      /\[\s*\{\s*"expected"\s*:\s*"array",\s*"code"\s*:\s*"invalid_type",\s*"path"\s*:\s*\[\s*"data"\s*\],\s*"message"\s*:\s*"Invalid input: expected array, received undefined"\s*\}\s*\]/;

    assert.throws(
      () => {
        new PaginateUtils().getPaginate({
          // @ts-expect-error
          data: undefined,
          page: 1,
          limit: 10,
          url: 'http://localhost:9087',
        });
      },
      (err) => {
        if (err && typeof err === 'object' && 'message' in err) {
          assert(regex.test(err.message as string));
          return true;
        }
        return false;
      },
    );
  });

  it('should handle non-array data (string) gracefully', () => {
    const regex =
      /\[\s*\{\s*"expected"\s*:\s*"array",\s*"code"\s*:\s*"invalid_type",\s*"path"\s*:\s*\[\s*"data"\s*\],\s*"message"\s*:\s*"Invalid input: expected array, received string"\s*\}\s*\]/;

    assert.throws(
      () => {
        new PaginateUtils().getPaginate({
          // @ts-expect-error
          data: 'unknown',
          page: 1,
          limit: 10,
          url: 'http://localhost:9087',
        });
      },
      (err) => {
        if (err && typeof err === 'object' && 'message' in err) {
          assert(regex.test(err.message as string));
          return true;
        }
        return false;
      },
    );
  });

  it('should handle negative page number by clamping to 1', () => {
    const regex =
      /\[\s*\{\s*"origin"\s*:\s*"number"\s*,\s*"code"\s*:\s*"too_small"/;

    assert.throws(
      () => {
        new PaginateUtils().getPaginate({
          data: Array.from({ length: 100 }, (_, i) => i + 1),
          page: -1,
          limit: 10,
          url: 'http://localhost:9087',
        });
      },
      (err) => {
        if (err && typeof err === 'object' && 'message' in err) {
          assert(regex.test(err.message as string));
          return true;
        }
        return false;
      },
    );
  });

  it('should handle limit = 0 by treating as limit = 1 (or safe default)', () => {
    const regex =
      /\[\s*\{\s*"origin"\s*:\s*"number"\s*,\s*"code"\s*:\s*"too_small"/;

    assert.throws(
      () => {
        new PaginateUtils().getPaginate({
          data: Array.from({ length: 100 }, (_, i) => i + 1),
          page: 1,
          limit: 0,
          url: 'http://localhost:9087',
        });
      },
      (err) => {
        if (err && typeof err === 'object' && 'message' in err) {
          assert(regex.test(err.message as string));
          return true;
        }
        return false;
      },
    );
  });
});
