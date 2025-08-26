document.getElementById('agendamentoForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const horario = document.getElementById('horario').value;

  if (nome && horario) {
    const lista = document.getElementById('listaAgendamentos');

    const item = document.createElement('li');
    item.innerHTML = `${nome} - ${horario} <button class="cancelar">Cancelar</button>`;

    item.querySelector('.cancelar').addEventListener('click', function() {
      lista.removeChild(item);
    });

    lista.appendChild(item);

    // Limpa os campos
    document.getElementById('nome').value = '';
    document.getElementById('horario').value = '';
  }
});
