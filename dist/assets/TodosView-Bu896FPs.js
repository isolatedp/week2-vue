import{d as z,r as w,k as B,b as I,t as p,m as f,j as y,o as c,c as u,a as d,w as b,v as $,n as k,e as T,F as C,p as U,u as F,B as _,q as O,s as E}from"./index-DMvcCjJc.js";const L=d("h1",null,"代辦事項頁 TodosView",-1),N=d("hr",null,null,-1),S={key:1,type:"text",placeholder:"請輸入代辦事項",disabled:!0},q=["disabled"],H=["onUpdate:modelValue","disabled","onClick"],K={key:0},G={key:2},J=["onClick"],P=["onClick"],Q={key:3},Y=z({__name:"TodosView",setup(W){const m=F(),v=w([]),e=B({id:"",createTime:null,content:"",status:!1});I(async()=>{await p()||(alert("請先登入，將跳轉至登入頁"),m.push("/login")),await h()});const x=async()=>{var l;if(p()||m.push("/login"),!R())return;const i=`${_}/todos`,s={Authorization:f("userInfo").token},a={content:e.content};let o;try{o=(await y.post(i,a,{headers:s})).data}catch(n){const t=n.response,g=(l=t==null?void 0:t.data)!=null&&l.message?`新增失敗，${t.data.message}`:"新增失敗";alert(g),o=t==null?void 0:t.data}o.status&&(alert("新增成功"),Object.assign(e,{id:"",createTime:null,content:"",status:!1}),await h())},M=r=>{Object.assign(e,r)},V=async()=>{var l;if(p()||m.push("/login"),!R())return;const i=`${_}/todos/${e.id}`,s={Authorization:f("userInfo").token},a={content:e.content};let o;try{o=(await y.put(i,a,{headers:s})).data}catch(n){const t=n.response,g=(l=t==null?void 0:t.data)!=null&&l.message?`更新失敗，${t.data.message}`:"更新失敗";alert(g),o=t==null?void 0:t.data}o.status&&(alert("更新成功"),Object.assign(e,{id:"",createTime:null,content:"",status:!1}),await h())},A=async r=>{var l;console.log("移除代辦事項",r),p()||m.push("/login");const s=`${_}/todos/${r}`,a={Authorization:f("userInfo").token};let o;try{o=(await y.delete(s,{headers:a})).data}catch(n){const t=n.response,g=(l=t==null?void 0:t.data)!=null&&l.message?`移除失敗，${t.data.message}`:"移除失敗";alert(g),o=t==null?void 0:t.data}o.status&&(alert("移除成功"),await h())},R=()=>{if(!e.content)return alert("請輸入代辦事項"),!1;switch(e.createTime){case null:if(v.value.find(r=>r.content===e.content))return alert("代辦事項已存在"),!1;break;default:if(v.value.find(r=>r.content===e.content&&r.id!==e.id))return alert("代辦事項已存在"),!1;break}return!0},h=async()=>{var o;p()||m.push("/login");const i=`${_}/todos`,s={Authorization:f("userInfo").token};let a;try{a=(await y.get(i,{headers:s})).data}catch(l){const n=l.response,t=(o=n==null?void 0:n.data)!=null&&o.message?`取得失敗，${n.data.message}`:"取得失敗";alert(t),a=n==null?void 0:n.data}a.status&&(v.value=a.data)},D=()=>{Object.assign(e,{id:"",createTime:null,content:"",status:!1})},j=async r=>{var l;await p()&&m.push("/login");const s=`${_}/todos/${r.id}/toggle`,a={Authorization:f("userInfo").token};let o;try{const n=y.patch(s,{},{headers:a});o=w({status:!0})}catch(n){const t=n.response,g=(l=t==null?void 0:t.data)!=null&&l.message?`切換失敗，${t.data.message}`:"切換失敗";alert(g),o=t==null?void 0:t.data}o.status&&(alert("切換成功"),h())};return(r,i)=>(c(),u(C,null,[L,N,d("div",null,[e.createTime===null?b((c(),u("input",{key:0,type:"text",placeholder:"請輸入代辦事項","onUpdate:modelValue":i[0]||(i[0]=s=>e.content=s)},null,512)),[[$,e.content]]):k("",!0),e.createTime!==null?(c(),u("input",S)):k("",!0),d("button",{style:{"margin-left":"0.5rem"},onClick:T(x,["prevent"]),disabled:e.createTime!==null}," 新增 ",8,q),(c(!0),u(C,null,U(v.value,s=>(c(),u("div",{style:{padding:"0.5rem 0 0.5rem"},key:s.id},[b(d("input",{type:"checkbox",style:{margin:"0 0.5rem 0"},"onUpdate:modelValue":a=>s.status=a,disabled:e.createTime!==null,onClick:a=>j(s)},null,8,H),[[O,s.status]]),e.createTime!==s.createTime?(c(),u("span",K,E(s.content),1)):k("",!0),e.createTime===s.createTime?b((c(),u("input",{key:1,type:"text",style:{margin:"0 0.5rem 0"},"onUpdate:modelValue":i[1]||(i[1]=a=>e.content=a)},null,512)),[[$,e.content]]):k("",!0),e.createTime===null?(c(),u("span",G,[d("button",{style:{"margin-right":"0.5rem"},onClick:T(a=>M(s),["prevent"])},"編輯",8,J),d("button",{style:{"margin-right":"0.5rem"},onClick:T(a=>A(s.id),["prevent"])},"刪除",8,P)])):e.createTime===s.createTime?(c(),u("span",Q,[d("button",{style:{"margin-right":"0.5rem"},onClick:T(V,["prevent"])},"確認"),d("button",{style:{"margin-right":"0.5rem"},onClick:T(D,["prevent"])},"取消")])):k("",!0)]))),128))])],64))}});export{Y as default};
