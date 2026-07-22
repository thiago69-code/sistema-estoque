const form = document.getElementById('form-estoque');
const corpoTabela = document.getElementById('corpoTabela');

document.addEventListener('DOMContentLoaded', carregarEstoque);

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('produto').value;
    const quantidade = document.getElementById('quantidade').value;

    const novoItem = {nome, quantidade };

    salvarNoLocalStorage(novoItem);
    form.reset()
    carregarEstoque();
});

function obterEstoque() {
    const estoqueSalvo = localStorage.getItem('meuEstoque');
    return estoqueSalvo ? JSON.parse(estoqueSalvo) : [];
}

function salvarNoLocalStorage(item) {
    const estoque = obterEstoque();
    estoque.push(item);
    localStorage.setItem('meuEstoque', JSON.stringify(estoque));
}

function carregarEstoque() {
    const estoque = obterEstoque();
    corpoTabela.innerHTML = '';

    estoque.forEach((item, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.quantidade}</td>
        <td><buuton class="btn-excluir" onclick="removerItem(${index})">Excluir</button></td> `;
        corpoTabela.appendChild(linha);
    });
}

function removerItem(index) {
    const estoque = obterEstoque();
    estoque.splice(index, 1);
    localStorage.setItem('meuEstoque', JSON.stringify(estoque));
    carregarEstoque();
}