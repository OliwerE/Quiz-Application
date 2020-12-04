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
      this.returnElement = 'my-quiz'

      /**
       * Shadowdom containing the template.
       */
      this.attachShadow({ mode: 'open' })
        .appendChild(form.content.cloneNode(true))
    }

    /**
     * A method observing an element attribute.
     *
     * @returns {string} - the observed attribute found.
     */
    static get observedAttributes () {
      return ['returnElement']
    }

    /**
     * Called when the element is loaded. Adds event listeners for button (click and enter).
     */
    connectedCallback () {
      const setupBtn = this.shadowRoot.querySelector('#setupBtn') // Continue button.

      /**
       * A function used when user click the continue button.
       */
      this.eventSetupBtn = () => {
        const inputValue = this.shadowRoot.querySelector('#myInput').value
        window.localStorage.setItem('my-nickname', inputValue)
        this.removeNicknameEventListeners()
        this.removeQuizSetup()
      }

      setupBtn.addEventListener('click', this.eventSetupBtn) // Event listens on continue button.

      const enterBtn = this.shadowRoot.querySelector('#myInput') // input field

      /**
       * A function used by enter click event.
       *
       * @param {object} e - The event data.
       */
      this.eventEnterBtn = (e) => {
        if (e.key === 'Enter') {
          const inputValue = this.shadowRoot.querySelector('#myInput').value
          window.localStorage.setItem('my-nickname', inputValue)
          this.removeNicknameEventListeners()
          this.removeQuizSetup()
        }
      }

      enterBtn.addEventListener('keypress', this.eventEnterBtn) // Event listens on enter key.
    }

    /**
     * Called when an attribute has changed.
     *
     * @param {string} name - name of the attribute.
     * @param {string} oldValue - the old attribute value.
     * @param {string} newValue - the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'returnElement' && typeof name === 'string') { // Changes return element
        this.returnElement = newValue
      }
    }

    /**
     * Called when element is removed from dom. Returns to another element.
     */
    disconnectedCallback () {
      document.querySelector(this.returnElement).myNicknameFinished()
    }

    /**
     * Removes all my-nickname event listeners.
     */
    removeNicknameEventListeners () {
      const _this = this
      this.shadowRoot.querySelector('#setupBtn').removeEventListener('click', _this.eventSetupBtn)
      this.shadowRoot.querySelector('#myInput').removeEventListener('keypress', _this.eventEnterBtn)
    }

    /**
     * If input field has a name the nickname element is removed from the dom.
     */
    removeQuizSetup () {
      if (window.localStorage.getItem('my-nickname').length === 0) { // Restarts component if nickname input is empty.
        this.connectedCallback()
        alert('Nickname is empty!')
      } else {
        document.querySelector('my-nickname').remove()
      }
    }
  }
)
