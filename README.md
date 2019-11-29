# DOMPooper
Tool to generate DOM create javascript statements of an HTML snippet.

## Requirements
NodeJS

## Installation
```sh
npm i dompooper
```

## Example
```js
const DOMPooper = require('dompooper');

const pooper = new DOMPooper();
const results = pooper.poop('<ul><li>Hello <span class="blue">world!</span></li></ul>')
```

## Results
Output results are these strings you can use in your JS project.
```js
let RT = document.createElement('div');
let E1 = document.createElement('ul');
let E2 = document.createElement('li');
let E3 = document.createTextNode('Hello ');
E2.appendChild(E3);
let E4 = document.createElement('span');
let A5 = document.createAttribute('class');
A5.value = "blue";
E4.setAttributeNode(A5);
let E6 = document.createTextNode('world!');
E4.appendChild(E6);
E2.appendChild(E4);
E1.appendChild(E2);
RT.appendChild(E1);
```