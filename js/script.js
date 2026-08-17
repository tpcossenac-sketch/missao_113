const gravador = document.getElementById("btn-gravador");
const statusGravacao = document.getElementById("status-gravacao");
const playerAudio = document.getElementById("player-audio");

let gravando = null;
let audio = [];
let streamAtual = null;

// Escolhe automaticamente um formato compatível
function escolherFormato() {

    const formatos = [
        "audio/mp4",
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/ogg;codecs=opus"
    ];

    for (const formato of formatos) {
        if (MediaRecorder.isTypeSupported(formato)) {
            return formato;
        }
    }

    return "";
}

// Começar a gravar
function iniciarGravacao() {

    if (gravando) return;

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {

            streamAtual = stream;
            audio = [];

            const formato = escolherFormato();

            console.log("Formato utilizado:", formato);

            if (formato) {
                gravando = new MediaRecorder(stream, {
                    mimeType: formato
                });
            } else {
                gravando = new MediaRecorder(stream);
            }

            gravando.ondataavailable = function (event) {

                if (event.data && event.data.size > 0) {
                    audio.push(event.data);
                }

            };

            gravando.onstop = function () {

                const tipoAudio = gravando.mimeType || "audio/mp4";

                const arquivo = new Blob(audio, {
                    type: tipoAudio
                });

                const urlAudio = URL.createObjectURL(arquivo);

                playerAudio.src = urlAudio;
                playerAudio.style.display = "block";

                statusGravacao.textContent =
                    "Status: Gravação concluída!";

                if (streamAtual) {

                    streamAtual.getTracks().forEach(function (track) {
                        track.stop();
                    });

                    streamAtual = null;
                }

                gravando = null;
                audio = [];
            };

            gravando.start();

            statusGravacao.textContent =
                "Status: Capturando áudio...";

            gravador.style.backgroundColor = "#e74c3c";
            gravador.textContent =
                "🔴 Gravando... Não solte!";
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

        gravador.textContent =
            "🎤 Clique e Segure para Gravar";
    }
}


// Pressionar o botão
gravador.addEventListener("pointerdown", function () {
    iniciarGravacao();
});


// Soltar o botão
gravador.addEventListener("pointerup", function () {
    pararGravacao();
});


// Caso o dedo/mouse saia do botão
gravador.addEventListener("pointerleave", function (evento) {

    if (evento.buttons > 0) {
        pararGravacao();
    }

});
