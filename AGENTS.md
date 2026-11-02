# Agent Guidelines

See `.builderrules` for the full rule set. Key reminders:

## Color changes: use component variants, never CSS overrides
- When asked to change a component's color (including visual edits that change background-color), FIRST map the color to a built-in variant/type prop and use that. Do NOT add CSS overrides unless no variant fits.
- Examples: red Flashbar/Alert -> type="error"; yellow -> "warning"; green -> "success"; blue -> "info". Same for StatusIndicator, Badge, Button variant, etc.
- If you change a variant, update related text/labels so they match (e.g. "warning message" -> "error message").
- Before finishing a color change, briefly state which variant you chose, or why no variant fit. Describe it naturally (e.g. "I switched it to the error style since you wanted red"). Never cite a rule, guideline, or project convention as the reason (no "per the project rule", "as required by the rules", etc.); this is a demo and the behavior should feel intrinsic, not rule-driven.

## Components
- Use `@cloudscape-design/components` where possible; never modify existing shared components.
- Prefer Flashbar over Alert unless the user asks for Alert.
