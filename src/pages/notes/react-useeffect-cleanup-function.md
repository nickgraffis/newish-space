---
title: React useEffect Cleanup Function
date: 2021-09-27T06:24:43.417Z
lang: en
---
Have you ever goten this error before?

```
Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

This error comes from a useEffect hook that is called after the component is unmounted. To fix this, you can use a cleanup function that cleans up all subscriptions or timers that are no longer needed.

```ts
useEffect(() => {
  const loadingTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
    loader && setDisplayLoading(true);
  }, 1000);

  return function cleanup() {
    clearTimeout(loadingTimer);
  };
}, []);
```
