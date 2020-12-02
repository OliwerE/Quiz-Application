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
<style>
#nameSetup {
  width: 300px;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
<div id="nameSetup">
<h3>Ange namn:</h3>
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
            window.localStorage.setItem('my-nickname', inputValue)
            this.removeQuizSetup()
          })

          // Event lyssnare enter
          const enterBtn = this.shadowRoot.querySelector('#myInput')

          enterBtn.addEventListener('keypress', (e)=> {
            if (e.key === 'Enter') {
              const inputValue = this.shadowRoot.querySelector('#myInput').value
              console.log(inputValue)
              window.localStorage.setItem('my-nickname', inputValue)
              this.removeQuizSetup()
            }
          })


    }

    attributeChangedCallback (name, oldValue, newValue) {

    }

    disconnectedCallback () {

    }

    removeQuizSetup () {
      console.log('startar ta bort template!')

      document.querySelector('my-nickname').remove()
    }
  }
)
