import init from './init';
import renderer from './renderer';
import filterTable from './filter';
import sortTable from './sort';

import data from './data';

const rowsOnPage = 10;

export default () => {
  init(data);
  renderer(rowsOnPage);
  filterTable(rowsOnPage);
  sortTable(rowsOnPage);
};
