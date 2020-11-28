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
      this.quizSetup()


    }

    attributeChangedCallback (name, oldValue, newValue) {

    }

    disconnectedCallback () {

    }

    quizSetup () {
      this.shadowRoot.appendChild(setup.content.cloneNode(true))
      const setupBtn = this.shadowRoot.querySelector('#setupBtn')
      
        setupBtn.addEventListener('click', () => {
          const inputValue = this.shadowRoot.querySelector('#myInput').value
          console.log(inputValue)
          document.cookie = inputValue  // Temp lösning! sparar som cookie!
          this.removeQuizSetup()
        })
    }
    removeQuizSetup () {
      console.log('jag är här')

      this.shadowRoot.querySelector('#nameSetup').remove()
    }
  }
)
