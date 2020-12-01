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
<style>
#my-high-score {
    background-color: green;
    width: 250px;
    height: 250px;
}
#my-high-score h1 {
    text-align: center;
}
</style>
<div id="my-high-score">
<h1>HIGH SCORE:</h1>
<ol>
  <li id="top1"></li>
  <li id="top2"></li>
  <li id="top3"></li>
  <li id="top4"></li>
  <li id="top5"></li>
</ol>
</div>
`


/**
 * Define custom element.
 */
customElements.define('my-high-score',
  class extends HTMLElement {

  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

  }

  static get observedAttributes () {

  }

  connectedCallback () {




  }

  attributeChangedCallback (name, oldValue, newValue) {

  }

  disconnectedCallback () {

  }

  }
)
