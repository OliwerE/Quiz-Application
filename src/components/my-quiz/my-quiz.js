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

const questionInput = document.createElement('template')
questionInput.innerHTML = `
<div id="nameSetup">
<h2></h2> <!--Fråga-->
<input type="text" placeholder="Svar" id="myInput">
<button type="button" id="nextQ">Nästa fråga</button>
</div>
`

const questionRadio = document.createElement('template')
questionRadio.innerHTML = `
<div id="nameSetup">
<h2></h2> <!--Fråga-->

<h1>Radioknappar här fixa! debug input:</h1>
<input type="text" placeholder="Svar" id="myInput">
<button type="button" id="nextQ">Nästa fråga</button>

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

    }

    attributeChangedCallback (name, oldValue, newValue) {

    }

    disconnectedCallback () {

    }

    nextQuestion () {
      console.log('är i nextQuestion!')
      
      // Tar emot frågan (resultat)

      // avgör OM det finns fler frågor (annars gå till avslut/high score)

      // väljer typ av input

      // går till question event lyssnare
    }
  }
)
