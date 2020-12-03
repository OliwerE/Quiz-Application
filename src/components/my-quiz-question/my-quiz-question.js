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
<h1 id="questionTitle">Fråga:</h1>
`

/**
 * Template for quiz questions with alternatives.
 */
const questionInput = document.createElement('template')
questionInput.innerHTML = `
<div id="displayedQustion">
<h3 id="question"></h3>
<input type="text" placeholder="Svar" id="questionInput" maxlength="20">
<button type="button" id="answerBtn">Fortsätt</button>
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
<input type="button" id="continueBtn" value="Submit">
</form>

<!--<button type="button" id="answerBtn">Fortsätt</button>-->
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
      this._getCount = 0 // antal frågor som tagits emot
      this._firstUrl = 'http://courselab.lnu.se/question/1' // Används när spelet ska starta om! // denna får INTE ÄNDRAS!
      this._attributeUrl = 'http://courselab.lnu.se/question/1'
      this._nextUrl = 'http://courselab.lnu.se/question/1' // första frågan

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }

    /**
     * Attributes observed if changed.
     */
    static get observedAttributes () {
      // attribute url fixa!
    }

    /**
     * Called when the element is loaded. Runs getQuestion method.
     */
    connectedCallback () {
      console.log('är i my quiz question')
      // this.firstUrlCheck() // ändra till attribute callback!
      this.getQuestion()
    }

    /**
     * Called when an attribute has changed.
     *
     * @param {string} name - name of the attribute.
     * @param {string} oldValue - the old attribute value.
     * @param {string} newValue - the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      // attribute url fixa!
    }

    /**
     * Called when element is removed from dom.
     */
    disconnectedCallback () {

    }

    /**
     * A method getting a question in JSON format from a server and stores it.
     * Then runs show question method.
     */
    async getQuestion () {
      const _this = this
      await window.fetch(this._nextUrl).then(function (response) {
        // console.log(response.json())
        _this._statusCode = response.status // lagrar statuskoden // lagrar statuskoden

        console.log('-----------GET-Status-Code---------')
        console.log(_this._statusCode)
        console.log('-----------------------------------')

        return response.json()
      }).then(function (obj) {
        if (_this._getCount === 0) {
          document.querySelector('my-quiz').totTimeCounter() // counts entire round
        }
        _this._getCount = _this._getCount + 1
        console.log(obj)
        _this.returnObject = obj
        _this._nextUrl = obj.nextURL

        _this.showQuestion()
      }).catch(function (err) { // fångar eventuella fel
        console.error('fel har inträffat')
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

      if (this.returnObject.alternatives === undefined) { // om frågan är av typen input
        // skapar question template
        this.shadowRoot.appendChild(questionInput.content.cloneNode(true))
      } else if (this.returnObject.alternatives !== undefined) { // om frågan är av typen radio btn
        // skapar question template
        this.shadowRoot.appendChild(questionRadio.content.cloneNode(true))

        // skapa antal radioknappar här!
        const numOfAlt = Object.keys(obj.alternatives).length
        console.log('ANTAL ALTERNATIV!123', numOfAlt)

        for (let i = 0; i < numOfAlt; i++) { // skapar lika många radioknappar som alternativ!
          const button = document.createElement('input')

          const currentValue = i + 1
          const currentButton = `alt${currentValue}`

          // lägger till i formulär och skapar id
          this.shadowRoot.querySelector('#altFormBtns').appendChild(button).setAttribute('id', currentButton)

          // sätter attribut
          this.shadowRoot.querySelector(`#${currentButton}`).setAttribute('type', 'radio')
          this.shadowRoot.querySelector(`#${currentButton}`).setAttribute('name', 'alt')
          this.shadowRoot.querySelector(`#${currentButton}`).setAttribute('value', `alt${currentValue}`)

          // skapa label för knapp

          const label = document.createElement('label')
          const labelQuestion = 'alt' + (i + 1)
          const labelTextNode = document.createTextNode(obj.alternatives[labelQuestion])
          label.appendChild(labelTextNode)
          this.shadowRoot.querySelector('#altFormBtns').appendChild(label)

          // byter rad:
          const changeRow = document.createElement('br')
          this.shadowRoot.querySelector('#altFormBtns').appendChild(changeRow)
        }
      }

      // skriver ut frågan
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
      if (this.returnObject.alternatives === undefined) { // om frågan är av typen input
        const answerBtn = this.shadowRoot.querySelector('#answerBtn')
        const inputElement = this.shadowRoot.querySelector('#questionInput')

        // trycka på knappen
        answerBtn.addEventListener('click', () => {
          const answer = this.shadowRoot.querySelector('#questionInput').value
          this.postAnswer(answer)
        }, { once: true })

        // used in enter key event
        const _this = this

        /**
         * A function used by the input fields enter key event.
         *
         * @param {object} e - An event ombject.
         */
        this.handleEnter = (e) => {
          if (e.key === 'Enter') {
            const answer = _this.shadowRoot.querySelector('#questionInput').value
            _this.removeEnterListener()
            _this.postAnswer(answer)
          }
        }

        // enter knapp
        inputElement.addEventListener('keypress', this.handleEnter)
      } else { // om frågan har alternativ
        const radiocontBtn = this.shadowRoot.querySelector('#continueBtn')
        radiocontBtn.addEventListener('click', () => {
          const allRadioBtns = this.shadowRoot.querySelectorAll('input[name="alt"]') // alla radioknappar
          let answer
          for (const radiobutton of allRadioBtns) { // går igenom och kontrollerar om en radioknapp är markerad. om någon är läggs värdet i value
            if (radiobutton.checked) {
              answer = radiobutton.value
              break
            }
          }
          this.postAnswer(answer)
        }, { once: true })
      }
    }

    /**
     * Removes enter key event listener from question input.
     */
    removeEnterListener () {
      const _this = this
      this.shadowRoot.querySelector('#questionInput').removeEventListener('keypress', _this.handleEnter)
    }

    /**
     * A method posting the users result to a server. The server response JSON is stored.
     * Then runs returnResponse method.
     *
     * @param {object} userResult - An object containing the users answer.
     */
    async postAnswer (userResult) {
      document.querySelector('my-quiz').pauseCountDownTimer() // pausar nedräkning!
      const obj = {
        answer: ''
      } // Svar objekt
      alert(userResult)

      if (userResult !== undefined) {
      obj.answer = userResult // lägger till svaret
      }

      const _this = this
      await window.fetch(this._nextUrl, { // skickar användarens svar
        method: 'Post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj) // gör om objektet till JSON

      }).then(function (response) {
        _this._statusCode = response.status // lagrar statuskoden
        return response.json() // returnerar responsens JSON objekt
      }).then(function (postResponse) {
        _this._answerResponse = postResponse // lagrar JSON i this._answerResponse
        _this.returnResponse()
      }).catch(function (err) { // fångar eventuella fel
        console.error('fel har inträffat')
        console.error(err)
      })
    }

    /**
     * Returns response to the user and resets question.¨
     * If it's the last question the total time is stopped and the high score appears.
     */
    returnResponse () {
      // respons meddelande (visas för användaren)
      const responseElement = this.shadowRoot.querySelector('#response')
      const responseText = document.createTextNode(this._answerResponse.message)
      responseElement.appendChild(responseText)

      if (this._statusCode === 200 && this._answerResponse.nextURL === undefined) {
        console.log('SISTA FRÅGAN')
        document.querySelector('my-quiz').stopTotTimeCounter()
        // lägger till resultat i local storage:
        window.localStorage.setItem('my-new-high-score', document.querySelector('my-quiz').totQuizTime) // antal sekunder det tog att svara på frågorna

        const _this = this
        setTimeout(function () { // för att användare ska hinna se meddelande
          _this.resetQuestion()
          document.querySelector('my-quiz').showHighScore()// skapar highscore element
        }, 1500)
      } else if (this._statusCode === 200 && this._answerResponse.nextURL !== undefined) {
        this._nextUrl = this._answerResponse.nextURL // sätter nästa url

        const _this = this
        setTimeout(function () {
          _this.resetQuestion()
        }, 1500) // går inte vidare på 1.5 sekunder så användare hinner se meddelande. OBS! kan ev störa 20 sek timern!
      } else if (this._statusCode === 400) { // om svaret är fel!
        setTimeout(function () {
          document.querySelector('my-quiz').restartmyQuiz() // tar bort och laddar nickname komponenten
        }, 1500)
      } else {
        alert('statuscode does not equal 200 or 400! statuscode: ', this._statusCode)
      }
    }

    /**
     * A method that removes question and countdown timer and runs getQuestion if it's not the last question.
     */
    resetQuestion () { // återställer frågor och tar fram nästa
      this.shadowRoot.querySelector('#displayedQustion').remove() // tar bort elementet med frågan
      document.querySelector('my-quiz').removeCountDownTimer() // tar bort countdown elementet
      if (this._statusCode === 200 && this._answerResponse.nextURL !== undefined) {
        this.getQuestion()
      }
    }

    /*
firstUrlCheck() { // flytta in i attribut?
  if (this._firstUrl === this._attributeUrl) {
    this._nextUrl = this._firstUrl // om inget attribut används!
  } else {
    this._nextUrl = this._attributeUrl // om ett attribut används!
  }
}
*/
  })
