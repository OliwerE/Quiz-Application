/**
 * module....
 *
 * @author // TODO: YOUR NAME <YOUR EMAIL>
 * @version 1.0.0
 */

/**
 * Define template.
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
#my-high-score {
    background-color: green;
    width: 250px;
    height: 250px;
    margin: 0 auto;
}
#my-high-score h1 {
  text-align: center;
}
</style>
<div id="my-high-score">
<h1>HIGH SCORE:</h1>
<ol>
  <li id="top0"></li>
  <li id="top1"></li>
  <li id="top2"></li>
  <li id="top3"></li>
  <li id="top4"></li>
</ol>
</div>
`


/**
 * Define custom element.
 */
customElements.define('my-high-score',
  class extends HTMLElement {

  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

  }

  static get observedAttributes () {

  }

  connectedCallback () {
    console.log('-----MY HIGH SCORE STARTAR!!------')
    this.compareResult()
  }

  attributeChangedCallback (name, oldValue, newValue) {

  }

  disconnectedCallback () {

  }

  compareResult () {
    var nickname = window.localStorage.getItem('my-nickname') // får namnet, fixa attribut för att ändra vilken key namnet finns i (om annan komponent skulle användas!)
    var newScore = window.localStorage.getItem('my-new-high-score') // nya higshcore ändra även denna med attribut!
    var currentHighScoreList = window.localStorage.getItem('my-high-score')

    if (currentHighScoreList === null) { // om local storage inte har high score lista
      
      // skapar resultatets array
      var newScoreArray = []
      
      console.log(newScoreArray)

      //json object
      var playerScoreObject = {}

      playerScoreObject.username = nickname
      playerScoreObject.score = newScore

      console.log('----JSON-----')
      console.log(playerScoreObject)
      console.log('----JSON-----')

      newScoreArray.push(playerScoreObject)
      console.log(newScoreArray)

      console.log('gör om array till string-----------')
      var stringArray = JSON.stringify(newScoreArray)
      console.log(stringArray)

      // skapar array string i local storage:
      window.localStorage.setItem('my-high-score', stringArray)

       // tar bort:
      playerScoreObject = {}
      var newScoreArray = []
    } else {
      console.log('är i else!')
      var currentHighScore = window.localStorage.getItem('my-high-score')
      var parseCurrentHighScore = JSON.parse(currentHighScore)
      var newPlayerScore = {}

      newPlayerScore.username = nickname
      newPlayerScore.score = newScore

      parseCurrentHighScore.push(newPlayerScore)

      var scoreString = JSON.stringify(parseCurrentHighScore)

      console.log(newPlayerScore)
      console.log(parseCurrentHighScore)
      console.log('striiing')
      console.log(scoreString)
      
      window.localStorage.setItem('my-high-score', scoreString) // aktivera sen!
      newPlayerScore = {}


    }

    var storedData = window.localStorage.getItem('my-high-score')

    var storedScore = JSON.parse(storedData)
    var lengthStoredScore = Object.keys(storedScore).length


    console.log('the array----------------')
    console.log(storedScore)
    console.log(lengthStoredScore)

    //hantera ordning: 
    if (lengthStoredScore <= 5) {
      console.log('5 eller mindre scores! endast sortera!')

      console.log(storedScore[0].score)
      //console.log(storedScore[1].score)
    }

    // sorterar ordningen i array baserat på spelarnas score
    var sorting = storedScore.sort(function (a, b) {
      return a.score - b.score
    })

    console.log(sorting)

    // om mer än 5 scores
    if (lengthStoredScore > 5) {
      console.log('-------mer än 5 startar-------')
      console.log('DEBUG det är mer än 5 scores! klipper ut 5 första (alla redan sorterade)')
      storedScore = storedScore.splice(0, 5) // om det finns mer än 5 scores ersätts storedScore med endast 5 första score objekten! (efter att de sorterats i rätt ordning!)
      lengthStoredScore = 5 // tar bort bugg
      console.log(storedScore)
      console.log('-------mer än 5 slutar-------')
      // skriver över local storage med endast 5 scores:
      var stringifyFiveScores = JSON.stringify(storedScore)

      window.localStorage.setItem('my-high-score', stringifyFiveScores)
    }


    // lägg till namn och score i listan:

    for (let i = 0; i < lengthStoredScore; i++) { // varje score skrivs in i high score!
      var topNumber = '#top' + i
      console.log(topNumber)
      var topElement = this.shadowRoot.querySelector(topNumber)
      var topText = 'Name: ' + storedScore[i].username + ' Score: ' + storedScore[i].score
      var topTextNode = document.createTextNode(topText)
      topElement.appendChild(topTextNode)
    }


  }

  }
)
