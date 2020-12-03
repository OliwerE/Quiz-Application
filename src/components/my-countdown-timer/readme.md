# &lt;my-countdown-timer&gt;

A webcomponent that counts down from 20 or from an attribute value.

## Styling

The countdown container is styleable using the id `my-countdown-timer-container`.

## Attributes

### `limit`

A number the component is going to count down from. If it's not specified the component is going to count down from 20.

### `timeRanOut`

An element were the method `myCountdownTimerRanOutOfTime()` exists. If it's not specified the component uses `my-quiz`. This method is called when the component reaches zero.

How to use:

## In HTML
Import the component module in the head element.
```HTML
<script type="module" src="js/components/my-countdown-timer/index.js"></script>
```

Add the element in the HTML code.
```HTML
<my-countdown-timer></my-countdown-timer>
```

## In Javascript
Import the component in index.js
```Javascript
import './components/my-countdown-timer/'
```
Create the element using the dom API.
```Javascript
const countdown = document.createElement('my-countdown-timer')
```