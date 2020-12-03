# &lt;my-quiz&gt;

The main component of the quiz. Controls communication with the generic components (countdown timer, high score and nickname). The component also counts the total time to answer all questions and creates the `my-quiz-question` element. This component requires the following compontents: my-quiz-question, my-nickname, my-countdown-timer, my-high-score.

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