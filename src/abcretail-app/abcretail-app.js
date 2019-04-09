import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';

setPassiveTouchGestures(true);
setRootPath(MyAppGlobals.rootPath);
/**
 * @customElement
 * @polymer
 */
class AbcretailApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        app-header{
          background:#ff6200;
          color:#fff;
        }

        app-header a{
          text-decoration:none;
          padding-right:10px;
          color:#fff;
        }
        .card{
          margin: 0 auto;
          padding:25px;
          width:700px;
          border-radius:1px;
          border:1px #ccc solid;
        }
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]" use-hash-as-path></app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

          <app-header slot="header">
            <app-toolbar>              
              <div main-title="">ABC RETAIL BANKING</div>
            <a name="home" href="[[rootPath]]#/home">Login</a>
            <a name="create" href="[[rootPath]]#/create">Create</a>
            <a name="detail" href="[[rootPath]]#/detail">Customer</a>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <abcretail-login route="{{route}}" name="home"></abcretail-login>
            <abcretail-details route="{{route}}" name="details"></abcretail-details>
            <abcretail-create route="{{route}}" name="create"></abcretail-create>
            <abcretail-notfound route="{{route}}" name="notfound"></abcretail-notfound>
          </iron-pages>
        </app-header-layout>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'abcretail-app'
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }
    static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }
  _routePageChanged(page) {
    if (!page) {
      this.page = 'home';
    } else if (['home', 'create', 'details'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'notfound';
    }
  }

  _pageChanged(page) {
    switch (page) {
      case 'home':
        import('./abcretail-login.js');
        break;
      case 'create':
        import('./abcretail-create.js');
        break;
      case 'details':
        import('./abcretail-details.js');
        break;
      case 'notfound':
        import('./abcretail-notfound.js');
        break;
    }
  }
}

window.customElements.define('abcretail-app', AbcretailApp);
