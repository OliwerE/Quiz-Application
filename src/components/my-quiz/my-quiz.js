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

const restartBtn = document.createElement('template')
restartBtn.innerHTML = `
<button type="button" id="restartBtn">Restart quiz</button>
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

      // this.awaitNickname()
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
     * Method called by my-nickname when finished.
     */
    myNicknameFinished () {
      this.firstQuestion()
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
      // document.querySelector('my-quiz-question').shadowRoot.querySelector('#questionTitle').remove()
      document.querySelector('my-quiz-question').remove()

      // skapar high score element
      const myHighScore = document.createElement('my-high-score')
      document.querySelector('#container').appendChild(myHighScore)

      // creates restart button
      document.querySelector('#container').appendChild(restartBtn.content.cloneNode(true))

      // const _this = this
      setTimeout(() => { // DÅLIG LÖSNING!
        const restartBtn = document.querySelector('#restartBtn')
        restartBtn.addEventListener('click', () => {
          this.restartFromHighScore()
        }, { once: true })
      }, 0)
    }

    /**
     * A method restarting the quiz when the player click restart quiz.
     */
    restartFromHighScore () {
      // tar bort high score och knapp
      document.querySelector('my-high-score').remove()
      document.querySelector('#restartBtn').remove()

      // återställer total tid
      this.totQuizTime = 0

      // startar från början
      this.connectedCallback()
    }
  }
)
