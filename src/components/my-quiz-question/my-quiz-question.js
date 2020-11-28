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

const question2 = document.createElement('template')
question2.innerHTML = `
<div id="displayedQustion">
<h3 id="question"></h3>
<input type="text" placeholder="Svar" id="questionInput">
<button type="button" id="answerBtn">Fortsätt</button>
</div>
`

/**
 * Define custom element.
 */
customElements.define('my-quiz-question',
  class extends HTMLElement {

    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

    }

    static get observedAttributes () {

    }

    connectedCallback () {
      console.log('är i my quiz question')
      this.getQuestion()
    }

    attributeChangedCallback (name, oldValue, newValue) {

    }

    disconnectedCallback () {

    }

    async getQuestion () {
      var _this = this
        await window.fetch('http://courselab.lnu.se/question/1').then(function (response) {
            //console.log(response.json())
            return response.json()
        }).then(function (obj) {
            //console.log(obj)
            _this.returnObject = obj
            _this.showQuestion()
        }).catch(function(err) { // fångar eventuella fel
            console.error('fel har inträffat')
            console.error(err)
        })
    }

  showQuestion () {
    console.log('är i show question')
    const obj = this.returnObject
    const currentQuestion = obj.question

    // skapar question template
    this.shadowRoot.appendChild(question2.content.cloneNode(true))

    // lägger in frågan i question template headern
    const questionHeader = this.shadowRoot.querySelector('#question')
    const questionHeaderText = document.createTextNode(currentQuestion)
    questionHeader.appendChild(questionHeaderText)
  
    // 20 sek timern
    setTimeout(function () {
      alert('20 sec you lost!')
      location.reload() // laddar om sidan!
    }, 20000)
    this.questionAnswer()
    }

    questionAnswer () {
      console.log('questionAnser: här svaret väntas in och bearbetas!')

      const answerBtn = this.shadowRoot.querySelector('#answerBtn')

      answerBtn.addEventListener('click', () => {
       var answer = this.shadowRoot.querySelector('#questionInput').value
       this.postAnswer(answer)
      })
    }

    async postAnswer (userResult) {
      console.log('postAnswer starts')
      console.log('anv resultat: ', userResult) // användarens resultat

      var obj = {}

      var value = userResult
      obj.answer = value

      var jsonObj = JSON.stringify(obj) // JSON som ska skickar till server

      console.log(jsonObj)


    }

    })
