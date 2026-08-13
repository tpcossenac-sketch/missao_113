const gravador = document.getElementById('btn-gravador');
const statusGravacao = document.getElementById('status-gravacao');

// Função para iniciar a gravação
function iniciarGravacao() {

    gravador.textContent = '🔴 Gravando... Não solte!';
    statusGravacao.textContent = 'Status: Capturando áudio...';
    gravador.style.backgroundColor = '#e74c3c';

}

// Função para parar a gravação
function pararGravacao() {

    gravador.textContent = '🎤 Clique e Segure para Gravar';
    statusGravacao.textContent = 'Status: Gravação concluída e enviada!';
    gravador.style.backgroundColor = '#3498db';

}

// Captura evento de pressionar o botão do gravador
gravador.addEventListener('mousedown', iniciarGravacao); 
gravador.addEventListener('mouseup', pararGravacao);