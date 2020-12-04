/**
 * Module that handles quiz questions.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

/**
 * A template with a h1 header.
 */

const template = document.createElement('template')
template.innerHTML = `
<h1 id="questionTitle">Question:</h1>
`

/**
 * Template for quiz questions with alternatives.
 */
const questionInput = document.createElement('template')
questionInput.innerHTML = `
<div id="displayedQustion">
<h3 id="question"></h3>
<input type="text" placeholder="Answer" id="questionInput" maxlength="20">
<button type="button" id="answerBtn">Continue</button>
<p id="response"></p>
</div>
`

/**
 * A template for questions with input.
 */
const questionRadio = document.createElement('template')
questionRadio.innerHTML = `
<div id="displayedQustion">
<h3 id="question"></h3>

<form id="altForm">
<div id="altFormBtns"></div>
<input type="button" id="continueBtn" value="Continue">
</form>

<!--<button type="button" id="answerBtn">Continue</button>-->
<p id="response"></p>
</div>
`

/**
 * An element creating quiz questions.
 */
customElements.define('my-quiz-question',
  /**
   * Class representing the quiz question object.
   */
  class extends HTMLElement {
  /**
   * Constructs the element.
   */
    constructor () {
      super()
      this._getCount = 0 // Number of received questions
      this._nextUrl = 'http://courselab.lnu.se/question/1' // Url to next question or answer

      /**
       * Shadowdom containing the template.
       */
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }

    /**
     * Called when the element is loaded. Runs getQuestion method.
     */
    connectedCallback () {
      window.localStorage.setItem('my-quiz-question', '-') // Result if user loses.
      this.getQuestion()
    }

    /**
     * A method getting a question in JSON format from a server and stores it.
     * Then runs show question method.
     */
    async getQuestion () {
      const _this = this
      await window.fetch(this._nextUrl).then(function (response) { // Get data from this._nextUrl using fetch.
        _this._statusCode = response.status // Stores status code
        return response.json()
      }).then(function (obj) {
        if (_this._getCount === 0) {
          document.querySelector('my-quiz').totTimeCounter() // Starts total time counter if it's the first question.
        }
        _this._getCount = _this._getCount + 1 // Adds one to get count.
        _this.returnObject = obj // Stores returned object from server
        _this._nextUrl = obj.nextURL // Stores next url in this._nextUrl
        _this.showQuestion() // Runs show question when data is received
      }).catch(function (err) {
        console.error('an error has occurred (get)')
        console.error(err)
      })
    }

    /**
     * A method displaying the question and a template with alternatives or input.
     * Then runs question answer method.
     */
    showQuestion () {
      const obj = this.returnObject
      const currentQuestion = obj.question

      if (this.returnObject.alternatives === undefined) { // If question is using input element.
        this.shadowRoot.appendChild(questionInput.content.cloneNode(true))
      } else if (this.returnObject.alternatives !== undefined) { // If question is using radio buttons.
        this.shadowRoot.appendChild(questionRadio.content.cloneNode(true))

        const numOfAlt = Object.keys(obj.alternatives).length // number of alternatives.

        for (let i = 0; i < numOfAlt; i++) { // Creates correct amount of radio buttons.
          const button = document.createElement('input')

          const currentValue = i + 1
          const currentButton = `alt${currentValue}`

          this.shadowRoot.querySelector('#altFormBtns').appendChild(button).setAttribute('id', currentButton) // adds button in form.

          // Creates attributes.
          this.shadowRoot.querySelector(`#${currentButton}`).setAttribute('type', 'radio')
          this.shadowRoot.querySelector(`#${currentButton}`).setAttribute('name', 'alt')
          this.shadowRoot.querySelector(`#${currentButton}`).setAttribute('value', `alt${currentValue}`)

          // Create button labels.
          const label = document.createElement('label')
          const labelQuestion = 'alt' + (i + 1)
          const labelTextNode = document.createTextNode(obj.alternatives[labelQuestion])
          label.appendChild(labelTextNode)
          this.shadowRoot.querySelector('#altFormBtns').appendChild(label)

          // Changes row.
          const changeRow = document.createElement('br')
          this.shadowRoot.querySelector('#altFormBtns').appendChild(changeRow)
        }
      }

      // Displays question
      const questionHeader = this.shadowRoot.querySelector('#question')
      const questionHeaderText = document.createTextNode(currentQuestion)
      questionHeader.appendChild(questionHeaderText)

      // Starts countdown
      document.querySelector('my-quiz').startCountDownTimer()

      this.questionAnswer()
    }

    /**
     * A method creating event listeners for question answer.
     * Then runs postAnswer method with answer as argument.
     */
    questionAnswer () { // svaret väntas in och bearbetas!
      if (this.returnObject.alternatives === undefined) { // Creates event listeners for input field questions.
        const answerBtn = this.shadowRoot.querySelector('#answerBtn')
        const inputElement = this.shadowRoot.querySelector('#questionInput')

        /**
         * A function used by button click event.
         */
        this._clickBtnEvent = () => {
          const answer = this.shadowRoot.querySelector('#questionInput').value
          _this.removeEnterListener('input')
          this.postAnswer(answer)
        }

        answerBtn.addEventListener('click', this._clickBtnEvent) // Event triggers when user click the continue button.

        const _this = this
        /**
         * A function used by the input fields enter key event.
         *
         * @param {object} e - An event ombject.
         */
        this._eventClickEnter = (e) => {
          if (e.key === 'Enter') {
            const answer = _this.shadowRoot.querySelector('#questionInput').value
            _this.removeEnterListener('input')
            _this.postAnswer(answer)
          }
        }

        inputElement.addEventListener('keypress', this._eventClickEnter) // Event triggers when user press enter inside input field
      } else { // Creates event listeners for questions with alternatives.
        const radiocontBtn = this.shadowRoot.querySelector('#continueBtn')

        /**
         * A function used by continuebutton (questions with alternatives).
         */
        this._radioBtnClick = () => {
          const allRadioBtns = this.shadowRoot.querySelectorAll('input[name="alt"]') // Selects all radio buttons with name alt.
          let answer
          for (const radiobutton of allRadioBtns) { // Checks if a radio button is checked.
            if (radiobutton.checked) {
              answer = radiobutton.value
              break
            }
          }
          this.removeEnterListener('radio')
          this.postAnswer(answer)
        }

        radiocontBtn.addEventListener('click', this._radioBtnClick)
      }
    }

    /**
     * Removes event listeners.
     *
     * @param {string} type - a string used to decide if the question had radio buttons or an input field.
     */
    removeEnterListener (type) {
      const _this = this
      if (type === 'input') { // Event listeners removed if input is used.
        this.shadowRoot.querySelector('#questionInput').removeEventListener('keypress', _this._eventClickEnter)
        this.shadowRoot.querySelector('#answerBtn').removeEventListener('click', _this._clickBtnEvent)
      } else if (type === 'radio') { // Event listeners removed if radio buttons is used.
        this.shadowRoot.querySelector('#continueBtn').removeEventListener('click', _this._radioBtnClick)
      }
    }

    /**
     * A method posting the users result to a server. The server response JSON is stored.
     * Then runs returnResponse method.
     *
     * @param {object} userResult - An object containing the users answer.
     */
    async postAnswer (userResult) {
      document.querySelector('my-quiz').pauseCountDownTimer() // Stops countdown timer
      const obj = {
        answer: ''
      } // Answer object

      if (userResult !== undefined) {
        obj.answer = userResult
      }

      const _this = this
      await window.fetch(this._nextUrl, { // Sends user answer to server using fetch api.
        method: 'Post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)

      }).then(function (response) {
        _this._statusCode = response.status
        return response.json() // Returns JSON response.
      }).then(function (postResponse) {
        _this._answerResponse = postResponse // Stores JSON in this._answerResponse
        _this.returnResponse() // A method returning response to user
      }).catch(function (err) {
        console.error('an error has occurred (post)')
        console.error(err)
      })
    }

    /**
     * Returns response to the user and resets question.¨
     * If it's the last question the total time is stopped and the high score appears.
     */
    returnResponse () {
      // Displays response message to user.
      const responseElement = this.shadowRoot.querySelector('#response')
      const responseText = document.createTextNode(this._answerResponse.message)
      responseElement.appendChild(responseText)

      if (this._statusCode === 200 && this._answerResponse.nextURL === undefined) { // If it was the last question
        document.querySelector('my-quiz').stopTotTimeCounter() // Stops total time
        window.localStorage.setItem('my-quiz-question', document.querySelector('my-quiz').totQuizTime) // Stores total time in local storage

        setTimeout(function () { // Displays response message then removes question and displays highscore.
          document.querySelector('my-quiz').lostOrWonDisplayHighScore()
        }, 1500)
      } else if (this._statusCode === 200 && this._answerResponse.nextURL !== undefined) { // if it's not the last question
        this._nextUrl = this._answerResponse.nextURL // Adds next url

        const _this = this
        setTimeout(function () { // Displays response message then resets question.
          _this.resetQuestion()
        }, 1500)
      } else if (this._statusCode === 400) { // If the answer is wrong.
        setTimeout(function () { // Displays response message then display high score.
          document.querySelector('my-quiz').lostOrWonDisplayHighScore()
        }, 1500)
      } else {
        console.error('statuscode does not equal 200 or 400! statuscode: ', this._statusCode)
      }
    }

    /**
     * A method that removes question and countdown timer and runs getQuestion if it's not the last question.
     */
    resetQuestion () {
      this.shadowRoot.querySelector('#displayedQustion').remove()
      document.querySelector('my-quiz').removeCountDownTimer()
      if (this._statusCode === 200 && this._answerResponse.nextURL !== undefined) { // If it's not the last question.
        this.getQuestion()
      }
    }
  })
