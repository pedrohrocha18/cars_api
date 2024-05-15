async function loadCars() {
  const res = await axios.get("http://localhost:8000/cars");

  const cars = res.data;

  const list_car = document.querySelector("#list_car");

  list_car.innerHTML = "";

  cars.forEach((car) => {
    const item = document.createElement("li");
    item.innerText = `${car.fabricante} - ${car.modelo} - ${
      car.ano
    } - ${car.valor.toFixed(2)}`;
    list_car.appendChild(item);
  });
}

function manipularFormulario() {
  const form = document.querySelector("#form_car");

  const input_fabricante = document.querySelector("#fabricante");
  const input_modelo = document.querySelector("#modelo");
  const input_ano = document.querySelector("#ano");
  const input_valor = document.querySelector("#valor");

  form.onsubmit = async (event) => {
    event.preventDefault();
    const fabricante = input_fabricante.value;
    const modelo = input_modelo.value;
    const ano = input_ano.value;
    const valor = input_valor.value;

    await axios.post("http://localhost:8000/cars", {
      fabricante: fabricante,
      modelo: modelo,
      ano: ano,
      valor: valor,
    });
    alert("Carro cadastrado com sucesso!");
    loadCars();
  };
}

function app() {
  console.log("App rodando!");
  loadCars();
  manipularFormulario();
}

app();
