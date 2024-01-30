"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[93],{8853:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>l,frontMatter:()=>t,metadata:()=>u,toc:()=>c});var r=i(5893),s=i(1151);const t={},a="Routage de l'application",u={id:"features/transversal/routing",title:"Routage de l'application",description:"Routes s\xe9curis\xe9es",source:"@site/docs/features/transversal/routing.mdx",sourceDirName:"features/transversal",slug:"/features/transversal/routing",permalink:"/Stromae/docs/features/transversal/routing",draft:!1,unlisted:!1,editUrl:"https://github.com/InseeFr/Stromae/tree/v3-master/docs/docs/features/transversal/routing.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Personnalisation",permalink:"/Stromae/docs/features/transversal/metadata"},next:{title:"Visualisation de questionnaire",permalink:"/Stromae/docs/features/vizu"}},d={},c=[{value:"Routes s\xe9curis\xe9es",id:"routes-s\xe9curis\xe9es",level:2},{value:"Page d&#39;accueil de l&#39;enqu\xeate",id:"page-daccueil-de-lenqu\xeate",level:3},{value:"Affichage du questionnaire",id:"affichage-du-questionnaire",level:3},{value:"Page de fin",id:"page-de-fin",level:3},{value:"Routes libre (sans authentification)",id:"routes-libre-sans-authentification",level:2},{value:"Affichage d&#39;une page d&#39;accueil en mode d\xe9connect\xe9e",id:"affichage-dune-page-daccueil-en-mode-d\xe9connect\xe9e",level:3},{value:"Visualisation de questionnaire",id:"visualisation-de-questionnaire",level:3},{value:"Page d&#39;erreur",id:"page-derreur",level:3}];function o(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"routage-de-lapplication",children:"Routage de l'application"}),"\n",(0,r.jsx)(n.h2,{id:"routes-s\xe9curis\xe9es",children:"Routes s\xe9curis\xe9es"}),"\n",(0,r.jsx)(n.h3,{id:"page-daccueil-de-lenqu\xeate",children:"Page d'accueil de l'enqu\xeate"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"/questionnaire/${questionnaireId}/unite-enquetee/${surveyUnitId}/accueil"})}),"\n",(0,r.jsx)(n.h3,{id:"affichage-du-questionnaire",children:"Affichage du questionnaire"}),"\n",(0,r.jsxs)(n.p,{children:["Affiche le questionnaire ",(0,r.jsx)(n.code,{children:"questionnaireId"})," pour l'unit\xe9 enqu\xeat\xe9e ",(0,r.jsx)(n.code,{children:"surveyUnitId"}),"."]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"/questionnaire/${questionnaireId}/unite-enquetee/${surveyUnitId}"})}),"\n",(0,r.jsx)(n.h3,{id:"page-de-fin",children:"Page de fin"}),"\n",(0,r.jsx)(n.p,{children:"Cette page permet de t\xe9l\xe9charger une preuve de d\xe9p\xf4t (ou accus\xe9 de r\xe9ception)"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"/questionnaire/${questionnaireId}/unite-enquetee/${surveyUnitId}/post-envoi"})}),"\n",(0,r.jsx)(n.h2,{id:"routes-libre-sans-authentification",children:"Routes libre (sans authentification)"}),"\n",(0,r.jsx)(n.h3,{id:"affichage-dune-page-daccueil-en-mode-d\xe9connect\xe9e",children:"Affichage d'une page d'accueil en mode d\xe9connect\xe9e"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"/questionnaire/${questionnaireId}"})}),"\n",(0,r.jsx)(n.h3,{id:"visualisation-de-questionnaire",children:"Visualisation de questionnaire"}),"\n",(0,r.jsxs)(n.p,{children:['Permet la visualisation de questionnaire. Disponible uniquement si la variable d\'"environnement" ',(0,r.jsx)(n.code,{children:"VISUALIZE_ENABLED=true"})]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.code,{children:"/visualize"})}),"\n",(0,r.jsxs)(n.p,{children:["Exemple : ",(0,r.jsx)(n.code,{children:"/visualize?questionnaire=...&metadata=...&data=...&nomenclatures={}"})]}),"\n",(0,r.jsx)(n.h3,{id:"page-derreur",children:"Page d'erreur"}),"\n",(0,r.jsx)(n.p,{children:"En cas d'erreur:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"/404"})," : erreur de routage, l'utilisateur se retrouve sur une page qui n'existe pas"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"/401"})," : erreur d'acc\xe8s, l'utilisateur n'est pas authentifi\xe9 pour acc\xe9der aux ressources demand\xe9es"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"/403"})," : erreur d'acc\xe8s, l'utilisateur n'a pas les droits pour acc\xe9der aux ressources"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"/500"})," : Le serveur (API) ne r\xe9pond pas avec une r\xe9ponse pr\xe9visible (networkError, CORS, code HTTP ",(0,r.jsx)(n.code,{children:"500"}),") ou une erreur interne (et inconnue, non pr\xe9visible) \xe0 l'application survient"]}),"\n"]})]})}function l(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>u,a:()=>a});var r=i(7294);const s={},t=r.createContext(s);function a(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function u(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);