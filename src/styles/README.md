# ReviewCraft Color System

This document describes the comprehensive color system used throughout the ReviewCraft application.

## Overview

The color system is built on three pillars:

1. **CSS Custom Properties** - For global consistency
2. **TypeScript Constants** - For programmatic access
3. **Tailwind Extensions** - For utility-first styling

## Color Palette

### Background Colors

- `bg-primary` (#1A1C20) - Main dashboard background
- `bg-secondary` (#211E26) - Secondary background
- `bg-tertiary` (#222428) - Input fields, tertiary elements

### Card Colors

- `card-primary` (#2B2D31) - Main card background
- `card-secondary` (#332E3A) - Card borders, secondary elements

### Text Colors

- `text-primary` (#E0E0E0) - Primary text, headings
- `text-secondary` (#9E9E9E) - Secondary text, labels
- `text-muted` (#6D6875) - Muted text, placeholders

### Accent Colors

- `accent-primary` (#7D5CE8) - Primary accent, buttons
- `accent-secondary` (#8A6FE8) - Secondary accent
- `accent-hover` (#8A6FE8) - Hover states

### Status Colors

- `status-success` (#10B981) - Success states
- `status-warning` (#F59E0B) - Warning states
- `status-error` (#EF4444) - Error states
- `status-info` (#3B82F6) - Info states

## Usage Methods

### 1. CSS Custom Properties (Recommended)

```css
.my-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-secondary);
}
```

### 2. Utility Classes (CSS)

```html
<div class="bg-card text-primary border-card">
  <h2 class="text-primary">Title</h2>
  <p class="text-secondary">Description</p>
  <button class="btn-primary">Action</button>
</div>
```

### 3. Tailwind Utilities

```jsx
<div className="bg-bg-primary text-text-primary border border-border-secondary">
  <h2 className="text-text-primary">Title</h2>
  <p className="text-text-secondary">Description</p>
  <button className="bg-accent-primary text-text-primary hover:bg-accent-hover">
    Action
  </button>
</div>
```

### 4. TypeScript Constants

```typescript
import { colors, getBackgroundColor, getTextColor } from "@/styles/colors";

// Direct access
const backgroundColor = colors.bg.primary;
const textColor = colors.text.primary;

// Using utility functions
const bgColor = getBackgroundColor("primary");
const txtColor = getTextColor("primary");
```

### 5. CSS Variables in JavaScript

```typescript
import { cssVar } from "@/styles/colors";

const styles = {
  backgroundColor: cssVar.bg("primary"),
  color: cssVar.text("primary"),
  borderColor: cssVar.border("secondary"),
};
```

## Component Examples

### Button Component

```jsx
// Primary button
<button className="bg-accent-primary text-text-primary hover:bg-accent-hover shadow-accent">
  Primary Action
</button>

// Secondary button
<button className="btn-secondary hover:border-accent-primary hover:text-text-primary">
  Secondary Action
</button>
```

### Card Component

```jsx
<div className="bg-card-primary border border-card-secondary shadow-card rounded-xl p-6">
  <h3 className="text-text-primary font-bold">Card Title</h3>
  <p className="text-text-secondary">Card content</p>
</div>
```

### Input Component

```jsx
<input
  className="bg-bg-tertiary text-text-primary border border-border-primary 
             focus:ring-2 focus:ring-accent-primary focus:border-accent-primary
             placeholder:text-text-secondary"
  placeholder="Enter text..."
/>
```

### Modal Component

```jsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm">
  <div className="bg-card-primary border border-card-secondary shadow-modal rounded-xl">
    <h2 className="text-text-primary">Modal Title</h2>
    <p className="text-text-secondary">Modal content</p>
  </div>
</div>
```

## Best Practices

### 1. Use Semantic Color Names

```jsx
// ✅ Good
<div className="bg-card-primary text-text-primary">

// ❌ Avoid
<div className="bg-[#2B2D31] text-[#E0E0E0]">
```

### 2. Leverage Utility Classes

```jsx
// ✅ Good
<button className="btn-primary">Action</button>

// ❌ Avoid
<button className="bg-accent-primary text-text-primary hover:bg-accent-hover shadow-accent">
  Action
</button>
```

### 3. Use CSS Variables for Dynamic Styling

```jsx
// ✅ Good
<div style={{ backgroundColor: cssVar.bg('primary') }}>

// ❌ Avoid
<div style={{ backgroundColor: '#1A1C20' }}>
```

### 4. Maintain Consistency

- Always use the defined color palette
- Don't introduce new colors without updating the system
- Use the appropriate text color for each background

## Accessibility

All color combinations have been tested for WCAG AA compliance:

- Text contrast ratios meet minimum requirements
- Focus states are clearly visible
- Status colors are distinguishable for color-blind users

## Future Considerations

- Light mode support can be added by extending the CSS custom properties
- Additional color variants can be added to the palette
- Darker/lighter shades can be generated programmatically
