CoNext.js
=========
[![NPM version][npm-badge]](http://badge.fury.io/js/co-next)
[npm-badge]: https://badge.fury.io/js/co-next.png

**CoNext.js** is a small function for JavaScript to **wrap a generator
function** with [Co][co] for use as **request handlers** and **middlewares**.
Calls the last argument (usually called `next`) if there was an error, but not
if the generator finishes successfully. Useful with [Express][express] routes.

[co]: https://github.com/visionmedia/co
[express]: http://expressjs.com


Installing
----------
```sh
npm install co-next
```

CoNext.js follows [semantic versioning](http://semver.org/), so feel free to
depend on its major version with something like `>= 1.0.0 < 2` (a.k.a `^1.0.0`).


Using
-----
```javascript
var next = require("co-next")
var app = require("express")()

app.get("/", next(function*(req, res, next) {
  if (req.account == null) throw new Error("Unauthorized")
  res.send("Hello, world!")
}))
```

In the above example, the thrown error will be passed to `next`, which in
Express's case calls the error handling middleware later on. If the generator succeeds, the `next` callback will not be called.

If you need to, like in middleware handlers, you can always call `next`
yourself:

```javascript
app.use(next(function*(req, res, next) {
  var account = yield accounts.read(req.session.accountId)
  if (account == null) return void next(new Error("Unauthorized"))
  req.account = account
  next()
}))
```


License
-------
CoNext.js is released under a *Lesser GNU Affero General Public License*, which
in summary means:

- You **can** use this program for **no cost**.
- You **can** use this program for **both personal and commercial reasons**.
- You **do not have to share your own program's code** which uses this program.
- You **have to share modifications** (e.g. bug-fixes) you've made to this
  program.

For more convoluted language, see the `LICENSE` file.


About
-----
**[Andri Möll][moll]** typed this and the code.  
[Monday Calendar][monday] supported the engineering work.

If you find CoNext.js needs improving, please don't hesitate to type to me now
at [andri@dot.ee][email] or [create an issue online][issues].

[email]: mailto:andri@dot.ee
[issues]: https://github.com/moll/js-co-next/issues
[moll]: http://themoll.com
[monday]: https://mondayapp.com
