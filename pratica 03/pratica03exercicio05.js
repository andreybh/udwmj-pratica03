// Função para calcular o volume da esfera
function calcularVolume() {
    // Obter o valor do raio do input
    const raioInput = document.getElementById('raio');
    const resultadoElement = document.getElementById('volume-resultado');
    const resultadoContainer = document.getElementById('resultado');
    
    // Validar se o campo foi preenchido
    if (raioInput.value === '' || raioInput.value === null) {
        resultadoElement.textContent = 'Por favor, digite um valor para o raio.';
        resultadoElement.style.color = '#e74c3c';
        return;
    }
    
    // Converter o valor para número
    const raio = parseFloat(raioInput.value);
    
    // Validar se o raio é um número válido e positivo
    if (isNaN(raio) || raio <= 0) {
        resultadoElement.textContent = 'Por favor, digite um valor válido e positivo para o raio.';
        resultadoElement.style.color = '#e74c3c';
        return;
    }
    
    // Calcular o volume usando a fórmula: V = 4/3 * π * r³
    const volume = (4 / 3) * Math.PI * Math.pow(raio, 3);
    
    // Exibir o resultado formatado
    resultadoElement.innerHTML = `
        <strong>Volume da esfera:</strong><br>
        ${volume.toFixed(4)} unidades cúbicas<br>
        <small>(Raio: ${raio} unidades)</small>
    `;
    resultadoElement.style.color = '#27ae60';
    
    // Adicionar animação ao resultado
    resultadoContainer.classList.add('show');
    
    // Remover a classe de animação após a animação terminar
    setTimeout(() => {
        resultadoContainer.classList.remove('show');
    }, 500);
}

// Adicionar evento para calcular quando pressionar Enter no campo de input
document.addEventListener('DOMContentLoaded', function() {
    const raioInput = document.getElementById('raio');
    
    raioInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calcularVolume();
        }
    });
    
    // Limpar mensagens de erro quando o usuário começar a digitar
    raioInput.addEventListener('input', function() {
        const resultadoElement = document.getElementById('volume-resultado');
        if (resultadoElement.style.color === 'rgb(231, 76, 60)') { // cor de erro
            resultadoElement.textContent = 'Digite um raio para calcular o volume';
            resultadoElement.style.color = '#555';
        }
    });
});

// Função auxiliar para demonstrar o cálculo passo a passo (opcional)
function mostrarCalculoDetalhado(raio) {
    console.log('=== Cálculo do Volume da Esfera ===');
    console.log(`Raio (r): ${raio}`);
    console.log(`Fórmula: V = 4/3 × π × r³`);
    console.log(`Substituindo: V = 4/3 × ${Math.PI.toFixed(6)} × ${raio}³`);
    console.log(`V = 4/3 × ${Math.PI.toFixed(6)} × ${Math.pow(raio, 3).toFixed(6)}`);
    console.log(`V = ${((4/3) * Math.PI * Math.pow(raio, 3)).toFixed(6)} unidades cúbicas`);
    console.log('=====================================');
}

