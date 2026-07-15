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

see https://github.com/markdown-it/linkify-it#api

linkify options plus the following additional options:

### `tldsKeepOld`

`Boolean; Default: false`

`true` to add domains in `tlds` option instead of replacing domain list.

### `schemas`

A map of schemas to add to linkify-it

*Note:* `#add()` doesn't work with this extension

```JavaScript
markedLinkifyIt.add('@', {...}) // Doesn't work, you need to pass a schema in options
```

Instead do:

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
