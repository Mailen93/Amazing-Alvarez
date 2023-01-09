let cadenaParametroUrl = location.search //Recupera el parametro (valor) de la URL que le mandamos y la trae como string

// Convertir el string en un objeto urlsearchparams para poder obtener obtener banana a partir de fruta:

let parametros = new URLSearchParams(cadenaParametroUrl) //transformamos a objeto de tipo urlsearchparamps para trabajar con get
console.log(parametros);
// metodo get: ingresamos a la propiedad (fruta) y a traves de esta obtener el valor de la propiedad (banana)

let id = parametros.get("id")
let contenedor = document.querySelector(".bigcard")
let eventos = data.events;

function renderCard(contenedor,data,id){
    console.log(data)
    let evento = data.find(e => e._id === id)
    console.log(evento)
    console.log(id)
    contenedor.innerHTML = ""
    contenedor.innerHTML = `<div class="card mb-3" style="max-width: 100%;">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${evento.image}" class="img-fluid rounded-start" alt="${evento.name}">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Name: ${evento.name}</h5>
                <p class="card-text">Date: ${evento.date}</p>
                <p class="card-text">Description: ${evento.description}</p>
                <p class="card-text together">Category: ${evento.category}</p>
                <p class="card-text together">Place: ${evento.place}</p>
                <p class="card-text together">Capacity: ${evento.capacity}</p>
                <p class="card-text together">${(() => {if (evento.assistance){
                    return (`Assistance: ${evento.assistance}`);
                }else{
                    return (`Estimate: ${evento.estimate}`)
                }
            })()}</p>
                <p class="card-text together">Price: ${evento.price}</p>
            </div>
        </div>
    </div>
    </div>`
}

renderCard(contenedor,eventos,id);