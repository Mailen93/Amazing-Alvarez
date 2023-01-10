let events;
let pastEvents;
let upcomingEvents;

let highestAt = document.getElementById('hAttend')
let lowestAt = document.getElementById('lAttend')
let capacity = document.getElementById('hCapacity')
///////////////////////////////////////////////////////////
let upComing = document.getElementById('upcoming_events')
let past = document.getElementById('past_events')



//<td class="cell">-</td>


fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(res => res.json())
.then(data => {
   
   events = data.events

   upcomingEvents = data.events.filter(evt =>  evt.date > data.currentDate)
   pastEvents = data.events.filter(evt => evt.date < data.currentDate)
   console.log(pastEvents)

   let percentages = arrPercentages(events)
   let capacities = arrCapacities(events)

   highestPercentage(percentages, events)
   lowestPercentage(percentages, events)
   highestCapacity(capacities, events)
   upComingTable(upcomingEvents)
   pastTable(pastEvents)

})


function arrPercentages (events) {
   let percentages = []
   events.forEach(evento => {
      if(evento.assistance) percentages.push(evento.assistance/evento.capacity*100)
      else percentages.push(evento.estimate/evento.capacity*100)
   })
   return percentages
}

function arrCapacities (events) {
   let capacities = []
   events.forEach(evento => {
      capacities.push(evento.capacity)
   })
   return capacities
}

function highestPercentage (per, evts) {
   let highestPercentage = Math.max(...per)
   let indexHighestEvent = per.indexOf(highestPercentage)
   
   highestAt.innerHTML = `${evts[indexHighestEvent].name} with ${highestPercentage} %`
}

function lowestPercentage (per, evts) {
   let lowestPercentage = Math.min(...per)
   let indexLowestEvent = per.indexOf(lowestPercentage)

   lowestAt.innerHTML = `${evts[indexLowestEvent].name} with ${lowestPercentage.toFixed(2)} %`
}

function highestCapacity (caps, evts) {
   let highestCapacity = Math.max(...caps)
   let indexOfMaxCap = caps.indexOf(highestCapacity)
   
   capacity.innerHTML = `${evts[indexOfMaxCap].name} with ${highestCapacity}`
}

/////////////////////////////////////////////////////////////////////////////////////////

function createCategories(evts) {
   let categories = evts.map((event) => event.category);
   let set = new Set(categories);
   categories = Array.from(set);
   return categories;
 }

function upComingTable(upcomingEvents) {
   let templateInitTable = `
   <tr>
      <th class="cell">Categories</th>
      <th class="cell">Revenues</th>
      <th class="cell">Percentage of attendance</th>
  </tr>`
   let template = "";
   upcomingEvents.forEach((evt) => {
   template +=
     `
   <tr>
     <td class="cell">${evt.category}</td>
     <td class="cell">U$s ${multiplicar(evt.estimate, evt.price)}</td>
     <td class="cell">${porcentaje(evt.estimate, evt.capacity)} %</td>
   </tr>
     `
   });
   upComing.innerHTML = templateInitTable + template;
 }

 function pastTable(pastEvents) {
   let templateInitTable = `
   <tr>
      <th class="cell">Categories</th>
      <th class="cell">Revenues</th>
      <th class="cell">Percentage of attendance</th>
  </tr>`
   let template = "";
   pastEvents.forEach((evt) => {
   template +=
     `
   <tr>
     <td class="cell">${evt.category}</td>
     <td class="cell">U$s ${multiplicar(evt.assistance, evt.price)}</td>
     <td class="cell">${porcentaje(evt.assistance, evt.capacity)} %</td>
   </tr>
     `
   });
   past.innerHTML = templateInitTable + template;
 }
 
 function multiplicar(dato1, dato2){
   let resultado = dato1 * dato2
   return resultado.toLocaleString()
 }

 function porcentaje(dato1, dato2){
   let resultado = dato1 / dato2 * 100
   return resultado.toFixed(2).toLocaleString()
 }