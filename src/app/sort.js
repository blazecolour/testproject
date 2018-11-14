import renderer from './renderer';

export default rowsOnPage => {
  const headers = [...document.querySelectorAll('.table__cell-header')];
  headers.forEach(header => header.addEventListener('click', sortRows));
  const compareDates = (a, b) => new Date(a) - new Date(b);
  const compareWords = (a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1);
  const compareNumbers = (a, b) => Number(a) - Number(b);
  const compareSalary = (a, b) =>
    +a.replace(/[$,]/g, '') - +b.replace(/[$,]/g, '');
  const compareByType = {
    name: compareWords,
    position: compareWords,
    office: compareWords,
    age: compareNumbers,
    date: compareDates,
    salary: compareSalary,
  };
  function sortRows(e) {
    const cellType = e.target.dataset.type;
    const cellIndex = headers.findIndex(th => th.dataset.type === cellType);
    const compare = (row1, row2) =>
      compareByType[cellType](
        row1.cells[cellIndex].innerHTML,
        row2.cells[cellIndex].innerHTML,
      );

    const rows = [...document.querySelectorAll('.table__row')];
    const header = headers[cellIndex];
    let sortedRows;

    [...document.querySelectorAll('.arrow__up, .arrow__down')].forEach(
      element => element.classList.remove('arrow--inactive'),
    );

    const arrowUp = header.getElementsByClassName('arrow__up')[0];
    const arrowDown = header.getElementsByClassName('arrow__down')[0];
    if (header.classList.contains('sort-asc')) {
      arrowUp.classList.add('arrow--inactive');
      arrowDown.classList.remove('arrow--inactive');
      sortedRows = rows.sort(compare).reverse();
      header.classList.remove('sort-asc');
      header.classList.add('sort-desc');
    } else if (header.classList.contains('sort-desc')) {
      arrowDown.classList.add('arrow--inactive');
      arrowUp.classList.remove('arrow--inactive');
      sortedRows = rows.sort(compare);
      header.classList.remove('sort-desc');
      header.classList.add('sort-asc');
    } else {
      arrowDown.classList.add('arrow--inactive');
      arrowUp.classList.remove('arrow--inactive');
      sortedRows = rows.sort(compare);
      header.classList.add('sort-asc');
    }

    const tbody = document.querySelector('.table__tbody');
    tbody.innerHTML = '';
    sortedRows.forEach(row => {
      row.classList.remove('table__row--hidden');
      tbody.appendChild(row);
    });
    renderer(rowsOnPage);
  }
};
