/**
 * Copyright 2024 NotScalce
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

/**
 * `rpg-me`
 * 
 * @demo index.html
 * @element rpg-me
 */
export class RpgMe extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "rpg-me";
  }

  constructor() {
    super();
    this.title = "Create your character";
    this.characterSettings = {
      seed: "00000000",
      base: 0,
      face: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      glasses: false,
      hatColor: 0,
      name: "",
      fire: false,
      walking: false,
      hat: "none",
      size: 400,
    };
    this._applySeedToSettings();
  }

  static get properties() {
    return {
      ...super.properties,
      characterSettings: { type: Object },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
        }
        .layout-container {
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: flex-start;
          gap: 20px;
          padding: 20px;
        }
        .character-display {
          flex: 2;
          text-align: center;
          position: relative;
        }
        .left-panel, .right-panel {
          flex: 1;
          min-width: 200px;
          max-width: 300px;
        }
        .left-panel label, .right-panel label {
          display: block;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .left-panel wired-input, .right-panel wired-slider, .left-panel wired-slider, .right-panel wired-checkbox {
          display: block;
          margin-bottom: 15px;
          color: white;
        }
        .seed-indicator {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 12px;
        }
        button.randomize-button {
          background-color: black;
          color: white;
          border-radius: 4px;
          margin-top: 20px;
        }
        button.reset-button {
          background-color: black;
          color: white;
          border-radius: 4px;
          margin-top: 20px;
          margin-left: 4px;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="layout-container">
        <div class="left-panel"> 
          <label for="nameInput">Character Name:</label>
          <wired-input id="nameInput" type="text" placeholder="Name"
            .value="${this.characterSettings.name}"
            @input="${(e) => this._updateSetting('name', e.target.value)}"
          ></wired-input>
  
          <label for="hairCheckbox">Checkboxes:</label>
          <wired-checkbox id="hairCheckbox" ?checked="${this.characterSettings.base === 1}"
            @change="${(e) =>
              this._updateSetting('base', e.target.checked ? 1 : 0)}"
            >Hair</wired-checkbox>
          
          <wired-checkbox ?checked="${this.characterSettings.fire}"
            @change="${(e) => this._updateSetting('fire', e.target.checked)}"
          >Fire</wired-checkbox>

          <wired-checkbox ?checked="${this.characterSettings.walking}"
            @change="${(e) => this._updateSetting('walking', e.target.checked)}"
          >Walking</wired-checkbox>

          <button class="randomize-button" @click="${this._randomizeSettings}">Randomize</button>
          <button class="reset-button" @click="${this._resetSettings}">Reset</button>
        </div>
  
        <div class="character-display">
          <div class="seed-indicator">Seed: ${this.characterSettings.seed}</div>
          <div class="character-label">${this.characterSettings.name}</div>
          <rpg-character
            base="${this.characterSettings.base}"
            face="${this.characterSettings.face}"
            faceitem="${this.characterSettings.faceitem}"
            hair="${this.characterSettings.hair}"
            pants="${this.characterSettings.pants}"
            shirt="${this.characterSettings.shirt}"
            skin="${this.characterSettings.skin}"
            hatColor="${this.characterSettings.hatColor}"
            .fire="${this.characterSettings.fire}"
            .walking="${this.characterSettings.walking}"
            hat="${this.characterSettings.hat}"
          ></rpg-character>
        </div>
  
        <div class="right-panel">
          <label for="faceSlider">Face:</label>
          <wired-slider id="faceSlider" value="${this.characterSettings.face}" min="0" max="5"
            @change="${(e) => this._updateSetting('face', parseInt(e.detail.value))}"
          ></wired-slider>
  
          <label for="faceItemSlider">Face Item:</label>
          <wired-slider id="faceItemSlider" value="${this.characterSettings.faceitem}" min="0" max="9"
            @change="${(e) => this._updateSetting('faceitem', parseInt(e.detail.value))}"
          ></wired-slider>
  
          <label for="pantsSlider">Pants Style:</label>
          <wired-slider id="pantsSlider" value="${this.characterSettings.pants}" min="0" max="9"
            @change="${(e) => this._updateSetting('pants', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="shirtSlider">Shirt Style:</label>
          <wired-slider id="shirtSlider" value="${this.characterSettings.shirt}" min="0" max="9"
            @change="${(e) => this._updateSetting('shirt', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="skinSlider">Skin Tone:</label>
          <wired-slider id="skinSlider" value="${this.characterSettings.skin}" min="0" max="9"
            @change="${(e) => this._updateSetting('skin', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="hatColorSlider">Hat Color:</label>
          <wired-slider id="hatColorSlider" value="${this.characterSettings.hatColor}" min="0" max="9"
            @change="${(e) => this._updateSetting('hatColor', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="hair">Hair Color (Hair checkbox must be selected):</label>
          <wired-slider id="hair" value="${this.characterSettings.hair}" min="0" max="9"
            ?disabled="${this.characterSettings.base !== 1}" 
            @change="${(e) => this._updateSetting('hair', parseInt(e.detail.value))}"
          ></wired-slider>
        </div>
      </div>
    `;
  }

  _applySeedToSettings() {
    const seed = this.characterSettings.seed;
    const paddedSeed = seed.padStart(8, "0").slice(0, 8);
    const values = paddedSeed.split("").map((v) => parseInt(v, 10));
    [
      this.characterSettings.base,
      this.characterSettings.face,
      this.characterSettings.faceitem,
      this.characterSettings.hair,
      this.characterSettings.pants,
      this.characterSettings.shirt,
      this.characterSettings.skin,
      this.characterSettings.hatColor,
    ] = values;
  
    this.requestUpdate();
  }

  _randomizeSettings() { // needs tweaking to get to work
    const randomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
    this.characterSettings = {
      base: randomValue(0, 1), 
      face: randomValue(0, 5),
      faceitem: randomValue(0, 9),
      hair: randomValue(0, 9),
      pants: randomValue(0, 9),
      shirt: randomValue(0, 9),
      skin: randomValue(0, 9),
      glasses: Math.random() < 0.5,
      hatColor: randomValue(0, 9),
      fire: Math.random() < 0.5,
      walking: Math.random() < 0.5,
      hat: "none",
      size: 400,
    };
    this._generateSeed();

    this._applySeedToSettings();

    const sliders = this.shadowRoot.querySelectorAll('wired-slider');
    sliders.forEach(slider => {
      const settingKey = slider.id.replace('Slider', '').toLowerCase(); // e.g., faceSlider -> face
      if (this.characterSettings.hasOwnProperty(settingKey)) {
        slider.value = this.characterSettings[settingKey];
      }
   });
  
    this.requestUpdate();
  }
  
  _resetSettings() {
    this.characterSettings = {
      seed: "00000000",
      base: 0, // No hair by default
      face: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      glasses: false,
      hatColor: 0,
      name: "",
      fire: false,
      walking: false,
      hat: "none",
      size: 400,
    };
  
    this._applySeedToSettings();

    const sliders = this.shadowRoot.querySelectorAll('wired-slider');
    sliders.forEach(slider => {
      const settingKey = slider.id.replace('Slider', '').toLowerCase(); // e.g., faceSlider -> face
      if (this.characterSettings.hasOwnProperty(settingKey)) {
        slider.value = this.characterSettings[settingKey];
      }
    });
  
    this.requestUpdate();
  
    this.requestUpdate();
  }

  _generateSeed() {
    const { base, face, faceitem, hair, pants, shirt, skin, hatColor } = this.characterSettings;
    this.characterSettings.seed = `${base}${face}${faceitem}${hair}${pants}${shirt}${skin}${hatColor}`;
  }

  _updateSetting(key, value) {
    this.characterSettings = { ...this.characterSettings, [key]: value };
    this._generateSeed();
    this.requestUpdate();
  }
}

customElements.define(RpgMe.tag, RpgMe);