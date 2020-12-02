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
<h1>EN FRÅGA!!</h1>
`

const questionInput = document.createElement('template')
questionInput.innerHTML = `
<div id="displayedQustion">
<h3 id="question"></h3>
<input type="text" placeholder="Svar" id="questionInput">
<button type="button" id="answerBtn">Fortsätt</button>
<p id="response"></p>
</div>
`

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
 * Define custom element.
 */
customElements.define('my-quiz-question',
  class extends HTMLElement {

    constructor () {
      super()
      this._getCount = 0 // antal frågor som tagits emot
      this.totQuizTime = 0 // användares totala tid
      this._firstUrl = 'http://courselab.lnu.se/question/1' // Används när spelet ska starta om! // denna får INTE ÄNDRAS!
      this._attributeUrl = 'http://courselab.lnu.se/question/1'
      this._nextUrl = 'http://courselab.lnu.se/question/1' // första frågan

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

    }

    static get observedAttributes () {
      // attribute url fixa!
    }

    connectedCallback () {
      console.log('är i my quiz question')
      this.getQuestion()
    }

    attributeChangedCallback (name, oldValue, newValue) {
      // attribute url fixa!
    }

    disconnectedCallback () {

    }

    async getQuestion () {
      var _this = this
        await window.fetch(this._nextUrl).then(function (response) {
            //console.log(response.json())
            _this._statusCode = response.status // lagrar statuskoden // lagrar statuskoden
            
            console.log('-----------GET-Status-Code---------')
            console.log(_this._statusCode)
            console.log('-----------------------------------')

            return response.json() // Detta som ger fel i slutet av quiz!
        }).then(function (obj) {
          if (_this._getCount === 0) {
              _this.totTimeCounter() // counts entire round
          }
          _this._getCount = _this._getCount + 1
            console.log(obj)
            _this.returnObject = obj
            _this._nextUrl = obj.nextURL

            _this.showQuestion()
        }).catch(function(err) { // fångar eventuella fel
            console.error('fel har inträffat')
            console.error(err)
        })
    }

  showQuestion () {
    console.log('------dafsd---------')
    console.log(this.returnObject)
    console.log(this.returnObject.alternatives)
    console.log('------dafsd---------')

    // countdown timer
    const myTimer = document.createElement('my-countdown-timer')
      document.querySelector('#container').appendChild(myTimer).setAttribute('limit', this.returnObject.limit)

    console.log('TID LIMIT: ', this.returnObject.limit)



    console.log('är i show question')
    const obj = this.returnObject
    const currentQuestion = obj.question


    if (this.returnObject.alternatives === undefined) { // om frågan är av typen input
    // skapar question template
    this.shadowRoot.appendChild(questionInput.content.cloneNode(true))

    // lägger in frågan i question template headern
    const questionHeader = this.shadowRoot.querySelector('#question')
    const questionHeaderText = document.createTextNode(currentQuestion)
    questionHeader.appendChild(questionHeaderText)

    } else if (this.returnObject.alternatives !== undefined) { // om frågan är av typen radio btn
          // skapar question template
    this.shadowRoot.appendChild(questionRadio.content.cloneNode(true))
    // lägger in frågan i question template headern
    const radioQuestionHeader = this.shadowRoot.querySelector('#question')
    const radioQuestionHeaderText = document.createTextNode(currentQuestion)
    radioQuestionHeader.appendChild(radioQuestionHeaderText)

    // skapa antal radioknappar här!
    let numOfAlt = Object.keys(obj.alternatives).length
    console.log('ANTAL ALTERNATIV!123', numOfAlt)

    for (let i = 0; i < numOfAlt; i++) { // skapar lika många radioknappar som alternativ!

      const button = document.createElement('input')

      let currentValue = i + 1
      let currentButton = `alt${currentValue}`

      // lägger till i formulär och skapar id
      this.shadowRoot.querySelector('#altFormBtns').appendChild(button).setAttribute('id', currentButton)

      // sätter attribut
      this.shadowRoot.querySelector(`#${currentButton}`).setAttribute('type', 'radio')
      this.shadowRoot.querySelector(`#${currentButton}`).setAttribute('name', 'alt')
      this.shadowRoot.querySelector(`#${currentButton}`).setAttribute('value', `alt${currentValue}`)



      // skapa label för knapp

      let label = document.createElement('label')
      let labelQuestion = `alt` + (i + 1)
      let labelTextNode = document.createTextNode(obj.alternatives[labelQuestion])
      label.appendChild(labelTextNode)
      this.shadowRoot.querySelector('#altFormBtns').appendChild(label)

      // byter rad:
      let changeRow = document.createElement('br')
      this.shadowRoot.querySelector('#altFormBtns').appendChild(changeRow)
    }
  }


    this.questionAnswer()
    }

    questionAnswer () {
      console.log('questionAnser: här svaret väntas in och bearbetas!')


      if (this.returnObject.alternatives === undefined) { // om frågan är av typen input
      const answerBtn = this.shadowRoot.querySelector('#answerBtn')
      const inputElement = this.shadowRoot.querySelector('#questionInput')

      // trycka på knappen
      answerBtn.addEventListener('click', () => {
       var answer = this.shadowRoot.querySelector('#questionInput').value
       this.postAnswer(answer)
      })

      

      // enter knapp
      inputElement.addEventListener('keypress', (e)=> {
        if (e.key === 'Enter') {
          var answer = this.shadowRoot.querySelector('#questionInput').value
          this.postAnswer(answer)
        }
      })
      } else {
        console.log('OM DET ÄR RADIOKNAPPAR!')
        const radiocontBtn = this.shadowRoot.querySelector('#continueBtn')
        radiocontBtn.addEventListener('click', () => {
          
          const allRadioBtns = this.shadowRoot.querySelectorAll('input[name="alt"]') // alla radioknappar
        
          var answer

          for (let radiobutton of allRadioBtns) { // går igenom och kontrollerar om en radioknapp är markerad. om någon är läggs värdet i value
            if (radiobutton.checked) {
              answer = radiobutton.value
              break
            }
          }

          this.postAnswer(answer)
        })
        
      }
    }

    async postAnswer (userResult) {
      console.log('postAnswer starts')
      console.log('anv resultat: ', userResult) // användarens resultat
      document.querySelector('my-countdown-timer').cancelCountdown() // stopar nedräkning!

      var obj = {}

      var value = userResult
      obj.answer = value

      var jsonObj = JSON.stringify(obj) // JSON som ska skickar till server

      console.log(jsonObj)

      var _this = this
    await window.fetch(this._nextUrl, { // await släpper kön 
    method: 'Post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj) 
    
}).then(function (response) {
  //console.log(response.json())
  _this._statusCode = response.status // lagrar statuskoden
  return response.json()
}).then(function (postResponse) {
  console.log(postResponse)
  _this._answerResponse = postResponse
  // // lagrar responsen i this._answerResponse
  _this.returnResponse()
}).catch(function(err) { // fångar eventuella fel
  console.error('fel har inträffat')
  console.error(err)
})
}

