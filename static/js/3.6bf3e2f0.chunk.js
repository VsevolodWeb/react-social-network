(this["webpackJsonpreact-social-network"]=this["webpackJsonpreact-social-network"]||[]).push([[3],{294:function(t,e,a){t.exports=a.p+"static/media/avatar.18019f1c.jpg"},298:function(t,e,a){t.exports={profile:"Profile_profile__3dzvr"}},299:function(t,e,a){t.exports={banner:"Banner_banner__1bsgr"}},300:function(t,e,a){t.exports=a.p+"static/media/banner.7f8baa96.jpg"},301:function(t,e,a){t.exports={info:"Info_info__13xX5",avatar:"Info_avatar__30qTK",name:"Info_name__1wlaq",text:"Info_text__1GoLb"}},302:function(t,e,a){t.exports={status:"Status_status__Z0RUI",status_editingAbility:"Status_status_editingAbility__2xwMG"}},303:function(t,e,a){t.exports={item:"Post_item__2EmvQ",avatar:"Post_avatar__3qkL-",name:"Post_name__2tcY9",text:"Post_text__1cnvX",like:"Post_like__lxvJu",likeButton:"Post_likeButton__NG0Ko",likeCounter:"Post_likeCounter__PlvIW"}},304:function(t,e,a){t.exports={posts:"Posts_posts__tkALa",title:"Posts_title__23BoN",list:"Posts_list__PAAN3"}},305:function(t,e,a){"use strict";a.r(e);var n=a(35),s=a(36),r=a(38),l=a(37),o=a(39),u=a(0),i=a.n(u),c=a(7),m=a(9),d=a(25),p=a(100),f=a(298),_=a.n(f),b=a(299),v=a.n(b),E=a(300),g=a.n(E),N=function(){return i.a.createElement("div",{className:v.a.banner,style:{backgroundImage:"url(".concat(g.a,")")}})},P=a(301),h=a.n(P),k=a(294),x=a.n(k);function y(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var a=[],n=!0,s=!1,r=void 0;try{for(var l,o=t[Symbol.iterator]();!(n=(l=o.next()).done)&&(a.push(l.value),!e||a.length!==e);n=!0);}catch(u){s=!0,r=u}finally{try{n||null==o.return||o.return()}finally{if(s)throw r}}return a}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var S=a(302),j=a.n(S),I=function(t){var e=y(Object(u.useState)(!1),2),a=e[0],n=e[1],s=y(Object(u.useState)(t.status),2),r=s[0],l=s[1];Object(u.useEffect)((function(){l(t.status)}),[t.status]);var o=function(){n(!a),t.status!==r&&t.updateUserStatus(r)};return i.a.createElement("div",null,t.editingAbility?a?i.a.createElement("input",{type:"text",onBlur:o,onChange:function(t){l(t.currentTarget.value)},value:r,autoFocus:!0}):i.a.createElement("span",{className:"".concat(j.a.status," ").concat(j.a.status_editingAbility),onDoubleClick:o},t.status):i.a.createElement("span",{className:j.a.status},t.status))},O=function(t){return i.a.createElement("div",{className:h.a.info},i.a.createElement("div",{className:h.a.avatar,style:{backgroundImage:"url(".concat(x.a,")")}}),i.a.createElement("div",null,i.a.createElement("h1",{className:h.a.name},t.fullName),t.userStatus?i.a.createElement(I,{status:t.userStatus,editingAbility:t.loginUserId===t.userId,updateUserStatus:t.updateUserStatus}):null),i.a.createElement("div",{className:h.a.text},t.aboutMe?i.a.createElement(i.a.Fragment,null,i.a.createElement("b",null,"About me:")," ",t.aboutMe):""))},U=a(303),A=a.n(U),w=function(t){return i.a.createElement("li",{className:A.a.item},i.a.createElement("img",{src:x.a,alt:"avatar",className:A.a.avatar}),i.a.createElement("div",null,i.a.createElement("div",{className:A.a.name},t.name),i.a.createElement("div",{className:A.a.text},t.text)),i.a.createElement("div",{className:A.a.like},i.a.createElement("span",{className:A.a.likeCounter},t.likeCount),i.a.createElement("button",{className:A.a.likeButton},i.a.createElement("span",{role:"img","aria-label":"love"},"\u2764\ufe0f"))))},C=a(304),B=a.n(C),M=a(129),F=a(130),G=a(41),q=a(49),D=Object(G.a)(30),J=Object(F.a)({form:"addPost"})((function(t){return i.a.createElement("form",{onSubmit:t.handleSubmit},i.a.createElement("div",{className:"form"},i.a.createElement(M.a,{name:"postMessage",placeholder:"\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",component:q.b,validate:[G.b,D]}),i.a.createElement("div",{className:"formGroup"},i.a.createElement("button",{className:"button"},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"))))})),L=function(t){var e=t.data.map((function(t){return i.a.createElement(w,{key:t.id,likeCount:t.likeCount,name:t.name,text:t.text})}));return i.a.createElement("div",{className:B.a.posts},i.a.createElement("ul",{className:B.a.list},e),i.a.createElement("div",{className:B.a.title},"\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u043d\u0430 \u0441\u0442\u0435\u043d\u0443"),i.a.createElement(J,{onSubmit:function(e){t.addPost(e.postMessage),t.resetPost()}}))},T=function(t){return i.a.createElement(i.a.Fragment,null,i.a.createElement("h1",{className:"title"},"Profile"),i.a.createElement("div",{className:_.a.profile},i.a.createElement(N,null),i.a.createElement(O,Object.assign({},t.data.userProfile,{userStatus:t.data.userStatus,updateUserStatus:t.updateUserStatus,loginUserId:t.userId})),i.a.createElement(L,{data:t.data.postsData,addPost:t.addPost,resetPost:t.resetPost})))},K=a(65),X=a(97),z=function(t){function e(){return Object(n.a)(this,e),Object(r.a)(this,Object(l.a)(e).apply(this,arguments))}return Object(o.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){var t=this.props.match.params.userId||this.props.userId;t&&(this.props.getUserProfile(t),this.props.getUserStatus(t))}},{key:"render",value:function(){return this.props.data.isFetching?i.a.createElement(K.a,null):i.a.createElement(T,this.props)}}]),e}(i.a.Component);e.default=Object(c.d)(Object(m.b)((function(t){return{data:t.profile,userId:t.auth.id}}),{addPost:p.a,getUserProfile:p.c,getUserStatus:p.d,updateUserStatus:p.f,resetPost:p.e}),d.f,X.a)(z)}}]);
//# sourceMappingURL=3.6bf3e2f0.chunk.js.map