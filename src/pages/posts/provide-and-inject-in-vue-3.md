---
title: Provide and Inject in Vue 3
date: 2021-08-21T20:08:53.000-07:00
lang: en
tags: vue, state, lifecycle, provide, inject
description: Building a Vue Alert Component in Vue 3 using the provide and inject directives.
---

# Typescript Demo

```ts twoslash {1-4} title="vite.config.ts" meta data
// @errors: 2322
type AlertType = 'success' | 'info' | 'warning' | 'danger';

// ---cut---
const alertTypes: AlertType[] = ['success', 'info', 'warning', 'danger'];
const alertClasses: { [key: string]: string } = {
  success: 'alert-success',
  info: 'alert-info',
  warning: 'alert-warning',
  danger: 'alert-danger'
};

console.log(alertClasses)

const addAlertClass = (type: AlertType) => alertClasses[type] = 0;

for (const type of alertTypes) {
  // ...
}

```

# Go Example
```go {1-4}
func (a *Alert) AddClass(alertType AlertType) {
  a.Class = a.Class + " " + alertClasses[alertType]
}

func main() {
  a := &Alert{
    Class: "alert-success",
    Message: "This is a success message",
  }
  a.AddClass("success")
  a.AddClass("info")
  a.AddClass("warning")
  a.AddClass("danger")
}
```

# CSS/HTML Example

```css
.style {
  coolor: #fff;
}

pre {
  font-size: 1.5rem;
}
```

```html
<div class="style">
  <h1>This is a heading</h1>
  <p>This is a paragraph</p>
  <pre>This is a preformatted text</pre>
</div>
```

# Bash

```bash
$ echo "Hello World"  
Hello World
```

# Python
```python
def hello():
  print("Hello World")


```

# JSON
```json
{
  "name": "John Doe",
  "age": 30,
  "address": {
    "street": "123 Main St.",
    "city": "Anytown",
    "state": "CA",
    "zip": "12345"
  }
}
```

#