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

  </style>
<p>quiz!!</p>
`

/**
 * Define custom element.
 */
customElements.define('my-quiz',
  class extends HTMLElement {

    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

    }

    static get observedAttributes () {

    }

    connectedCallback () {
      console.log('connected called!')

      // skapar nickname med my-nickname komponent!
      const clickLog = document.createElement('my-nickname')
      document.querySelector('body').appendChild(clickLog)

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
          _this.nextQuestion()
        })
      }, 1)

    }

    nextQuestion () {
      console.log('är i nextQuestion!')
      
      const question = document.createElement('my-quiz-question')
      document.querySelector('body').appendChild(question)
    }
  }
)
