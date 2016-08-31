FetchFormify.js
===============
[![NPM version][npm-badge]](https://www.npmjs.com/package/fetch-formify)
[![Build status][travis-badge]](https://travis-ci.org/moll/js-fetch-formify)

Fetch Formify is a mixin for the [Fetch API][fetch] for browsers and Node.js that urlencodes an object into a body and sets the `Content-Type` header to `application/x-www-form-urlencoded` if not given. It's functional and immutable, in that it doesn't modify any properties given to it.

[npm-badge]: https://img.shields.io/npm/v/fetch-formify.svg
[travis-badge]: https://travis-ci.org/moll/js-fetch-formify.png?branch=master
[fetch]: https://developer.mozilla.org/en/docs/Web/API/Fetch_API


Installing
----------
```sh
npm install fetch-formify
```

FetchFormify.js follows [semantic versioning](http://semver.org), so feel free to depend on its major version with something like `>= 1.0.0 < 2` (a.k.a `^1.0.0`).


Using
-----
Wrap the native `fetch` function with the one from FetchFormify.js:

```javascript
var fetch = require("fetch-formify")(global.fetch)
```

Then pass any object you'd like urlencoded under the `form` property:

```javascript
fetch("/feedback", {method: "POST", form: {message: "Hello!"}})
```

That property will be urlencoded with the `querystring` and passed on to the original `fetch` function under the `body` property. The `Content-Type` header will be set to `application/x-www-form-urlencoded` if it's not set.

### Content-Type
To set a custom `Content-Type` header, just pass it as you normally would:

```javascript
fetch("/feedback", {
  method: "POST",
  headers: {"Content-Type": "application/vnd.feedback"},
  form: {message: "Hello!"}
})
```

### Browser
Browsers have the Fetch API available at `window.fetch`:

```javascript
var fetch = require("fetch-formify")(window.fetch)
fetch("/feedback", {method: "POST", form: {message: "Hello!"}})
```

### Node.js
Node.js doesn't have a built-in implementation of the Fetch API, but you can use any library with a compatible interface, such as my [Fetch/Off.js][fetch-off] or [node-fetch][node-fetch]:

[fetch-off]: https://github.com/moll/node-fetch-off
[node-fetch]: https://github.com/bitinn/node-fetch

```javascript
var fetch = require("fetch-formify")(require("node-fetch"))
fetch("/feedback", {method: "POST", form: {message: "Hello!"}})
```


License
-------
FetchFormify.js is released under a *Lesser GNU Affero General Public License*, which in summary means:

- You **can** use this program for **no cost**.
- You **can** use this program for **both personal and commercial reasons**.
- You **do not have to share your own program's code** which uses this program.
- You **have to share modifications** (e.g. bug-fixes) you've made to this program.

For more convoluted language, see the `LICENSE` file.


About
-----
**[Andri Möll][moll]** typed this and the code.  
[Monday Calendar][monday] supported the engineering work.

If you find FetchFormify.js needs improving, please don't hesitate to type to me now at [andri@dot.ee][email] or [create an issue online][issues].

[email]: mailto:andri@dot.ee
[issues]: https://github.com/moll/js-fetch-formify/issues
[moll]: http://themoll.com
[monday]: https://mondayapp.com
