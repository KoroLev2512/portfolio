module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/shared/lib/ripple.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initRipple",
    ()=>initRipple
]);
const RIPPLE_SELECTORS = '.btn, .project-card, .project-nav-btn, .project-card-link';
function initRipple() {
    if (typeof document === 'undefined') return;
    document.addEventListener('mousedown', (e)=>{
        const target = e.target.closest(RIPPLE_SELECTORS);
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const span = document.createElement('span');
        span.className = 'ripple';
        span.style.width = span.style.height = `${size}px`;
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        target.appendChild(span);
        span.addEventListener('animationend', ()=>span.remove());
    });
}
}),
"[project]/src/shared/lib/imageReveal.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initImageReveal",
    ()=>initImageReveal,
    "resetTextReveals",
    ()=>resetTextReveals
]);
const SELECTOR = '.img-reveal, .text-reveal-title, .text-reveal-body';
const TEXT_SELECTOR = '.text-reveal-title, .text-reveal-body';
const STAGGER_MS = 75;
let observer;
function initImageReveal() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    function observe() {
        document.querySelectorAll(SELECTOR).forEach((el)=>{
            if (!el.classList.contains('revealed')) {
                observer.observe(el);
            }
        });
    }
    const mo = undefined;
}
function resetTextReveals() {
    if (!observer || typeof document === 'undefined') return;
    const elements = document.querySelectorAll(TEXT_SELECTOR);
    elements.forEach((el)=>{
        el.style.transition = 'none';
        el.classList.remove('revealed');
        el.style.transitionDelay = '';
    });
    // force reflow
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    document.body.offsetHeight;
    elements.forEach((el)=>{
        el.style.transition = '';
    });
    requestAnimationFrame(()=>{
        elements.forEach((el)=>observer.observe(el));
    });
}
}),
"[project]/src/shared/lib/lineReveal.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initLineReveal",
    ()=>initLineReveal
]);
const LINE_SELECTOR = '.section:not(.lines-revealed), .pattern:not(.pattern-revealed)';
function initLineReveal() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    const observer = undefined;
    function observe() {
        requestAnimationFrame(()=>{
            document.querySelectorAll(LINE_SELECTOR).forEach((el)=>observer.observe(el));
        });
    }
    const mo = undefined;
}
}),
"[project]/src/app/ClientBoot.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientBoot",
    ()=>ClientBoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$ripple$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/lib/ripple.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$imageReveal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/lib/imageReveal.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$lineReveal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/lib/lineReveal.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function ClientBoot({ children }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$ripple$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initRipple"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$imageReveal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initImageReveal"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$lineReveal$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initLineReveal"])();
    }, []);
    return children;
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__693bbe7f._.js.map