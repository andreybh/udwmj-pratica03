// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário
    const form = document.getElementById('jurosForm');
    const capitalInput = document.getElementById('capital');
    const taxaInput = document.getElementById('taxa');
    const tempoInput = document.getElementById('tempo');
    const limparBtn = document.getElementById('limpar');
    
    // Elementos de resultado
    const capitalResultado = document.getElementById('capitalResultado');
    const jurosResultado = document.getElementById('jurosResultado');
    const montanteResultado = document.getElementById('montanteResultado');
    const resultadoDiv = document.getElementById('resultado');
    
    // Função para formatar valores monetários
    function formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }
    
    // Função para validar entrada numérica
    function validarEntrada(valor, nome, minimo = 0) {
        if (isNaN(valor) || valor === '') {
            throw new Error(`${nome} deve ser um número válido.`);
        }
        
        if (valor < minimo) {
            throw new Error(`${nome} deve ser maior que ${minimo}.`);
        }
        
        return true;
    }
    
    // Função principal para calcular juros compostos
    function calcularJurosCompostos(capital, taxa, tempo) {
        try {
            // Validações
            validarEntrada(capital, 'Capital inicial', 0.01);
            validarEntrada(taxa, 'Taxa de juros', 0);
            validarEntrada(tempo, 'Tempo', 1);
            
            // Conversão da taxa de porcentagem para decimal
            const taxaDecimal = taxa / 100;
            
            // Aplicação da fórmula: M = C * (1 + i)^t
            const montante = capital * Math.pow(1 + taxaDecimal, tempo);
            
            // Cálculo dos juros acumulados
            const juros = montante - capital;
            
            return {
                capital: capital,
                juros: juros,
                montante: montante,
                sucesso: true
            };
            
        } catch (error) {
            return {
                erro: error.message,
                sucesso: false
            };
        }
    }
    
    // Função para exibir resultados
    function exibirResultados(resultado) {
        if (resultado.sucesso) {
            capitalResultado.textContent = formatarMoeda(resultado.capital);
            jurosResultado.textContent = formatarMoeda(resultado.juros);
            montanteResultado.textContent = formatarMoeda(resultado.montante);
            
            // Adiciona animação de destaque
            resultadoDiv.style.transform = 'scale(1.02)';
            setTimeout(() => {
                resultadoDiv.style.transform = 'scale(1)';
            }, 200);
            
        } else {
            alert('Erro no cálculo: ' + resultado.erro);
        }
    }
    
    // Função para limpar formulário e resultados
    function limparFormulario() {
        // Limpa os campos de entrada
        capitalInput.value = '';
        taxaInput.value = '';
        tempoInput.value = '';
        
        // Reseta os resultados
        capitalResultado.textContent = 'R$ 0,00';
        jurosResultado.textContent = 'R$ 0,00';
        montanteResultado.textContent = 'R$ 0,00';
        
        // Foca no primeiro campo
        capitalInput.focus();
    }
    
    // Função para adicionar máscara de entrada nos campos numéricos
    function adicionarMascaras() {
        // Permite apenas números e vírgula/ponto decimal
        [capitalInput, taxaInput].forEach(input => {
            input.addEventListener('input', function(e) {
                let valor = e.target.value;
                // Remove caracteres não numéricos exceto ponto e vírgula
                valor = valor.replace(/[^0-9.,]/g, '');
                // Substitui vírgula por ponto para cálculos
                valor = valor.replace(',', '.');
                e.target.value = valor;
            });
        });
        
        // Campo de tempo aceita apenas números inteiros
        tempoInput.addEventListener('input', function(e) {
            let valor = e.target.value;
            valor = valor.replace(/[^0-9]/g, '');
            e.target.value = valor;
        });
    }
    
    // Event listener para o formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtém os valores dos campos
        const capital = parseFloat(capitalInput.value.replace(',', '.'));
        const taxa = parseFloat(taxaInput.value.replace(',', '.'));
        const tempo = parseInt(tempoInput.value);
        
        // Calcula e exibe os resultados
        const resultado = calcularJurosCompostos(capital, taxa, tempo);
        exibirResultados(resultado);
    });
    
    // Event listener para o botão limpar
    limparBtn.addEventListener('click', limparFormulario);
    
    // Event listener para tecla Enter nos campos
    [capitalInput, taxaInput, tempoInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                form.dispatchEvent(new Event('submit'));
            }
        });
    });
    
    // Inicialização
    adicionarMascaras();
    capitalInput.focus();
    
    // Função de demonstração (opcional)
    function exemploCalculo() {
        capitalInput.value = '1000';
        taxaInput.value = '5';
        tempoInput.value = '12';
        
        const resultado = calcularJurosCompostos(1000, 5, 12);
        exibirResultados(resultado);
    }
    
    // Adiciona dica de exemplo no console
    console.log('Calculadora de Juros Compostos carregada!');
    console.log('Exemplo: Capital R$ 1.000, Taxa 5% ao mês, Tempo 12 meses');
    console.log('Para testar automaticamente, execute: exemploCalculo()');
    
    // Torna a função de exemplo disponível globalmente para testes
    window.exemploCalculo = exemploCalculo;
});

