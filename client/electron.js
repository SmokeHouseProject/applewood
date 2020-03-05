//electron polyfill

const _electron =  window.nodeRequire ? window.nodeRequire("electron") : null;
export default _electron;


