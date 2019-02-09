window.customElements.define(
    'c-info',
    class extends HTMLElement {

        // Specify observed attributes so that attributeChangedCallback will work
        static get observedAttributes() {
            return ['content'];
        }

        connectedCallback() { // Runs when the element is added to the page

            var content = this.getAttribute('content');
            this.innerHTML = `
                <span class="c-info__icon">i</span>
                <div class="c-info__content js-content">${content}</div>
            `;
            debugger
        }

        attributeChangedCallback(name, oldValue, newValue) { // Runs when an attribute passed on observedAttributes() changes
            if (name == 'content') {
                var content = this.querySelector('.js-content');
                if (content)
                    content.textContent = newValue;
            }
        }
    }
)