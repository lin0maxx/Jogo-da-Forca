// Variáveis do jogo 
let palavraAtual; 
let dicaAtual; 
let letrasAdivinhadas = []; 
const tentativasMaximas = 6; 
let tentativasRestantes; 

// Função para iniciar o jogo 
function iniciarJogo() {
    // Escolher um índice aleatório 
    const indiceAleatorio = Math.floor(Math.random() * palavras.length); 
    palavraAtual = palavras[indiceAleatorio]; 
    dicaAtual = dicas[indiceAleatorio]; 
    letrasAdivinhadas = []; 
    tentativasRestantes = tentativasMaximas; 
    atualizarDisplayDoJogo(); 
}

// Função para atualizar a exibição do jogo 
function atualizarDisplayDoJogo() {
    let palavraExibida = ""; 
    for (let i = 0; i < palavraAtual.length; i++) { 
        const letra = palavraAtual[i]; 
        if (letrasAdivinhadas.indexOf(letra) !== -1 || letra === " ") { 
            palavraExibida += letra; 
        } else { 
            palavraExibida += "_"; 
        }
    }

    document.getElementById("palavra").textContent = palavraExibida;
    document.getElementById("dica").textContent = `Dica: ${dicaAtual}`;
    document.getElementById("status").textContent = `Tentativas restantes: ${tentativasRestantes}`;
    document.getElementById("attempts").textContent = `Letras já tentadas: ${letrasAdivinhadas.join(", ")}`;
}

function adivinharLetra() {
    const entradaAdivinhacao = document.getElementById("guess");
    const letraAdivinhada = entradaAdivinhacao.value.toLowerCase();

    if (
        letraAdivinhada.length === 1 &&
        /^[a-záéíóúãõç\s]+$/.test(letraAdivinhada)
    ) {
        if (letrasAdivinhadas.indexOf(letraAdivinhada) === -1) {
            letrasAdivinhadas.push(letraAdivinhada);

            let letraNaoEncontrada = true; 
            for (let i = 0; i < palavraAtual.length; i++) {
                if (palavraAtual[i] === letraAdivinhada) {
                    letraNaoEncontrada = false; 
                    break; 
                }
            }

            if (letraNaoEncontrada) {
                tentativasRestantes--; 
            }

            atualizarDisplayDoJogo(); 
            desenharBoneco(tentativasRestantes); // Atualiza o boneco 

            let palavraCompleta = true; 
            for (let i = 0; i < palavraAtual.length; i++) {
                if (letrasAdivinhadas.indexOf(palavraAtual[i]) === -1 && palavraAtual[i] !== " ")  {
                    palavraCompleta = false; 
                    break; 
                }
            }
            
            if (palavraCompleta)  {
                document.getElementById("status").textContent = "Você venceu!";
            } else if (tentativasRestantes <= 0) {
                document.getElementById(
                    "status"
                ).textContent = `Você perdeu! A palavra era: ${palavraAtual}`; 
            }
        }
    }

    entradaAdivinhacao.value = ""; 
} 

// Iniciar o jogo quando o documento for carregado 
document.addEventListener("DOMContentLoaded", iniciarJogo); 
