// increase this amount the more files there are
const TOTAL_FILES = 3;

$(() => {
  const favTable = document.querySelector('#fav-table');

  for (let i = 1, i <= TOTAL_FILES; i++) {
    $.getJSON(`./saved-${i}.json`, (data) => {
      data.forEach(favObj => {
        const { icon, title, content, footer } = favObj;
        const imgColContent = `<a href='${icon.url}'><img src='${icon.src}' /></a>`;
        const textColContent = `<a href='${icon.url}'><div class='title'>${title}</div></a><br />${content}<a href='${footer.link}'><div class='comments'>${footer.type == 'C' ? 'comments' : 'context'}</div></a>`;

        const favRow = document.createElement('tr');
        const imgCol = document.createElement('td');
        const textCol = document.createElement('td');

        imgCol.classList.add('topped');

        imgCol.appendChild(document.createRange().createContextualFragment(imgColContent));
        textCol.appendChild(document.createRange().createContextualFragment(textColContent));

        favRow.appendChild(imgCol);
        favRow.appendChild(textCol);
        favTable.appendChild(favRow);
      });
    });
  }
});
