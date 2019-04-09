import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-toast/paper-toast.js';

/**
 * @customElement
 * @polymer
 */
class AbcretailDetailsApp extends PolymerElement {
    constructor(){
        super();
    }
    ready(){
        super.ready();
    }
    connectedCallback(){
        super.connectedCallback();
        this.$.transferForm.addEventListener('iron-form-submit', function(event) {
            
            var ajaxElem = this.$.transferAjax;
            let details = event.detail;
            let userId = JSON.parse(localStorage.getItem('userData')).userId
            let data = {
  "custId" :userId,
  "amount" : details.amount
} 
        ajaxElem.method ="POST";
        ajaxElem.contentType = "application/json";
        ajaxElem.body = JSON.stringify(data);
        ajaxElem.generateRequest();
            
        }.bind(this));
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
      <iron-ajax auto id="DetailsAjax" url="{{getConfig('getAccountInfo')}}" on-response="_handleDetailsResponse" handle-as="json" on-error="_handleDetailsError"></iron-ajax>
      <iron-ajax id="transferAjax" url="{{getConfig('transferAmount')}}" on-response="_handleTransferResponse" handle-as="json" on-error="_handleTransferError"></iron-ajax>
      <div class="card">
      <h2>Customer Details</h2>
      <div>
     <h3> Welcome [[customerName]]<br /></h3>
      </div>
      <div>Account Balance: [[customerBalance]]<br /></div>

      <h2>Transfer Fund</h2>
    <iron-form id="transferForm">
      <form>      
        <paper-input label="Amount" name="userName" required auto-validate error-message="Enter Amount" value=""></paper-input>
        <paper-input disabled label="Beneficiary" value="Beneficiary1" name="beneficiary"></paper-input>
        
      <div>
        <paper-button raised on-click="_transferSubmit">SUBMIT</paper-button>
        </div>
      </form>
    </iron-form>
      
      </div>
      <paper-toast id="transferMsg" text="Transferred Successfully." horizontal-align="right"></paper-toast>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'abcretail-app'
      },
      customerName:{
          type:String,
          value: "Ram Mohan"
      },
      customerBalance:{
          type:String,
          value: "1000"
      }
    };
  }
  getConfig(path){
    return config.baseURL+'/'+path;
}

  _transferSubmit(){
      if(this.$.transferForm.validate()){
          this.$.transferForm.submit();
      }

  }
  _handleTransferResponse(e){
      this.$.transferForm.reset();
      this.$.transferMsg.toggle();
  }
  
   _handleDetailsResponse(e){
       this.customerName = e.detail.response.customerName;
       this.customerBalance = e.detail.response.balance;

   }
}

window.customElements.define('abcretail-details', AbcretailDetailsApp);
