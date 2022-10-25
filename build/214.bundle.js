"use strict";(self.webpackChunkmanagement=self.webpackChunkmanagement||[]).push([[214],{4228:(e,n,i)=>{i.d(n,{Z:()=>r});var t=i(7294),s=i(5893);const r=function(e){var n=e.size,i=e.color,r=e.className;return(0,s.jsx)(t.Fragment,{children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:n||"1rem",className:r||"",height:n||"1rem",fill:"none",children:(0,s.jsx)("path",{fill:i||"#898989",d:"M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"})})})}},2214:(e,n,i)=>{i.r(n),i.d(n,{default:()=>G});var t,s,r,a=i(7294),c=i(6974),d=i(168),l=i(885),o=i(7484),m=i.n(o),h=i(9711),u=i(8804),x=i(2790),p=i(8614),j=i(8370),g=i(8739),b=i(673),f=i(5978),v=i(5438),_=i(3360),y=i(3394),N=i(5893),w=[{label:"User ID",name:"user_id"},{label:"Subscription ID",name:"subscription_id"}];const Y=function(){var e=(0,a.useState)(0),n=(0,l.Z)(e,2),i=n[0],t=n[1],s=(0,a.useState)(""),r=(0,l.Z)(s,2),c=r[0],d=r[1],o=(0,a.useState)(w[0].name),u=(0,l.Z)(o,2),Y=u[0],M=u[1],Z=(0,a.useState)(void 0),D=(0,l.Z)(Z,2),z=D[0],S=D[1],C={limit:25,page:i};z&&(C.q=z);var P=(0,b.t)(C),k=P.data,V=P.isLoading,A=P.isError;(0,a.useEffect)((function(){"all"===Y&&S(""),d("")}),[Y]);var T=function(e){"next"===e&&t((function(e){return e+1})),"prev"===e&&t((function(e){return e-1}))},$=(0,N.jsx)("div",{className:"align-center",style:{height:"30vh"},children:(0,N.jsx)("h3",{children:"No Subscriptions Found!"})}),L=(0,N.jsxs)(_.u,{children:[(0,N.jsx)(_.$j,{type:"primary",size:"2rem"}),(0,N.jsx)(_.xg,{color:"#f08438",children:"Loading"})]});return(0,N.jsxs)(a.Fragment,{children:[(0,N.jsx)(p.Z,{title:"Subscriptions",border:!0}),(0,N.jsx)(F,{children:A?(0,N.jsx)("div",{className:"align-center",style:{height:"30vh"},children:(0,N.jsx)("h3",{children:"Failed to load Subscriptions!"})}):V&&0===i?L:(0,N.jsxs)(a.Fragment,{children:[(0,N.jsxs)(U,{children:[(0,N.jsx)("div",{className:"action-item",children:(0,N.jsx)(j.Z,{placeholder:"subscription_id"===Y||"user_id"===Y?"eg: 61c78fea0355ed7123fe0700":"Search",value:c,setValue:d,handleSubmit:function(){0!==c.length&&S(function(e){switch(e){case"user_id":return'user_id:"'.concat(c,'"');case"subscription_id":return'subscription_id:"'.concat(c,'"');default:return}}(Y))}})}),(0,N.jsx)("div",{className:"action-item",children:(0,N.jsx)(g.Z,{name:"Search By",options:w,value:Y,setValue:M})}),(0,N.jsx)("div",{className:"action-item",children:(0,N.jsxs)(v.z,{btnType:"ghost",size:"lg",width:"100%",onClick:function(){return M(w[0].name),d(""),void S(void 0)},children:[(0,N.jsx)(x.Z,{size:"0.7rem"}),(0,N.jsx)("span",{style:{marginLeft:"0.5rem"},children:"Reset"})]})})]}),(0,N.jsxs)(a.Fragment,{children:[(0,N.jsxs)(y.bw,{className:"mb-4",children:[(0,N.jsx)("thead",{children:(0,N.jsxs)("tr",{children:[(0,N.jsx)("th",{style:{width:"25%"},children:"ID"}),(0,N.jsx)("th",{style:{width:"auto"},children:"Plan Name"}),(0,N.jsx)("th",{style:{width:"10%"},children:"Amount"}),(0,N.jsx)("th",{style:{width:"15%"},children:"Status"}),(0,N.jsx)("th",{style:{width:"15%"},children:"Created"}),(0,N.jsx)("th",{style:{width:"15%"},children:"Ended"})]})}),(0,N.jsx)("tbody",{children:k&&k.items&&k.items.length>0&&k.items.map((function(e,n){return(0,N.jsxs)("tr",{children:[(0,N.jsx)("td",{children:(0,N.jsx)(h.rU,{to:"/subscriptions/".concat(e._id),children:(0,N.jsx)("span",{children:e._id})})}),(0,N.jsx)("td",{className:"capitalize",children:(0,N.jsxs)(h.rU,{to:"/subscriptions/".concat(e._id),children:[e.name||"Unknown"," plan"]})}),(0,N.jsx)("td",{children:(0,N.jsxs)(h.rU,{to:"/subscriptions/".concat(e._id),children:["$",e.amount||"0.00"," ",e.currency&&e.currency.toUpperCase()]})}),(0,N.jsx)("td",{className:"capitalize",children:(0,N.jsx)(h.rU,{to:"/subscriptions/".concat(e._id),children:e.status&&"active"===e.status?(0,N.jsx)(f.C,{type:"success",size:"sm",style:{minWidth:"100px"},children:e.status}):(0,N.jsx)(f.C,{type:"ghost",size:"sm",style:{minWidth:"100px"},children:e.status})})}),(0,N.jsx)("td",{children:(0,N.jsx)(h.rU,{to:"/subscriptions/".concat(e._id),children:e.create_time?m()(e.create_time).format("DD MMM YYYY"):"-"})}),(0,N.jsx)("td",{children:(0,N.jsx)(h.rU,{to:"/subscriptions/".concat(e._id),children:e.ended_time?m()(e.ended_time).format("DD MMM YYYY"):"-"})})]},n)}))})]}),V&&0!==i&&L,k&&0===k.items.length&&$,k&&k.items.length>0&&(0,N.jsxs)(I,{children:[(0,N.jsx)(v.z,{btnType:"secondary",disabled:0===i,onClick:function(){return T("prev")},children:"Previous"}),(0,N.jsx)(v.z,{btnType:"secondary",disabled:i+1>=Math.ceil(k.total/k.limit),onClick:function(){return T("next")},children:"Next"})]})]})]})})]})};var M,Z,D,z,S,C,P,k,F=u.ZP.div(t||(t=(0,d.Z)(["\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  position: relative;\n  margin-bottom: 3rem;\n"]))),U=u.ZP.div(s||(s=(0,d.Z)(["\n  display: grid;\n  grid-template-columns: 60% 30% 10%;\n  padding: 1.5rem;\n  width: 100%;\n  .action-item {\n    &:not(:last-child) {\n      margin-right: 1rem;\n    }\n  }\n"]))),I=u.ZP.div(r||(r=(0,d.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  button {\n    width: fit-content;\n    padding: 0 1rem;\n    margin: 0 1rem;\n  }\n"]))),V=i(3173),A=i(4228),T=function(e){return Math.floor(new Date(e).getTime()/1e3)};const $=function(){var e=(0,c.UO)().sub_id,n=(0,c.s0)(),i=(0,b.b)(e||"",!!e),t=i.data,s=i.isLoading,r=i.isError,d=t&&t.cancel_at&&T(t.cancel_at)||null,l=d&&d>T(t.current_period_end)||!d;return(0,N.jsx)(a.Fragment,{children:r?(0,N.jsx)("div",{className:"align-center",style:{height:"30vh"},children:(0,N.jsx)("h3",{children:"Failed to load subscription!"})}):s?(0,N.jsxs)(_.u,{children:[(0,N.jsx)(_.$j,{type:"primary",size:"2rem"}),(0,N.jsx)(_.xg,{color:"#f08438",children:"Loading"})]}):t?(0,N.jsxs)(L,{children:[(0,N.jsx)(v.z,{btnType:"ghost",size:"lg",style:{width:"fit-content",padding:"0 1rem",marginBottom:"1rem"},onClick:function(){return n("/subscriptions")},children:(0,N.jsx)(V.Z,{size:"1.4rem"})}),t._id&&(0,N.jsxs)(a.Fragment,{children:[(0,N.jsxs)(R,{children:[(0,N.jsxs)("div",{className:"heading",children:[(0,N.jsxs)("div",{children:[(0,N.jsx)("p",{style:{margin:0},children:"SUBSCRIPTION"}),(0,N.jsxs)("h2",{children:[t.name||"Unknown"," Plan"]})]}),(0,N.jsx)(f.C,{type:"active"===t.status?"success":"pending"===t.status?"primary":"ghost",size:"md",children:t.status})]}),(0,N.jsx)("div",{})]}),(0,N.jsxs)(W,{children:[(0,N.jsxs)("div",{className:"info-item",children:[(0,N.jsx)("p",{className:"info-item-label",children:"Started"}),(0,N.jsx)("p",{children:t.create_time?m()(t.create_time).format("DD MMM YYYY"):"-"})]}),(0,N.jsx)("div",{className:"info-item",children:t.ended_time?(0,N.jsxs)(a.Fragment,{children:[(0,N.jsx)("p",{className:"info-item-label",children:"Ended Time"}),(0,N.jsx)("p",{children:m()(t.ended_time).format("DD MMM YYYY")})]}):(0,N.jsxs)(a.Fragment,{children:[l&&(0,N.jsxs)("div",{className:"info-item",children:[(0,N.jsx)("p",{className:"info-item-label",children:"Next Billing Time"}),(0,N.jsx)("p",{children:t.current_period_end?m()(t.current_period_end).format("DD MMM YYYY"):"-"})]}),t.cancel_at&&(0,N.jsxs)("div",{className:"info-item",children:[(0,N.jsx)("p",{className:"info-item-label",children:"Expires On"}),(0,N.jsx)("p",{children:t.cancel_at?m()(t.cancel_at).format("DD MMM YYYY"):"-"})]})]})}),(0,N.jsxs)("div",{className:"info-item",children:[(0,N.jsx)("p",{className:"info-item-label",children:"Customer"}),(0,N.jsx)("p",{children:t.user&&t.user.email&&t.user.provider_id?(0,N.jsxs)(h.rU,{to:"/users/".concat(t.user.provider_id,"/details"),className:"ref-link",children:[t.user.email," ",(0,N.jsx)(A.Z,{})]}):"-"})]})]}),(0,N.jsx)(E,{children:(0,N.jsx)("h4",{children:"References"})}),(0,N.jsxs)(O,{children:[(0,N.jsxs)("div",{className:"sub-item",children:[(0,N.jsx)("p",{children:"ID"}),(0,N.jsx)("p",{className:"sub-value",children:t._id}),(0,N.jsx)("p",{children:"Stripe Price ID"}),(0,N.jsx)("p",{className:"sub-value",children:t.reference&&t.reference.price_id||"-"}),(0,N.jsx)("p",{children:"Stripe Subscription ID"}),(0,N.jsx)("p",{className:"sub-value",children:t.reference&&t.reference.subscription_id||"-"})]}),(0,N.jsxs)("div",{className:"sub-item",children:[(0,N.jsx)("p",{children:"User ID"}),(0,N.jsx)("p",{className:"sub-value",children:t.user&&t.user._id||"-"}),(0,N.jsx)("p",{children:"Stripe Customer ID"}),(0,N.jsx)("p",{className:"sub-value",children:t.reference&&t.reference.customer_id||"-"})]})]}),(0,N.jsx)(E,{children:(0,N.jsx)("h4",{children:"Subscription Details"})}),(0,N.jsxs)(O,{children:[(0,N.jsxs)("div",{className:"sub-item",children:[(0,N.jsx)("p",{children:"Plan Name"}),(0,N.jsxs)("p",{className:"sub-value",children:[t.name," Plan"]}),(0,N.jsx)("p",{children:"Amount"}),(0,N.jsxs)("p",{className:"sub-value",children:["$",t.amount?t.amount:"0.00"," ",t.currency&&t.currency.toUpperCase()]}),(0,N.jsx)("p",{children:"Current Period"}),(0,N.jsxs)("p",{className:"sub-value",children:[t.current_period_start?m()(t.current_period_start).format("DD MMM YYYY"):"-","  to  ",t.current_period_end?m()(t.current_period_end).format("DD MMM YYYY"):"-"]})]}),(0,N.jsxs)("div",{className:"sub-item",children:[(0,N.jsx)("p",{children:"Payment Method"}),(0,N.jsx)("p",{className:"sub-value",children:t.payment_method&&t.payment_method.brand&&t.payment_method.last4?(0,N.jsxs)(q,{children:[t.payment_method.brand,(0,N.jsxs)(a.Fragment,{children:[(0,N.jsx)("span",{className:"dot"}),(0,N.jsx)("span",{className:"dot"}),(0,N.jsx)("span",{className:"dot"}),(0,N.jsx)("span",{className:"dot"}),(0,N.jsx)("span",{className:"dot"}),t.payment_method.last4]})]}):"card"}),(0,N.jsx)("p",{children:"Created"}),(0,N.jsx)("p",{className:"sub-value",children:t.create_time?m()(t.create_time).format("DD MMM YYYY, hh:mm a"):"-"}),(0,N.jsx)("p",{children:"Ended"}),(0,N.jsx)("p",{className:"sub-value",children:t.ended_time?m()(t.ended_time).format("DD MMM YYYY, hh:mm a"):"-"})]})]}),t.upcoming_invoice&&(0,N.jsxs)(a.Fragment,{children:[(0,N.jsx)(E,{children:(0,N.jsxs)("div",{children:[(0,N.jsx)("h4",{children:"Upcoming Invoice"}),(0,N.jsxs)("p",{children:["This is a preview of the invoice that will be billed on ",t.current_period_end?m()(t.current_period_end).format("DD MMM YYYY"):"end of the period",". It may change if the subscription is updated."]})]})}),(0,N.jsxs)(B,{children:[(0,N.jsx)("thead",{children:(0,N.jsxs)("tr",{children:[(0,N.jsx)("th",{style:{width:"auto"},children:"Description"}),(0,N.jsx)("th",{style:{width:"120px"},children:"Amount"})]})}),(0,N.jsx)("tbody",{children:t.upcoming_invoice.data.map((function(e,n){return(0,N.jsxs)("tr",{children:[(0,N.jsx)("td",{children:e.description}),(0,N.jsxs)("td",{className:"amount ".concat(e.amount<0&&"negative"),children:[(0,N.jsx)("span",{className:"currency-symbol",children:"$"}),Math.abs(e.amount)]})]},n)}))})]}),(0,N.jsx)(H,{children:(0,N.jsxs)("div",{className:"container",children:[(0,N.jsx)("p",{className:"semibold",children:"Subtotal"}),(0,N.jsxs)("p",{className:"semibold amount ".concat(t.upcoming_invoice.total<0&&"negative"),children:[(0,N.jsx)("span",{className:"currency-symbol",children:"$"}),t.upcoming_invoice.total||"0.00"]}),(0,N.jsx)("p",{className:"semibold",children:"Total "}),(0,N.jsxs)("p",{className:"semibold amount ".concat(t.upcoming_invoice.total<0&&"negative"),children:[(0,N.jsx)("span",{className:"currency-symbol",children:"$"}),t.upcoming_invoice.total||"0.00"]}),t.upcoming_invoice.amount_paid>0&&(0,N.jsxs)(a.Fragment,{children:[(0,N.jsx)("p",{className:"semibold",children:"Amount Paid"}),(0,N.jsxs)("p",{className:"semibold amount ".concat(t.upcoming_invoice.amount_paid<0&&"negative"),children:[(0,N.jsx)("span",{className:"currency-symbol",children:"$"}),t.upcoming_invoice.amount_paid||"0.00"]})]}),(0,N.jsx)("p",{className:"semibold",children:"Amount Due"}),(0,N.jsxs)("p",{className:"semibold amount ".concat(t.upcoming_invoice.amount_due<0&&"negative"),children:[(0,N.jsx)("span",{className:"currency-symbol",children:"$"}),t.upcoming_invoice.amount_due||"0.00"]})]})})]}),t.latest_invoice&&(0,N.jsxs)(a.Fragment,{children:[(0,N.jsx)(E,{children:(0,N.jsx)("div",{children:(0,N.jsx)("h4",{children:"Latest Invoice"})})}),(0,N.jsxs)(B,{children:[(0,N.jsx)("thead",{children:(0,N.jsxs)("tr",{children:[(0,N.jsx)("th",{style:{width:"auto"},children:"ID"}),(0,N.jsx)("th",{style:{width:"15%"},children:"Status"}),(0,N.jsx)("th",{style:{width:"15%"},children:"Amount"}),(0,N.jsx)("th",{style:{width:"15%"},children:"Created"}),(0,N.jsx)("th",{style:{width:"15%"}})]})}),(0,N.jsx)("tbody",{children:(0,N.jsxs)("tr",{children:[(0,N.jsx)("td",{children:t.latest_invoice.id||"-"}),(0,N.jsx)("td",{children:(0,N.jsx)(f.C,{type:"paid"===t.latest_invoice.status?"success":"ghost",size:"sm",children:t.latest_invoice.status||"unknown"})}),(0,N.jsxs)("td",{children:["$",t.latest_invoice.total||"0.00"]}),(0,N.jsx)("td",{children:t.latest_invoice.created&&m()(t.latest_invoice.created).format("DD MMM YYYY")||"-"}),(0,N.jsx)("td",{children:t.latest_invoice.hosted_invoice_url&&(0,N.jsx)("a",{className:"link",href:t.latest_invoice.hosted_invoice_url,children:"View Invoice"})})]})})]})]})]})]}):null})};var L=u.ZP.div(M||(M=(0,d.Z)(["\n  padding: 1.5rem;\n  .sub-heading-wrapper {\n    h4 {\n      margin-bottom: 0;\n    }\n    p {\n      margin-bottom: 1rem;\n    }\n  }\n  .sub-heading-border {\n    border-bottom: 1px solid #e7e7e7;\n    padding-bottom: 1rem;\n  }\n"]))),E=u.ZP.div(Z||(Z=(0,d.Z)(["\n  border-bottom: 1px solid #e7e7e7;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0.5rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  h4,\n  p {\n    margin: 0 0 0.5rem;\n  }\n  a {\n    margin-right: 2rem;\n  }\n"]))),H=u.ZP.div(D||(D=(0,d.Z)(["\n  border-bottom: 1px solid #e7e7e7;\n  margin-bottom: 3rem;\n  padding-bottom: 0.5rem;\n  .container {\n    margin-top: 0.5rem;\n    display: grid;\n    grid-template-columns: auto 100px;\n    max-width: 300px;\n    margin-left: auto;\n    p {\n      margin: 0 0 0.5rem;\n    }\n    .amount {\n      font-size: 0.8rem;\n    }\n    .currency-symbol {\n      margin-right: 2px;\n    }\n  }\n"]))),B=u.ZP.table(z||(z=(0,d.Z)(["\n  margin-bottom: 1rem;\n  thead {\n    tr {\n      border-top: unset;\n    }\n  }\n  td,\n  th {\n    font-size: 0.875rem;\n  }\n  th {\n    font-size: 0.7rem;\n    font-weight: 600;\n    text-transform: uppercase;\n  }\n  th,\n  td {\n    text-align: start;\n    padding: 0.7rem 1.25rem;\n  }\n  .amount {\n    font-weight: 600;\n    color: #888;\n    letter-spacing: 1.5px;\n  }\n  .negative:before {\n    content: '-';\n  }\n  "," {\n    min-width: 75px;\n  }\n"])),f.C),W=u.ZP.div(S||(S=(0,d.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  margin-bottom: 3rem;\n  p {\n    margin: 0;\n    line-height: 1.7;\n  }\n  .info-item-label {\n    margin-bottom: 0.5rem;\n    font-weight: 700;\n    color: ",";\n  }\n  .info-item {\n    &:not(:last-child) {\n      margin-right: 1.5rem;\n      padding-right: 1.5rem;\n      border-right: 1px solid #e7e7e7;\n    }\n  }\n"])),(function(e){return e.theme.colors.primary})),O=u.ZP.div(C||(C=(0,d.Z)(["\n  display: grid;\n  grid-template-columns: repeat(2, 50%);\n  max-width: 1000px;\n  margin-bottom: 4rem;\n  .sub-item {\n    display: grid;\n    grid-template-columns: minmax(75px, 170px) auto;\n    height: fit-content;\n    align-items: flex-start;\n    padding-right: 2rem;\n\n    .sub-value {\n      color: #878787;\n    }\n    p {\n      line-height: 2.5;\n      margin: 0;\n    }\n  }\n"]))),R=u.ZP.div(P||(P=(0,d.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n  .heading {\n    p {\n      display: block;\n      padding-bottom: 0.7rem;\n      font-weight: bold;\n      color: #878787;\n    }\n    display: flex;\n    align-items: flex-end;\n    padding-top: 1rem;\n\n    h2 {\n      margin-right: 1rem;\n      margin-bottom: 0;\n      text-transform: capitalize;\n    }\n    margin-bottom: 1rem;\n  }\n  button {\n    margin-right: 2rem;\n  }\n"]))),q=u.ZP.span(k||(k=(0,d.Z)(["\n  display: flex;\n  align-items: center;\n  text-transform: capitalize;\n\n  .dot {\n    width: 4px;\n    height: 4px;\n    border-radius: 50%;\n    background-color: #777;\n    margin-right: 2px;\n    &:first-child {\n      margin-left: 10px;\n    }\n    &:last-child {\n      margin-right: 5px;\n    }\n  }\n"])));const G=function(){return(0,N.jsx)(a.Fragment,{children:(0,N.jsxs)(c.Z5,{children:[(0,N.jsx)(c.AW,{path:"/",element:(0,N.jsx)(Y,{})}),(0,N.jsx)(c.AW,{path:"/:sub_id",element:(0,N.jsx)($,{})})]})})}},673:(e,n,i)=>{i.d(n,{b:()=>o,t:()=>l});var t=i(5861),s=i(7757),r=i.n(s),a=i(9669),c=i.n(a),d=i(3106),l=function(e,n){var i=function(){var n=(0,t.Z)(r().mark((function n(){var i,t;return r().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,c().get("/management/subscriptions",{params:e});case 2:return i=n.sent,t=i.data,n.abrupt("return",t);case 5:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return(0,d.Z)(["subscriptions",{params:e}],(function(){return i()}),n)},o=function(e,n){var i=function(){var e=(0,t.Z)(r().mark((function e(n){var i,t;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c().get("/management/subscriptions/".concat(n));case 2:return i=e.sent,t=i.data,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,d.Z)(["subscription",e],(function(){return i(e)}),n)}}}]);
//# sourceMappingURL=214.bundle.js.map