import { renderElement } from './render';
import { IRenderElement } from './render/element';
import { addClass, GLOBAL_STYLES } from './render/styles';

interface IAlignElement {
  align?: 'center' | 'left' | 'right';
}

interface ITableCell extends IRenderElement, IAlignElement {
  value: string;
}

interface ITableColumn extends IRenderElement, IAlignElement {
  title: string;
  main?: boolean;
}

export interface ITableRow {
  cells: Array<ITableCell>;
}

export interface ITable {
  columns: Array<ITableColumn>;
  rows: Array<ITableRow>;
}

const TABLE_STYLE = `
${GLOBAL_STYLES}

.align-center { text-align: center; }
.align-left { text-align: left; }
.align-right { text-align: right; }

.main {
  background-color: #5ba1cc !important;
  color: white;
  white-space: nowrap;
}

table { width: 100%; border-spacing: 0; }
th, td { padding: 15px; }
th {
  text-align: right;
  width: 1%;
  background-color: #01a9f4ad;
  color: white;
}
td { text-align: right; }

th, td {
  border-bottom: 1px solid #70c5f8;
  border-right: 1px solid #70c5f8;
}

td:last-child, th:last-child {
  border-right: none;
}

tr:last-child > td {
  border-bottom: none;
}
tr:last-child > th {
  border-bottom: none;
}
`;

export function generateTableHeader(column: ITableColumn) {
  if (column.align) addClass(column, 'align-' + column.align);

  return renderElement('th', column.title, column);
}

function generateTableCell(cell: ITableCell) {
  if (cell.align) addClass(cell, 'align-' + cell.align);

  return renderElement('td', cell.value, cell);
}

export function generateTableHtml(table: ITable) {
  const content: Array<string> = [];

  if (table.columns.length) {
    const columnContent = table.columns.map((column, index) => {
      if (column.main) {
        addClass(column, 'main');
        table.rows.forEach((row) => addClass(row.cells[index], 'main'));
      }

      return generateTableHeader(column);
    });

    content.push(renderElement('tr', columnContent, { class: ['timetable_header']}));
  }

  table.rows.forEach((row) =>
    content.push(
      renderElement('tr', row.cells.map(generateTableCell))
    )
  );

  return tableWarp(content);
}

export function generateVerticalHtml(table: ITable) {
  const content: Array<string> = [];

  for (let index = 0; index < table.columns.length; index++) {
    const columnContent = [];
    const column = table.columns[index];
    addClass(column, 'timetable_header');

    if (column.main) addClass(column, 'main');
    columnContent.push(generateTableHeader(column));
    columnContent.push(
      ...table.rows
        .map((row) => row.cells[index])
        .map((item) => {
          if (column.main) addClass(item, 'main');
          return item;
        })
        .map(generateTableCell)
    );

    content.push(renderElement('tr', columnContent, column));
  }

  return tableWarp(content);
}

export function tableWarp(content: Array<string>): string {
  const styleTag = renderElement('style', TABLE_STYLE);
  const tableTag = renderElement('table', content, { class: ['timetable']});

  return styleTag + tableTag;
}
