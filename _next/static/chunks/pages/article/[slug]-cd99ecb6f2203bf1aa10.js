_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[11],{"4O7A":function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/article/[slug]",function(){return n("E99q")}])},BsWD:function(t,e,n){"use strict";function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function i(t,e){if(t){if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}n.d(e,"a",(function(){return i}))},DSFK:function(t,e,n){"use strict";function a(t){if(Array.isArray(t))return t}n.d(e,"a",(function(){return a}))},E99q:function(t,e,n){"use strict";n.r(e),n.d(e,"__N_SSG",(function(){return L}));var a=n("wx14"),i=n("ODXe"),o=n("q1tI"),r=n.n(o),c=n("pTio"),d=n("Ff2n"),l=n("vOnD"),p=n("ovZr"),s=r.a.createElement,m=Object(l.d)(p.a).withConfig({displayName:"article-markdowncomponent__StyledArticleMarkdown",componentId:"sc-1mhdma6-0"})((function(t){var e=t.theme;return Object(l.c)(["h1 + p{margin-top:0;line-height:1.3em;margin-bottom:1.8em;strong{display:block;font-family:",";}}h1:first-child + p + figure{margin-left:-40px;margin-right:-40px;@media only screen and (max-width:848px){margin-left:calc(calc(calc(100vw - 688px) / 2) * -1);margin-right:calc(calc(calc(100vw - 688px) / 2) * -1);}@media only screen and (max-width:768px){margin-left:-40px;margin-right:-40px;}@media only screen and (max-width:560px){margin-left:-30px;margin-right:-30px;}@media only screen and (max-width:320px){margin-left:-20px;margin-right:-20px;}figcaption{padding:0 40px;@media only screen and (max-width:848px){padding:0 calc(calc(100vw - 688px) / 2);}@media only screen and (max-width:768px){padding:0 40px;}@media only screen and (max-width:560px){padding:0 30px;}@media only screen and (max-width:320px){padding:0 20px;}}}"],e.fonts.sans)})),u=function(t){var e=t.children,n=Object(d.a)(t,["children"]);return s(m,n,e)},h=n("YFqc"),f=n.n(h),g=n("KEE8"),y=n("nkNA"),b=n("FUxi"),x=r.a.createElement,w=l.d.div.withConfig({displayName:"article-metadatacomponent__StyledContainer",componentId:"sc-1ie2bs3-0"})(["margin-bottom:30px;display:flex;align-items:center;font-size:16px;justify-content:space-between;@media only screen and (max-width:560px){margin-bottom:20px;}& > div{display:flex;align-items:center;margin-right:20px;}"]),v=l.d.a.withConfig({displayName:"article-metadatacomponent__AuthorThumbnailLink",componentId:"sc-1ie2bs3-1"})(["margin-right:15px;"]),_=Object(l.d)(g.a).withConfig({displayName:"article-metadatacomponent__AuthorThumbnail",componentId:"sc-1ie2bs3-2"})(["border-radius:40px;display:block;"]),O=Object(l.d)(y.a).withConfig({displayName:"article-metadatacomponent__AuthorName",componentId:"sc-1ie2bs3-3"})(["a{text-decoration:none;&:hover{text-decoration:underline;}}"]),j=Object(l.d)(b.a).withConfig({displayName:"article-metadatacomponent__Metadata",componentId:"sc-1ie2bs3-4"})((function(t){var e=t.theme;return Object(l.c)(["font-weight:normal;color:",";"],e.colors.textTertiary)})),k=l.d.a.withConfig({displayName:"article-metadatacomponent__CategoryLabel",componentId:"sc-1ie2bs3-5"})((function(t){var e=t.theme;return Object(l.c)(["display:block;padding:3px 5px;text-decoration:none;border-radius:2px;",";color:",";border:solid "," 1px;white-space:nowrap;&:focus,&:hover{background:",";border-color:",";color:#fff;}"],e.typography.h6,e.colors.textTertiary,e.colors.textTertiary,e.colors.primary,e.colors.primary)})),I=function(t){var e=t.publishedAt,n=t.category,a=t.author,i=t.readingTime;return x(w,null,x("div",null,x(f.a,{href:"/author/[slug]",as:a.url,passHref:!0},x(v,{rel:"author"},x(_,{alt:a.image.alt,src:a.image.sizes[100].url,dominantColor:a.image.dominantColor,width:40,height:40}))),x("div",null,x(O,{component:"h3",variant:"h6"},x(f.a,{href:"/author/[slug]",as:a.url},x("a",{rel:"author"},a.name))),x(j,{component:"p",variant:"h6"},e," • ",i))),x(f.a,{href:"/category/[slug]",as:n.url,passHref:!0},x(k,null,n.name)))},N=n("Eg1W"),C=n("1wtQ"),E=n("iNpI"),A=n("km4c"),S=r.a.createElement,T=l.d.article.withConfig({displayName:"page-articlecomponent__ArticleContainer",componentId:"sc-1piujbm-0"})(["max-width:688px;margin:0 auto;"]),L=!0;e.default=function(t){var e=t.article,n=e.title,o=e.lede,d=e.images,l=e.publishedAt,p=e.category,s=e.author,m=e.htmlContent,h=e.readingTime,g=e.absoluteUrl,b=e.keywords,x=t.nextArticles,w=Object(i.a)(d,1)[0];return S(r.a.Fragment,null,S(N.a,{title:"".concat(n," – ").concat(C.f),description:o,author:s.name,image:w.sizes[1600].absoluteUrl,imageAlt:w.alt,url:g,contentType:"article",ogType:"article",keywords:b}),S(c.a,null,S(T,null,S(I,{publishedAt:l,category:p,author:s,readingTime:h}),S(u,null,m)),!!x.length&&S("div",null,S(y.a,{component:"h3",variant:"h3",gutterBottom:!0},"More news about"," ",S(f.a,{href:"/category/[slug]",as:p.url},S("a",null,p.name))),S(A.a,null,x.map((function(t,e){return S(E.a,Object(a.a)({},t,{key:e}))}))))))}},KEE8:function(t,e,n){"use strict";n.d(e,"a",(function(){return m}));var a=n("wx14"),i=n("Ff2n"),o=n("q1tI"),r=n.n(o),c=n("vOnD"),d=n("nT29"),l=r.a.createElement,p=c.d.figure.withConfig({displayName:"imagecomponent__ImageContainer",componentId:"sc-1l6zfdu-0"})((function(t){var e=t.imageRatio,n=t.width,a=t.height,i=t.dominantColor;return Object(c.c)(["background:",";display:inline-block;position:relative;width:","px;height:",'px;overflow:hidden;-webkit-backface-visibility:hidden;-webkit-transform:translate3d(0,0,0);&:before{content:"";display:block;padding-top:',"%;}"],i||"#eee",n,a,e)})),s=c.d.img.withConfig({displayName:"imagecomponent__StyledImage",componentId:"sc-1l6zfdu-1"})((function(t){var e=t.hasLoaded;return Object(c.c)(["position:absolute;top:0;object-fit:cover;width:100%;height:100%;transition:opacity 0.25s ",";",""],d.a,!e&&Object(c.c)(["opacity:0;"]))})),m=function(t){var e=t.alt,n=t.src,r=t.width,c=t.height,d=t.dominantColor,m=t.srcSet,u=t.className,h=Object(i.a)(t,["alt","src","width","height","dominantColor","srcSet","className"]),f=Object(o.useRef)(null),g=Object(o.useState)(!1),y=g[0],b=g[1],x=m?Object.values(m).map((function(t){var e=t.url,n=t.width;return"".concat(e," ").concat(n,"w")})).join(", "):void 0,w=c/r*100,v=d?(.5,d.replace("rgb","rgba").replace(")",", ".concat(.5,")"))):void 0;return Object(o.useEffect)((function(){f.current.complete&&setTimeout((function(){return b(!0)}),1)}),[]),l(p,{className:u,imageRatio:w,width:r,height:c,dominantColor:v},l(s,Object(a.a)({},h,{ref:f,src:n,loading:"lazy",alt:e,onLoad:function(){return b(!0)},hasLoaded:y,srcSet:x,className:"fadeInOnLoad"})))}},ODXe:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var a=n("DSFK"),i=n("BsWD"),o=n("PYwp");function r(t,e){return Object(a.a)(t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],a=!0,i=!1,o=void 0;try{for(var r,c=t[Symbol.iterator]();!(a=(r=c.next()).done)&&(n.push(r.value),!e||n.length!==e);a=!0);}catch(t){i=!0,o=t}finally{try{a||null==c.return||c.return()}finally{if(i)throw o}}return n}}(t,e)||Object(i.a)(t,e)||Object(o.a)()}},PYwp:function(t,e,n){"use strict";function a(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(e,"a",(function(){return a}))},iNpI:function(t,e,n){"use strict";n.d(e,"a",(function(){return b}));var a=n("ODXe"),i=n("q1tI"),o=n.n(i),r=n("vOnD"),c=n("YFqc"),d=n.n(c),l=n("KEE8"),p=n("nkNA"),s=n("FUxi"),m=o.a.createElement,u=r.d.a.withConfig({displayName:"article-cardcomponent__StyledArticleLink",componentId:"sc-17xb5kw-0"})(["text-decoration:none;display:block;height:100%;@media only screen and (max-width:768px){display:grid;grid-column-gap:30px;grid-row-gap:30px;grid-template-columns:1fr 2fr;@media only screen and (max-width:560px){grid-column-gap:20px;grid-template-columns:1fr 3fr;}}"]),h=Object(r.d)(l.a).withConfig({displayName:"article-cardcomponent__Thumbnail",componentId:"sc-17xb5kw-1"})(["width:100%;height:auto;display:block;@media only screen and (max-width:768px){&:before{padding-top:100%;}}"]),f=r.d.div.withConfig({displayName:"article-cardcomponent__ArticleInformation",componentId:"sc-17xb5kw-2"})(["padding-top:20px;@media only screen and (max-width:768px){padding:0;display:flex;flex-direction:column;justify-content:center;}"]),g=Object(r.d)(p.a).withConfig({displayName:"article-cardcomponent__Title",componentId:"sc-17xb5kw-3"})(["font-size:24px;@media only screen and (max-width:1400px){font-size:21px;}@media only screen and (max-width:560px){font-size:18px;}"]),y=Object(r.d)(s.a).withConfig({displayName:"article-cardcomponent__Lede",componentId:"sc-17xb5kw-4"})((function(t){var e=t.theme;return Object(r.c)(["border-radius:5px;color:",";font-weight:normal;font-size:18px;@media only screen and (max-width:560px){font-size:16px;}"],e.colors.textSecondary)})),b=function(t){var e=t.title,n=t.lede,i=t.url,o=t.images,r=Object(a.a)(o,1)[0];return m("article",null,m(d.a,{href:"/article/[slug]",as:i,passHref:!0},m(u,null,m("div",null,m(h,{alt:r.alt,src:r.sizes[600].url,srcSet:r.sizes,sizes:"(max-width: 560px) 25vw, 33vw",dominantColor:r.dominantColor,width:16,height:9})),m(f,null,m(p.a,{component:"h3",variant:"h5",gutterBottom:!0},"Silicon Valley"),m(g,{component:"h2",gutterBottom:!0},e),m(y,{component:"p"},n)))))}},km4c:function(t,e,n){"use strict";n.d(e,"a",(function(){return d}));var a=n("q1tI"),i=n.n(a),o=n("vOnD"),r=i.a.createElement,c=o.d.div.withConfig({displayName:"article-listcomponent__StyledArticleList",componentId:"v5r0j6-0"})(["display:grid;grid-column-gap:30px;grid-row-gap:30px;grid-template-columns:1fr 1fr 1fr;@media only screen and (max-width:768px){grid-template-columns:1fr 1fr;}@media only screen and (max-width:768px){grid-template-columns:1fr;}"]),d=function(t){var e=t.children;return r(c,null,e)}},nT29:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var a="cubic-bezier(0.77, 0, 0.175, 1)"},nkNA:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var a=n("wx14"),i=n("Ff2n"),o=n("q1tI"),r=n.n(o),c=n("FUxi"),d=r.a.createElement,l=function(t){var e=t.children,n=t.component,o=void 0===n?"h2":n,r=t.variant,l=void 0===r?o:r,p=Object(i.a)(t,["children","component","variant"]);return d(c.a,Object(a.a)({component:o,variant:l},p),e)}},ovZr:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var a=n("wx14"),i=n("Ff2n"),o=n("q1tI"),r=n.n(o),c=n("vOnD"),d=n("nT29"),l=r.a.createElement,p=c.d.div.withConfig({displayName:"markdowncomponent__MarkdownContainer",componentId:"sc-18u6t9x-0"})((function(t){var e=t.theme;return Object(c.c)(["word-break:break-word;h1,h2,h3,h4,h5,h6,ul,ol,p,pre,figure{margin:1.8rem 0;ul,ol{margin:0;}}&& > *:last-child{margin-bottom:0;}h1{",";}h2{",";}h3{",";}h4{",";}h5{",";}h6{",";}p{",";}h1:first-child{margin-top:0;margin-bottom:0.3em;",";}figure{div{display:block;position:relative;overflow:hidden;background:#eee;-webkit-backface-visibility:hidden;-webkit-transform:translate3d(0,0,0);img{position:absolute;top:0;object-fit:cover;width:100%;height:100%;&.fadeInOnLoad{transition:opacity 0.25s ",";&:not(.hasLoaded){opacity:0;}}}}figcaption{margin-top:10px;",";}}ul,ol{padding:0 20px;}strong{color:",";}a{&:focus,&:hover{color:",";}}blockquote{padding-left:20px;border-left:solid #ccc 3px;p{",";}}code{",";}pre code{",";display:block;padding:20px;}"],e.typography.h1,e.typography.h2,e.typography.h3,e.typography.h4,e.typography.h6,e.typography.h6,e.typography.body,e.typography.h1,d.a,e.typography.caption,e.colors.textPrimary,e.colors.primary,e.typography.quote,e.typography.code,e.typography.code)})),s=function(t){var e=t.children,n=Object(i.a)(t,["children"]),r=Object(o.useRef)(null);return Object(o.useEffect)((function(){var t=r.current.querySelectorAll("img.fadeInOnLoad");return t.forEach((function(t){if(t.complete)return setTimeout((function(){return t.classList.add("hasLoaded")}),1);t.onload=function(){t.classList.add("hasLoaded")}})),function(){t.forEach((function(t){t.onload=null}))}}),[]),l(p,Object(a.a)({ref:r},n,{dangerouslySetInnerHTML:{__html:e}}))}}},[["4O7A",0,1,2,3,4]]]);