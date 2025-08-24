const estacionamentos = [
  'Estacionamento 1', 'Estacionamento 2', 'Estacionamento 3', 'Estacionamento 4',
  'Estacionamento 5', 'Estacionamento 6', 'Estacionamento 7', 'Estacionamento 8'
];

const lista = document.getElementById('lista-estacionamentos');
const selectDia = document.getElementById('dia');

async function carregarReservasDoServidor(diaSelecionado) {
  try {
    const response = await fetch('http://localhost:3000/reservas');
    const reservas = await response.json();
    // Filtra só as reservas do dia selecionado
    return reservas.filter(r => r.Dia === diaSelecionado);
  } catch (error) {
    console.error('Erro ao carregar reservas:', error);
    return [];
  }
}

async function gerarInterface(diaSelecionado) {
  lista.innerHTML = '';

  const reservasDoDia = await carregarReservasDoServidor(diaSelecionado);

  estacionamentos.forEach(estacionamento => {
    const linha = document.createElement('div');
    linha.className = 'estacionamento';

    const nomeDiv = document.createElement('div');
    nomeDiv.className = 'nome-estacionamento';
    nomeDiv.textContent = estacionamento;

    const horariosDiv = document.createElement('div');
    horariosDiv.className = 'horarios';

    for (let hora = 0; hora < 24; hora++) {
      const horaStr = `${hora.toString().padStart(2, '0')}:00`;

      const botao = document.createElement('button');
      botao.className = 'botao-reservar';
      botao.textContent = horaStr;

      // Adiciona os data-atributos para o fetch funcionar
      botao.setAttribute('data-dia', diaSelecionado);
      botao.setAttribute('data-horario', horaStr);
      botao.setAttribute('data-estacionamento', estacionamento);

      // Verifica se já existe reserva para esse horário
      const reservado = reservasDoDia.find(r => 
        r.Dia === diaSelecionado && 
        r.Horario === horaStr && 
        r.Estacionamento === estacionamento);

      if (reservado) {
        botao.disabled = true;
        botao.textContent = `Reservado por ${reservado.Nome}`;
      }

      horariosDiv.appendChild(botao);
    }

    linha.appendChild(nomeDiv);
    linha.appendChild(horariosDiv);
    lista.appendChild(linha);
  });

  // Agora que os botões existem, adiciona o evento de clique para reservar
  const botoes = document.querySelectorAll('.botao-reservar');
  botoes.forEach(botao => {
    botao.addEventListener('click', async () => {
      const nome = prompt('Digite seu nome para reservar:');
      if (!nome) return alert('Nome obrigatório.');

      const dia = botao.getAttribute('data-dia');
      const horario = botao.getAttribute('data-horario');
      const estacionamento = botao.getAttribute('data-estacionamento');

      try {
        const resposta = await fetch('http://localhost:3000/reservas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, dia, horario, estacionamento })
        });

        if (resposta.ok) {
          alert('Reserva feita com sucesso!');
          gerarInterface(diaSelecionado); // Recarrega a interface para atualizar os horários
        } else {
          const erro = await resposta.json();
          alert(erro.error || 'Erro ao reservar.');
        }
      } catch (e) {
        alert('Erro ao conectar com o servidor.');
        console.error(e);
      }
    });
  });
}

// Inicializa
document.addEventListener('DOMContentLoaded', () => {
  const selectDia = document.getElementById('dia');
  gerarInterface(selectDia.value);

  selectDia.addEventListener('change', () => {
    gerarInterface(selectDia.value);
  });
});
