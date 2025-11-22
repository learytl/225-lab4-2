document.addEventListener('DOMContentLoaded', () => {
  // Client-side filter with highlight
  const filter = document.getElementById('filter');
  const rows = document.getElementById('rows');

  filter?.addEventListener('input', () => {
    const q = filter.value.toLowerCase();

    for (const tr of rows.querySelectorAll('tr')) {
      const nameCell = tr.querySelector('.name');
      const phoneCell = tr.querySelector('.phone');
      const name = nameCell?.textContent.toLowerCase() || '';
      const phone = phoneCell?.textContent.toLowerCase() || '';

      if (name.includes(q) || phone.includes(q)) {
        tr.style.display = '';

        // Highlight matched text
        if (q) {
          nameCell.innerHTML = nameCell.textContent.replace(
            new RegExp(`(${q})`, 'gi'),
            '<mark>$1</mark>'
          );
          phoneCell.innerHTML = phoneCell.textContent.replace(
            new RegExp(`(${q})`, 'gi'),
            '<mark>$1</mark>'
          );
        } else {
          // Reset highlight when query is empty
          nameCell.innerHTML = nameCell.textContent;
          phoneCell.innerHTML = phoneCell.textContent;
        }
      } else {
        tr.style.display = 'none';
      }
    }
  });

  // Edit modal populate
  const editModal = document.getElementById('editModal');
  editModal?.addEventListener('show.bs.modal', (ev) => {
    const btn = ev.relatedTarget;
    document.getElementById('edit-id').value    = btn.getAttribute('data-id');
    document.getElementById('edit-name').value  = btn.getAttribute('data-name');
    document.getElementById('edit-phone').value = btn.getAttribute('data-phone');
  });
});
