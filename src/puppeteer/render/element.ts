import { CLASSES } from './styles';

export interface IRenderElementStyles {
  [stypeName: string]: string;
}

export interface IRenderElement {
  style?: IRenderElementStyles;
  class?: Array<CLASSES | string>;
}
