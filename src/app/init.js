export default data => {
  const tablebody = document.querySelector('.table__tbody');
  data.forEach(person => {
    const row = `<tr class="table__row">${Object.keys(person)
      .map(key => `<td class="table__cell-tbody" >${person[key]}</td>`)
      .join('')}</tr>`;
    tablebody.innerHTML += row;
  });
};
