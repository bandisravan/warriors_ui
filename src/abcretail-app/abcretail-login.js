import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';

/**
 * @customElement
 * @polymer
 */
class AbcretailLoginApp extends PolymerElement {
    constructor(){
        super();
    }
    ready(){
        super.ready();
    }
    connectedCallback(){
        super.connectedCallback();
        this.$.loginForm.addEventListener('iron-form-submit', function(event) {
            
            var ajaxElem = this.$.loginAjax;
            let details = event.detail;
            let data = {
            "custId": details.userId,
            "password": details.password,
            "role": details.userRole
            }  
            this.userRoleSelected = details.userRole;
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
      <iron-ajax id="loginAjax" url="{{getConfig('login')}}" on-response="_handleLoginResponse" handle-as="json" on-error="_handleLoginError"></iron-ajax>
      <div class="card">
      <h2>LOGIN</h2>
<iron-form id="loginForm">
      <form>
      <paper-dropdown-menu label="Select User" id="userSelect" name="userRole" on-iron-select="_showForm">
        <paper-listbox slot="dropdown-content">
          <paper-item value="admin">Admin</paper-item>
          <paper-item value="customer">Customer</paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
      <div id="_showForm" style="display:none;">
        <paper-input label="User ID" name="userId" required auto-validate error-message="Enter User ID" value="{{userId}}"></paper-input>
        <paper-input type="password" name="password" label="User Password" required auto-validate error-message="Enter Password" value="{{userPwd}}"></paper-input>
        <paper-button raised on-click="_loginSubmit">LOGIN</paper-button>
        </div>
      </form>
    </iron-form>
      
      </div>
      

         
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'abcretail-app'
      },
      userId:{
          type: String
      },
      userPwd:{
          type: String
      },
      userRoleSelected:{
          type: String
      }
    };
  }

  _showForm(){

      this.$._showForm.style.display ="block";
  }
  _loginSubmit(){
      if(this.$.loginForm.validate()){
          this.$.loginForm.submit();
      }
  }
  _handleLoginResponse(e){
      let resp = e.detail.response;
      if(this.userRoleSelected == 'admin'){
          this.set('route.path','/create');
      }else if(this.userRoleSelected == 'customer'){
          this.set('route.path','/details');
      }
  }
  _handleLoginError(e){
      console.log('Error');
  }
   
}

window.customElements.define('abcretail-login', AbcretailLoginApp);
