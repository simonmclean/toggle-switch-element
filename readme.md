Custom element toggle-switch designed to act like a checkbox. Includes accessibility features.

## Usage

### HTML

```html
<toggle-switch>Label text</toggle-switch>

<!-- Can be checked or disabled by default, just like a regular input -->
<toggle-switch checked disabled>Label text</toggle-switch>
```

### CSS

Here are the custom properties available, along with their initial values, which enable you to style the shadow DOM. 
```css
--toggle-switch-disabled-opacity: 0.5;
--toggle-switch-toggle-duration: 0.3s;

--toggle-switch-track-color: #cecece;
--toggle-switch-track-shadow: none;
--toggle-switch-track-border: none;
--toggle-switch-track-height: 75%;

--toggle-switch-knob-color: #333333;
--toggle-switch-knob-shadow: none;
--toggle-switch-knob-border: none;
```

### JS

The element itself emits a `change` event when the `checked` property changes.

```javascript
document.querySelector('toggle-switch').addEventListener('change', (event) => {
    console.log(event)
})
```

### Example implementation:

```html
<script src="node_modules/last-toggle-switch/dist/ToggleSwitch.dist.js"></script>

<toggle-switch>Toggle Switch</toggle-switch>

<style>
    toggle-switch {
        --toggle-switch-track-color: #e8e2e2;
        --toggle-switch-knob-color: rebeccapurple;
        --toggle-switch-toggle-duration: 0.15s;
        color: #262626;
        transition: color 0.3s;
    }
    toggle-switch[checked] {
        --toggle-switch-track-color: #dfc5e6;
    }
    toggle-switch:focus {
        outline: none;
        color: rebeccapurple;
    }
</style>
```

## Development

```
# installation
npm install

# dev mode
npm run dev

# build custom element
npm run build
```
