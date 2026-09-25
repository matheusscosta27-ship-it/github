/* pega o botao "buscar cep" do HTML pelo ID */
const botao = document.getElementById("btnBuscar");

/* pega  a area onde o resultado da consulta sera exibido */
const resultado = document.getElementById("resultado");

/* quando o usuario clucar no botão,
a função buscarCep sera executada */
botao.addEventListener("click", buscarCep);

/* função responsavel por consultar o cep */
async function buscarCep() {
    
    /*pega o cep digitado pelo usuario
    replace(/\D/g, "") remove tudo que nao for numero  */

const cep = document
    .getElementById("cep")
    .value
    .replace(/\D/g, "");

    /* verifica se o cep possui exatamente 8 numeros */
    if (cep.length !== 8) {

        /* exibe uma mensagem de erro na pagina */
        resultado.innerHTML = "<p>Digite um CEP valido com 8 numeros.</p>"

        /* encerra */
        return;

    }

    /* mostra uma mensagem enquanto a consulta é realizada */
    resultado.innerHTML = "<p>Consultando...</p>";

    try {

        /* faz uma requisição para a api BrasilAPI
        o cep digirado é colocado no final da URL */
        const resposta = await fetch(
            `https://brasilapi.com.br/api/cep/v1/${cep}`
        );

        /* verifica se a api retornou uma resposta valida */
        if (!resposta.ok) {

            /* se houver algum problema,
            gera um erro que sera tratado pelo catch */
            throw new Error("cep não encontrado");
        }

        /* converte a resposta da api para json */
        const dados = await resposta.json();

        /* exibe os dados recebidos da api na pagina */
        resultado.innerHTML = `

            <p>
                <strong>Rua:</strong>
                ${dados.street || "nao informado"}
            </p>

            <p>
                <strong>Bairro:</strong>
                ${dados.neighborhood || "nao informado"}
            </p>

            <p>
                <strong>cidade:</strong>
                ${dados.city}
            </p>

            <p>
                <strong>estado:</strong>
                ${dados.state}
            </p>
        `;
    }catch (erro) {

        /* caso aconteca algum erro durante a consulta,
        exibe uma mensagem para o usuario */
        resultado.innerHTML = "<p>CEP nao encontrado ou erro na consulta.</p>";
    }
}