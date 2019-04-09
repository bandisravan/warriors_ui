import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';   

/**
 * @customElement
 * @polymer
 */
class AbcretailNotApp extends PolymerElement {
    constructor(){
        super();
    }
    ready(){
        super.ready();
    }
    connectedCallback(){
        super.connectedCallback();
        
    }
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .card{
          margin: 0 auto;
          padding:25px;
          width:700px;
          border-radius:1px;
          border:1px #ccc solid;
        }
      </style>
      <div class="card">
      Page Not Found.
      
      </div>
      

         
    `;
}
   
}

window.customElements.define('abcretail-notfound', AbcretailNotApp);
