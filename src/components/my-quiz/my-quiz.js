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
 * A template for the restart quiz button.
 */
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
      this.totQuizTime = 0 // Users total time.

      /**
       * Shadowdom containing the template.
       */
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }

    /**
     * Called when the element is loaded. creates nickname element inside an element.
     */
    connectedCallback () {
      const clickLog = document.createElement('my-nickname')
      document.querySelector('#container').appendChild(clickLog)
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
      const question = document.createElement('my-quiz-question')
      document.querySelector('#container').appendChild(question)
    }

    /**
     * A method starting the total time counter. Counts seconds until player has finished.
     */
    totTimeCounter () {
      const _this = this
      this.quizLengthTimer = setInterval(() => {
        _this.totQuizTime = _this.totQuizTime + 1
      }, 1000) // 1 second interal.
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
      document.querySelector('#container').appendChild(myTimer).setAttribute('limit', document.querySelector('my-quiz-question').returnObject.limit) // Starts question countdown using limit attribute.
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
      // Text when time runs out.
      const responseElement = document.querySelector('my-quiz-question').shadowRoot.querySelector('#response')
      const responseText = document.createTextNode('Time ran out!')
      responseElement.appendChild(responseText)

      const _this = this
      setTimeout(function () {
        _this.lostOrWonDisplayHighScore()
      }, 1500)
    }

    /**
     * Displays high score when user runs out of time, gives wrong answer or wins quiz.
     */
    lostOrWonDisplayHighScore () {
      this.stopTotTimeCounter() // Stops users total time counter
      document.querySelector('my-quiz-question').remove()
      document.querySelector('my-countdown-timer').remove()
      this.showHighScore()
    }

    /**
     * Creates my-high-score element.
     */
    showHighScore () {
      const myHighScore = document.createElement('my-high-score')
      document.querySelector('#container').appendChild(myHighScore)

      document.querySelector('#container').appendChild(restartBtn.content.cloneNode(true)) // Creates restart button.

      const _this = this
      const awaitDom = setInterval(() => { // Awaits restart button to appear in the DOM
        if (document.querySelector('#restartBtn') === null) { // If element isn't found
          console.log('Waiting for restart button to appear in DOM')
        } else { // If element is found
          const restartBtn = document.querySelector('#restartBtn')

          /**
           * A function used by restart quiz event.
           */
          _this.eventRestartQuiz = () => {
            _this.removeEventRestartQuizListener() // Removes event listener.
            _this.restartFromHighScore() // Restarts quiz.
          }
          restartBtn.addEventListener('click', _this.eventRestartQuiz) // Event awaits click on restart button.
          clearInterval(awaitDom)
        }
      }, 1)
    }

    /**
     * Removes event listener.
     */
    removeEventRestartQuizListener () {
      const _this = this
      document.querySelector('#restartBtn').removeEventListener('click', _this._eventRestartQuiz)
    }

    /**
     * A method restarting the quiz when the player click restart quiz.
     */
    restartFromHighScore () {
      // Removes elements.
      document.querySelector('my-high-score').remove()
      document.querySelector('#restartBtn').remove()

      this.totQuizTime = 0 // Reset total time

      this.connectedCallback() // Method calls my-nickname
    }
  }
)
