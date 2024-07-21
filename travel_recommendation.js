const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const recommendations = document.getElementById("recommendations");
const timeOptions = { hour12:true, hour:"numeric", minute:"numeric", second:"numeric" };

function fetchData() {
    fetch("./travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            const val = document.getElementById("search").value;
            recommendations.innerHTML = `<h1>${val.toUpperCase()}</h1>`
            switch(val.toLowerCase().trim()){
                case "temples":
                case "temple":
                    data["temples"].map((temple) => { 
                        recommendations.innerHTML += `<div id="temple-${temple.id}">
                        <figure><image src="${temple.imageUrl}"/></figure>
                        <h2>${temple.name}</h2>
                        <p>${temple.description}</p>
                    </div>`
                })
                    break;
                case "beaches":
                case "beach":
                    data["beaches"].map((beach) => {
                        recommendations.innerHTML += `<div id="beach-${beach.id}">
                        <figure><image src="${beach.imageUrl}"/></figure>
                        <h2>${beach.name}</h2>
                        <p>${beach.description}</p>
                    </div>`
                })
                    break;
                case "countries":
                case "country" :
                    data["countries"].map((country) => {
                        recommendations.innerHTML += `<div id="country-${country.id}">
                        <h2>${country.name}</h2>
                        </div>`;
                        recommendations.innerHTML += `
                        <div>
                            ${country.cities.map(city => `
                                <figure><image src="${city.imageUrl}"/></figure>
                                <h2>${city.name}</h2>
                                <p>${city.description}</p>
                                <span>${new Date().toLocaleDateString("en-US", { "timeZone":city.timeZone, ...timeOptions })}</span>
                                `
                            )}
                        </div>`                      
                });
                    break;
                default:
                    recommendations.innerHTML += `<h3>No information was found :c </h3>`;
                    break;
            }
        })
        .catch(e => {
            console.log("Unable to fetch data", e);
        })
}

function clearData(){
    document.getElementById("search").value = "";
    recommendations.innerHTML = "";
}

searchBtn.addEventListener("click", fetchData);
clearBtn.addEventListener("click", clearData);
