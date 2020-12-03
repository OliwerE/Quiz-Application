/**
 * Module that counts down from a number.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

/**
 * A template for countdown.
 */

const template = document.createElement('template')
template.innerHTML = `
<div id="my-countdown-timer-container">
<p>Tid kvar:</p>
<span id="countdowntimer"></span>
</div>
`

/**
 * An element counting down to zero.
 */
customElements.define('my-countdown-timer',
  /**
   * Class representing the countdown object.
   */
  class extends HTMLElement {
  /**
   * Constructs the element.
   */
    constructor () {
      super()

      this._ranOutOfTime = 'my-quiz'
      this.time = 20 // tiden att räkna ner ifrån

      /**
       * Shadowdom containing the countdown div.
       */
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }

    /**
     * A method observing two element attributes.
     *
     * @returns {string} - the observed attribute found.
     */
    static get observedAttributes () {
      return ['limit', 'timeRanOut']
    }

    /**
     * Called when the element is loaded. Runs beginCountdown method.
     */
    connectedCallback () {
      this.beginCountdown() // startar nedräkning
    }

    /**
     * Called when an attribute has changed.
     *
     * @param {string} name - name of the attribute.
     * @param {string} oldValue - the old attribute value.
     * @param {string} newValue - the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'limit') {
        const newLimit = Number(newValue)
        if (Number.isInteger(newLimit) === true) { // om newValue är av typen number (förutom NaN)
          this.time = newLimit
        }
      } else if (name === 'timeRanOut') { // ev kontrollera att attributet är ett id??
        this._ranOutOfTime = newValue
      }
    }

    /**
     * Called when element is removed from dom.
     */
    disconnectedCallback () {

    }

    /**
     * Method starting countdown.
     */
    beginCountdown () { // timern som räknar ner från this.time (ta bort 20 från template!)
      const _this = this
      setTimeout(function () { // DÅLIG LÖSNING???
        _this.shadowRoot.querySelector('#countdowntimer').textContent = _this.time // innan första sekunden tas bort!
      }, 0)

      _this.timer = setInterval(function () {
        _this.time = _this.time - 1
        _this.shadowRoot.querySelector('#countdowntimer').textContent = _this.time

        if (_this.time <= 0) {
          clearInterval(_this.timer)
          document.querySelector(_this._ranOutOfTime).myCountdownTimerRanOutOfTime() // ta bort hårdkodning för annan komponent! (lägg till med attribut??)
        }
      }, 1000)
    }

    /**
     * Method that stops countdown.
     */
    cancelCountdown () {
      clearInterval(this.timer)
    }
  }
)
