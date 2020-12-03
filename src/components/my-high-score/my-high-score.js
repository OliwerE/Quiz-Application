/**
 * Module displaying a high score table.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

/**
 * A template containing the layout for the high score element.
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
#scoreTable {
  width: 100%;
  margin: 0 auto;
  border-collapse: collapse;
}

#scoreTable td {
  text-align: center;

  border: 1px solid black;
}

h1, h2 {
  text-align: center;
}
</style>
<div id="my-high-score">
<h1>HIGH SCORE:</h1>
<table id="scoreTable">
  <tr>
    <th>Rank</th>
    <th>Name</th>
    <th>Score</th>
  </tr>
  <tr>
    <td>1</td>
    <td id="top0name"></td>
    <td id="top0score"></td>
  </tr>
  <tr>
    <td>2</td>
    <td id="top1name"></td>
    <td id="top1score"></td>
  </tr>
  <tr>
  <td>3</td>
  <td id="top2name"></td>
  <td id="top2score"></td>
</tr>
<tr>
<td>4</td>
<td id="top3name"></td>
<td id="top3score"></td>
</tr>
<tr>
<td>5</td>
<td id="top4name"></td>
<td id="top4score"></td>
</tr>
</table>

<h2 id="yourScore">Your Score: </h2>
</div>
`

/**
 * A custom element displaying a high score based on local storage data.
 */
customElements.define('my-high-score',
  /**
   * A class representing the high score elements object.
   */
  class extends HTMLElement {
  /**
   * Constructs the element.
   */
    constructor () {
      super()
      this._nickname = 'my-nickname'
      this._newHighScore = 'my-new-high-score'

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }

    /**
     * Attributes observed if changed.
     *
     * @returns {string} - the observed attribute found.
     */
    static get observedAttributes () {
      return ['nicknameKey', 'newHighScorekey']
    }

    /**
     * Called when element is loaded. Runs compareResult method.
     */
    connectedCallback () {
      console.log('-----MY HIGH SCORE STARTAR!!------')
      this.compareResult()
    }

    /**
     * Called when an attribute has changed.
     *
     * @param {string} name - name of the attribute.
     * @param {string} oldValue - the old attribute value.
     * @param {string} newValue - the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'nicknameKey') { // If the nickname key in local storage is changed
        this._nickname = newValue
      } else if (name === 'newHighScorekey') { // if the new high score key in local storage is changed.
        this._newHighScore = newValue
      }
    }

    /**
     * Called when element is removed from dom.
     */
    disconnectedCallback () {

    }

    /**
     * A method comparing and displaying the result in the template.
     */
    compareResult () {
      const nickname = window.localStorage.getItem(this._nickname) // får namnet, fixa attribut för att ändra vilken key namnet finns i (om annan komponent skulle användas!)
      const newScore = window.localStorage.getItem(this._newHighScore) // nya higshcore ändra även denna med attribut!
      const currentHighScoreList = window.localStorage.getItem('my-high-score')

      if (currentHighScoreList === null) { // om local storage inte har high score lista
      // skapar resultatets array
        let newScoreArray = []

        console.log(newScoreArray)

        // json object
        let playerScoreObject = {}

        playerScoreObject.username = nickname
        playerScoreObject.score = newScore

        console.log('----JSON-----')
        console.log(playerScoreObject)
        console.log('----JSON-----')

        newScoreArray.push(playerScoreObject)
        console.log(newScoreArray)

        console.log('gör om array till string-----------')
        const stringArray = JSON.stringify(newScoreArray)
        console.log(stringArray)

        // skapar array string i local storage:
        window.localStorage.setItem('my-high-score', stringArray)

        // tar bort:
        playerScoreObject = {}
        newScoreArray = []
      } else {
        console.log('är i else!')
        const currentHighScore = window.localStorage.getItem('my-high-score')
        const parseCurrentHighScore = JSON.parse(currentHighScore)
        let newPlayerScore = {}

        newPlayerScore.username = nickname
        newPlayerScore.score = newScore

        parseCurrentHighScore.push(newPlayerScore)

        const scoreString = JSON.stringify(parseCurrentHighScore)

        console.log(newPlayerScore)
        console.log(parseCurrentHighScore)
        console.log('striiing')
        console.log(scoreString)

        window.localStorage.setItem('my-high-score', scoreString) // aktivera sen!
        newPlayerScore = {}
      }

      const storedData = window.localStorage.getItem('my-high-score')

      let storedScore = JSON.parse(storedData)
      let lengthStoredScore = Object.keys(storedScore).length

      console.log('the array----------------')
      console.log(storedScore)
      console.log(lengthStoredScore)

      // hantera ordning:
      if (lengthStoredScore <= 5) {
        console.log('5 eller mindre scores! endast sortera!')

        console.log(storedScore[0].score)
      // console.log(storedScore[1].score)
      }

      // sorterar ordningen i array baserat på spelarnas score
      const sorting = storedScore.sort(function (a, b) {
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
        const stringifyFiveScores = JSON.stringify(storedScore)

        window.localStorage.setItem('my-high-score', stringifyFiveScores)
      }

      // lägg till namn och score i listan:

      for (let i = 0; i < lengthStoredScore; i++) { // varje score skrivs in i high score!
      // namn
        const topName = '#top' + i + 'name'
        const topNameElement = this.shadowRoot.querySelector(topName)
        // var topText = 'Name: ' + storedScore[i].username + ' Score: ' + storedScore[i].score
        const topNameTextNode = document.createTextNode(storedScore[i].username)
        topNameElement.appendChild(topNameTextNode)

        // score:
        const topScore = '#top' + i + 'score'
        const topScoreElement = this.shadowRoot.querySelector(topScore)
        const topScoreTextNode = document.createTextNode(storedScore[i].score)
        topScoreElement.appendChild(topScoreTextNode)
      }

      const yourScoreText = document.createTextNode(newScore)
      this.shadowRoot.querySelector('#yourScore').appendChild(yourScoreText)
    }
  }
)
