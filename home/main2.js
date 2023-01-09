// ARRAY DE EVENTOS //
let eventos = data.events; 
let categories = createCategories(eventos);

// RENDERIZO TODOS MIS COMPONENTES DINÁMICOS // 
// TEMPLATE INICIAL: Renderiza todas las cards y checkboxes//

// CONTENEDOR DE CARDS //
let cardsContainer = document.getElementById("cards_container");
cardsContainer.innerHTML = templateCreator(eventos)

// COMPONENTE CHECKBOX-CONTAINER //
let checkboxContainer = document.getElementById("checks");
checkboxContainer.innerHTML= checksCreator(categories)

// NODE-LIST COMPONENTES CHECKBOX //
let checksList = document.querySelectorAll('input[type="checkbox"]'); 

// COMPONENENTE SEARCHBAR: input type='text'//
let search = document.getElementById("input_search");


// FUNCIÓN CREADORA DE TEMPLATE: 
function templateCreator(eventos) {
  let template = "";
  if (!eventos.length) {
    template += "<h3>UNEXISTENT EVENT, PLEASE CHANGE YOUR SEARCH<h3>";
  }
  eventos.map((evento) => {
    template += `<div class="col">
          <div class="card" id=${evento._id} style="width: 18rem;">
              <img src=${evento.image} class="card-img-top" alt="festival">
              <div class="card-body">
                  <h5 class="card-title">${evento.name}</h5>
                  <p class="card-text">${evento.description}</p>
                  <p>Price: ${evento.price}</p>
                <a href="../details/details.html?id=${evento._id}" class="btn btn-dark">See more</a>
              </div>
          </div>
      </div>`;
  });
  return template;
}

// FUNCIÓN CREADORA DE CATEGORIES //
// function createCategories(eventos) {
//   let categories = [];
//   eventos.forEach((event) => {
//     categories.push(event.category)
//   });
//   let set = new Set(categories)
//   categories = Array.from(set)
//   return categories
// }

function createCategories(eventos) {
  let categories = eventos.map((event) => event.category);
  let set = new Set(categories)
  categories = Array.from(set)
  return categories
}

function checksCreator(categories) {
  let template = ""
  categories.forEach((category) => {
    template += `<label class="categories">
    <input class=".form-check-input" type="checkbox" value="${category}"/>
    <p>${category}</p>
  </label>`
})
return template
}

// FUNCIONES DE FILTRADO Y BÚSQUEDA:

// FUNCIÓN FILTRADO DE SEARCHBAR:
function searchEvents (search, eventos) {
  let filtered = eventos.filter((evento) => {
    return evento.name.toLowerCase().includes(search.value.toLowerCase());
  });
  return filtered;
};

//FUNCIÓN FILTRADO DE CHECKBOX:
function checkFilter (checks, eventos) {
  let checkedList = [];
  checks.forEach(check => {
    if(check.checked) {
        checkedList.push(check.value.toLowerCase());
    } 
  })
  let filtered = eventos.filter(evento => {
    return checkedList.includes(evento.category.toLowerCase())
  })
  if(!filtered.length){
    return eventos
  }else{
    return filtered
  }
};

//FUNCIÓN CRUZADA DE FILTROS: // 
function filterCrossed () {
    let filterByCheck = checkFilter(checksList, eventos)
    let filterBySearch = searchEvents(search, filterByCheck)

    cardsContainer.innerHTML = templateCreator(filterBySearch)
}

// AGREGADO DE LISTENERS //

// COMPONENTE SEARCHBAR // 
search.addEventListener('input', filterCrossed)
// COMPONENTE CHECKBOX-CONTAINER //
checkboxContainer.addEventListener('change', filterCrossed)