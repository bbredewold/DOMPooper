# DOMPooper
Tool to generate DOM create javascript statements of an HTML snippet.

## Requirements
Just Node

## Installation
    npm i dompooper

## Example
    const DOMPooper = require('dompooper');

    const pooper = new DOMPooper();
    const results = pooper.poop('<ul><li>Hello <span>world!</span></li></ul>')

## Results
Output results are these strings you can use in your JS project.

    let RT = document.createElement('div');
    let E1 = document.createElement('ul');
    let E2 = document.createElement('li');
    let E3 = document.createTextNode('Hello ');
    E2.appendChild(E3);
    let E4 = document.createElement('span');
    let E5 = document.createTextNode('world!');
    E4.appendChild(E5);
    E2.appendChild(E4);
    E1.appendChild(E2);
    RT.appendChild(E1);