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
<div id="nameSetup">
<p>Tid kvar:</p>
<span id="countdowntimer">8</span>
</div>
`


/**
 * Define custom element.
 */
customElements.define('my-countdown-timer',
  class extends HTMLElement {

  constructor () {
    super()

    this.time = 8 // tiden att räkna ner ifrån

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

  }

  static get observedAttributes () {

  }

  connectedCallback () {
    this.beginCountdown() // startar nedräkning

  }

  attributeChangedCallback (name, oldValue, newValue) {

  }

  disconnectedCallback () {

  }

  beginCountdown () { // timern som räknar ner från this.time (ta bort 20 från template!)

    var _this = this
    _this.timer = setInterval(function(){
      _this.time = _this.time - 1
      _this.shadowRoot.querySelector('#countdowntimer').textContent = _this.time
        
      if(_this.time <= 0) {
        clearInterval(_this.timer)
        console.log('tiden tog slut!!')
        document.querySelector('my-quiz-question').ranOutOfTime()
      }
    },1000)


  }

  cancelCountdown () {
    clearInterval(this.timer)
  }

  }
)
