import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/iron-ajax/iron-ajax.js';
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
        this.$.DetailsAjax.body ={'custId':sessionStorage.getItem('userId')};
        this.$.DetailsAjax.contentType ="application/json";
        this.$.DetailsAjax.method ="POST";
        this.$.DetailsAjax.generateRequest();
    }
    connectedCallback(){
        super.connectedCallback();
        this.$.transferForm.addEventListener('iron-form-submit', function(event) {
            
            var ajaxElem = this.$.transferAjax;
            let details = event.detail;
            let userId = sessionStorage.getItem('userId')
            let data = {
              "custId" : userId,
              "amount" : details.amount,
              "toCustId":this.$.benSelect.selectedItem.getAttribute('id')
            } 
        ajaxElem.method ="POST";
        ajaxElem.contentType = "application/json";
        ajaxElem.body = JSON.stringify(data);
        ajaxElem.generateRequest();
            
        }.bind(this));

        this.$.DetailsAjax.body ={'custId':sessionStorage.getItem('userId')};
        this.$.DetailsAjax.contentType ="application/json";
        this.$.DetailsAjax.method ="POST";
        this.$.DetailsAjax.generateRequest();
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
        paper-toast{
          background:#0a9e56;
          color:#fff;
        }
        #errorTransferMsg{
          color:#ff2600;
          text-align:center;
          font-size:20px;
        }
      </style>
      <iron-ajax id="DetailsAjax" url="{{getConfig('getAccountInfo')}}" on-response="_handleDetailsResponse" handle-as="json" on-error="_handleDetailsError"></iron-ajax>
      <iron-ajax id="transferAjax" url="{{getConfig('transferAmount')}}" on-response="_handleTransferResponse" handle-as="json" on-error="_handleTransferError"></iron-ajax>
      <div class="card">
      <div>
     <h3> Welcome [[customerName]]</h3>
      </div>
      <div>Account Balance: Rs: [[customerBalance]]<br /></div>
      <br />
      <h2>Transfer Fund</h2>
      <div id="errorTransferMsg">[[errorMsg]]</div>
    <iron-form id="transferForm">
      <form>      
        <paper-input label="Amount" name="amount" required auto-validate error-message="Enter Amount" value=""></paper-input>
        <paper-dropdown-menu label="Select Beneficiary" id="benSelect" name="beneficiary" required>
        <paper-listbox slot="dropdown-content">  
        <template is="dom-repeat" items="[[beneficiary]]">      
          <paper-item id="[[item.value]]">[[item.name]]</paper-item>
          </template>
        </paper-listbox>
      </paper-dropdown-menu>
        
      <div>
      </br>
        <paper-button raised on-click="_transferSubmit">SUBMIT</paper-button>
        <paper-button raised on-click="_transferCancel">RESET</paper-button>
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
      },
      beneficiary:{
        type:Array,
        value:[{'name':'Beneficiary 1', 'value':'11530'},{'name':'Beneficiary 2', 'value':'23351'}]
      }
    };
  }
  getConfig(path){
    return config.baseURL+'/'+path;
}

  _transferSubmit(){
      if(this.$.transferForm.validate()){
        if(this.customerBalance > 0){
          this.$.transferForm.submit();
        }else{
          this.errorMsg = "Insufficient Balance!";
        }          
      }

  }
  _handleTransferResponse(e){
      this.$.transferForm.reset();
      this.$.transferMsg.toggle();      
       this.customerBalance = e.detail.response.balance;
  }
  
   _handleDetailsResponse(e){
       this.customerName = e.detail.response.name;
       this.customerBalance = e.detail.response.balance;

   }
   _transferCancel(){
      this.$.transferForm.reset();
   }
}

window.customElements.define('abcretail-details', AbcretailDetailsApp);
