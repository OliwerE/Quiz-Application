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
    const question = obj.question
    
    // skapar h3 element med frågan i shadow roten
    const questionElement = document.createElement('h3')
    this.shadowRoot.appendChild(questionElement)
    const theQuestion = document.createTextNode(question)
    questionElement.appendChild(theQuestion)

    // skapar input template

  
    // 20 sek timern
    setTimeout(function () {
      alert('20 sec you lost!')
      location.reload() // laddar om sidan!
    }, 20000)

    }

    })
