document.addEventListener('DOMContentLoaded', () => {
  // Client-side search filter with highlight
  const filter = document.getElementById('filter');
  const rows = document.getElementById('rows');

  const applyFilter = (query, letter) => {
    for (const tr of rows.querySelectorAll('tr')) {
      const nameCell = tr.querySelector('.name');
      const phoneCell = tr.querySelector('.phone');
      const name = nameCell?.textContent.toLowerCase() || '';
      const phone = phoneCell?.textContent.toLowerCase() || '';

      const matchesSearch = !query || name.includes(query) || phone.includes(query);
      const matchesLetter = !letter || name.startsWith(letter.toLowerCase());

      if (matchesSearch && matchesLetter) {
        tr.style.display = '';

        // Highlight matched text
        if (query) {
          const regex = new RegExp(`(${query})`, 'gi');
          nameCell.innerHTML = nameCell.textContent.replace(regex, '<mark>$1</mark>');
          phoneCell.innerHTML = phoneCell.textContent.replace(regex, '<mark>$1</mark>');
        } else {
          // Reset highlight when query is empty
          nameCell.innerHTML = nameCell.textContent;
          phoneCell.innerHTML = phoneCell.textContent;
        }
      } else {
        tr.style.display = 'none';
      }
    }
  };

  let currentLetter = '';
  
  // Search input event
  filter?.addEventListener('input', () => {
    const q = filter.value.toLowerCase();
    applyFilter(q, currentLetter);
  });

  // Letter filter buttons
  document.querySelectorAll('.letter-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLetter = btn.getAttribute('data-letter');
      applyFilter(filter.value.toLowerCase(), currentLetter);
    });
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
