---
id: style
title: Style
---

All styles are written in jss(cssinjs). each component has it's  own style.js file besides it, except the components that are in the 
pages directory (because the next js knows each file in the pages directory as a route, the styles in that directory are written in components
it self).

Global styles such as theme options and error's style are in src/styles.

Values in the x axis will be transform automatically in the rtl mode.this method implemented by jss-rtl package.


