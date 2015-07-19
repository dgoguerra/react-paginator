React Paginator
===============

A React paginator component based in the Laravel Paginator module. Expects the Bootstrap style classes to be loaded.

* [See the demo](https://dgoguerra.github.io/react-paginator/)

Installation
------------

```
npm install react-laravel-paginator
```

Usage
-----

```js
var Paginator = require('react-laravel-paginator');

<Paginator currPage={4} lastPage={20} onChange={this.onCurrPageChange} />
```

Options:

| Name | Description |
| ---- | ----------- |
| `currPage` | The current page. |
| `lastPage` | Total number of pages. |
| `onChange` | Called when a page change is requested. Receives the new page number as the first argument. |

License
-------
MIT license - http://www.opensource.org/licenses/mit-license.php
