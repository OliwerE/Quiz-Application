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
<p>Time left:</p>
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

      this._ranOutOfTime = 'my-quiz' // an element the component calls when the time runs out
      this.time = 20 // Time component counts down from.

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
      const _this = this
      const awaitDom = setInterval(() => {
        if (_this.shadowRoot.querySelector('#countdowntimer') === null) {
          console.log('Waiting for element to appear in DOM')
        } else {
          _this.shadowRoot.querySelector('#countdowntimer').textContent = _this.time // Adds starting second
          _this.beginCountdown()
          clearInterval(awaitDom)
        }
      }, 1)
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
        if (Number.isInteger(newLimit) === true) { // Only changes this.time if newValue is a number.
          this.time = newLimit
        }
      } else if (name === 'timeRanOut') {
        this._ranOutOfTime = newValue
      }
    }

    /**
     * Method starting countdown from this.time.
     */
    beginCountdown () {
      const _this = this
      _this.timer = setInterval(function () {
        _this.time = _this.time - 1
        _this.shadowRoot.querySelector('#countdowntimer').textContent = _this.time

        if (_this.time <= 0) {
          clearInterval(_this.timer)
          document.querySelector(_this._ranOutOfTime).myCountdownTimerRanOutOfTime() // a method called in another element (this._ranOutOfTime) when time reaches zero.
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
