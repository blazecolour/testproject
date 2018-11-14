export default rowsOnPage => {
  const rows = document.querySelectorAll('.table__row');
  const paginator = document.querySelector('.pagination');

  const pagesCount = Math.ceil(
    [...rows].filter(row => !row.classList.contains('table__row--filtered'))
      .length / rowsOnPage,
  );

  paginator.innerHTML = '';
  for (let i = 1; i <= pagesCount; i += 1) {
    paginator.innerHTML += `<a class="pagination__link" id="${i}">${i}</a>`;
  }
  paginator.children[0].classList.add('pagination__link--active');
  paginator.innerHTML = `<a class="pagination__link pagination__link--disabled prevButton">Previous</a>${
    paginator.innerHTML
  }<a class="pagination__link nextButton">Next</a>`;

  [...rows]
    .filter(row => !row.classList.contains('table__row--filtered'))
    .slice(rowsOnPage)
    .forEach(row => row.classList.add('table__row--hidden'));

  let currentPage = 1;

  const refreshPage = targetPage => {
    currentPage = targetPage;
    const activeRows = [...rows].filter(
      row => !row.classList.contains('table__row--filtered'),
    );
    const activeRowsNumber = activeRows.length;
    const nextButton = document.querySelector('.nextButton');
    if (currentPage >= activeRowsNumber / rowsOnPage) {
      nextButton.classList.add('pagination__link--disabled');
    } else {
      nextButton.classList.remove('pagination__link--disabled');
    }

    const prevButton = document.querySelector('.prevButton');
    if (currentPage == 1) {
      prevButton.classList.add('pagination__link--disabled');
    } else {
      prevButton.classList.remove('pagination__link--disabled');
    }

    [...rows].forEach(row => row.classList.add('table__row--hidden'));
    const maxIndex =
      targetPage * rowsOnPage > activeRowsNumber
        ? activeRowsNumber - 1
        : targetPage * rowsOnPage - 1;

    for (
      let rowIndex = (targetPage - 1) * rowsOnPage;
      rowIndex <= maxIndex;
      rowIndex += 1
    ) {
      activeRows[rowIndex].classList.remove('table__row--hidden');
    }
    currentPage = targetPage;
    document
      .querySelector('.pagination__link--active')
      .classList.remove('pagination__link--active');
    document
      .getElementById(targetPage)
      .classList.add('pagination__link--active');
  };

  document
    .querySelector('.nextButton')
    .addEventListener('click', () => refreshPage(currentPage + 1));

  document
    .querySelector('.prevButton')
    .addEventListener('click', () => refreshPage(currentPage - 1));

  const buttons = [...document.querySelector('.pagination').children];
  const numButtons = buttons.slice(1, -1);
  numButtons.forEach(numButton =>
    numButton.addEventListener('click', () =>
      refreshPage(parseInt(numButton.id)),
    ),
  );
};
