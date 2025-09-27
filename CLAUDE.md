# CLAUDE.md - Dreadnought UI Library

This file provides guidance for working with the dreadnought-ui component library.

## Library Philosophy

Dreadnought-ui is a **customization-oriented** React component library designed to:
- **Eliminate code repetition** across projects
- **Maximize flexibility** through extensive customization props
- **Maintain consistency** while allowing project-specific styling
- **Provide sensible defaults** that can be easily overridden

## Development Principles

### 1. Customization First
- Every visual aspect should be customizable via props
- Use CSS custom properties (variables) for runtime styling
- Provide multiple styling approaches (className, style props, CSS variables)
- Never hardcode values that might need to change

### 2. Flexible Architecture
- Components should work with minimal props but support extensive customization
- Support both controlled and uncontrolled patterns
- Allow custom renderers/components where appropriate
- Make labels, styling, and behavior configurable

### 3. Reusability Patterns
```tsx
// ✅ Good - Highly customizable
<Button 
  variant="primary" 
  size="large"
  borderRadius={8}
  customColor="#ff6b35"
  className="custom-button"
/>

// ❌ Avoid - Limited customization
<PrimaryButton>Submit</PrimaryButton>
```

## Component Design Guidelines

### Props Structure
- **Base functionality props** (value, onChange, disabled, etc.)
- **Customization props** (colors, sizes, borders, spacing)
- **Style override props** (className, style, CSS custom properties)
- **Behavioral props** (variants, states, custom renderers)

### CSS Architecture
- Use CSS Modules for scoped styling
- Leverage CSS custom properties for runtime customization
- Provide wrapper classes for layout/positioning
- Support both light/dark themes through variables

### TypeScript Patterns
- Use `type` instead of `interface` for data structures
- Make customization props optional with sensible defaults
- Support generic types where components handle different data types
- Export prop types for reuse in wrapper components

## Common Development Commands

- `npm run build` - Build the library for distribution
- `npm run dev` - Watch mode for development
- `npm run type-check` - TypeScript validation

## Component Categories

### Form Components
- Should handle labels, validation states, error display
- Support both HTML5 and custom implementations
- Allow extensive styling customization
- Follow accessibility best practices

### Layout Components  
- Provide flexible spacing/sizing through props
- Support responsive design patterns
- Allow custom breakpoints and grid systems

### Interactive Components
- Support custom event handlers
- Provide hover/focus/active state customization
- Allow custom animations and transitions

## Best Practices

1. **Always provide defaults** but make them overridable
2. **Use forwardRef** for components that need DOM access
3. **Support className merging** with classNames utility
4. **Test customization props** to ensure they work as expected
5. **Document customization options** in component comments
6. **Keep bundle size minimal** - avoid unnecessary dependencies

## Example Component Structure

```tsx
export type ComponentProps = {
  // Base functionality
  value?: string;
  onChange?: (value: string) => void;
  
  // Customization props
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  customColor?: string;
  borderRadius?: number;
  
  // Style overrides
  className?: string;
  style?: React.CSSProperties;
  
  // Advanced customization
  renderCustomElement?: (props: any) => React.ReactNode;
};

export const Component = forwardRef<HTMLElement, ComponentProps>(({
  variant = 'default',
  size = 'medium', 
  customColor,
  borderRadius = 4,
  className,
  ...props
}, ref) => {
  const customStyles = {
    '--custom-color': customColor,
    '--border-radius': `${borderRadius}px`,
  } as React.CSSProperties;

  return (
    <div 
      ref={ref}
      className={classNames(styles.component, styles[variant], styles[size], className)}
      style={{ ...customStyles, ...props.style }}
      {...props}
    />
  );
});
```

## Anti-Patterns to Avoid

- ❌ Hardcoded colors, sizes, or spacing
- ❌ Non-customizable component variants  
- ❌ Overly specific component names (use generic + props instead)
- ❌ Missing forwardRef on components that render DOM elements
- ❌ Not supporting className merging
- ❌ Ignoring accessibility requirements

Remember: The goal is maximum flexibility with minimal code repetition across projects!