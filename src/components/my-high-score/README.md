# &lt;my-high-score&gt;

A web component displaying the five best results from a JSON object.

## Styling

The high score container div is styleable using the id `my-high-score`

The table is styleable using the id `scoreTable`.

## Attributes

Lägg till!!

How to use:

## In HTML
Import the component module in the head element.
```HTML
<script type="module" src="js/components/my-high-score/index.js"></script>
```

Add the element in the HTML code.
```HTML
<my-high-score></my-high-score>
```

## In Javascript
Import the component in index.js
```Javascript
import './components/my-high-score/'
```
Create the element using the dom API.
```Javascript
const highScore = document.createElement('my-high-score')
```