returnResponse () {
  console.log('-------POST-Status-Code------')
  console.log(this._statusCode)
  console.log(this._answerResponse)
  console.log('-----------------------------')
  if (this._statusCode === 200 && this._answerResponse.nextURL === undefined) { // gör både denna och nästa if !! felet som sker när den slutar!

    this.stopTotTimeCounter() // stoppar timer
    // lägger till resultat i local storage:
    window.localStorage.setItem('my-new-high-score', this.totQuizTime) // antal sekunder det tog att svara på frågorna


    const responseElement = this.shadowRoot.querySelector('#response')
    const responseText = document.createTextNode(this._answerResponse.message)
    responseElement.appendChild(responseText)

    var _this = this
    setTimeout(function () {
      _this.resetQuestion()
    
      // skapar high score element
      const myHighScore = document.createElement('my-high-score')
      document.querySelector('#container').appendChild(myHighScore)

    }, 1500) // går inte vidare på 1.5 sekunder så användare hinner se meddelande. OBS! kan ev störa 20 sek timern!



  
  } else if (this._statusCode === 200 && this._answerResponse.nextURL !== undefined) {

  const responseElement = this.shadowRoot.querySelector('#response')
  const responseText = document.createTextNode(this._answerResponse.message)
  responseElement.appendChild(responseText)

  this._nextUrl = this._answerResponse.nextURL // sätter nästa url

  console.log(this._nextUrl)

  var _this = this
  setTimeout(function () {
    _this.resetQuestion()
  }, 1500) // går inte vidare på 1.5 sekunder så användare hinner se meddelande. OBS! kan ev störa 20 sek timern!

} else if (this._statusCode === 400) {
  //alert('YOU LOST!')
  //location.reload() // ändra till visa highscore/ restart knapp ??
  const responseElement = this.shadowRoot.querySelector('#response')
  const responseText = document.createTextNode(this._answerResponse.message)
  responseElement.appendChild(responseText)
  

  var _this = this
  setTimeout(function () {
    _this.restartmyQuiz()
  }, 1500)


} else {
  alert('statuscode does not equal 200 or 400! statuscode: ', this._statusCode)
}

}

resetQuestion () { // återställer frågor och tar fram nästa

  this.shadowRoot.querySelector('#displayedQustion').remove() // tar bort elementet med frågan
  document.querySelector('my-countdown-timer').remove() // tar bort countdown elementet

  if (this._statusCode === 200 && this._answerResponse.nextURL !== undefined) {
  this.getQuestion()
  }

}

ranOutOfTime () {
  const responseElement = this.shadowRoot.querySelector('#response')
  const responseText = document.createTextNode('Time ran out!')
  responseElement.appendChild(responseText)
  
  var _this = this
  setTimeout(function () {
    console.log('är här!!876')
    _this.restartmyQuiz()
  }, 1500)

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

firstUrlCheck() {
  if (this._firstUrl === this._attributeUrl) {
    this._nextUrl = this._firstUrl // om inget attribut används!
  } else {
    this._nextUrl = this._attributeUrl // om ett attribut används!
  }
}

restartmyQuiz () {

  // stoppar tiden
  clearInterval(this.quizLengthTimer)
  // återställer tiden:
  this.totQuizTime = 0

  // väljer och sätter start url
  this.firstUrlCheck()

  // återställer getCount
  this._getcount = 0

  // tar bort element
 document.querySelector('my-quiz-question').remove()
 document.querySelector('my-countdown-timer').remove()

  //startar igen
  document.querySelector('my-quiz').connectedCallback()

}

})
