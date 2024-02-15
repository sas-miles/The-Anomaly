import ELEMENT_SELECTORS from "$utils/ElementSelectors";

export default class ChapterAnimations {
    constructor(data) {
        this.data = data;
        
    }

    getElement(name, context = '') {
        const selector = ELEMENT_SELECTORS[name];
        if (!selector) {
            console.warn(`No selector found for name: ${name}`);
            return null;
        }

        if (context === 'next' || context === 'prev') {
            if (this.data && this.data[context] && this.data[context].container) {
                return this.data[context].container.querySelectorAll(selector);
            }
            return null; // Or an empty NodeList
        } else {
            return document.querySelectorAll(selector);
        }
    }

    // Example static method for global queries without context
    static queryGlobal(name) {
        const selector = ELEMENT_SELECTORS[name];
        if (!selector) {
            console.warn(`No selector found for name: ${name}`);
            return null;
        }
        return document.querySelectorAll(selector);
    }

}