# &lt;my-nickname&gt;

A web component that stores a name (string) up to 20 characters in the local storage using the key my-nickname. The component restarts if the input field is empty and gives user an alert.

## Styling

The input field is styleable using the id `myInput`.

The continue button is styleable using the id `setupBtn`.

## Events

When the user press enter or click on the button, the element component set the input value in the local storage using the my-nickname key. Then the element removes itself.

How to use:

## In HTML
Import the component module in the head element.
```HTML
<script type="module" src="js/components/my-nickname/index.js"></script>
```

Add the element in the HTML code.
```HTML
<my-nickname></my-nickname>
```

## In Javascript
Import the component in index.js
```Javascript
import './components/my-nickname/'
```
Create the element using the dom API.
```Javascript
const nickname = document.createElement('my-nickname')
```