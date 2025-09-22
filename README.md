# Paginate Custom VSM

A lightweight and flexible library for array pagination in JavaScript/TypeScript, with support for synchronous and asynchronous operations, and advanced pagination features.

## Features

- ✅ Synchronous and asynchronous pagination
- ✅ TypeScript support
- ✅ Customizable configuration
- ✅ URL generation for pagination
- ✅ Complete metadata information
- ✅ Easy integration with REST APIs

## Installation

```bash
npm install paginate-custom-vsm
```

## Synchronous Pagination

```js
import { PaginateUtils } from 'paginate-custom-vsm';

const data = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

// Instance method
const paginator = new PaginateUtils();
const result = paginator.getPaginate({
  data,
  page: 2,
  limit: 10,
  url: 'https://api.example.com/items',
});

console.log(result.data); // Items 11-20
```

## Asynchronous Pagination

```js
import { PaginateUtilsAsync } from 'paginate-custom-vsm';

async function fetchUserData() {
  const users = await getUsersFromDatabase(); // Your async function

  const paginator = new PaginateUtilsAsync();
  const result = await paginator.getPaginateAsync({
    data: users,
    page: 1,
  });

  return result;
}
```

## Test

```bash
npm run test
```
