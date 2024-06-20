import { describe, it } from "node:test";
import assert from "node:assert";
import { PaginateUtils } from "./src";

describe("paginate unit tests", () => {
  const data = Array.from({ length: 100 }, (_, i) => i + 1);

  it("should be possible paginate an array", () => {
    const paginate = new PaginateUtils();
    const { pagination } = paginate.getPaginate({
      data,
      page: 1,
      limit: 10,
      url: "http://localhost:9087",
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
        url: "http://localhost:9087?page=1",
      })
    );
  });
});

describe("paginate unit tests async", () => {
  const data = Array.from({ length: 100 }, (_, i) => i + 1);

  it("should be possible paginate an array", async () => {
    const paginate = new PaginateUtils();
    const { pagination } = await paginate.getPaginateAsync({
      data,
      page: 1,
      limit: 10,
      url: "http://localhost:9087",
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
        url: "http://localhost:9087?page=1",
      })
    );
  });
});
