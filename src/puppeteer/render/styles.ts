import { IRenderElement, IRenderElementStyles } from './element';
import { camelCaseDashes } from './utils/camel-case-dash';

export enum CLASSES {
  TEXT_MUTED = 'text-muted'
}

export const PRIMARY_COLOR = '#01a9f4ad';
export const SECONDARY_COLOR = '#5ba1cc';
export const GLOBAL_STYLES = `
body {
  display: table;
  margin: 0;
  font-family: sans-serif;
}

.p-6 { padding: 6px; }
.p-8 { padding: 8px; }
.p-16 { padding: 8px; }

.${CLASSES.TEXT_MUTED} {
  color: gray;
}
`;

export function addClass(elem: IRenderElement, cls: string) {
  if (!elem.class) elem.class = [];
  elem.class.push(cls);
}

export function getClass(element: IRenderElement) {
  return element.class ? [...element.class] : [];
}

export function getStyles(element: IRenderElement): IRenderElementStyles {
  return element.style ? Object.assign({}, element.style) : {};
}

export function stylesToString(styles: IRenderElementStyles): string {
  const styleElements: Array<string> = [];
  Object.keys(styles).forEach(
    (styleName) => styleElements.push(`${camelCaseDashes(styleName)}:${styles[styleName]};`)
  );

  return `${styleElements.join('')}`;
}
