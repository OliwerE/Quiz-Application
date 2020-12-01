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
}
#my-high-score h1 {
    text-align: center;
}
</style>
<div id="my-high-score">
<h1>HIGH SCORE:</h1>
<ol>
  <li id="top1"></li>
  <li id="top2"></li>
  <li id="top3"></li>
  <li id="top4"></li>
  <li id="top5"></li>
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
    //this.highScore = window.localStorage.getItem('my-high-Score')
    //this.newHighScore = window.localStorage.getItem('my-new-high-Score')

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

  }

  static get observedAttributes () {

  }

  connectedCallback () {
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

    if (currentHighScoreList === null) {
      
      // skapar resultatets array
      var newScoreArray = []
      
      // skapar unika spelarens objekt (ska göras om till JSON)
      var playerScoreObject = {}
      
      // lägger till username och score
      playerScoreObject.username = nickname
      playerScoreObject.score = newScore
      console.log('INNAN JSON: ', playerScoreObject)

      var playerJson = JSON.stringify(playerScoreObject)
      console.log('EFTER JSON: ', playerJson)

      newScoreArray.push(playerJson)
      console.log('I ARRAY: ', newScoreArray)

      // test hur det ser ut:
      console.log(playerScoreObject)
    } else {
      // jämför resultatet med listans!
    }
  }

  }
)
