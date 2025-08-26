const form = document.getElementById('agendamentoForm');
const calcularBtn = document.getElementById('calcularBtn');
const confirmarPagamentoBtn = document.getElementById('confirmarPagamentoBtn');
const valorFinalEl = document.getElementById('valorFinal');
const lista = document.getElementById('listaAgendamentos');

let valorCalculado = 0;

calcularBtn.addEventListener('click', () => {
    const entrada = document.getElementById('entrada').value;
    const saida = document.getElementById('saida').value;

    if (!entrada || !saida) {
        alert("Preencha os horários para calcular.");
        return;
    }

    if (entrada >= saida) {
        alert("Horário de entrada deve ser antes do de saída.");
        return;
    }

    const horaEntrada = new Date(`1970-01-01T${entrada}:00`);
    const horaSaida = new Date(`1970-01-01T${saida}:00`);
    const diffMs = horaSaida - horaEntrada;
    const horas = diffMs / (1000 * 60 * 60);

    valorCalculado = Math.ceil(horas * 1.5); // R$1,50 por hora, arredondado para cima
    valorFinalEl.textContent = `Valor a pagar: R$ ${valorCalculado.toFixed(2).replace('.', ',')}`;
    confirmarPagamentoBtn.disabled = false;
});

confirmarPagamentoBtn.addEventListener('click', () => {
    const nome = document.getElementById('nome').value.trim();
    const serie = document.getElementById('serie').value.trim();
    const data = document.getElementById('data').value;
    const entrada = document.getElementById('entrada').value;
    const saida = document.getElementById('saida').value;

    if (!nome || !serie || !data || !entrada || !saida || valorCalculado === 0) {
        alert("Preencha os dados e calcule o valor antes de confirmar.");
        return;
    }

    // Adiciona o agendamento à lista
    const item = document.createElement('li');
    item.innerHTML = `
        <strong>${nome}</strong> - Série: ${serie}<br>
        Data: ${data} | Entrada: ${entrada} | Saída: ${saida}<br>
        <strong>Valor pago: R$ ${valorCalculado.toFixed(2).replace('.', ',')}</strong>
    `;
    lista.appendChild(item);

    // Resetar formulário e variáveis
    form.reset();
    valorFinalEl.textContent = `Valor a pagar: R$ 0,00`;
    confirmarPagamentoBtn.disabled = true;
    valorCalculado = 0;
});
