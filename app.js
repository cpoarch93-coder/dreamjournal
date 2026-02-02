const form = document.getElementById('dream-form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const dreamsList = document.getElementById('dreams-list');
const newBtn = document.getElementById('new-dream');
const cancelBtn = document.getElementById('cancel');

let dreams = JSON.parse(localStorage.getItem('dreams')) || [];

function saveDreams() {
  localStorage.setItem('dreams', JSON.stringify(dreams));
}

function renderDreams() {
    // Inside renderDreams(), after creating card:
card.style.animation = 'fadeIn 0.6s ease-out';
  dreamsList.innerHTML = '';
  dreams.forEach((dream, index) => {
    const card = document.createElement('div');
    card.className = 'dream-card';
    card.innerHTML = `
      <h3>${dream.title || 'Untitled Dream'}</h3>
      <div class="date">${new Date(dream.date).toLocaleString()}</div>
      <p>${dream.content.replace(/\n/g, '<br>')}</p>
      ${dream.tags && dream.tags.length ? `<div class="tags">Tags: ${dream.tags.join(', ')}</div>` : ''}
      <button onclick="deleteDream(${index})">Delete</button>
    `;
    dreamsList.appendChild(card);
  });
}

function addDream(e) {
  e.preventDefault();
  const tags = Array.from(document.querySelectorAll('#dream-form input[type="checkbox"]:checked'))
    .map(cb => cb.value);

  const newDream = {
    title: titleInput.value.trim(),
    content: contentInput.value.trim(),
    tags,
    date: new Date().toISOString()
  };

  if (newDream.content) {
    dreams.unshift(newDream); // newest first
    saveDreams();
    renderDreams();
    form.reset();
    form.classList.add('hidden');
  }
}

window.deleteDream = function(index) {
  if (confirm('Delete this dream?')) {
    dreams.splice(index, 1);
    saveDreams();
    renderDreams();
  }
};

newBtn.onclick = () => form.classList.remove('hidden');
cancelBtn.onclick = () => {
  form.classList.add('hidden');
  form.reset();
};
form.onsubmit = addDream;

// Initial render
renderDreams();