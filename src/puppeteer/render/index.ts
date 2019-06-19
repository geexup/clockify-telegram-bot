import { IRenderElement } from './element';
import { getClass, getStyles, stylesToString } from './styles';

export function renderElement(tag: string, content: string | Array<string>, element?: IRenderElement) {
  const styles = element ? getStyles(element) : {};
  const classes = element ? getClass(element) : [];

  const styleArgument =  `style="${stylesToString(styles)}"`;
  const classArgument = `class="${classes.join(' ')}"`;

  return `
    <${tag} ${styleArgument} ${classArgument}>
      ${content instanceof Array ? content.join('') : content}
    </${tag}>`;
}
