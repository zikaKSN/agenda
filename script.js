document.getElementById('agendamentoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const serie = document.getElementById('serie').value.trim();
    const data = document.getElementById('data').value;
    const entrada = document.getElementById('entrada').value;
    const saida = document.getElementById('saida').value;

    // Validação simples
    if (!nome || !serie || !data || !entrada || !saida) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (entrada >= saida) {
        alert("Horário de entrada deve ser antes do horário de saída.");
        return;
    }

    const lista = document.getElementById('listaAgendamentos');

    const item = document.createElement('li');
    item.innerHTML = `
        <strong>${nome}</strong> - Série: ${serie}<br>
        Data: ${data} | Entrada: ${entrada} | Saída: ${saida}
    `;

    lista.appendChild(item);

    // Limpar formulário
    document.getElementById('agendamentoForm').reset();
});
