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
<h3 id="question"></h3>
<input type="text" placeholder="Svar" id="questionInput">
<button type="button" id="answerBtn">Fortsätt</button>
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

    }

    })
