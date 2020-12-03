/**
 * Module receives user nickname and stores in local storage.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

/**
 * A template containing the layout for the nickname element.
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
<input type="text" placeholder="Namn" id="myInput" maxlength="20">
<button type="button" id="setupBtn">Fortsätt</button>
</div>
`

/**
 * Displays an input field requesting users nickname and stores the name.
 */
customElements.define('my-nickname',
  /**
   * Class representing the nickname object.
   */
  class extends HTMLElement {
    /**
     * Constructs the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(form.content.cloneNode(true))
    }

    /**
     * Attributes observed if changed.
     */
    static get observedAttributes () {

    }

    /**
     * Called when the element is loaded. Adds event listeners for button (click and enter).
     */
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

      enterBtn.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const inputValue = this.shadowRoot.querySelector('#myInput').value
          console.log(inputValue)
          window.localStorage.setItem('my-nickname', inputValue)
          this.removeQuizSetup()
        }
      })
    }

    /**
     * Called when an attribute has changed.
     *
     * @param {string} name - name of the attribute.
     * @param {string} oldValue - the old attribute value.
     * @param {string} newValue - the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {

    }

    /**
     * Called when element is removed from dom.
     */
    disconnectedCallback () {

    }

    /**
     * Removes my-nickname element from dom.
     */
    removeQuizSetup () {
      console.log('startar ta bort template!')

      document.querySelector('my-nickname').remove()
    }
  }
)
