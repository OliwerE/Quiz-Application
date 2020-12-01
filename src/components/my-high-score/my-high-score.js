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


      /*
      console.log(json1)

      var json2 = {
        "username": "user2",
        "text": "sometext2"
      }
      console.log(json2)


      console.log('lägger till json 1')
      newScoreArray.push(json1)
      console.log(newScoreArray)

      console.log('lägger till json 2')
      newScoreArray.push(json2)
      console.log(newScoreArray)

      console.log('gör om till string')
      var stringArray = JSON.stringify(newScoreArray)// newScoreArray.toString()
      console.log(stringArray)

      console.log('-------tbx till array--------')

      //var splittadString = stringArray.split(', ')
      var splittadString = JSON.parse(stringArray)

      console.log(splittadString)

      console.log(splittadString[0]) // problem här

      console.log('--------------------')
      */

/*
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
      newScoreArray.push('test321')
      // test hur det ser ut:
      console.log(playerScoreObject)
*/
      // sätts i local storage




      /*
      console.log(newScoreArray)
      var stringen = newScoreArray.toString()
      console.log(stringen)

      console.log('json parse: ')
      var spliten = stringen.split()

      console.log(spliten[0])
      */

      //window.localStorage.setItem('my-high-score', newScoreArray)
       // tar bort:
      //playerScoreObject = {}
      //var newScoreArray = []
    } else {
      var currentHighScoreList2 = window.localStorage.getItem('my-high-score')
    

    }
  }

  }
)
