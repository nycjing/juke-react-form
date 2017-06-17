## Database management system

A program that interacts with your file system for you. Lets you create and maintain databases. The point of a database is to store data: in a persistent and structured way.

Examples: PostgreSQL, MySQL, MongoDB

Anti-examples: Excel, SQL, Wikipedia-el

## Querying

A query language is something that allows you to access stuff on the database.

Example: SQL, Descriptive Language, array methods in Javascript, jQuery / DOM

Query plan: steps to extract data from database. When we form queries in e.g. SQL they're *declarative*: what we want, not how to get it. The query engine forms a plan and executes that.

Molly writes query:

```
GET THIS STUFF FROM STORE
- eggs
- milk
- peppers
- rabbit food
```

Omri query engine generates plan:

```
HEAD TO STORE ON WASHINGTON AND ST MARKS
GO DOWN AISLES LOOKING FOR THINGS
GET THINGS AND CHECK THEM OUT
HEAD BACK
GO TO PET STORE AROUND THE CORNER AND GET FOOD
```

The query plan is the implementation: its the "how".

## The workshop

We're going to build a mini-DBMS with a query language / engine using node.

A whole bunch of functions: `where`, `select`, and `join`.

Persisting the data: use the file system! Our data will be json files inside folders! 

To interact with it we'll use the built-in library `fs`.

## JSON

JavaScript Object Notation.

It's text that has keys and values in Javscript-object-looking-way. Just a string of text formatted in a certain way.

Why do we use JSON? Bridge between objects and strings. JSON is a data serizliation format: useful for storing / transmitting information. We can use it in Javascript or any other language as a data format.

`JSON.parse` will convert a JSON string to an actual object.

`JSON.stringify` will convert an actual object to a JSON string.

## `fs`

Normaly we read files using `fs` by doing `fs.readFile` and pass it a callback that will receive the file contents. So interacting with the filesystem this way it is asynchronous. That's because reading is "slow" and we want our program to do other things while the file is being read.

...BUT we're going to be using `fs.readFileSync`: it's blocking. We don't pass it a callback!

```js
var fs = require('fs');
// non-blocking way
fs.readFile('./lecture-notes.md', function (err, bufferOfFileContents) {
  // ...
});
// blocking way
var bufferOfFileContents = fs.readFileSync('./lecture-notes.md');
```

Why?!?!?!

Simplifies the problem. We're trying to focus on writing a DBMS and how data can persist and be queried. We're not focusing on async stuff.

It would also simplify certain goals like making an ACID-compliant DBMS.

And really the program we're writing it's whole job is just file system reading / writing. So it's sort of reasonable.

So how do we handle errors for `fs.readFileSync`...

```js
try {
  var bufferOfFileContents = fs.readFileSync('./lecture-notes.md');
} catch (error) {
  // ... do whatever with the error
}
```

^^ the normal way we handle errors in blocking code.

## Instance and class methods

Object-oriented ideas.

Instance method: something an instance (created the class) can invoke.

Class method: something that a class can invoke. Can call it without an instance.

```js
const allThings = [];
function Thing (name) {
  this.name = name;
  this.state = 'still';
  allThings.push(this);
  this.skip = function () { // <= instance method (alternative way to define instance method)
    this.state = 'skipping';
  };
}
Thing.prototype.jump = function () { // <= instance method
  this.state = 'jumping';
};
Thing.findByName = function (searchName) { // <= class method
  for (var i = 0; i < allThings.length; i++) {
    if (allThings[i].name === searchName) return allThings[i];
  }
};

const thingA = new Thing('omri');
thingA.jump(); // <= instance method

Thing.findByName('omri'); // <= class method
```

When is something a good fit for a class method? If you don't need any particular instance to run the method, then it should be class method. It'd be inconvenient above to need to already have a `Thing` instance in order to find another one.

When is something a good fit for an instance method? When you wnat to do seomthing for any of the instances of that class. When you NEED an instance to do whatever you want to do.

Car factory (because classes are kind of like factories). Car factory might have a class method: `injectNewCarSmall`. Car instance might have a method: `brake`.

## Logistics

Workshop is a github repo: https://github.com/FullstackAcademy/functional-query-language (don't worry about learndot).

In eastern time...

- Lecture about FQL in general (10:40–11:22)
- Work on parts I and II (11:22–3:00)
- Review parts I and II (3:00-3:30)
- Lecture on indexing (3:30–4:00)
- Work on parts III and IV (4:00–5:30)
- Review on part III (maybe a little of IV) (5:30–6:00)

---

## Indexing

What is it? A quick way to look things up with a large amount of data. It's like giving you the speed of lookup that the primary key column (e.g. "id") has but for other columns!

A lot like a glossary. We can use a glossary to quickly find the page numbers for a certain word / concept / whatever in a book. From there we can quickly jump to those exact pages.

We can generate an index table for a particular column. The index table columns will be what _were_ row values in the main table. The index table values will be primary keys from the main table.

We can _use_ the index table in our `where` queries. We can check the criteria for any existing index tables and isntead of doing the ordinary filtering...do something else!

This is really powerful tool in DBMS, intermediate / advanced database administration.

Indexing isn't always a good idea. Downsides to indexing...

- High cost one time, so only useful for repeated queries that make use of it
- Duplicate storage: more space
- Maintaining index tables for write operations (inserts / updates / deletes): added complexity, added space, added time
- Insufficient diversity based on what you're indexing
