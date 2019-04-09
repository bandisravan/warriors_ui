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
class AbcretailCreateApp extends PolymerElement {
    constructor(){
        super();
    }
    ready(){
        super.ready();
    }
    connectedCallback(){
        super.connectedCallback();
        this.$.createForm.addEventListener('iron-form-submit', function(event) {
            
            var ajaxElem = this.$.createAjax;
            let details = event.detail;
            let data = {
  "name" :details.userName,
  "email" : details.userEmail,
  "nationality" : details.nationality,
  "phoneNo" : 9876245433,
  "gender": details.gender,
  "pan": details.pan,
  "aadhaar":details.adhaar
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
      <iron-ajax id="createAjax" url="{{getConfig('createAccount')}}" on-response="_handleCreateResponse" handle-as="json" on-error="_handleCreateError"></iron-ajax>
      <div class="card">
      <h2>Create Account</h2>
        <iron-form id="createForm">
      <form>      
        <paper-input label="User Name" name="userName" required auto-validate error-message="Enter User Name" value=""></paper-input>
        <paper-input label="User Email" name="userEmail" required auto-validate error-message="Enter Email" value=""></paper-input>
        <paper-input label="Nationality" name="nationality" required auto-validate error-message="Enter Nationality" value=""></paper-input>
        <paper-input label="Phone Number" name="phoneNumber" required auto-validate error-message="Enter Phone No" value=""></paper-input>
        <paper-input label="PAN" required name="pan" auto-validate error-message="Enter PAN" value=""></paper-input>
        <paper-input label="ADHAAR number" name="adhaar" required auto-validate error-message="Enter ADHAAR" value=""></paper-input>

      <paper-dropdown-menu label="Select Gender" id="genderSelect" name="gender" required>
        <paper-listbox slot="dropdown-content">
          <paper-item value="male">Male</paper-item>
          <paper-item value="femate">Femate</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
      <div>
        <paper-button raised on-click="_createSubmit">CREATE</paper-button>
        </div>
      </form>
    </iron-form>
      
      </div>
      <paper-toast id="createMsg" text="Account Created Successfully." horizontal-align="right"></paper-toast>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'abcretail-app'
      }
    };
  }
  _createSubmit(){
      if(this.$.createForm.validate()){
          this.$.createForm.submit();
      }

  }
  _handleCreateResponse(e){
      let resp = e.detail.response;
      this.$.createForm.reset();
      this.$.createMsg.toggle();
  }
  getConfig(path){
    return config.baseURL+'/'+path;
}
   
}

window.customElements.define('abcretail-create', AbcretailCreateApp);
