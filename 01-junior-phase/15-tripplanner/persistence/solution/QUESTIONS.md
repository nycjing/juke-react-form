# Your Questions

* These magic methods: setAssociation and getAssociation
  * Strategy: when I create associations, add a comment that documents the fact that these methods get added
* AJAX: don't worry about jsonp :)



== Browser ==
  - Type into my url bar: www.codysclubhouse.com/ or locahost:3000/
  - Makes an HTTP GET request to / for the server listening at that address

== Network ==
- The request is going travel far far away via TCP/IP to the address

== Server ==
  - We have a server listening for requests on some port
  - The HTTP request that got made is going to be received by our server
    - (The server is written with Express)
  - It will pass the request through any middleware that has been registered
  - It will eventually reach a middleware that was registered for GET /
    - typically, this route will send back an html document as a response

== Network ==
- The response is going travel alllll the way back to the client that made the request

== Browser ==
  - Receive the response (which is html)
  - Parse that html document line by line
  - As it parses, it's going to find link tags that hrefs to css files on the server,
    - and script tags that have srcs to js files on the server
    - and as it encounters these, it's going to make additional requests for those files
    - when it gets responses that have those files, it will execute them
      - for css, that means that it will render those styles into the view
      - for js, that means it's going to execute those js files
        - and these js files set click listeners, mutate the DOM, determine what the user sees

  - ALl the above: no AJAX yet

  - Later, the user is going to do something like click a button
    - Our client-side js files have registered a click listener that does something like
    - $.ajax({ url: '/puppies', method: 'GET' })
    - make an HTTP GET requests to /puppies

== Network ==
see above

== Server ==
see above

== Browser
    - eventually, the server will respond, this time with some data in json format,
    instead of html
    - the promise that $.ajax returned will resolve to the data from that response
    - we can use that data, to update the view, change the DOM, etc





