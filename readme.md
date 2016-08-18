## Synopsis
An example of dynamic routing with [choo](https://github.com/yoshuawuyts/choo).

## Installation
Install dependencies:

```sh
npm install
```

Use budo to run locally + compile with browserify. To install:

```sh
npm install -g budo
```

To run client.js:
 
```sh
budo client.js -p <PORT> --open --pushstate
```

You need the pushstate flag for routing: will always render the index page instead of a 404 page.