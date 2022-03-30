import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("talis-textarea-countdown")
export class TalisTextAreaCountdown extends LitElement {
  @property({ type: Number })
  maxLength = 100;

  message: String = "";

  @query("textarea")
  textarea!: HTMLTextAreaElement;

  onChange() {
    return this.updateStatus(this.maxLength - this.textarea.value.length);
  }

  updateStatus(count: Number = this.maxLength) {
    this.message = `You have ${count} characters left`;
    this.requestUpdate();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.message = `You have ${this.maxLength} characters left`;
  }

  override render() {
    return html`
      <div class="form-group field">
        <label class="form-label" for="message">
          <span class="field-label">Comment</span>
          <span class="field-hint"
            >Tell us a little about yourself, in ${this.maxLength} characters or
            less.</span
          >
        </label>
        <textarea
          class="form-control"
          name="message"
          id="message"
          aria-required="true"
          @input=${this.onChange}
        ></textarea>
        <div class="indicator help-block" role="status" aria-live="polite">
          ${this.message}
        </div>
      </div>
    `;
  }

  protected override createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "talis-textarea-countdown": TalisTextAreaCountdown;
  }
}
