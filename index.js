const parser = require('node-html-parser');

class DOMPooper {

    /**
     * Initiate DOMPooper, with optional settings.
     * 
     * @constructor
     * @param {string} varName - The variable type used. For example: let or var.
     * @param {string} rootName - Variable used for the root element.
     * @param {string} rootElement - Element type used as root element.
     */
    constructor(varName = 'let', rootName = 'RT', rootElement = 'div') {
        this.varName = varName;
        this.rootName = rootName;
        this.rootElement = rootElement;

        this.output = '';
        this.varCounter = 0;
    }

    /**
     * Main function that poops the DOM Creation statements.
     * 
     * @param {string} dom - Inputstring with HTML elements.
     */
    poop(dom) {
        this.processDOM(parser.parse(dom));
        return this.output;
    }

    /**
     * Internal method that processes the DOM
     * 
     * @param {object} dom - Inputobject with parsed HTML.
     * @param {string} parentVar - Parent element : used for recursion
     */
    processDOM(dom, parentVar) {
        // Set variable name used in output statements.
        let newVar = dom.tagName === null ? this.rootName : this.generateVar('E');

        // Set root element tagname (root has empty tagName).
        dom.tagName = dom.tagName || this.rootElement;
        
        // Add current element
        switch (dom.nodeType) {
            case 1: // ElementNode
                this.addStatement(`${this.varName} ${newVar} = document.createElement('${dom.tagName}')`);
                this.parseAttributes(dom.rawAttrs, newVar);
                break;
            case 3: // TextNode
                this.addStatement(`${this.varName} ${newVar} = document.createTextNode('${dom.rawText}')`);
                break;
        }
    
        // Add children elements (recursive)
        if (dom.childNodes.length) {
            dom.childNodes.forEach(node => {
                this.processDOM(node, newVar);
            });
        }
    
        // If current element has a parent, append child to it.
        if (parentVar) {
            this.addStatement(`${parentVar}.appendChild(${newVar})`);
        }
    }

    /**
     * Parses HTML Attributes from a string.
     * 
     * @param {string} rawAttrs - String with the space-separated HTML attributes.
     * @param {string} node - Node to attach the attribute to.
     */
    parseAttributes(rawAttrs, node) {
        if (rawAttrs.length) {
            rawAttrs.split(' ').forEach(attr => {
                let newVar = this.generateVar('A');
                const [attribute, value] = attr.split('=');

                this.addStatement(`${this.varName} ${newVar} = document.createAttribute('${attribute}')`);
                this.addStatement(`${newVar}.value = ${value}`);
                this.addStatement(`${node}.setAttributeNode(${newVar})`);
            });
        }
    }

    /**
     * Adds statement with a line terminator.
     * 
     * @param {string} statement HTML Statement
     */
    addStatement(statement) {
        this.output += statement + ';' + '\n';
    }

    /**
     * Generates a new variable for the DOM creation statements.
     * 
     * @param {string} prefix - Prefix for the generated variable.
     */
    generateVar(prefix) {
        return prefix + (++this.varCounter).toString(16);
    }

}

module.exports = DOMPooper;
