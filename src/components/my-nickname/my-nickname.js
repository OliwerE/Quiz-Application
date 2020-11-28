/**
 * module....
 *
 * @author // TODO: YOUR NAME <YOUR EMAIL>
 * @version 1.0.0
 */

/**
 * Define template.
 */

const form = document.createElement('template')
form.innerHTML = `
<div id="nameSetup">
<h2>Skriv in ditt namn!</h2>
<input type="text" placeholder="Namn" id="myInput">
<button type="button" id="setupBtn">Fortsätt</button>
</div>
`


/**
 * Define custom element.
 */
customElements.define('my-nickname',
  class extends HTMLElement {

    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(form.content.cloneNode(true))

    }

    static get observedAttributes () {

    }

    connectedCallback () {
        console.log('nick called!')
        const setupBtn = this.shadowRoot.querySelector('#setupBtn')
        
          setupBtn.addEventListener('click', () => { // ta bort denna event lyssnare när den är färdig!
            const inputValue = this.shadowRoot.querySelector('#myInput').value
            console.log(inputValue)
            document.cookie = inputValue  // Temp lösning! sparar som cookie!
            this.removeQuizSetup()
          })
    }

    attributeChangedCallback (name, oldValue, newValue) {

    }

    disconnectedCallback () {

    }

    removeQuizSetup () {
      console.log('startar ta bort template!')

      this.shadowRoot.querySelector('#nameSetup').remove()
    }
  }
)
