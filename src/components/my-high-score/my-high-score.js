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
      this._newHighScore = 'my-quiz-question'

      /**
       * Shadowdom containing the template.
       */
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
      if (name === 'nicknameKey') { // If the nickname key in local storage is changed.
        this._nickname = newValue
      } else if (name === 'newHighScorekey') { // if the new high score key in local storage is changed.
        this._newHighScore = newValue
      }
    }

    /**
     * A method comparing and displaying the result in the template.
     */
    compareResult () {
      const nickname = window.localStorage.getItem(this._nickname) // Gets nickname from local storage.
      const newScore = window.localStorage.getItem(this._newHighScore) // Gets new score from local storage.
      const currentHighScoreList = window.localStorage.getItem('my-high-score') // Gets current high score.

      if (currentHighScoreList === null && newScore !== '-') { // If local storage doesn't have high score data and user didn't fail.
        let newScoreArray = []
        let playerScoreObject = {}

        playerScoreObject.username = nickname
        playerScoreObject.score = newScore

        // Adds new object into the array and turns array into a string.
        newScoreArray.push(playerScoreObject)
        const stringArray = JSON.stringify(newScoreArray)

        window.localStorage.setItem('my-high-score', stringArray)

        playerScoreObject = {}
        newScoreArray = []
      } else if (currentHighScoreList !== null && newScore !== '-') { // If local storage does have high score data and user didn't fail.
        const currentHighScore = window.localStorage.getItem('my-high-score')
        const parseCurrentHighScore = JSON.parse(currentHighScore)
        let newPlayerScore = {}

        newPlayerScore.username = nickname
        newPlayerScore.score = newScore

        // Adds new player inte parseCurrentHighScore array and creates string
        parseCurrentHighScore.push(newPlayerScore)
        const scoreString = JSON.stringify(parseCurrentHighScore)

        window.localStorage.setItem('my-high-score', scoreString)
        newPlayerScore = {}
      }

      this.displayScores()
    }

    /**
     * Adds text into high score table.
     */
    displayScores () {
      const storedData = window.localStorage.getItem('my-high-score')

      let storedScore = JSON.parse(storedData)
      let lengthStoredScore = Object.keys(storedScore).length // Length of high score list

      if (window.localStorage.getItem(this._newHighScore) !== '-') {
      // Sorts high score array.
        storedScore.sort(function (a, b) {
          return a.score - b.score
        })

        if (lengthStoredScore > 5) {
          storedScore = storedScore.splice(0, 5) // Saves only five best results.
          lengthStoredScore = 5

          const stringifyFiveScores = JSON.stringify(storedScore)

          // Overwrites local storage with 5 best results.
          window.localStorage.setItem('my-high-score', stringifyFiveScores)
        }
      }

      for (let i = 0; i < lengthStoredScore; i++) { // Each player added into high score table.
        // Name
        const topName = '#top' + i + 'name'
        const topNameElement = this.shadowRoot.querySelector(topName)
        const topNameTextNode = document.createTextNode(storedScore[i].username)
        topNameElement.appendChild(topNameTextNode)

        // score
        const topScore = '#top' + i + 'score'
        const topScoreElement = this.shadowRoot.querySelector(topScore)
        const topScoreTextNode = document.createTextNode(storedScore[i].score)
        topScoreElement.appendChild(topScoreTextNode)
      }

      // Displays current players score.
      const yourScoreText = document.createTextNode(window.localStorage.getItem(this._newHighScore))
      this.shadowRoot.querySelector('#yourScore').appendChild(yourScoreText)

      // Resets current score in local storage
      window.localStorage.setItem(this._newHighScore, '-')
    }
  }
)
