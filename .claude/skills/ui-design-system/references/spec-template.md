# Component Spec Template

Copy this template when creating a new component spec at `04-components/<component-name>/spec.md`. Replace all `{{placeholders}}` with real content.

---

```markdown
---
title: "Component: app-{{component-name}}"
aliases:
  - {{component name without prefix}}
  - app-{{component-name}}
tags:
  - design-system
  - component
  - {{topic-tag}}
date: {{YYYY-MM-DD}}
source: "[[design-system#5. Component Library]]"
---

# Component: app-{{component-name}}

See also: [[04-components/{{related-component}}/spec|app-{{related-component}}]] | [[color-palette]] | [[interaction-transitions]]

## Purpose

{{One or two sentences: what the component does and where it's used on the site.}}

## Anatomy

{{ASCII diagram showing the visual layout of the component. Use box-drawing characters (┌ ─ ┐ │ └ ┘) and annotate each region with its font/class.}}

## Tailwind Classes

{{HTML code block showing the component markup with exact Tailwind utility classes.}}

| Property       | Tailwind classes / value      |
|----------------|-------------------------------|
| Background     | `{{bg-class}}`                |
| Border         | `{{border-classes}}`          |
| Border radius  | `{{rounded-class}}`           |
| Padding        | `{{p-class}}`                 |

## Inputs / Props

| Input   | Type     | Description                     |
|---------|----------|---------------------------------|
| {{name}} | {{type}} | {{what this input controls}}    |

## States

| State    | Visual change                                      |
|----------|----------------------------------------------------|
| Default  | {{default appearance classes}}                     |
| Hover    | {{hover changes}}                                  |
| Focus    | {{focus ring / outline}}                           |
| Active   | {{active/pressed state, if applicable}}            |
| Disabled | {{disabled appearance, if applicable}}             |

## Rules

> [!warning] Design constraint
> {{Any hard rules specific to this component. Reference [[decisions]] if relevant.}}

## Accessibility

- {{ARIA roles, attributes}}
- {{Keyboard interaction}}
- {{Screen reader considerations}}

## Mobile Adaptation

{{How the component changes below 768px, or "No changes — same layout at all breakpoints."}}

## Angular Tag

\`\`\`html
<app-{{component-name}} [{{input}}]="{{example value}}" />
\`\`\`
```

---

## After creating the spec

1. Add a row in `design-system.md` section **5. Component Library** with the component name, Angular tag, and wikilink to the new spec.
2. Update the `date` in `design-system.md` frontmatter.
3. If the component introduces a new design decision, record it in `09-decisions-log/decisions.md`.
