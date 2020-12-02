/**
 * module....
 *
 * @author // TODO: YOUR NAME <YOUR EMAIL>
 * @version 1.0.0
 */

/**
 * Define template.
 */

const setup = document.createElement('template')
setup.innerHTML = `
<div id="nameSetup">
<h2>Skriv in ditt namn!</h2>
<input type="text" placeholder="Namn" id="myInput">
<button type="button" id="setupBtn">Fortsätt</button>
</div>
`

const template = document.createElement('template')
template.innerHTML = `
<style>
h1 {
  text-align: center;
}
</style>
<h1>Quiz</h1>
`

/**
 * Define custom element.
 */
customElements.define('my-quiz',
  class extends HTMLElement {

    constructor () {
      super()
      this.totQuizTime = 0 // användares totala tid

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

    }

    static get observedAttributes () {

    }

    connectedCallback () {
      console.log('connected called!')

      // skapar nickname med my-nickname komponent!
      const clickLog = document.createElement('my-nickname')
      document.querySelector('#container').appendChild(clickLog)

      this.awaitNickname()
    }

    attributeChangedCallback (name, oldValue, newValue) {

    }

    disconnectedCallback () {

    }

    awaitNickname () {
      console.log('väntar på nickname i my-quiz')
      
      var _this = this // event lyssnaren refererar fel annars!

      setTimeout(function () { // DÅLIG LÖSNING! ELEMENTET HINNER INTE SKAPAS INNAN MY-NICKNAME KOMPONENT SKAPAR ELEMENTET! async await istället??
        const extShadowRoot = document.querySelector('my-nickname').shadowRoot
        const nickSubmitBtn =  extShadowRoot.querySelector('#setupBtn')
        console.log ('waiting in my-quiz')
        
        nickSubmitBtn.addEventListener('click', () => {
          console.log('jag såg knappen trycktes i my-quiz')
          _this.firstQuestion()
        })

        const enterBtn = extShadowRoot.querySelector('#myInput')

        enterBtn.addEventListener('keypress', (e)=> {
          if (e.key === 'Enter') {
            _this.firstQuestion()
          }
        })
      }, 1)

    }

    firstQuestion () {
      console.log('är i nextQuestion!')
      
      const question = document.createElement('my-quiz-question')
      document.querySelector('#container').appendChild(question)
    }

    totTimeCounter () {
      var _this = this
      this.quizLengthTimer = setInterval(()=> {
        _this.totQuizTime = _this.totQuizTime + 1
        console.log('sekunder: ', _this.totQuizTime)
      }, 1000)
    }
    
    stopTotTimeCounter () {
      clearInterval(this.quizLengthTimer)
    }

    startCountDownTimer () {
      const myTimer = document.createElement('my-countdown-timer')
      document.querySelector('#container').appendChild(myTimer).setAttribute('limit', document.querySelector('my-quiz-question').returnObject.limit)
    }

    pauseCountDownTimer () {
      document.querySelector('my-countdown-timer').cancelCountdown()
    }

    removeCountDownTimer () {
      document.querySelector('my-countdown-timer').remove()
    }

    myCountdownTimerRanOutOfTime () {
      const responseElement = document.querySelector('my-quiz-question').shadowRoot.querySelector('#response')
      const responseText = document.createTextNode('Time ran out!')
      responseElement.appendChild(responseText)
      
      var _this = this
      setTimeout(function () {
        console.log('är här!!876')
        document.querySelector('my-quiz').restartmyQuiz()
        //_this.restartmyQuiz()
      }, 1500)
    
    }

    restartmyQuiz () {

    // stoppar total tid räknaren
    document.querySelector('my-quiz-question').stopTotTimeCounter()

    // tar bort element
    document.querySelector('my-quiz-question').remove()
    document.querySelector('my-countdown-timer').remove()
    
    //startar igen
    this.connectedCallback()
    
    }

    showHighScore() {
      // skapar high score element
      const myHighScore = document.createElement('my-high-score')
      document.querySelector('#container').appendChild(myHighScore)
    }
  }
)
