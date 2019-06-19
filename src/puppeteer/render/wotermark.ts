import { renderElement } from '.';
import { CLASSES } from './styles';

export function renderWotermark(): string {
  return renderElement('div', `@clockify_bot (Telegram)`, {
    class: [CLASSES.TEXT_MUTED, 'p-6'],
    style: {
      backgroundColor: '#eaeaea',
      fontSize: '12px',
      textAlign: 'right'
    }
  });
}
