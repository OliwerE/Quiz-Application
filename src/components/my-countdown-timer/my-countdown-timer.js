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
<span id="countdowntimer"></span>
</div>
`


/**
 * Define custom element.
 */
customElements.define('my-countdown-timer',
  class extends HTMLElement {

  constructor () {
    super()

    this.time = 20 // tiden att räkna ner ifrån

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

  }

  static get observedAttributes () {
    return ['limit']
  }

  connectedCallback () {
    this.beginCountdown() // startar nedräkning

  }

  attributeChangedCallback (name, oldValue, newValue) {

    if (name === 'limit') {
      var newLimit = Number(newValue)
      if (Number.isInteger(newLimit) === true) { // om newValue är av typen number (förutom NaN)
        console.log('limit fick ett nytt värde123: ', newLimit)
        this.time = newLimit
      }
      
    }

    /*
    if (newValue !== 'undefined') {
      console.log('limit fick ett nytt värde123: ', newValue)
    }*/
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
