/**
 * Função para calcular a área de um círculo
 * Fórmula: área = π * (raio)²
 * Usando Math.PI conforme solicitado
 */
function calcularArea() {
    // Obter o elemento de entrada do raio
    const inputRaio = document.getElementById('raio');
    const elementoResultado = document.getElementById('resultado');
    
    // Obter o valor do raio
    const raio = parseFloat(inputRaio.value);
    
    // Validar se o valor é válido
    if (isNaN(raio) || raio < 0) {
        elementoResultado.className = 'resultado erro';
        elementoResultado.innerHTML = '<p>Por favor, digite um valor válido para o raio (número positivo).</p>';
        return;
    }
    
    if (raio === 0) {
        elementoResultado.className = 'resultado sucesso';
        elementoResultado.innerHTML = '<p>A área do círculo é: <strong>0</strong></p>';
        return;
    }
    
    // Calcular a área usando a fórmula: área = π * (raio)²
    const area = Math.PI * Math.pow(raio, 2);
    
    // Exibir o resultado formatado
    elementoResultado.className = 'resultado sucesso';
    elementoResultado.innerHTML = `
        <p>
            <strong>Raio:</strong> ${raio}<br>
            <strong>Área do círculo:</strong> ${area.toFixed(4)}<br>
            <small>(π ≈ ${Math.PI.toFixed(6)})</small>
        </p>
    `;
}

/**
 * Função para permitir cálculo ao pressionar Enter
 */
function configurarEventos() {
    const inputRaio = document.getElementById('raio');
    
    // Adicionar evento para calcular ao pressionar Enter
    inputRaio.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calcularArea();
        }
    });
    
    // Limpar resultado quando o usuário começar a digitar novamente
    inputRaio.addEventListener('input', function() {
        const elementoResultado = document.getElementById('resultado');
        elementoResultado.className = 'resultado';
        elementoResultado.innerHTML = '<p>A área será exibida aqui</p>';
    });
}

// Configurar eventos quando a página carregar
document.addEventListener('DOMContentLoaded', configurarEventos);

