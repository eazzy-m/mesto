const jsdom = require("jsdom");
const { JSDOM } = jsdom;

global.document = new JSDOM('index.html').window.document;

let container = document.querySelector('.page');

console.log(container)