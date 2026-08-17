const gravador = document.getElementById("btn-gravador");
const statusGravacao = document.getElementById("status-gravacao");
const playerAudio = document.getElementById("player-audio");

let gravando = null;
let audio = [];

// Começar a gravar
function iniciarGravacao(evento) {

    // Evita iniciar novamente se já estiver gravando
    if (gravando) return;

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {

            audio = [];

            gravando = new MediaRecorder(stream);

            gravando.ondataavailable = function (event) {
                if (event.data.size > 0) {
                    audio.push(event.data);
                }
            };

            gravando.onstop = function () {

                const arquivo = new Blob(audio, {
                    type: "audio/webm"
                });

                playerAudio.src = URL.createObjectURL(arquivo);
                playerAudio.style.display = "block";

                statusGravacao.textContent = "Status: Gravação concluída!";

                stream.getTracks().forEach(track => track.stop());

                gravando = null;
            };

            gravando.start();

            statusGravacao.textContent = "Status: Capturando áudio...";
            gravador.style.backgroundColor = "#e74c3c";
            gravador.textContent = "🔴 Gravando... Não solte!";
        })
        .catch(function (erro) {

            console.error("Erro ao acessar o microfone:", erro);

            statusGravacao.textContent =
                "Status: Não foi possível acessar o microfone.";

            gravando = null;
        });
}

// Parar de gravar
function pararGravacao() {

    if (gravando && gravando.state !== "inactive") {
        gravando.stop();

        gravador.style.backgroundColor = "#3498db";
        gravador.textContent = "🎤 Clique e Segure para Gravar";
    }
}

// Quando pressionar o botão
gravador.addEventListener("pointerdown", iniciarGravacao);

// Quando soltar o botão
gravador.addEventListener("pointerup", pararGravacao);

// Caso o dedo/mouse saia do botão enquanto estiver pressionado
gravador.addEventListener("pointerleave", function (evento) {

    if (evento.buttons > 0) {
        pararGravacao();
    }
});