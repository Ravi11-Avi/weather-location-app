const search =document.getElementById("search");
const city =document.getElementById("search-city-name");
const myLocation =document.getElementById("my-location");



const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemp = document.getElementById("city-temp");


let map = L.map("map").setView([0, 0], 2);    //default map at starrting


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {   //L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {...}): Adds a tile layer using OpenStreetMap's tile server.
    attribution: "&copy; OpenStreetMap contributors"                    //attribution: '© OpenStreetMap contributors' : The attribution string to be displayed when the map is used.
}).addTo(map);

let marker;

function updateMap(lat, lon, cityName, zoomLevel = 15) {
    if (marker) {
        marker.remove(); // Remove old marker
    }
    marker = L.marker([lat, lon]).addTo(map)                        //L.marker([lat, lon]).addTo(map): Adds a marker to the map.
        .bindPopup(`<b>${cityName}</b>`)                          //bindPopup(`<b>${cityName}</b>`): Adds a popup to the marker, which will open when the marker is clicked.
        .openPopup();                                            //openPopup(): Opens the popup previously bound to the marker.         
    map.setView([lat, lon], zoomLevel); }                       //map.setView([lat, lon], zoomLevel): Sets the view of the map (geographical center and zoom) with the given animation options.

async function getdata(city_is) {
    const promise = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=ebad7cd07fb348b7a5b201656250502&q=${city_is}&aqi=yes`
    )
    
    return await promise.json();
}

search.addEventListener('click', async () => {
    const value = city.value;
    const result = await getdata(value);
    console.log(result);
    if (result) display(result); 

})


function display(result){
    cityName.innerHTML = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
    cityTemp.innerHTML = result.current.temp_c + "°C";
    cityTime.innerHTML = result.location.localtime;
    details.style.display = 'block'

    updateMap(result.location.lat, result.location.lon, result.location.name);
}

async function getdataloc(lat,long) {
    const promise = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=ebad7cd07fb348b7a5b201656250502&q=${lat},${long}&aqi=yes`
    );
    return await promise.json();
    
}


async function getloc(position) {
    const result = await getdataloc(
        position.coords.latitude, 
        position.coords.longitude
    );
    if (result) display(result); 
    
}

function notgetloc(){
    alert("ERROR");
}

myLocation.addEventListener('click', ()=>{
    navigator.geolocation.getCurrentPosition(getloc,notgetloc);
})


function copyLink() {
    let link = "https://ravi11-avi.github.io/weather-location-app/"; 

    navigator.clipboard.writeText(link)
    
}//need update on main page