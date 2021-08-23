---
title: Provide and Inject in Vue 3
date: 2021-08-21T20:08:53.000-07:00
lang: en
tags: vue, state, lifecycle, provide, inject
description: Building a Vue Alert Component in Vue 3 using the provide and inject directives.
---

# The Alert Component

This is a lot of code coming right now, but I think that 

```vue
<script lang='ts'>
  //Ref describing weather or not the alert is visible
  const alertShowing = ref<boolean>(false)

  //Ref describing the innerHTML of the alert
  const innerHTML = ref<string>(``)

  //Ref describing the fade class we are going to be used
  const fadeClass = ref('animate-fade-in')

  //A timer to fade in and out the alert
  let timer: ReturnType<typeof setTimeout>

  //The function that will fade in and out the alert
  const vueAlert = (innerHTML: string) => { 
    //When we want to make an alert, reset the timer
    clearTimeout(timer)

    //And set another timer to change the class from fade in to fade out
    let classTimer: ReturnType<typeof setTimeout>

    //When we make the alert visible we start the clock to when we will fade out
    timer = setTimeout(() => {
      //We need to start by clearing the class change timer
      clearTimeout(classTimer)

      //Set the fadeClass ref's value to now fade out 
      fadeClass.value = 'animate-fade-out'

      //Start the timer for when we will actually stop showing the timer, but this gives us 800ms so the fade out animation can finish
      classTimer = setTimeout(() => alertShowing.value = false, 800)
    }, 2000)

    //Set the fadeClass back to fade in
    fadeClass.value = 'animate-fade-in'

    //Show the alert again
    alertShowing.value = true

    //Set the innerHTML ref's value to the new message
    innerHTML.value = innerHTML
  }

  //The magic provider. We set the provider to the vueAlert function
  provide('vueAlert', vueAlert)
</script>
```
