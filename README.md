# marked-linkify-it
marked using [linkify-it](https://github.com/markdown-it/linkify-it) for urls

# Usage

```js
const marked = require("marked");
const linkify = require("marked-linkify-it");

const schemas = {};
const options = {};

marked.use(linkify(schemas, options));

marked("example.com");
// <p><a href="http://example.com">example.com</a></p>
```

## `schemas`

see https://github.com/markdown-it/linkify-it#api

## `options`

see https://github.com/markdown-it/linkify-it#api

linkify options plus the following additional options:

### `tlds`

`String|String[]`

replace or add tlds for fuzzy links/

### `tldsKeepOld`

`Boolean; Default: false`

`true` to add domains instead of replacing domain list.
