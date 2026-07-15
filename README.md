# marked-linkify-it

marked using [linkify-it](https://github.com/markdown-it/linkify-it) for urls

## Usage

```js
import { marked } from "marked";
import markedLinkifyIt from "marked-linkify-it";

// or UMD script
// <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/marked-linkify-it/lib/index.umd.js"></script>

const schemas = {};
const options = {};

marked.use(markedLinkifyIt(schemas, options));

marked("example.com");
// <p><a href="http://example.com">example.com</a></p>
```

## `options`

see <https://github.com/markdown-it/linkify-it#api>

All linkify-it options plus the following additional options:

### `fuzzyLink`

`Boolean; Default: true`

`true` to enable recognition of URLs without schema (e.g. `example.com`). Note that this differs from linkify-it's default of `false`.

### `tldsKeepOld`

`Boolean; Default: false`

`true` to add domains in `tlds` option instead of replacing domain list.

### `schemas`

`Object; Default: undefined`

A map of schemas to add to linkify-it. linkify-it supports `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links by default.

```JavaScript
const options = {
  schemas = {
    '@': {
      validate: function (text, pos, self) {
        // ...
      },
      normalize: function (match) {
        // ...
      }
    }
  }
};
```
