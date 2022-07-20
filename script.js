//elemento html passado pra js pra manipular
const cepData = document.getElementById("cepData");

//funcionalidade do botão limpar
const clearBtn = document
  .querySelector(".btn-warning")
  .addEventListener("click", () => {
    clearData();
  });

//funcionalidade do botão buscar
const buscarBtn = document
  .querySelector(".btn-primary")
  .addEventListener("click", () => {
    let cep = getInputValue();
    if (cep.length == 8) {
      setTimeout(() => {
        cepData.innerText = getCep(cep);
      }, 300);
    } else {
      cepData.innerText = "CEP Invalido";
    }
  });

//funcionalidade que busca através do Enter direto no campo de input
const input = document
  .querySelector("input")
  .addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length == 8) {
        cepData.innerText = getCep(e.target.value);
      } else {
        cepData.innerText = "CEP Invalido";
      }
    }
  });

//constrói o layout da saída dos dados no navegador
const createTemplate = (data) => {
  if (data.cep != undefined) {
    cepData.innerText = `
    CEP: ${data.cep}
    Logradouro: ${data.logradouro}
    Complemento: ${data.complemento}
    Bairro: ${data.bairro}
    Cidade: ${data.localidade}
    UF: ${data.uf}
  `;
  } else {
    cepData.innerText = "CEP Invalido";
  }
};

//limpa os dados da tela quando clicar no botão limpar
function clearData() {
  cepData.innerText = "";
}

//armazena os valores digitados no campo de input
function getInputValue() {
  const val = document.querySelector("input").value;
  return val;
}

//Request que busca o cep
function getCep(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json`)
    .then((resp) => resp.json())
    .then((data) => {
      createTemplate(data);
      return data;
    })
    .catch((error) => {
      return error;
    });
}
