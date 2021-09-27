---
title: Handle HTTP response errors with fetch API
date: 2021-09-02T06:27:17.945Z
lang: en
---
The fetch API doesn't throw errors on HTTP response errors.

```js
fetch('https://rickandmortyapi.com/api/character/285379035')
.then(res => console.log(res)) // This is a 404 response
.then(res => res.json())
.then(res => console.log(res)) // Returns { error: 'Not Found' }
.catch(err => console.log(err.toString())) // Wont catch here though
```

The key is in some of these methods:
```js
{
  ...rawFetchResponse,
  ok: false,
  redirected: false,
  status: 404,
  statusText: "",
  text: function text() {
    [native code]
  }
}
```
So we can do something like this to catch errors:
```js
fetch('https://rickandmortyapi.com/api/character/285379035')
.then(res => {
  if (!res.ok) throw new Error(res.statusText)
  res.json()
})
.then(res => console.log(res)) // Wont get here because an error was thrown
.catch(err => console.log(err.toString())) // Will now catch the error
```
