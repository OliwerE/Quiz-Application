/**
 * The main module for the quiz.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

/**
 * A template for the quiz header.
 */

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
 * An element controlling the quiz.
 */
customElements.define('my-quiz',
  /**
   * Class representing the my-quiz object.
   */
  class extends HTMLElement {
  /**
   * Constructs the element.
   */
    constructor () {
      super()
      this.totQuizTime = 0 // användares totala tid

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }

    /**
     * Attributes observed if changed.
     */
    static get observedAttributes () {

    }

    /**
     * Called when the element is loaded. creates nickname element inside an element. Then runs awaitNickname method.
     */
    connectedCallback () {
      console.log('connected called!')

      // skapar nickname med my-nickname komponent!
      const clickLog = document.createElement('my-nickname')
      document.querySelector('#container').appendChild(clickLog)

      this.awaitNickname()
    }

    /**
     * Called when an attribute has changed.
     *
     * @param {string} name - name of the attribute.
     * @param {string} oldValue - the old attribute value.
     * @param {string} newValue - the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {

    }

    /**
     * Called when element is removed from dom.
     */
    disconnectedCallback () {

    }

    /**
     * A method with an event listener waiting for player to submit a nickname. Then runs firstQuestion method.
     */
    awaitNickname () {
      console.log('väntar på nickname i my-quiz')

      const _this = this // event lyssnaren refererar fel annars!

      setTimeout(function () { // DÅLIG LÖSNING! ELEMENTET HINNER INTE SKAPAS INNAN MY-NICKNAME KOMPONENT SKAPAR ELEMENTET! async await istället??
        const extShadowRoot = document.querySelector('my-nickname').shadowRoot
        const nickSubmitBtn = extShadowRoot.querySelector('#setupBtn')
        console.log('waiting in my-quiz')

        nickSubmitBtn.addEventListener('click', () => {
          console.log('jag såg knappen trycktes i my-quiz')
          _this.firstQuestion()
        })

        const enterBtn = extShadowRoot.querySelector('#myInput')

        enterBtn.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            _this.firstQuestion()
          }
        })
      }, 1)
    }

    /**
     * A method creating a my-quiz-question element.
     */
    firstQuestion () {
      console.log('är i nextQuestion!')

      const question = document.createElement('my-quiz-question')
      document.querySelector('#container').appendChild(question)
    }

    /**
     * A method starting the total time counter.
     */
    totTimeCounter () {
      const _this = this
      this.quizLengthTimer = setInterval(() => {
        _this.totQuizTime = _this.totQuizTime + 1
        console.log('sekunder: ', _this.totQuizTime)
      }, 1000)
    }

    /**
     * A method that stops the total time counter.
     */
    stopTotTimeCounter () {
      clearInterval(this.quizLengthTimer)
    }

    /**
     * A method creating a my-countdown-timer element with a limit.
     */
    startCountDownTimer () {
      const myTimer = document.createElement('my-countdown-timer')
      document.querySelector('#container').appendChild(myTimer).setAttribute('limit', document.querySelector('my-quiz-question').returnObject.limit)
    }

    /**
     * A method that stops my-countdown-timer countdown.
     */
    pauseCountDownTimer () {
      document.querySelector('my-countdown-timer').cancelCountdown()
    }

    /**
     * A method removing my-countdown-timer.
     */
    removeCountDownTimer () {
      document.querySelector('my-countdown-timer').remove()
    }

    /**
     * Displays time ran out text and runs restartmyquiz method.
     */
    myCountdownTimerRanOutOfTime () {
      const responseElement = document.querySelector('my-quiz-question').shadowRoot.querySelector('#response')
      const responseText = document.createTextNode('Time ran out!')
      responseElement.appendChild(responseText)

      setTimeout(function () {
        console.log('är här!!876')
        document.querySelector('my-quiz').restartmyQuiz()
        // _this.restartmyQuiz()
      }, 1500)
    }

    /**
     * Restarts the quiz.
     */
    restartmyQuiz () {
    // stoppar total tid räknaren
      this.stopTotTimeCounter()

      // tar bort element
      document.querySelector('my-quiz-question').remove()
      document.querySelector('my-countdown-timer').remove()

      // startar igen
      this.connectedCallback()
    }

    /**
     * Removes question title and creates my-high-score element.
     */
    showHighScore () {
      // ta bort text
      document.querySelector('my-quiz-question').shadowRoot.querySelector('#questionTitle').remove()
      // skapar high score element
      const myHighScore = document.createElement('my-high-score')
      document.querySelector('#container').appendChild(myHighScore)
    }
  }
)
