---
title: Click Away Directive in Angular
date: 2021-08-30T03:23:16.519Z
lang: en
description: A simple implementation of a click away directive in Angualar, who's purpose is to fire an event whenever the user clicks outside of an element.
tags: angular, ui, clickaway, typescript, ts
---

# Click Away Directive in Angular
**Here is a pretty simple implementation of a click away directive. So when you click anywhere outside of the element, an event will fire.**

```ts
import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef: ElementRef) {
    }
    @Output()
    public clickOutside = new EventEmitter<MouseEvent>();
    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(event);
        }
    }
}
```

We set up the `@HotListener` to listen for clicks on the document, and access the `event` and `event.target` from the click. We then setup on the `onClick` method to check if the target element, which we pass in as the second argument in our `@HotListener`, is not contained in the element we are listening for clicks on. If it is not, we emit the event.

Implementation inside your `html` would look like this.

```html
<button (clickOutside)="doSomethingWhenYouDontClickOnMe()">Don't Click Me</button>
```

We'll also need to declare out class with a `.d.ts` file.

```ts
import { ElementRef, EventEmitter } from '@angular/core';
export declare class ClickOutsideDirective {
    private _elementRef;
    constructor(_elementRef: ElementRef);
    clickOutside: EventEmitter<MouseEvent>;
    onClick(event: MouseEvent, targetElement: HTMLElement): void;
}
```

This is currently in use inside [Model Match](https://modelmatch.com). 