# Dreadnought UI

A React component library with CSS Modules for scoped styling and tree-shaking support.

## Features

- 🌳 **Tree-shakeable**: Import only what you need
- 🎨 **CSS Modules**: Scoped styles for each component - customize easily
- 📦 **Modular**: Each component can be imported separately
- 🔷 **TypeScript**: Full TypeScript support with exported types
- ⚡ **Lightweight**: Small bundle size with optional styling

## Installation

```bash
npm install dreadnought-ui
```

## Usage

### Basic Import

```tsx
import { Input, Button, Select } from 'dreadnought-ui';
```

### Import types

```tsx
import type { InputProps, ButtonProps, SelectProps } from 'dreadnought-ui';
```

### Import constants

```tsx
import { SIZES, BUTTON_VARIANTS, COLORS, INPUT_TYPES, DEFAULTS } from 'dreadnought-ui';

// Use constants instead of magic strings
<Input size={SIZES.LARGE} type={INPUT_TYPES.EMAIL} />
<Button variant={BUTTON_VARIANTS.OUTLINE} color={COLORS.SUCCESS} />
```

## Components

### Input

```tsx
import { Input } from 'dreadnought-ui';

<Input
  size="medium"
  placeholder="Enter text..."
  error={false}
  helperText="This is helper text"
  className="custom-input" // Additional styles if needed
/>
```

### Select

```tsx
import { Select } from 'dreadnought-ui';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
];

<Select
  size="medium"
  options={options}
  placeholder="Choose option..."
  onChange={(value) => console.log(value)}
  className="custom-select"
/>
```

### Button

```tsx
import { Button } from 'dreadnought-ui';

<Button
  variant="primary"
  color="default"
  size="medium"
  onClick={() => console.log('clicked')}
  className="custom-button"
>
  Click me
</Button>
```

## Styling

Components come with default CSS Module styles that you can customize:

### Default Styles
- Components have built-in styling with CSS Modules
- Styles are scoped and won't conflict with your app
- Includes variants, sizes, and states (hover, focus, error, etc.)

### Customization Options

1. **Add additional classes**:
```tsx
<Button className="my-extra-styles" variant="primary">
  Custom Button
</Button>
```

2. **Override CSS custom properties** (if you want to modify colors/spacing):
```css
/* In your global CSS */
:root {
  --button-primary-bg: #your-color;
  --input-border-color: #your-border;
}
```

3. **Override specific CSS Module classes**:
```css
/* Target the generated class names */
.Input__input___[hash] {
  border-color: red !important;
}
```

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch mode
npm run dev

# Type check
npm run type-check
```