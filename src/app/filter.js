import renderer from './renderer';

export default rowsOnPage => {
  const filterRows = e => {
    e.preventDefault();
    const rows = document.querySelectorAll('.table__row');
    [...rows].forEach(row => {
      row.classList.remove('table__row--filtered', 'table__row--hidden');
    });
    [...rows].forEach(row => {
      const querySearch = document.querySelector('.form__search').value;
      if (
        ![...row.children].some(td =>
          td.textContent.toLowerCase().includes(querySearch.toLowerCase()),
        )
      ) {
        row.classList.add('table__row--filtered');
      }
    });
    renderer(rowsOnPage);
  };

  document.querySelector('.form__submit').addEventListener('click', filterRows);
};
