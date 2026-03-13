(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/shared/lib/ripple.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/lib/imageReveal.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    if (typeof document === 'undefined' || ("TURBOPACK compile-time value", "object") === 'undefined') return;
    if (observer) return;
    observer = new IntersectionObserver((entries)=>{
        const groups = new Map();
        for (const entry of entries){
            if (!entry.isIntersecting) continue;
            const section = entry.target.closest('.section, .notfound-error, .notfound-recommendation, .contacts, header, footer');
            if (!groups.has(section)) groups.set(section, []);
            groups.get(section).push(entry.target);
            observer.unobserve(entry.target);
        }
        for (const [, elements] of groups){
            elements.forEach((el, i)=>{
                const delay = i * STAGGER_MS;
                if (delay > 0) {
                    ;
                    el.style.transitionDelay = `${delay}ms`;
                }
                requestAnimationFrame(()=>el.classList.add('revealed'));
            });
        }
    }, {
        threshold: 0.2
    });
    function observe() {
        document.querySelectorAll(SELECTOR).forEach((el)=>{
            if (!el.classList.contains('revealed')) {
                observer.observe(el);
            }
        });
    }
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, {
        childList: true,
        subtree: true
    });
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/lib/lineReveal.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initLineReveal",
    ()=>initLineReveal
]);
const LINE_SELECTOR = '.section:not(.lines-revealed), .pattern:not(.pattern-revealed)';
function initLineReveal() {
    if (typeof document === 'undefined' || ("TURBOPACK compile-time value", "object") === 'undefined') return;
    const observer = new IntersectionObserver((entries)=>{
        for (const entry of entries){
            if (!entry.isIntersecting) continue;
            const el = entry.target;
            if (el.classList.contains('section')) {
                el.classList.add('lines-revealed');
            }
            if (el.classList.contains('pattern')) {
                el.classList.add('pattern-revealed');
            }
            observer.unobserve(el);
        }
    }, {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    });
    function observe() {
        requestAnimationFrame(()=>{
            document.querySelectorAll(LINE_SELECTOR).forEach((el)=>observer.observe(el));
        });
    }
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, {
        childList: true,
        subtree: true
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/ClientBoot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientBoot",
    ()=>ClientBoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$ripple$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/lib/ripple.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$imageReveal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/lib/imageReveal.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$lineReveal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/lib/lineReveal.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ClientBoot({ children }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientBoot.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$ripple$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initRipple"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$imageReveal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initImageReveal"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$lib$2f$lineReveal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initLineReveal"])();
        }
    }["ClientBoot.useEffect"], []);
    return children;
}
_s(ClientBoot, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = ClientBoot;
var _c;
__turbopack_context__.k.register(_c, "ClientBoot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_76b3a56f._.js.map