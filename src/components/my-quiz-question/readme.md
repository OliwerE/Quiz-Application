# &lt;my-quiz-question&gt;

A web component that get and post data using the fetch-API. This component requires the following compontents: my-quiz, my-nickname, my-countdown-timer, my-high-score.

## Styling

The question title is styleable using the id `questionTitle`.

The diplayed question container is styleable using the id `displayedQustion`.

The question h3 element is styleable using the id `question`.

the question input element is styleable using the id `questionInput`.

the question input button is styleable using the id `qnswerBtn`.

the form is styleable using the id `altForm`.

the altForm button container is styleable using the id `altFormBtns`.

the altForm continue button is styleable using the id `continueBtn`.

the response message is styleable using the id `response`.

## Attributes

### `startUrl`

The url used to get the first question.

How to use:

## In HTML
Import the component module in the head element.
```HTML
<script type="module" src="js/components/my-quiz/index.js"></script>
<script type="module" src="js/components/my-quiz-question/index.js"></script>
<script type="module" src="js/components/my-nickname/index.js"></script>
<script type="module" src="js/components/my-countdown-timer/index.js"></script>
<script type="module" src="js/components/my-high-score/index.js"></script>
```

Add the element in the HTML code.
```HTML
<my-quiz></my-quiz>
```

## In Javascript
Import the component in index.js
```Javascript
import './components/my-quiz/'
import './components/my-quiz-question/'
import './components/my-nickname/'
import './components/my-countdown-timer/'
import './components/my-high-score/'
```
Create the element using the dom API.
```Javascript
const highScore = document.createElement('my-quiz')
```