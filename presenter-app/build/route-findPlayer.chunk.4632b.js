(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{bGN1:function(t,e,n){"use strict";function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function r(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function u(t,e){return u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},u(t,e)}function c(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=a(t);if(e){var r=a(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return i(this,n)}}function i(t,e){if(e&&("object"===o(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function a(t){return a=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},a(t)}n.r(e),n.d(e,"default",(function(){return O}));var l=n("hosL"),s=n("Y3FI"),f=n("Gr+5"),p=n("5ili"),b=n("itMc"),y=n("7RrK"),d=n("sqB1"),h=n("+Qut"),O=function(t){function e(){return a.apply(this,arguments)}!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&u(t,e)}(e,t);var n,o,i,a=c(e);return n=e,(o=[{key:"componentDidMount",value:function(){d.b.play(d.a.find_player,0,50),h.a.playBackgroundLoop()}},{key:"componentWillUnmount",value:function(){d.b.stop(d.a.find_player),h.a.pauseBackground()}},{key:"render",value:function(t,e){var n=this;return Object(l.g)("div",{class:"route-find-player flex flex-column align-center"},Object(l.g)("div",{class:"box flex flex-column align-center"},Object(l.g)("h1",null,Object(l.g)("span",{class:"sub"},"Who's ready to be a")," ",Object(l.g)("span",{class:"main"},"JavaScriptær?")),Object(l.g)("div",{class:"instruction"},"Fastest Tweet to ",Object(l.g)("strong",null,"@ToddHGardner")," with the correct answer")),this.state.question?Object(l.g)("div",{class:"question-wrap"},Object(l.g)(f.a,{question:e.question})):"",Object(l.g)("div",{class:"controls"},Object(l.g)("button",{class:"btn btn-purple",type:"button",onClick:function(){return Object(s.c)("/")}},"Home"),Object(l.g)("button",{class:"btn btn-purple",type:"button",hidden:!!this.state.question,onClick:function(){return n.onShowQuestion()}},"Show Question"),Object(l.g)("button",{class:"btn btn-purple",type:"button",hidden:!this.state.question,onClick:function(){return n.onStartGame()}},"Start Game")),Object(l.g)(p.a,null))}},{key:"onShowQuestion",value:function(){d.b.stop(d.a.find_player),d.b.play(d.a.find_player,51.6),h.a.playFanfare();var t=b.a.getAllGames(),e=y.a.getQuestion("find-player",t.length,9);this.setState({question:e})}},{key:"onStartGame",value:function(){d.b.stop(d.a.find_player),d.b.play(d.a.result_win),Object(s.c)("/game/new")}}])&&r(n.prototype,o),i&&r(n,i),Object.defineProperty(n,"prototype",{writable:!1}),e}(l.a)}}]);
//# sourceMappingURL=route-findPlayer.chunk.4632b.js.map