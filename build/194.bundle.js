(self.webpackChunkmanagement=self.webpackChunkmanagement||[]).push([[194],{8738:(n,e,t)=>{"use strict";t.d(e,{Z:()=>s});var r=t(7294),i=t(5893);const s=function(n){var e=n.size,t=n.color,s=n.className;return(0,i.jsx)(r.Fragment,{children:(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:e||"1rem",className:s||"",height:e||"1rem",fill:"none",children:(0,i.jsx)("path",{fill:t||"#898989",d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"})})})}},8614:(n,e,t)=>{"use strict";t.d(e,{Z:()=>l});var r,i=t(168),s=t(7294),a=t(8804),o=t(5893);const l=function(n){var e=n.name,t=n.title,r=n.children,i=n.border,a=void 0===i||i,l=n.style;return(0,o.jsx)(s.Fragment,{children:(0,o.jsxs)(c,{style:l,border:a||!1,children:[(0,o.jsxs)("div",{children:[e&&(0,o.jsx)("p",{children:e}),t&&(0,o.jsx)("h1",{children:t})]}),(0,o.jsx)("div",{children:r})]})})};var c=a.ZP.header(r||(r=(0,i.Z)(["\n  width: 100%;\n  max-height: 125px;\n  min-height: 125px;\n  height: 100%;\n  display: flex;\n  border-bottom: ",";\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 1.5rem;\n  h1 {\n    margin-bottom: 0;\n    span {\n      font-weight: normal;\n    }\n  }\n  div:last-child {\n    display: flex;\n    button {\n      margin: 0 1rem;\n    }\n  }\n"])),(function(n){return n.border&&"1px solid #e2e9f3"}))},3106:(n,e,t)=>{"use strict";t.d(e,{Z:()=>l});var r=t(4942),i=t(8767),s=t(5454);function a(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function o(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?a(Object(t),!0).forEach((function(e){(0,r.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}const l=function(n,e){var t=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=arguments.length>3?arguments[3]:void 0,a=(0,s.a)(),l=a.user,c=a.token,d=l&&l.ref;return(0,i.useQuery)(n,e,o({enabled:!!c&&!!d&&t},r))}},1194:(n,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>z});var r,i,s,a,o,l,c,d,h,u,m,f=t(168),p=t(7484),g=t.n(p),x=t(4110),v=t.n(x),j=t(7294),y=t(9711),b=t(6974),$=t(8804),w=t(7505),N=t(8738),M=t(627),D=t(8614),O=t(5454),Z=t(5861),S=t(7757),k=t.n(S),P=t(9669),_=t.n(P),T=t(3106),L=t(3360),U=t(5893);const z=function(){var n,e=(0,O.a)().user,t=(new Date).getHours(),r=(n=function(){var n=(0,Z.Z)(k().mark((function n(){var e,t;return k().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,_().get("/management/data");case 2:return e=n.sent,t=e.data,n.abrupt("return",t);case 5:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),(0,T.Z)("dashboard",(function(){return n()}),undefined)),i=r.data,s=r.isLoading,a=r.isError;g().extend(v());var o=(0,b.s0)(),l=i&&i.paymentData;return(0,U.jsxs)(j.Fragment,{children:[(0,U.jsx)(D.Z,{name:t<12?"Good Morning":t<18?"Good Afternoon":"Good Evening",title:"".concat(e.firstName&&e.firstName," ").concat(e.lastName&&e.lastName)}),a?(0,U.jsx)("div",{className:"align-center",style:{height:"30vh"},children:(0,U.jsx)("h3",{children:"Failed to load Dashboard!"})}):s?(0,U.jsxs)(L.u,{children:[(0,U.jsx)(L.$j,{type:"primary",size:"2rem"}),(0,U.jsx)(L.xg,{color:"#f08438",children:"Loading"})]}):i?(0,U.jsx)(C,{children:(0,U.jsxs)(H,{children:[(0,U.jsxs)("div",{children:[(0,U.jsx)(W,{"data-test-id":"info-card",children:(0,U.jsxs)("div",{className:"info-card",children:[(0,U.jsx)("div",{className:"info-head",children:(0,U.jsxs)("div",{className:"heading",children:[(0,U.jsx)(M.Z,{size:"2.5rem",color:"#343434"}),(0,U.jsx)("p",{children:"Users"})]})}),(0,U.jsxs)("div",{className:"info-body",children:[(0,U.jsxs)("div",{className:"item",children:[(0,U.jsx)("p",{className:"label",children:"Total"}),(0,U.jsx)("p",{className:"value",children:i.totalUsers})]}),(0,U.jsxs)("div",{className:"item",children:[(0,U.jsxs)("p",{className:"label",children:["Active",(0,U.jsx)("span",{style:{fontSize:"0.7rem",color:"#888"},children:" (30 Days)"})]}),(0,U.jsx)("p",{className:"value",children:i.activeUsers})]}),(0,U.jsxs)("div",{className:"item",children:[(0,U.jsx)("p",{className:"label",children:"Pro Users"}),(0,U.jsx)("p",{className:"value",children:i.proUsers})]}),(0,U.jsxs)("div",{className:"item",children:[(0,U.jsx)("p",{className:"label",children:"CEO Users"}),(0,U.jsx)("p",{className:"value",children:i.ceoUsers})]})]})]})}),(0,U.jsx)(W,{"data-test-id":"info-card",children:(0,U.jsxs)("div",{className:"info-card",children:[(0,U.jsxs)("div",{className:"info-head",children:[(0,U.jsxs)("div",{className:"heading",children:[(0,U.jsx)(w.Z,{size:"2.5rem",color:"#343434"}),(0,U.jsx)("p",{children:"Payments"})]}),(0,U.jsx)("div",{className:"duration",children:(0,U.jsx)("p",{children:"Last 30 days"})})]}),(0,U.jsxs)("div",{className:"info-body",children:[(0,U.jsxs)("div",{className:"item",children:[(0,U.jsx)("p",{className:"label",children:"Total"}),(0,U.jsx)("p",{className:"value",children:l&&"$".concat(l.total)||"-"})]}),(0,U.jsxs)("div",{className:"item",children:[(0,U.jsx)("p",{className:"label",children:"Refunds"}),(0,U.jsx)("p",{className:"value",children:l&&"$".concat(l.refund)||"-"})]}),(0,U.jsxs)("div",{className:"item",children:[(0,U.jsx)("p",{className:"label",children:"Stripe Fees"}),(0,U.jsx)("p",{className:"value",children:l&&"$".concat(l.fee)||"-"})]}),(0,U.jsxs)("div",{className:"item",children:[(0,U.jsx)("p",{className:"label",children:"Net Revenue"}),(0,U.jsx)("p",{className:"value",children:l&&"$".concat(l.net)||"-"})]})]})]})}),(0,U.jsxs)(F,{"data-test-id":"info-payments",style:{marginRight:"1.5rem",marginTop:"2.2rem",height:"425px"},children:[(0,U.jsxs)("div",{children:[(0,U.jsx)("h4",{children:"Recent Payments"}),i.payments&&i.payments.length>0?i.payments.map((function(n,e){return(0,U.jsxs)(V,{onClick:function(){return o("/payments/".concat(n.id))},children:[(0,U.jsxs)("div",{className:"details-wrapper",children:[(0,U.jsx)(R,{children:(0,U.jsx)(N.Z,{})}),(0,U.jsxs)("div",{children:[(0,U.jsx)("p",{children:n.email&&n.email||n.customer&&n.customer||"-"}),(0,U.jsx)("p",{className:"label",children:n.id})]})]}),(0,U.jsx)("div",{children:(0,U.jsxs)("p",{children:["$",n.amount]})}),(0,U.jsx)("div",{children:(0,U.jsx)("p",{children:n.date&&g()(n.date).fromNow()||"-"})})]},e)})):(0,U.jsx)("h3",{className:"align-center",children:"No payments"})]}),(0,U.jsx)(B,{children:(0,U.jsx)(y.rU,{className:"link",to:"/payments",children:"View All Payments"})})]})]}),(0,U.jsxs)(Y,{children:[(0,U.jsxs)(F,{style:{height:"325px"},"data-test-id":"info-signups",children:[(0,U.jsxs)("div",{children:[(0,U.jsx)("h4",{children:"Recent Signups"}),i.users&&i.users.length>0&&i.users.map((function(n,e){return(0,U.jsxs)(I,{onClick:function(){return o("/users/".concat(n.user_id,"/details"))},children:[(0,U.jsx)(E,{children:(0,U.jsx)("img",{src:n.picture})}),(0,U.jsxs)("div",{className:"details-info",children:[(0,U.jsx)("p",{className:"line-clamp-1",children:n.name}),(0,U.jsx)("p",{className:"label line-clamp-1",children:n.email})]})]},e)}))]}),(0,U.jsx)(B,{children:(0,U.jsx)(y.rU,{className:"link",to:"/users",children:"View All Users"})})]}),(0,U.jsxs)(F,{style:{height:"425px"},"data-test-id":"info-blogs",children:[(0,U.jsxs)("div",{children:[(0,U.jsx)("h4",{children:"Recent Blogs"}),i.blogs&&i.blogs.length>0&&i.blogs.map((function(n,e){return(0,U.jsxs)(A,{onClick:function(){return o("/blogs/".concat(n._id))},children:[(0,U.jsx)(E,{children:(0,U.jsx)("img",{src:n.image})}),(0,U.jsxs)("div",{children:[(0,U.jsxs)("p",{className:"line-clamp-1",children:[n.title," "]}),(0,U.jsx)("p",{className:"description line-clamp-1",children:n.short_description})]})]},e)}))]}),(0,U.jsx)(B,{children:(0,U.jsx)(y.rU,{className:"link",to:"/blogs",children:"View All Blogs"})})]})]})]})}):null]})};var C=$.ZP.div(r||(r=(0,f.Z)(["\n  padding: 1.5rem;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n"]))),H=$.ZP.div(i||(i=(0,f.Z)(["\n  display: grid;\n  grid-template-columns: 70% 30%;\n  height: 100%;\n  flex: 1;\n"]))),Y=$.ZP.div(s||(s=(0,f.Z)(["\n  height: 100%;\n"]))),A=$.ZP.div(a||(a=(0,f.Z)(["\n  display: grid;\n  grid-template-columns: 60px auto;\n  padding: 0.7rem 1rem;\n  cursor: pointer;\n  user-select: none;\n  &:hover {\n    background-color: rgba(255, 219, 193, 0.2);\n  }\n  p {\n    font-size: 0.8rem;\n    font-weight: 600;\n    margin: 0;\n  }\n\n  .description {\n    font-weight: 500;\n    color: #888;\n  }\n"]))),F=$.ZP.div(o||(o=(0,f.Z)(["\n  /* border-radius: 1rem;\n  box-shadow: #e7e9ee7d 4px 6px 10px 2px;\n  border: 1px solid #e7e9eea6;\n  background-color: #f7f8fa; */\n\n  border: 1px solid #e2e9f3;\n  box-shadow: 4px 4px 24px rgba(0, 51, 129, 0.07);\n  border-radius: 7px;\n\n  padding: 1rem 0;\n  margin-bottom: 2rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  overflow-y: auto;\n\n  h4 {\n    font-weight: 600;\n    padding: 0.5rem 1rem;\n    border-bottom: 1px solid #f0853840;\n  }\n"]))),W=$.ZP.div(l||(l=(0,f.Z)(["\n  display: block;\n  width: 100%;\n  max-height: 200px;\n  height: fit-content;\n  .info-card {\n    /* border: 1px solid #e7e9eea6;\n    border-radius: 1rem;\n    background-color: #f7f8fa;\n    box-shadow: #e7e9ee7d 4px 6px 10px 2px; */\n\n    border: 1px solid #e2e9f3;\n    box-shadow: 4px 4px 24px rgba(0, 51, 129, 0.07);\n    border-radius: 7px;\n\n    display: block;\n    height: 100%;\n    width: auto;\n    margin-right: 1.5rem;\n    padding: 1rem;\n    margin-bottom: 2.6rem;\n\n    p {\n      margin: 0;\n      font-weight: 600;\n      font-size: 0.9rem;\n    }\n    .label {\n      color: ",";\n    }\n    .value {\n      font-weight: 900;\n      font-size: 1rem;\n    }\n    .duration {\n      p {\n        font-size: 0.75rem;\n        color: #888;\n      }\n    }\n    .info-head {\n      display: flex;\n      width: 100%;\n      align-items: center;\n      justify-content: space-between;\n      margin-bottom: 0.5rem;\n      padding-bottom: 0.5rem;\n      border-bottom: 1px solid #f0853840;\n      .heading {\n        display: flex;\n        align-items: center;\n        p {\n          margin-left: 1rem;\n          font-size: 1.2rem;\n          margin-bottom: 0;\n        }\n      }\n      .balance {\n        color: #343434;\n        margin-right: 1rem;\n        font-weight: 900;\n      }\n    }\n    .info-body {\n      display: grid;\n      grid-template-columns: repeat(4, 25%);\n      .item {\n        &:not(:last-child) {\n          border-right: 1px solid #f0853840;\n          margin-right: 1.5rem;\n        }\n      }\n    }\n  }\n"])),(function(n){return n.theme.colors.primary})),B=$.ZP.div(c||(c=(0,f.Z)(["\n  display: flex;\n  justify-content: flex-start;\n  border-top: 1px solid #f0853840;\n  margin-top: 0.5rem;\n  padding: 0.5rem 1rem 0;\n"]))),E=$.ZP.div(d||(d=(0,f.Z)(["\n  width: 50px;\n  height: 50px;\n  border-radius: 0.5rem;\n  overflow: hidden;\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    object-position: center;\n  }\n"]))),I=$.ZP.div(h||(h=(0,f.Z)(["\n  display: grid;\n  grid-template-columns: 60px auto;\n  align-items: center;\n  padding: 0.5rem 1rem;\n  cursor: pointer;\n  user-select: none;\n  &:hover {\n    background-color: rgba(255, 219, 193, 0.2);\n  }\n  p {\n    display: flex;\n    font-size: 0.8rem;\n    margin: 0;\n    font-weight: 600;\n  }\n  .label {\n    color: #888;\n  }\n  "," {\n    margin-right: 0.7rem;\n    width: 45px;\n    height: 45px;\n    border-radius: 50%;\n  }\n  .details-info {\n    display: flex;\n    flex-direction: column;\n  }\n"])),E),R=$.ZP.div(u||(u=(0,f.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  margin-right: 1rem;\n  background-color: ",";\n  svg path {\n    fill: ",";\n  }\n"])),(function(n){return n.theme.shades.success}),(function(n){return n.theme.colors.success})),V=$.ZP.div(m||(m=(0,f.Z)(["\n  display: grid;\n  grid-template-columns: 60% 20% 20%;\n  padding: 0.5rem 1rem;\n  cursor: pointer;\n  user-select: none;\n  align-items: center;\n  &:hover {\n    background-color: rgba(255, 219, 193, 0.2);\n  }\n  p {\n    font-size: 0.8rem;\n    margin: 0;\n    font-weight: 600;\n  }\n  .label {\n    color: #888;\n  }\n  .details-wrapper {\n    display: flex;\n    align-items: center;\n    "," {\n      margin-right: 0.7rem;\n      border-radius: 50%;\n    }\n  }\n"])),E)},7484:function(n){n.exports=function(){"use strict";var n=6e4,e=36e5,t="millisecond",r="second",i="minute",s="hour",a="day",o="week",l="month",c="quarter",d="year",h="date",u="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,p={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},g=function(n,e,t){var r=String(n);return!r||r.length>=e?n:""+Array(e+1-r.length).join(t)+n},x={s:g,z:function(n){var e=-n.utcOffset(),t=Math.abs(e),r=Math.floor(t/60),i=t%60;return(e<=0?"+":"-")+g(r,2,"0")+":"+g(i,2,"0")},m:function n(e,t){if(e.date()<t.date())return-n(t,e);var r=12*(t.year()-e.year())+(t.month()-e.month()),i=e.clone().add(r,l),s=t-i<0,a=e.clone().add(r+(s?-1:1),l);return+(-(r+(t-i)/(s?i-a:a-i))||0)},a:function(n){return n<0?Math.ceil(n)||0:Math.floor(n)},p:function(n){return{M:l,y:d,w:o,d:a,D:h,h:s,m:i,s:r,ms:t,Q:c}[n]||String(n||"").toLowerCase().replace(/s$/,"")},u:function(n){return void 0===n}},v="en",j={};j[v]=p;var y=function(n){return n instanceof N},b=function n(e,t,r){var i;if(!e)return v;if("string"==typeof e){var s=e.toLowerCase();j[s]&&(i=s),t&&(j[s]=t,i=s);var a=e.split("-");if(!i&&a.length>1)return n(a[0])}else{var o=e.name;j[o]=e,i=o}return!r&&i&&(v=i),i||!r&&v},$=function(n,e){if(y(n))return n.clone();var t="object"==typeof e?e:{};return t.date=n,t.args=arguments,new N(t)},w=x;w.l=b,w.i=y,w.w=function(n,e){return $(n,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var N=function(){function p(n){this.$L=b(n.locale,null,!0),this.parse(n)}var g=p.prototype;return g.parse=function(n){this.$d=function(n){var e=n.date,t=n.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(m);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return t?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(n),this.$x=n.x||{},this.init()},g.init=function(){var n=this.$d;this.$y=n.getFullYear(),this.$M=n.getMonth(),this.$D=n.getDate(),this.$W=n.getDay(),this.$H=n.getHours(),this.$m=n.getMinutes(),this.$s=n.getSeconds(),this.$ms=n.getMilliseconds()},g.$utils=function(){return w},g.isValid=function(){return!(this.$d.toString()===u)},g.isSame=function(n,e){var t=$(n);return this.startOf(e)<=t&&t<=this.endOf(e)},g.isAfter=function(n,e){return $(n)<this.startOf(e)},g.isBefore=function(n,e){return this.endOf(e)<$(n)},g.$g=function(n,e,t){return w.u(n)?this[e]:this.set(t,n)},g.unix=function(){return Math.floor(this.valueOf()/1e3)},g.valueOf=function(){return this.$d.getTime()},g.startOf=function(n,e){var t=this,c=!!w.u(e)||e,u=w.p(n),m=function(n,e){var r=w.w(t.$u?Date.UTC(t.$y,e,n):new Date(t.$y,e,n),t);return c?r:r.endOf(a)},f=function(n,e){return w.w(t.toDate()[n].apply(t.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),t)},p=this.$W,g=this.$M,x=this.$D,v="set"+(this.$u?"UTC":"");switch(u){case d:return c?m(1,0):m(31,11);case l:return c?m(1,g):m(0,g+1);case o:var j=this.$locale().weekStart||0,y=(p<j?p+7:p)-j;return m(c?x-y:x+(6-y),g);case a:case h:return f(v+"Hours",0);case s:return f(v+"Minutes",1);case i:return f(v+"Seconds",2);case r:return f(v+"Milliseconds",3);default:return this.clone()}},g.endOf=function(n){return this.startOf(n,!1)},g.$set=function(n,e){var o,c=w.p(n),u="set"+(this.$u?"UTC":""),m=(o={},o[a]=u+"Date",o[h]=u+"Date",o[l]=u+"Month",o[d]=u+"FullYear",o[s]=u+"Hours",o[i]=u+"Minutes",o[r]=u+"Seconds",o[t]=u+"Milliseconds",o)[c],f=c===a?this.$D+(e-this.$W):e;if(c===l||c===d){var p=this.clone().set(h,1);p.$d[m](f),p.init(),this.$d=p.set(h,Math.min(this.$D,p.daysInMonth())).$d}else m&&this.$d[m](f);return this.init(),this},g.set=function(n,e){return this.clone().$set(n,e)},g.get=function(n){return this[w.p(n)]()},g.add=function(t,c){var h,u=this;t=Number(t);var m=w.p(c),f=function(n){var e=$(u);return w.w(e.date(e.date()+Math.round(n*t)),u)};if(m===l)return this.set(l,this.$M+t);if(m===d)return this.set(d,this.$y+t);if(m===a)return f(1);if(m===o)return f(7);var p=(h={},h[i]=n,h[s]=e,h[r]=1e3,h)[m]||1,g=this.$d.getTime()+t*p;return w.w(g,this)},g.subtract=function(n,e){return this.add(-1*n,e)},g.format=function(n){var e=this,t=this.$locale();if(!this.isValid())return t.invalidDate||u;var r=n||"YYYY-MM-DDTHH:mm:ssZ",i=w.z(this),s=this.$H,a=this.$m,o=this.$M,l=t.weekdays,c=t.months,d=function(n,t,i,s){return n&&(n[t]||n(e,r))||i[t].slice(0,s)},h=function(n){return w.s(s%12||12,n,"0")},m=t.meridiem||function(n,e,t){var r=n<12?"AM":"PM";return t?r.toLowerCase():r},p={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:w.s(o+1,2,"0"),MMM:d(t.monthsShort,o,c,3),MMMM:d(c,o),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:d(t.weekdaysMin,this.$W,l,2),ddd:d(t.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(s),HH:w.s(s,2,"0"),h:h(1),hh:h(2),a:m(s,a,!0),A:m(s,a,!1),m:String(a),mm:w.s(a,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:i};return r.replace(f,(function(n,e){return e||p[n]||i.replace(":","")}))},g.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},g.diff=function(t,h,u){var m,f=w.p(h),p=$(t),g=(p.utcOffset()-this.utcOffset())*n,x=this-p,v=w.m(this,p);return v=(m={},m[d]=v/12,m[l]=v,m[c]=v/3,m[o]=(x-g)/6048e5,m[a]=(x-g)/864e5,m[s]=x/e,m[i]=x/n,m[r]=x/1e3,m)[f]||x,u?v:w.a(v)},g.daysInMonth=function(){return this.endOf(l).$D},g.$locale=function(){return j[this.$L]},g.locale=function(n,e){if(!n)return this.$L;var t=this.clone(),r=b(n,e,!0);return r&&(t.$L=r),t},g.clone=function(){return w.w(this.$d,this)},g.toDate=function(){return new Date(this.valueOf())},g.toJSON=function(){return this.isValid()?this.toISOString():null},g.toISOString=function(){return this.$d.toISOString()},g.toString=function(){return this.$d.toUTCString()},p}(),M=N.prototype;return $.prototype=M,[["$ms",t],["$s",r],["$m",i],["$H",s],["$W",a],["$M",l],["$y",d],["$D",h]].forEach((function(n){M[n[1]]=function(e){return this.$g(e,n[0],n[1])}})),$.extend=function(n,e){return n.$i||(n(e,N,$),n.$i=!0),$},$.locale=b,$.isDayjs=y,$.unix=function(n){return $(1e3*n)},$.en=j[v],$.Ls=j,$.p={},$}()},4110:function(n){n.exports=function(){"use strict";return function(n,e,t){n=n||{};var r=e.prototype,i={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function s(n,e,t,i){return r.fromToBase(n,e,t,i)}t.en.relativeTime=i,r.fromToBase=function(e,r,s,a,o){for(var l,c,d,h=s.$locale().relativeTime||i,u=n.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],m=u.length,f=0;f<m;f+=1){var p=u[f];p.d&&(l=a?t(e).diff(s,p.d,!0):s.diff(e,p.d,!0));var g=(n.rounding||Math.round)(Math.abs(l));if(d=l>0,g<=p.r||!p.r){g<=1&&f>0&&(p=u[f-1]);var x=h[p.l];o&&(g=o(""+g)),c="string"==typeof x?x.replace("%d",g):x(g,r,p.l,d);break}}if(r)return c;var v=d?h.future:h.past;return"function"==typeof v?v(c):v.replace("%s",c)},r.to=function(n,e){return s(n,e,this,!0)},r.from=function(n,e){return s(n,e,this)};var a=function(n){return n.$u?t.utc():t()};r.toNow=function(n){return this.to(a(this),n)},r.fromNow=function(n){return this.from(a(this),n)}}}()}}]);
//# sourceMappingURL=194.bundle.js.map