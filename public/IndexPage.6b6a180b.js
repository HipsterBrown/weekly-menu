function e(e,n,t,a){Object.defineProperty(e,n,{get:t,set:a,enumerable:!0,configurable:!0})}var n=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequirec4d7;n.register("a4GDy",(function(t,a){var r;r=t.exports,Object.defineProperty(r,"__esModule",{value:!0,configurable:!0}),e(t.exports,"loader",(()=>f)),e(t.exports,"default",(()=>x));var i=n("k4ank");n("8T3gX");var o=n("1idYv"),l=n("3T949"),s=n("fIsAN"),d=n("80TUu"),u=n("fiQoM"),c=n("8Xs7T"),p=n("hXCME");const f=async({request:e})=>{await(0,u.getSession)();const n=new URL(e.url).pathname.includes("preview"),t=(0,c.getMenuDateFor)(n?(0,d.addWeeks)(Date.now(),1):void 0),a=await(0,u.getMenu)(t.toJSON());return(0,l.json)({menuDate:t,menu:a})};var x=({preview:e})=>{const{menuDate:n,menu:t}=(0,l.useLoaderData)(),a=(0,d.format)(new Date(n),"MMM do");return(0,i.jsxs)(o.Box,{p:"3",children:[(0,i.jsxs)(o.Heading,{mt:"0",mb:"4",children:["Weekly Menu - ",a]}),(0,i.jsx)(p.default,{menu:t}),(0,i.jsxs)(o.Text,{pb:"4",children:[e||(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.Link,{color:"teal.500",as:s.Link,to:"/edit",pr:"3",children:"Edit"}),"|",(0,i.jsx)(o.Link,{color:"teal.500",as:s.Link,to:"/plan",px:"3",children:"Plan next week"}),"|",(0,i.jsx)(o.Link,{color:"teal.500",as:s.Link,to:"/preview",pl:"3",children:"Preview next week"})]}),e&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.Link,{color:"teal.500",as:s.Link,to:"/plan",pr:"3",children:"Plan"}),"|",(0,i.jsx)(o.Link,{color:"teal.500",as:s.Link,to:"/",pl:"3",children:"Return"})]})]})]})}}));
//# sourceMappingURL=IndexPage.6b6a180b.js.map
