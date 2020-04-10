import { LitElement, html, css } from "lit-element";

class ToggleSwitch extends LitElement {
    static get styles() {
        return css`
            :host {
                --toggle-switch-disabled-opacity: 0.5;
                --toggle-switch-toggle-duration: 0.3s;

                --toggle-switch-track-color: #cecece;
                --toggle-switch-track-shadow: none;
                --toggle-switch-track-border: none;
                --toggle-switch-track-height: 75%;

                --toggle-switch-knob-color: #333333;
                --toggle-switch-knob-shadow: none;
                --toggle-switch-knob-border: none;

                display: inline-block;
                font-size: 100%;
            }
            :host([hidden]) {
                display: none;
            }
            :host([disabled]) {
                opacity: var(--toggle-switch-disabled-opacity);
            }
            :host([checked]) #knob {
                transform: translateX(70%);
            }
            #track,
            #knob {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                margin: auto;
            }
            #wrapper {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }
            label {
                padding-right: 0.75em;
            }
            #inner-wrap {
                position: relative;
                height: 1.5em;
                width: 2.5em;
            }
            #track {
                height: var(--toggle-switch-track-height);
                width: 100%;
                border-radius: 1em;
                background-color: var(--toggle-switch-track-color);
                border: var(--toggle-switch-track-border);
                box-shadow: var(--toggle-switch-track-shadow);
            }
            #knob {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                height: 100%;
                width: 60%;
                border-radius: 50%;
                background-color: var(--toggle-switch-knob-color);
                border: var(--toggle-switch-knob-border);
                box-shadow: var(--toggle-switch-knob-shadow);
                transition: transform var(--toggle-switch-toggle-duration);
            }
        `;
    }

    static get properties() {
        return {
            checked: {
                type: Boolean,
                reflect: true,
                converter: {
                    fromAttribute(value) {
                        return value != null;
                    },
                    toAttribute(value) {
                        return value
                            ? "checked"
                            : null;
                    }
                },
            },
            "aria-checked": {
                type: String,
                reflect: true,
            },
            role: {
                type: String,
            },
            tabindex: {
                type: Number,
            },
            disabled: {
                type: Boolean,
            },
        };
    }

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("keyup", this.keyUpHandler);
        this.setAttribute("role", this.role || "checkbox");
        this.setAttribute("aria-checked", this.checked || false);
        this.setAttribute("tabindex", this.tabindex || "0");
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("keyup", this.keyUpHandler);
    }

    clickHandler(event) {
        if (!this.disabled) {
            event.preventDefault();
            this.toggleChecked();
        }
    }

    keyUpHandler(event) {
        if (event.keyCode === 32 && !this.disabled) {
            event.preventDefault();
            this.toggleChecked();
        }
    }

    toggleChecked() {
        const newValue = !this.checked;
        this["aria-checked"] = newValue;
        this.checked = newValue;
        this.dispatchEvent(
            new Event("change", {
                bubbles: true,
                composed: true,
            })
        );
    }

    render() {
        return html`
            <span id="wrapper" @click="${this.clickHandler}">
                <label>
                    <slot />
                </label>
                <span id="inner-wrap">
                    <span id="track"></span>
                    <span id="knob"></span>
                </span>
            </span>
        `;
    }
}

customElements.define("toggle-switch", ToggleSwitch);
