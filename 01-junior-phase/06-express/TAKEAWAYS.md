# TAKEAWAYS
* HTTP communication
  * Common methods & their standard meanings
  * The req-res cycle
  * Components of a request or response
* Installing Express
* Instantiating an express app
* Registering and using middleware
  * how `app.use` differs from `app.get`/`app.post`/`app.put` etc.
  * what `req`, `res`, and `next` are / do
  * normal vs. error-handling middleware
* Commonly-used middleware (what each is & when you need it — setup is copy-paste)
  * Logging
  * Body parsing
  * Static routing
* Routing requests (major topic, study carefully!)
  * methods vs. URIs
  * routing to sub-resources (e.g. `kittens`, `kittens/123`, `kittens/123/friends`)
  * URI parameters (e.g. `kittens/:id`) and how to access them
  * Query strings (e.g. `kittens?color=calico`) and how to access them
  * Request bodies (in JSON or URL-encoded) and how to access them
  * using modular sub-routers created with `express.Router()`
* Back-end (server) vs. front-end (client)

# QUESTIONS

* Swig vs. nunjucks
* Difficult to track the data flow
