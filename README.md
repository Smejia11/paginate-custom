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
    data,
    page: 2,
    limit: 10,
    url: 'https://api.example.com/items',
  });

  return result;
}
```

### Example response

```ts
type PaginateResult<T> = {
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
```

### 🌐 Important Links

-Homepage: https://github.com/Smejia11/paginate-custom

-Repository: git+https://github.com/Smejia11/paginate-custom.git

-Issues: https://github.com/Smejia11/paginate-custom/issues

### 🤝 Contributing

Contributions are welcome.

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Execute

```bash
npm run format
```

or

```
pnpm run format
```

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

## License

MIT
