webpackJsonp([10],{1007:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(193);n.n(o)},1213:function(e,t,n){"use strict";function o(e){var t=e[e.length-1];if(t)return t.title}function r(e){var t=e||"";t!==document.title&&(document.title=t)}function a(){}var i=n(5),u=n(8),c=n(1214);a.prototype=Object.create(i.Component.prototype),a.displayName="DocumentTitle",a.propTypes={title:u.string.isRequired},a.prototype.render=function(){return this.props.children?i.Children.only(this.props.children):null},e.exports=c(o,r)(a)},1214:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=n(5),c=o(u),l=n(1215),f=o(l),p=n(826),s=o(p);e.exports=function(e,t,n){function o(e){return e.displayName||e.name||"Component"}if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(l){function p(){h=e(d.map(function(e){return e.props})),m.canUseDOM?t(h):n&&(h=n(h))}if("function"!=typeof l)throw new Error("Expected WrappedComponent to be a React component.");var d=[],h=void 0,m=function(e){function t(){return r(this,t),a(this,e.apply(this,arguments))}return i(t,e),t.peek=function(){return h},t.rewind=function(){if(t.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=h;return h=void 0,d=[],e},t.prototype.shouldComponentUpdate=function(e){return!(0,s.default)(e,this.props)},t.prototype.componentWillMount=function(){d.push(this),p()},t.prototype.componentDidUpdate=function(){p()},t.prototype.componentWillUnmount=function(){var e=d.indexOf(this);d.splice(e,1),p()},t.prototype.render=function(){return c.default.createElement(l,this.props)},t}(u.Component);return m.displayName="SideEffect("+o(l)+")",m.canUseDOM=f.default.canUseDOM,m}}},1215:function(e,t,n){var o;!function(){"use strict";var r=!("undefined"==typeof window||!window.document||!window.document.createElement),a={canUseDOM:r,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:r&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:r&&!!window.screen};void 0!==(o=function(){return a}.call(t,n,t,e))&&(e.exports=o)}()},1219:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(5),a=o(r),i=n(94),u=o(i),c=n(1220),l=o(c);t.default=function(e){var t=e.className,n=e.links,o=e.copyright,r=(0,u.default)(l.default.globalFooter,t);return a.default.createElement("div",{className:r},n&&a.default.createElement("div",{className:l.default.links},n.map(function(e){return a.default.createElement("a",{key:e.title,target:e.blankTarget?"_blank":"_self",href:e.href},e.title)})),o&&a.default.createElement("div",{className:l.default.copyright},o))},e.exports=t.default},1220:function(e,t){e.exports={globalFooter:"globalFooter___1cM92",links:"links___P5aS8",copyright:"copyright___1ZP5c"}},1359:function(e,t){e.exports={container:"container___16mH3",top:"top___1Gnr4",header:"header___1BCvC",logo:"logo___1DNk2",title:"title___1oYhS",desc:"desc___2sv9L",footer:"footer___3qBRZ"}},1360:function(e,t,n){e.exports=n.p+"static/logo.ffe9256f.svg"},818:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r,a,i=n(314),u=o(i),c=n(42),l=o(c),f=n(43),p=o(f),s=n(48),d=o(s),h=n(49),m=o(h),y=n(313),v=o(y);n(1007);var _=n(5),w=o(_),E=n(8),b=o(E),g=n(315),O=n(1213),k=o(O),x=n(1219),C=(o(x),n(1359)),j=o(C),P=n(1360),M=(o(P),w.default.createElement("div",null,"Copyright ",w.default.createElement(v.default,{type:"copyright"})," 2017 \u8682\u8681\u91d1\u670d\u4f53\u9a8c\u6280\u672f\u90e8\u51fa\u54c1"),a=r=function(e){function t(){return(0,l.default)(this,t),(0,d.default)(this,(t.__proto__||(0,u.default)(t)).apply(this,arguments))}return(0,m.default)(t,e),(0,p.default)(t,[{key:"getChildContext",value:function(){return{location:this.props.location}}},{key:"getPageTitle",value:function(){var e=this.props,t=e.getRouteData,n=e.location,o=n.pathname,r="Ant Design Pro";return t("UserLayout").forEach(function(e){e.path===o&&(r=e.name+" - Ant Design Pro")}),r}},{key:"render",value:function(){var e=this.props.getRouteData;return w.default.createElement(k.default,{title:this.getPageTitle()},w.default.createElement("div",{className:j.default.container},w.default.createElement("div",{className:j.default.top},w.default.createElement("div",{className:j.default.header},w.default.createElement(g.Link,{to:"/"},w.default.createElement("span",{className:j.default.title},"\u76ee\u535a\u79d1\u6280"))),w.default.createElement("div",{className:j.default.desc},"\u8f66\u6d41\u91cf\u53ef\u89c6\u5316\u5e73\u53f0-Bate")),e("UserLayout").map(function(e){return w.default.createElement(g.Route,{exact:e.exact,key:e.path,path:e.path,component:e.component})})))}}]),t}(w.default.PureComponent),r.childContextTypes={location:b.default.object},a);t.default=M,e.exports=t.default},826:function(e,t){e.exports=function(e,t,n,o){var r=n?n.call(o,e,t):void 0;if(void 0!==r)return!!r;if(e===t)return!0;if("object"!=typeof e||!e||"object"!=typeof t||!t)return!1;var a=Object.keys(e),i=Object.keys(t);if(a.length!==i.length)return!1;for(var u=Object.prototype.hasOwnProperty.bind(t),c=0;c<a.length;c++){var l=a[c];if(!u(l))return!1;var f=e[l],p=t[l];if(!1===(r=n?n.call(o,f,p,l):void 0)||void 0===r&&f!==p)return!1}return!0}}});