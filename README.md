# Webflo

<!-- BADGES/ -->

<span class="badge-npmversion"><a href="https://npmjs.org/package/@webqit/webflo" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@webqit/webflo.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/@webqit/webflo" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@webqit/webflo.svg" alt="NPM downloads" /></a></span>

<!-- /BADGES -->

Webflo is a universal *web*, *mobile*, and *API backend* framework built to solve for the underrated `.html` + `.css` + `.js` stack! This has been written specifically to draw directly on the plain old stack at the language level - to facilitate building web-native applications!

Ok, we've put all of that up for a straight read!

> **Note**
> <br>Depending on your current framework background, the hardest part of Webflo might be having to break ties with something that isn't conventional to the `.html` + `.css` + `.js` stack: all of that JSX, CSS-in-JS, etc.!

## Documentation 

+ [Overview](#overview)
+ [Installation](#installation)
+ [Concepts](#concepts)
+ [Webflo Applications](#webflo-applications)
+ [Workflow API](#workflow-api)
+ [Command Line Interface](#command-line-interface)

## Overview

<details>
 <summary><b>Build <i>anything</i></b> - from as basic as a static <code>index.html</code> page to as rich as a universal app that's either a <i>Multi Page Application (MPA)</i>, <i>Single Page Application (SPA)</i>, or a hybrid of these, implementing <i>Server Side Rendering (SSR)</i>, <i>Client Side Rendering (CSR)</i>, or a hybrid of these, offline and <i>PWA</i> capabilities, etc. - this time, <i>without loosing the vanilla advantage</i>!
</summary>
 
Here's a glimpse of your Webflo app.

For when your application has a Server side.
+ The `public` directory for static files.
+ The `server` directory for server-side routing. (i.e. dynamic request handling on the server - in the case of Multi Page Applications, API backends, etc.)

  ```shell
  my-app
    ├── server/index.js
    └── public/logo.png
  ```
  
  And a typical `index.js` route handler has the following anatomy.

  ```js
  /**
  server
   ├── index.js
   */
  export default function(event, context, next) {
      if (next.pathname) {
          return next();  // <--------------------------------- http://localhost:3000/logo.png (or other non-root URLs)
      }
      return { title: 'Hello from Server' };  // <------------- http://localhost:3000/ (root URL)
  }
  ```
 
  > Above, you are handling requests for the root URL and allowing others to flow through to nested handlers or to the `public` directory. (Details ahead.)
  
  Response is a JSON (API) response when handler return value is jsonfyable. (As above for the root URL.)
  
  Or it ends up being rendered as a page response when there is an `index.html` file in the `public` directory that pairs with the route (and when the incoming request matches `text/html` in its `Accept` header).

  ```shell
  my-app
    ├── server/index.js
    └── public/index.html
  ```
  
  And a typical `index.html` page has the following anatomy.
  
  ```html
  <!--
  public
    ├── index.html
  -->
  <!DOCTYPE html>
  <html>
      <head>
          <link rel="stylesheet" href="/style.css" />   <!-- ---------------------- Application CSS -->
          <script type="module" src="/bundle.js"></script>   <!-- ----------------- Application JS bundle -->
          <template name="page" src="/bundle.html"></template>   <!-- ------------- Reusable HTML Templates and partials (Details ahead) -->
      </head>
      <body>...</body>
  </html>
  ```
 
  > These are regular HTML markup! And above, you're also leveraging HTML includes! (Details ahead.)

For when your application has a Client side.
+ The `client` directory for client-side routing. (i.e. dynamic request handling right in the browser - in the case of Single Page Applications, etc.)
+ The `worker` directory for, heck, Service Worker based routing! (i.e. dynamic request handling in the application Service Worker - in the case of Progressive Web Apps, etc.)

  ```shell
  my-app
    ├── client/index.js
    └── worker/index.js
  ```
  
  And in both cases, a typical `index.js` route handler has the following anatomy.

  ```js
  /**
  [client|worker]
   ├── index.js
   */
  export default function(event, context, next) {
      if (next.pathname) {
          return next();  // <--------------------------------- http://localhost:3000/logo.png (or other non-root URLs)
      }
      return { title: 'Hello from [Browser|Worker]' };  // <--- http://localhost:3000/ (root URL)
  }
  ```

  > Above, you are handling requests for the root URL and allowing others to flow through to nested handlers or to the network. (Details ahead.)

  Responses for *navigation* requests are rendered back into the current running page in the browser.
 
This and much more - ahead!
</details>

<details>
<summary><b>Build <i>future-proof anything</i></b> by banking more on web standards and less on abstractions! Webflo <i>just follows</i> where a native feature, standard, or conventional HTML, CSS or JS <i>just works</i>!</summary>

Here's a glimpse of the standards-based stack you get of Webflo!
 
For when your application involves routing:
+ [The Fetch Standard](https://fetch.spec.whatwg.org/), comprising of the [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request), [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response), and [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) interfaces, is used for all things *requests and responses* - across client, server, and Service Worker environments. ([Details ahead](#requests-and-responses))

  > This paves the way to using other native APIs as-is, when handling requests and responses. For example, if you sent an instance of the native [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData), [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob), [File](https://developer.mozilla.org/en-US/docs/Web/API/File), or [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) object from the browser side of your application, you'd be getting the same instance on the server side!

+ [WHATWG URL](https://url.spec.whatwg.org/) and [WHATWG URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) are used for all things *URL* and *URL pattern matching*, respectively - across client, server, and Service Worker environments. ([Details ahead](#))

For when your application involves pages and a UI:
+ [The HTML Standard](https://html.spec.whatwg.org/) is held for all things *markup* - across client, server, and Service Worker environments! Webflo is all about using conventional `.html`-based pages and templates, valid HTML syntax, etc. You are able to get away with a "zero-JavaScript" proposition or with *Progressive Enhancement* that makes do with "just-enough JavaScript"!

  > Your markup is also easily extendable with [OOHTML](https://github.com/webqit/oohtml) - a set of new features for HTML that makes it fun to hand-author your UI! Within OOHTML are [HTML Modules (`<template name="partials"></template>`)](https://github.com/webqit/oohtml#html-modules) and [HTML Imports (`<import template="partials"></import>`)](https://github.com/webqit/oohtml#html-imports), [Reactive Scripts (`<script type="subscript"></script>`)](https://github.com/webqit/oohtml#subscript) and more!

+ [WHATWG DOM](https://dom.spec.whatwg.org/) is universally available - not only on the client-side, but also on the server-side via [OOHTML-SSR](https://github.com/webqit/oohtml-ssr) - for all things *dynamic pages*: rendering, manipulation, interactivity, etc.

  > Your DOM is also easily enrichable with [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements), plus [Subscript Elements](https://github.com/webqit/oohtml#subscript) and [The State API (`document.state` and `element.state`)](https://github.com/webqit/oohtml#state-api) from OOHTML.

For when your application needs to give an app-like experience:
+ [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), extended with full support for routing, come into play for offline and [Progressive Web Apps (PWA)](https://web.dev/progressive-web-apps/) capabilities.
  
  > You are also able to easily make your web app installable by complementing this with a [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest).
 
This and more - ahead! For building web-native apps!
</details>

## Installation

Every Webflo project starts on an empty directory that you can create on your machine. The command below will make a new directory `my-app` from the terminal and navigate into it.

```shell
mkdir my-app
cd my-app
```

With [npm available on your terminal](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), run the following command to install Webflo to your project:

> System Requirements: Node.js 14.0 or later

```shell
$ npm i @webqit/webflo
```

The installation automatically creates a `package.json` file at project root, containing `@webqit/webflo` as a project dependency.

```json
{
  "dependencies": {
    "@webqit/webflo": "..."
  }
}
```

Other important definitions like project `name`, package `type`, and *aliases* for common Webflo commands will now also belong here.

```json
{
  "name": "my-app",
  "type": "module",
  "scripts": {
    "start": "webflo start::server --mode=dev",
    "generate": "webflo generate::client --compression=gz --auto-embed"
  },
  "dependencies": {
    "@webqit/webflo": "..."
  }
}
```

All is now set! The commands `npm start` and `npm run generate` will be coming in often during development.

### "Hello World!"

To be sure that Webflo is listening, run `npx webflo help` on the terminal. An overview of available commands will be shown.

If you can't wait to say *Hello World!* 😅, you can have an HTML page say that right now!
+ Create an `index.html` file in a new subdirectory `public`.
  
  ```shell
  public
    └── index.html
  ```
  
  ```html
  <!DOCTYPE html>
  <html>
      <head>
          <title>My App</title>
      </head>
      <body>
          <h1>Hello World!</h1>
          <p>This is <b>My App</b></p>
      </body>
  </html>
  ```
  
+ Start the Webflo server and visit `http://localhost:3000` on your browser to see your page. 😃

  ```bash
  $ npm start
  ```

## Concepts


+ [Handler Functions and Layout](#handler-functions-and-layout)
+ [Step Functions and Workflows](#step-functions-and-workflows)
+ [Pages, Layout and Templating](#pages-layout-and-templating)
+ [Client and Server-Side Rendering](#client-and-server-side-rendering)
+ [Requests and Responses](#requests-and-responses)

### Handler Functions and Layout

Whether building a *server-based*, *browser-based*, or *universal* application, Webflo gives us one consistent way to handle routing and navigation: using *handler functions*!

```js
/**
[server|client|worker]
 ├── index.js
 */
export default function(event, context, next) {
}
```

Each function receives an `event` object representing the current flow. (But details ahead.)

For *server-based* applications (e.g. traditional web apps and API backends), server-side handlers go into a directory named `server`.

```js
/**
server
 ├── index.js
 */
export default function(event, context, next) {
    return {
        title: 'Home | FluffyPets',
        source: 'server',
    };
}
```

> **Note**
> <br>The above function responds on starting the server - `npm start` on your terminal - and visiting http://localhost:3000.

For *browser-based* applications (e.g. Single Page Apps), client-side handlers go into a directory named `client`.

```js
/**
client
 ├── index.js
 */
export default function(event, context, next) {
    return {
        title: 'Home | FluffyPets',
        source: 'in-browser',
    };
}
```

> **Note**
> <br>The above function is built as part of your application's JS bundle on running the `npm run generate` command. (It is typically bundled to the file `./public/bundle.js`. And the `--auto-embed` flag in that command gets it automatically embedded on your `./public/index.html` page as `<script type="module" src="/bundle.js"></script>`.) Then it responds from right in the browser on visiting http://localhost:3000.

For *browser-based* applications that want to support offline usage via Service-Workers (e.g Progressive Web Apps), Webflo allows us to define equivalent handlers for requests hitting the Service Worker. These worker-based handlers go into a directory named `worker`.

```js
/**
worker
 ├── index.js
 */
export default function(event, context, next) {
    return {
        title: 'Home | FluffyPets',
        source: 'service-worker',
    };
}
```

> **Note**
> <br>The above function is built as part of your application's Service Worker JS bundle on running the `npm run generate` command. (It is typically bundled to the file `./public/worker.js`, and the main application bundle automatically connects to it.) Then it responds from within the Service Worker on visiting http://localhost:3000. (More details [ahead](#service-workers).)

So, depending on what's being built, an application's handler functions may take the following form (in part or in whole as with universal applications):

```shell
client
  ├── index.js
```

```shell
worker
  ├── index.js
```

```shell
server
  ├── index.js
```

Static files, e.g. images, stylesheets, etc, have their place in a files directory named `public`.

```shell
public
  ├── logo.png
```

### Step Functions and Workflows

Whether routing in the `/client`, `/worker`, or `/server` directory above, nested URLs follow the concept of Step Functions! These are parent-child layout of handlers that model an URL strucuture.

```shell
server
  ├── index.js --------------------------------- http://localhost:3000
  └── products/index.js ------------------------ http://localhost:3000/products
        └── stickers/index.js ------------------ http://localhost:3000/products/stickers
```

Each step calls a `next()` function to forward the current request to the next step (if any), is able to pass a `context` object along, and can *recompose* the return value.

```js
/**
server
 ├── index.js
 */
export default async function(event, context, next) {
    if (next.stepname) {
        let childContext = { user: { id: 2 }, };
        let childResponse = await next( childContext );
        return { ...childResponse, title: childResponse.title + ' | FluffyPets' };
    }
    return { title: 'Home | FluffyPets' };
}
```

```js
/**
server
 ├── products/index.js
 */
export default function(event, context, next) {
    if (next.stepname) {
        return next();
    }
    return { title: 'Products' };
}
```

This step-based workflow helps to decomplicate routing and gets us scaling horizontally as our application grows larger.

Workflows may be designed with as many or as few step functions as necessary; the flow control parameters `next.stepname` and `next.pathname` can be used at any point to handle the rest of an URL that have no corresponding step functions.

For example, it is possible to handle all URLs from the root handler alone.

```js
/**
server
 ├── index.js
 */
export default function(event, context, next) {
    // For http://localhost:3000/products
    if (next.pathname === 'products') {
        return { title: 'Products' };
    }

    // For http://localhost:3000/products/stickers
    if (next.pathname === 'products/stickers') {
        return { title: 'Stickers' };
    }
    
    // Should we later support other URLs like static assets http://localhost:3000/logo.png
    if (next.pathname) {
        return next();
    }
    
    // For the root URL http://localhost:3000
    return { title: 'Home' };
}
```

Webflo takes a *default action* when `next()` is called at the *edge* of the workflow - the point where there are no more child steps - as in the `return next()` statement above!

For workflows in **the `/server` directory**, the *default action* of `next()`ing at the edge is to go match and return a static file in the `public` directory.

So, above, should our handler receive static file requests like `http://localhost:3000/logo.png`, the expression `return next()` would get Webflo to match and return the logo at `public/logo.png`, if any; a `404` response otherwise.

```shell
my-app
  ├── server/index.js ------------------------- http://localhost:3000, http://localhost:3000/prodcuts, http://localhost:3000/prodcuts/stickers, etc
  └── public/logo.png ------------------------- http://localhost:3000/logo.png
```

> **Note**
> <br>The root handler effectively becomes the single point of entry to the application - being that it sees even static requests!

Now, for workflows in **the `/worker` directory**, the *default action* of `next()`ing at the edge is to send the request through the network to the server. (But Webflo will know to attempt resolving the request from the application's caching system built into the Service Worker.)

So, above, if we defined handler functions in the `/worker` directory, we could decide to either handle the received requests or just `next()` them to the server.

```js
/**
worker
 ├── index.js
 */
export default async function(event, context, next) {
    // For http://localhost:3000/about
    if (next.pathname === 'about') {
        return {
            name: 'FluffyPets',
            version: '1.0',
        };
    }
    
    // For http://localhost:3000/logo.png
    if (next.pathname === 'logo.png') {
        let response = await next();
        console.log( 'Logo file size:', response.headers.get('Content-Length') );
        return response;
    }
    
    // For every other URL
    return next();
}
```

Now we get the following layout-to-URL mapping for our application:

```shell
my-app
  ├── worker/index.js ------------------------- http://localhost:3000/about, http://localhost:3000/logo.png
  ├── server/index.js ------------------------- http://localhost:3000, http://localhost:3000/prodcuts, http://localhost:3000/prodcuts/stickers, etc
  └── public/logo.png ------------------------- http://localhost:3000/logo.png
```

> **Note**
> <br>Handlers in the `/worker` directory are only designed to see Same-Origin requests since Cross-Origin URLs like `https://auth.example.com/oauth` do not belong in the application's layout! These external URLs, however, benefit from the application's caching system built into the Service Worker.

For workflows in **the `/client` directory**, the *default action*  of `next()`ing at the edge is to send the request through the network to the server. But where there is a Service Worker layer, then that becomes the next destination.

So, above, if we defined handler functions in the `/client` directory, we could decide to either handle the navigation requests in-browser or just `next()` them, this time, to the Service Worker layer.

```js
/**
client
 ├── index.js
 */
export default async function(event, context, next) {
    // For http://localhost:3000/login
    if (next.pathname === 'login') {
        return {
            name: 'John Doe',
            role: 'owner',
        };
    }
    
    // For every other URL
    return next();
}
```

Our overall layout-to-URL mapping for this application now becomes:

```shell
my-app
  ├── client/index.js ------------------------- http://localhost:3000/login
  ├── worker/index.js ------------------------- http://localhost:3000/about, http://localhost:3000/logo.png
  ├── server/index.js ------------------------- http://localhost:3000, http://localhost:3000/prodcuts, http://localhost:3000/prodcuts/stickers, etc
  └── public/logo.png ------------------------- http://localhost:3000/logo.png
```

If there's anything we have now, it is the ability to break work down<a href="https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm"><small><sup>[i]</sup></small></a>, optionally across step functions, optionally between layers! 

### Pages, Layout and Templating

HTML files in the `public` directory, just like every other *public* file, are served statically when accessed directly - e.g. `http://localhost:3000/index.html`. But `index.html` files, specifically, are treated as *pages* by Webflo. They are, therefore, also accessible with path URLs like `http://localhost:3000`.

```shell
my-app
  └── public/index.html ----------------------- http://localhost:3000/index.html, http://localhost:3000
```

But, where an `index.html` file pairs with a route...

```shell
my-app
  ├── server/index.js
  └── public/index.html
```

...the route handler determines what happens.

```js
/**
server
 ├── index.js
 */
export default async function(event, context, next) {
    // For http://localhost:3000/index.html, etc
    if (next.pathname) {
        return next();
    }
    // For http://localhost:3000 specifically
    return { ... };
}
```

Now, we are able to access the data component of a route differently from its HTML component!

```shell
my-app
  └── server/index.js ------------------------- http://localhost:3000 -------------------- application/json
  └── public/index.html ----------------------- http://localhost:3000/index.html --------- text/html
```

But, we can also access the route in a way that gets the data rendered into the automatically-paired `index.html` file for a dynamic page response. We'd simply set the [`Accept`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept) header of the request to match `text/html` - e.g. `text/html`, `text/*`, `*/html`, `*/*`, and Webflo will automatically perform [Server-Side Rendering](#client-and-server-side-rendering). (Automatic pairing works the same for nested routes! But top-level `index.html` files are implicitly inherited down the hierarchy.)

> **Note**
> <br>The `Accept` header hint is already how browsers make requests on every page load. So, it just works!

Now, for Single Page Applications, subsequent navigations, after the initial page load, just asks for the data on destination URLs and perform [Client-Side Rendering](#client-and-server-side-rendering) on the same running document. Navigation is sleek and instant!

> **Note**
> <br>Unless disabled in [config](#spa_routing), SPA routing is automatically built into your app's JS bundle from the `npm run generate` command. So, it just works!

With no extra work, your application can function as either a *Multi Page App (MPA)* or a *Single Page App (SPA)*!

> **Note**
> <br>In a Single Page Application, all pages are based off a single `index.html` document. In a Multi Page Application, pages are individual `index.html`  documents - ideally. But, Server-Side Rendering makes it possible to serve the same, but dynamically-rendered, `index.html` document across page loads - essentially an SPA architecture hiding on the server. But, here, lets take Multi Page Applications for an individual-page architecture.

#### Layout and Templating Overview

In a Multi Page Application (with an individual-page architecture), each page is its own `index.html` document, and it is often necessary to have certain page sections - e.g. site header, footer, and sidebar, etc. - stay consistent across pages. These sections can be defined once and *imported* on every page.

```html
my-app
  └── public
      ├── about/index.html ------------------------- <!DOCTYPE html>
      ├── prodcuts/index.html ---------------------- <!DOCTYPE html>
      ├── index.html ------------------------------- <!DOCTYPE html>
      ├── header.html ------------------------------ <header></header> <!-- To appear at top of each index.html page -->
      └── footer.html ------------------------------ <footer></footer> <!-- To appear at bottom of each index.html page -->
```

In a Single Page Application, each page is the same `index.html` document, and it is often necessary to have the main page sections change on each route. These sections can be defined per-route and *imported* to the document on navigating to their respective URLs.

```html
my-app
  └── public
      ├── about/main.html -------------------------- <main></main> <!-- To appear at main area of index.html -->
      ├── prodcuts/main.html ----------------------- <main></main> <!-- To appear at main area of index.html -->
      ├── main.html -------------------------------- <main></main> <!-- To appear at main area of index.html -->
      └── index.html ------------------------------- <!DOCTYPE html>
```

This, in both cases, is templating - the ability to define HTML *partials* once, and have them reused multiple times. Webflo just concerns itself with templating, and the choice of a Multi Page Application or Single Page Application becomes yours! And heck, you can even have the best of both worlds in the same application - with an architecture we'll call [Multi SPA](#in-a-multi-spa-layout)! It's all a *layout* thing!

Now, with pages in Webflo being [DOM-based](#overview) (both client-side and [server-side](https://github.com/webqit/oohtml-ssr)), documents can be manipulated directly with DOM APIs, e.g. to replace or insert nodes, attributes, etc. But even better, templating in Webflo is based on the [HTML Modules](https://github.com/webqit/oohtml#html-modules) and [HTML Imports](https://github.com/webqit/oohtml#html-imports) features in [OOHTML](https://github.com/webqit/oohtml) - unless disabled in [config](#oohtml_support). These features provide a powerful declarative templating system on top of the standard [HTML `<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) element - with a *module*, *export* and *import* paradigm.

Here, you are able to define reusable contents in a `<template>` element...

```html
<head>
    <template name="page">
        <header exportgroup="header.html">Header Area</header>
        <main exportgroup="main.html">Main Area</main>
    </template>
</head>
```

...and have them imported anywhere on the root document using an `<import>` element:

```html
<body>
    <import template="page" name="header.html"></import>
    <import template="page" name="main.html"></import>
</body>
```

The *module* element - `<template name>` - is able to load its contents from a remote `.html` file that serves as a bundle:

```html
<!--
public
 ├── bundle.html
-->
<header exportgroup="header.html">Header Area</header>
<main exportgroup="main.html">Main Area</main>
```

```html
<head>
    <template name="page" src="/bundle.html"></template>
</head>
```

What [we'll see shortly](#bundling) is how multiple standalone `.html` files - e.g. those `header.html`, `footer.html`, `main.html` files above - come together into one `bundle.html` file for an application.

#### In a Multi Page Layout

In a Multi Page layout (as [above](#layout-and-templating-overview)), generic contents - e.g. header and footer sections, etc. - are typically bundled into one `bundle.html` file that can be embedded on each page of the application.

```html
<!--
public
 ├── index.html
-->
<!DOCTYPE html>
<html>
    <head>
        <script type="module" src="/bundle.js"></script>
        <template name="page" src="/bundle.html"></template>
    </head>
    <body>
        <import template="page" name="header.html"></import>
        <main>Welcome to our Home Page</main>
        <import template="page" name="footer.html"></import>
    </body>
</html>
```

```html
<!--
public/about
 ├── index.html
-->
<!DOCTYPE html>
<html>
    <head>
        <script type="module" src="/bundle.js"></script>
        <template name="page" src="/bundle.html"></template>
    </head>
    <body>
        <import template="page" name="header.html"></import>
        <main>Welcome to our About Page</main>
        <import template="page" name="footer.html"></import>
    </body>
</html>
```

```html
<!--
public/products
 ├── index.html
-->
<!DOCTYPE html>
<html>
    <head>
        <script type="module" src="/bundle.js"></script>
        <template name="page" src="/bundle.html"></template>
    </head>
    <body>
        <import template="page" name="header.html"></import>
        <main>Welcome to our Products Page</main>
        <import template="page" name="footer.html"></import>
    </body>
</html>
```

> **Note**
> <br>In this architecture, navigation is traditional - a new page loads each time. The `bundle.js` script comes with the appropriate OOHTML support level required for the imports to function.

#### In a Single Page Layout

In a Single Page layout (as [above](#layout-and-templating-overview)), page-specific contents - e.g. main sections - are typically bundled together into one `bundle.html` file that can be embedded on the document root. Nested routes end up as nested `<template>` elements to form the equivalent of their URL structure.

```html
<!--
public
 ├── bundle.html
-->
<template name="about">
    <main exportgroup="main.html">Welcome to our About Page</main>
</template>
<template name="products">
    <main exportgroup="main.html">Welcome to our Products Page</main>
</template>
<main exportgroup="main.html">Welcome to our Home Page</main>
```

Now, the `<main>` elements are each imported on navigating to their respective URLs. This time, Webflo takes care of setting the URL path as a global `template` attribute on the `<body>` element such that `<import>` elements that inherit this global attribute are resolved from its current value.

```html
<!--
public
 ├── index.html
-->
<!DOCTYPE html>
<html>
    <head>
        <script type="module" src="/bundle.js"></script>
        <template name="page" src="/bundle.html"></template>
    </head>
    <body template="page/"> <!-- This "template" attribute automatically changes to page/about or page/products as we navigate to http://localhost:3000/about and http://localhost:3000/products respectively -->
        <header></header>
        <import name="main.html"></import> <!-- This import element omits its "template" attribute so as to inherit the global one -->
        <footer></footer>
    </body>
</html>
```

> **Note**
> <br>In this architecture, navigation is instant and sleek - Webflo prevents a full page reload, obtains and sets data at `document.state.page` for the new URL, then sets the `template` attribute on the `<body>` element to the new URL path. The `bundle.js` script comes with the appropriate OOHTML support level required for the imports to function.

#### In a Multi SPA Layout

It's all a *layout* thing, so a hybrid of the two architectures above is possible in one application, to take advantage of the unique benefits of each! Here, you are able to have routes that are standalone `index.html` documents (MPA), which in turn, are able to act as a single document root for their subroutes (SPA).

```html
my-app
  └── public
      ├── about/index.html ------------------------- <!DOCTYPE html> <!-- Document root 1 -->
      ├── prodcuts
      │     ├── free/main.html --------------------------- <main></main> <!-- To appear at main area of document root 2 -->
      │     ├── paid/main.html --------------------------- <main></main> <!-- To appear at main area of document root 2 -->
      │     ├── main.html -------------------------------- <main></main> <!-- To appear at main area of document root 2 -->
      │     └── index.html ------------------------------- <!DOCTYPE html> <!-- Document root 2, (doubles as an SPA) -->
      ├── index.html ------------------------------- <!DOCTYPE html> <!-- Document root 0 -->
      ├── header.html ------------------------------ <header></header> <!-- To appear at top of each document root -->
      └── footer.html ------------------------------ <footer></footer> <!-- To appear at bottom of each document root -->
```

The above gives us three document roots: `/index.html`, `/about/index.html`, `/prodcuts/index.html`. The `/prodcuts` route doubles as a Single Page Application such that visiting the `/prodcuts` route loads the document root `/prodcuts/index.html` and lets Webflo SPA routing determine which of `/prodcuts/main.html`, `/prodcuts/free/main.html`, `/prodcuts/paid/main.html` is imported on a given URL.

Webflo ensures that only the amount of JavaScript for a document root is actually loaded! So, above, a common JavaScript build is shared across the three document roots alongside an often tiny root-specific build.

```html
<!--
public
 ├── products/index.html
-->
<!DOCTYPE html>
<html>
    <head>
        <script type="module" src="webflo.bundle.js"></script>
        <script type="module" src="/products/bundle.js"></script>
        <template name="pages" src="/bundle.html"></template>
    </head>
    <body>...</body>
</html>
```

```html
<!--
public
 ├── about/index.html
-->
<!DOCTYPE html>
<html>
    <head>
        <script type="module" src="webflo.bundle.js"></script>
        <script type="module" src="/about/bundle.js"></script>
        <template name="pages" src="/bundle.html"></template>
    </head>
    <body>...</body>
</html>
```

```html
<!--
public
 ├── index.html
-->
<!DOCTYPE html>
<html>
    <head>
        <script type="module" src="webflo.bundle.js"></script>
        <script type="module" src="/bundle.js"></script>
        <template name="pages" src="/bundle.html"></template>
    </head>
    <body>...</body>
</html>
```

The Webflo `generate` command automatically figures out a given architecture and generates the appropriate scripts for the application! It also factors into the generated scripts the location of each document root so that [all navigations to these roots are handled as a regular page load](#spa-navigation).

#### Bundling

Template `.html` files are bundled from the filesystem into a single file using the [OOHTML CLI](https://github.com/webqit/oohtml-cli) utility. On installing this utility, you may want to add the following scripts to your `package.json`.

```json
"generate:html": "oohtml bundle --recursive --auto-embed=page"
```

The `--recursive` flag gets the bundler to recursively bundle *subroots* in a [Multi SPA](#in-a-multi-spa-layout) layout - where subdirectories with their own `index.html` document. (Subroots are ignored by default.)

The `--auto-embed` flag gets the bundler to automatically embed the generated `bundle.html` file on the matched `index.html` document. A value of `page` for the flag ends up as the name of the *embed* template: `<template name="page" src="/bundle.html"></template>`.

> **Note**
> <br>If your HTML files are actually based off the `public` directory, you'll need to tell the above command to run in the `public` directory, either by [configuring the bundler](https://github.com/webqit/oohtml-cli#other-options), or by rewriting the command with a prefix: `cd public && oohtml bundle --recursive --auto-embed=page`. 

### Client and Server-Side Rendering

With pages in Webflo being [DOM-based](#overview) (both client-side and [server-side](https://github.com/webqit/oohtml-ssr)), we are able to access and manipulate documents and elements using familiar DOM APIs - e.g. to replace or insert contents, attributes, etc. Rendering in Webflo is based on this concept!

Here, Webflo simply makes sure that the data obtained from each route is available as part of the `document` object, such that it is accessible to our rendering logic as a `page` property on the `document.state` object - `document.state.page`. (The `document.state` object is always available unless disabled in config.)

So, we could embed a script on our page and render this data on the relevant parts of the document.

```html
<!--
public
 ├── index.html
-->
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <script>
         setTimeout(() => {
             console.log( document.state.page ); // { title: 'Home | FluffyPets' }
             let { title } = document.state.page;
             document.title = title;
         }, 0);
        </script>
    </head>
    <body></body>
</html>
```

Where your rendering logic is an external script, your `<script>` element would need to have an `ssr` Boolean attribute to get the rendering engine to fetch and run your script on the server.

```html
<!--
public
 ├── index.html
-->
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <script src="app.js" ssr></script>
    </head>
    <body></body>
</html>
```

From here, even the most-rudimentary form of rendering (using vanilla HTML and native DOM methods) becomes possible, and this is a good thing: you get away with less tooling until you absolutely need to add up on tooling!

However, since the `document` objects in Webflo natively support [OOHTML](https://github.com/webqit/oohtml) - unless disabled in [config](#oohtml_support), we are able to write reactive UI logic! Here, OOHTML makes it possible to embed reactive `<script>` elements (called [Subscript](https://github.com/webqit/oohtml#subscript)) right within HTML elements - where each expression automatically self-updates whenever references to data, or its properties, get an update!

```html
 <!--
 public
  ├── index.html
 -->
 <!DOCTYPE html>
 <html>
     <head>
         <title></title>
     </head>
     <body>
         <h1></h1>
         <script type="subscript">
          let { title } = document.state.page;
          document.title = title;
          let h1Element = this.querySelector('h1');
          h1Element.innerHTML = title;
         </script>
     </body>
 </html>
```

> **Note**
> <br>Now, this comes logical since logic is the whole essence of the HTML `<script>` element, after all! Compared to other syntax alternatives, this uniquely enables us to do all things logic in the actual language for logic - JavaScript. Then, OOHTML gives us more by extending the regular `<script>` element with the `subscript` type which gets any JavaScript code to be *reactive*!

Note that because these scripts are naturally reactive, we do not require any `setTimeout()` construct like we required earlier in the case of the classic `<script>` element. These expressions self-update as the values they depend on become available, removed, or updated - i.e. as `document.state` gets updated.

Going forward, we can get to write more succinct code! Using the [Namespaced HTML](https://github.com/webqit/oohtml#namespaced-html) feature in OOHTML, we could do without those `querySelector()` calls up there. Also, we could go on to use any DOM manipulation library of our choice; e.g jQuery, or even better, the jQuery-like [Play UI](https://github.com/webqit/play-ui) library.

```html
 <!--
 public
  ├── index.html
 -->
 <!DOCTYPE html>
 <html>
     <head>
         <title></title>
         <script src="/jquery.js"></script>
     </head>
     <body namespace>
         <h1 id="headline1"></h1>
         <script type="subscript">
          let { title } = document.state.page;
          document.title = title;
          let { headline1, headline2 } = this.namespace;
          $(headline1).html(title);
          $(headline2).html(title);
         </script>
     </body>
 </html>
```

Above, we've also referenced some currently non-existent element `headline2` - ahead of when it becomes added in the DOM! This should give a glimpse of the powerful reactivity we get with having OOHTML around on our document!

```js
setTimeout(() => {
    let headline2 = document.createElement('h2');
    headline2.id = 'headline2';
    document.body.append(headline2);
}, 1000);
```

Taking things further, it is possible to write class-based components that abstract away all logic! You can find a friend in [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)! Plus, your Custom Elements can function reactively using [SubscriptElement](https://github.com/webqit/oohtml#subscript) as base class!

#### Custom Render Functions

Custom `render` functions can be defined on a route (`export function render() {}`) to handle, or control, rendering.

```js
/**
server
 ├── index.js
 */
export default async function(event, context, next) {
    return { title: 'Home | FluffyPets' };
}
export async function render(event, data, next) {
    return `
    <!DOCTYPE html>
    <html>
        <head><title>FluffyPets</title></head>
        <body>
            <h1>${ data.title }</h1>
        </body>
    </html>
    `;
}
```

<details>
<summary>And, custom <code>render</code> functions can be step functions too, nested as necessary to form a <i>render</i> workflow.</summary>

```js
/**
server
 ├── index.js
 */
export async function render(event, data, next) {
    // For render callbacks at child step
    if (next.stepname) {
        return next();
    }
    return `
    <!DOCTYPE html>
    <html>
        <head><title>FluffyPets</title></head>
        <body>
            <h1>${ data.title }</h1>
        </body>
    </html>
    `;
}
```

> **Note**
> <br>Typically, though, child steps do not always need to have an equivalent`render` callback being that they automatically inherit rendering from their parent or ancestor.
</details>

But, custom render functions do not always need to do as much as entirely handle rendering. It is possible to get them to trigger Webflo's native rendering and simply modify the documents being rendered. Here, you would simply call the `next()` function to advance the *render workflow* into Webflo's default rendering. A `window` instance is returned containing the document being rendered.

```js
/**
server
 ├── index.js
 */
export default async function(event, context, next) {
    return { title: 'Home | FluffyPets' };
}
export async function render(event, data, next) {
    let window = await next( data );
    let { document } = window;
    console.log( document.state.page ); // { title: 'Home | FluffyPets' }
    return window;
}
```

Custom render functions must return a value, and `window` objects are accepted. (Actually, any object that has a `toString()` method can be returned.)

### Requests and Responses

Routes in Webflo can be designed for different types of request/response scenarios. Webflo does the heavy lifting on each request/response flow!

#### Scenario 1: Static File Requests and Responses

Static file requests like `http://localhost:3000/logo.png` are expected to get a file response. These requests are automatically handled by Webflo when `next()`ed forward by route handlers, or where there are no route handlers.
+ On the server, Webflo serves files from the `public` directory. File conents along with the appropriate headers like [`Content-Type`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type), [`Content-Length`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Length), etc. are returned as an instance of `event.Response`. Where a request has an [`Accept-Encoding`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding) header set (e.g. `gzip`, `br`) and there exists a matching *compressed version* of the said file on the file system (e.g. `./public/logo.png.gz`, `./public/logo.png.br`), the compressed version is served and the appropriate [`Content-Encoding`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding) response header is set.
+ On the client, Webflo serves static files from the network, or from the application cache, where available.

#### Scenario 2: API Requests and Responses

JSON (API) requests (requests made with an [`Accept`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept) header that matches `application/json`) are expected to get a JSON (API) response (responses with a [`Content-Type`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) header of `application/json`). Webflo automatically responds by simply jsonfying workflow return values which are usually plain objects, or other jsonfyable types - `string`, `number`, `boolean`, `array`.
+ Routes intended to be accessed this way are expected to return a jsonfyable value (or an instance of `event.Response` containing same) from the workflow.
+ Workflow responses that are an instance of `event.Response` with a `Content-Type` header already set are sent as-is.

#### Scenario 3: Page Requests and Responses

HTML page requests (requests made to the server with an [`Accept`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept) header that matches `text/html`) are expected to get a HTML response (responses with a [`Content-Type`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) header of `text/html`). Webflo automatically responds by rendering the workflow return value into an HTML response - via [Server-Side Rendering](#client-and-server-side-rendering).
+ Routes intended to be accessed this way are expected to return a plain object (or an instance of `event.Response` containing same) from the workflow in order to be renderable.
+ Workflow responses that are an instance of `event.Response` with a `Content-Type` header already set are sent as-is, and not rendered.

#### Scenario 4: Single Page Navigation Requests and Responses

In a Single Page Application layout, every navigation event (page-to-page navigation, history back and forward navigation, and form submissions) is expected to initiate a request/response flow without a full page reload, since the destination URLs are often based off the already loaded document. The Webflo client JS intercepts these navigation events and generates the equivalent request object with an `Accept` header of `application/json`, so that data can be obtained as a JSON object ([scenerio 2 above](#scenario-2-api-requests-and-responses)) for [Client-Side Rendering](#client-and-server-side-rendering).

The generated request also [hints the server](#custom-redirect-responses) on how to return cross-SPA redirects (redirects that will point to another origin, or to another SPA root (in a [Multi SPA](#in-a-multi-spa-layout) layout)) so that it can be handled manually by the client. The following headers are set: `X-Redirect-Policy: manual-when-cross-spa`, `X-Redirect-Code: 200`.
+ Same-SPA redirects are sent as-is, and the Webflo client JS receives and renders the final data and updates the address bar with the final URL.
+ Cross-SPA/cross-origin redirects are communicated back, as hinted, and the destination URL is opened as a fresh page load.

#### Scenario 5: Range Requests and Responses

In all cases, where a request specifies a [`Range`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range) header, Webflo automatically slices the response body to satisfy the range, and the appropriate [`Content-Range`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range) response header is set.
+ Workflow responses that are an instance of `event.Response` with a `Content-Range` header already set are sent as-is.

#### Other Requests and Responses

Workflows may return any other data type, e.g. an instance of the native [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData), [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob), [File](https://developer.mozilla.org/en-US/docs/Web/API/File), or [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream), etc., or an instance of `event.Response` containing same - usually on routes that do not double as a page route. Webflo tries to send these along with the appropriate response headers.

> **Note**
> <br>The fact that all requests, even static file requests, are seen by route handlers, where defined, means that they get a chance to dynamically generate the responses that the client sees!

#### Custom Redirect Responses

It is possible to hint the server on how to serve redirect responses. The response code for these redirects could be substituted with a non-rediret status code so that it can be recieved as a normal response and handled manually. The following pair of headers make this possible: `X-Redirect-Code`, `X-Redirect-Policy`.
+ The `X-Redirect-Code` can be any valid (but preferably, 2xx) HTTP status code. This is the response code that should be used instead of the actual redirect code.
+ The `X-Redirect-Policy` header can be any of `manual` - treat all redirects as manual, `manual-if-cross-origin` - treat cross-origin redirects as manual, `manual-if-cross-spa` - treat cross-SPA redirects as manual.

Re-coded redirects have the standard `Location` header, and an `X-Redirect-Code` response header containing the original redirect status code.

#### Failure Responses

Where workflows return `undefined`, a `Not Found` status is implied.
+ On the server side, a `404` HTTP response is returned.
+ On the client-side, the initiating document in the browser has its `document.state.page` emptied. The error is also exposed on the [`document.state.network.error`](#the-documentstatenetwork-object) property.

Where workflows throw an exception, an *error* status is implied.
+ On the server side, the error is logged and a `500` HTTP response is returned.
+ On the client-side, the initiating document in the browser has its `document.state.page` emptied. The error is also exposed on the [`document.state.network.error`](#the-documentstatenetwork-object) property.

### Webflo Applications

In just a few concepts, Webflo comes ready for any type of application! Now, additional details of a Webflo app - depending on the type - are covered in the following sections.

#### Application State

For all things application state, Webflo leverages the [State API](https://github.com/webqit/oohtml#state-api) that's natively available in OOHTML-based documents - both client-side and server-side. This API exposes an application-wide `document.state` object and a per-element `element.state` object. And these are *live* read/write objects that can be observed for property changes using the [Observer API](https://github.com/webqit/observer). It comes off as the simplest approach to state and reactivity!

> **Note**
> <br>The State API is not available when the OOHTML support level in config is switched away from `full` and `scripting`.

##### The `document.state.page` Object

This property represents the data obtained from route handers on each navigation. Webflo simply exposes this data and lets the page's [rendering logic](#client-and-server-side-rendering), or other parts of the application, take over.

```js
Observer.observe(document.state, 'page', e => {
    console.log('Current page data is: ', e.value);
});
```

##### The `document.state.url` Object

This is a *live* object that reperesents the properties of the application URL at any point in time. The object exposes the same URL properties as with the [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) API, but as *live* properties that can be observed as navigation happens, and modified to initiate navigation - all using the [Observer API](https://github.com/webqit/observer).

```js
console.log(document.state.url) // { hash, host, hostname, href, origin, password, pathname, port, protocol, search, searchParams, username }
```

```js
Observer.observe(document.state.url, 'hash', e => {
    console.log(document.state.url.hash === e.value); // true
});
```

```js
// Navigates to "/login#form" as if a link was clicked
document.addEventListener('synthetic-navigation', e => {
    Observer.set(document.state.url, 'href', '/login#form');
});

// Or...
document.addEventListener('synthetic-navigation', e => {
    Observer.set(document.state.url, { pathname: '/login', hash: '#form' });
});

console.log(document.state.url.hash); // #form
```

There is also the *convenience* `query` property that offers the URL parameters as a *live* object.

```js
// For URL: http://localhost:3000/login?as=student
console.log(document.state.url.query.as) // student

// Re-rewrite the URL and initiate navigation by simply modifying a query parameter
document.addEventListener('synthetic-navigation', e => {
    Observer.set(document.state.url.query, 'as', 'business');
});
```

#### Client-Side Applications

Web pages that embed the Webflo client JS bundle deliver a great user experience.
+ **First-paint-ready.** On the first page request, you get a [server-rendered](#client-and-server-side-rendering) HTML page that's optimized for the first paint of your application.
+ **Fluid and app-like.** On being loaded, the state of the application is restored through hydration, and [subsequent navigations](#spa-navigation) are sleek and instant, while performing [Client-Side Rendering](#client-and-server-side-rendering).

For these client-side applications, the `npm run generate` command does both the building and embedding of the script for each document root in the application.

##### SPA Navigation

Unless disabled in [config](#spa_navigation), it is factored-in at build time for the application client JS to be able to automatially figure out when to intercept a navigation event and prevent a full page reload, and when not to. It follows the following rules:
+ When it ascertains that the destination URL is based on the current running `index.html` document in the browser (an SPA architecture), a full page reload is prevented for *soft* navigation. But where the destination URL points out of the current document root (a [Multi SPA](#in-a-multi-spa-layout) architecture), navigation is allowed as a normal page load, and a new page root is loaded.
+ If navigation is initiated with any of the following keys pressed: Meta Key, Alt Key, Shift Key, Ctrl Key, navigation is allowed to work the default way - regardless of the first rule above.
+ If navigation is initiated from a link element that has the `target` attribute, or the `download` attribute, navigation is allowed to work the default way - regardless of the first rule above.
+ If navigation is initiated from a form element that has the `target` attribute, navigation is allowed to work the default way - regardless of the first rule above.

> To entirely disable SPA navigation in config where necessary, run `webflo config client` and follow the prompt.

##### SPA State

In addition to [the universal concept of state](#application-state) of a Webflo application, state on the client side also includes the following aspects of the client-side lifecycle that can be used to provide visual cues on the UI.
  
###### The `document.state.network` Object

This is a *live* object that exposes the network activity and network state of the application.

```js
console.log(document.state.network) // { requesting, remote, error, redirecting, online, }
```

+ **`network.requesting`: `null|Object`** - This property tells when a request is ongoing, in which case it exposes the `params` object used to initiate the request.
+ **`network.remote`: `null|String`** - This property tells when a remote request is ongoing - usually the same navigation requests as at `network.requesting`, but when not handled by any client-side route handlers, or when `next()`ed to this point by route handlers. The `remote` property also goes live when a route handler calls the special `fetch()` function they receive on their fourth parameter.
+ **`network.error`: `null|Error`** - This property tells when a request is *errored* in which case it contains an `Error` instance of the error. For requests that can be retried, the `Error` instance also has a custom `retry()` method.
+ **`network.redirecting`: `null|String`** - This property tells when a client-side redirect is ongoing - see [Scenario 4: Single Page Navigation Requests and Responses](#scenario-4-single-page-navigation-requests-and-responses) - in which case it exposes the destination URL.
+ **`network.online`: `Boolean`** - This property tells of [the browser's ability to connect to the network](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine).

Now, being a *live* object means that `document.state.network` can be observed using the [Observer API](https://github.com/webqit/observer).

```js
// Visualize the network state
let onlineVisualizer = changes => {
    changes.forEach(e => {
        console.log(e.name, ':', e.value);
    });
};
Observer.observe(document.state.network, onlineVisualizer);
// Or: Observer.observe(document, [ ['state', 'network'] ], onlineVisualizer, { subtree: true });
```

```js
// Visualize the 'online' property
let onlineVisualizer = e => {
    console.log('You are ', e.value ? 'online' : 'offline');
};
Observer.observe(document.state.network, 'online', onlineVisualizer);
// Or: Observer.observe(document.state, [ ['network', 'online'] ], onlineVisualizer);
```

```js
// Catch request errors; attempt a retry
Observer.observe(document.state.network, 'error', e => {
    if (!e.value) return;
    console.error(e.value.message);
    if (e.value.retry) {
        console.error('Retrying...');
        e.value.retry();
    }
});
```

###### Form Actions

When navigation occurs [via form submissions](#scenario-4-single-page-navigation-requests-and-responses), the form element and the submit button are made to go on the *active* state. For both of these elements, the Webflo client simply sets the `element.state.active` to `true` while the request is ongoing, then `false`, on completion.

##### Service Workers

Webflo client-side applications are intended to provide an app-like-first experience. So unless disabled in [config](#enable_service_worker), a [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) is built as part of your application on running the `npm run generate` command. You may define [route handlers in the `/worker` directory](#handler-functions-and-layout) of your application, and these will be built into the service worker to handle Same-Origin requests of the application. Where there are no *worker* handlers, or where they forward these requests, the request is fetched, either from the cache, or from the network, depending on the fetching strategy built into the service worker.

###### Fetching Strategy

+ **Network First** - This strategy tells the Service Worker to always attempt fetching from the network first for given resources, before fetching from the cache. On every successful network fetch, a copy of the response is saved to the cache for next time. (This is good for files that need to be fresh to the user on a "best effort" basis.) Unless [changed](#default_fetching_strategy), this is Webflo's default fetching strategy. When not the default strategy, a list of specific files that should be fetched this way can be [configured](#network_first_urls).
+ **Cache First** - This strategy tells the Service Worker to always attempt fetching from the cache first for given resources, before fetching from the network. After serving a cached response, or where not found in cache, a network fetch happens and a copy of the response is saved to the cache for next time. (This is good for files that do not critially need to be fresh to the user.) When not the default strategy, a list of specific files that should be fetched this way can be [configured](#cache_first_urls).
+ **Network Only** - This strategy tells the Service Worker to always fetch given resources from the network only. They are simply not available when offline. (This is good for files that critially need to be fresh to the user.) When not the default strategy, a list of specific files that should be fetched this way can be [configured](#network_only_urls).
+ **Cache Only** - This strategy tells the Service Worker to always fetch given resources from the cache only. (This is good for files that do not change often.) When not the default strategy, a list of specific files that should be fetched this way can be [configured](#cache_only_urls). The listed files are pre-cached ahead of when they'll be needed - and are served from the cache each time. (Pre-caching happens on the one-time `install` event of the Service Worker.)

In all cases above, the convention for specifying files for a strategy accepts [URL patterns](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) - against which files can be matched on the fly. For example, to place all files in an `/image` directory on the *Cache First* strategy, the pattern `/image/*` (or `/image/**`, to include nested directories) can be used. To place all `.svg` files in an `/icons` directory on the *Cache Only* strategy, the pattern `/icons/*.svg` (or `/icons/**.svg`, to include nested directories) can be used. (Specifically for the *Cache Only* strategy, patterns are resolved at Service Worker build-time.)

#### API Backends

In Webflo, an API backend is what you, in essence, come off with with server-side route handlers.

```js
/**
server
 ├── index.js
 */
export default function(event, context, next) {
    if (next.pathname) return next();
    return { ... };
}
```

You are always able to lay out your route handlers in the structure for a formalized REST API.

```shell
server
 ├── index.js
 ├── api/v1/index.js
 └── api/v1/products/index.js
```

And if you will partition your backend for both page routes and a formalized REST API...

```shell
server
 ├── index.js                  ──┐
 ├── cart/index.js               ├── Page Routes
 ├── products/index.js         ──┘
 ├── api/v1/index.js           ──┐
 ├── api/v1/orders/index.js      ├── REST API
 └── api/v1/products/index.js  ──┘
```

...you could get your page routes to run off your REST API by re-routing your `next()` calls to consume the appropriate API route.

```js
/**
server
 ├── cart/index.js
 */
export default async function(event, context, next) {
    if (next.pathname) {
        return next();
    }
    // Items to display in cart are in the "/api/v1/orders" route
    let cartItems = await next(context, `/api/v1/orders?user_id=1`);
    return { title: 'Your Cart', ...cartItems };
}
```

This way, there is one source of truth for your application - both when visiting from a page and from a REST API.

#### Static Sites

> TODO

### Workflow API

> TODO

### Command Line Interface

> TODO

## Getting Involved

All forms of contributions and PR are welcome! To report bugs or request features, please submit an [issue](https://github.com/webqit/webflo/issues). For general discussions, ideation or community help, please join our github [Discussions](https://github.com/webqit/webflo/discussions).

## License

MIT.

