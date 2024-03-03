let favouritePilotNames = []

function fetchMovies () {
    fetch('https://swapi.constructor-learning.com/api/films/')
    .then((response) => response.json())
    .then((data) => {
        data.results.forEach(film => {
            createFilm(film)
        });
    })
    .catch((error) => console.log(error))
}

function createFilm(film) {
    const filmDiv = document.createElement('div')
    filmDiv.classList.add('card')

    const title = document.createElement('h3')
    title.textContent = film.title
    filmDiv.appendChild(title)

    const detailsDiv = document.createElement('div')
    detailsDiv.classList.add('film-details')
    detailsDiv.style.display = 'none'
    filmDiv.appendChild(detailsDiv)

    const starshipsButton = document.createElement('button')
    starshipsButton.textContent = 'Show Starships'
    starshipsButton.style.display = 'none'
    filmDiv.appendChild(starshipsButton)

    filmDiv.addEventListener('click', function (e) {
        // const detailsDiv = e.currentTarget.querySelector('.film-details')
        // detailsDiv.style.display = 'block'
        // detailsDiv.innerHTML = `Opening Crawl: ${film.opening_crawl}<br><br>
        // Episode ID: ${film.episode_id}<br><br>
        // Release Date: ${film.release_date}<br><br>`

        const btn = e.currentTarget.querySelector('button')
        btn.style.display = 'block'
        if (this.classList.contains('highlighted')) {
            return
        }

        e.currentTarget.classList.add('highlighted')
        const detailsDiv = e.currentTarget.querySelector('.film-details')
        if (detailsDiv.style.display === 'none') {
            detailsDiv.style.display = 'block'
            detailsDiv.innerHTML = `Opening Crawl: ${film.opening_crawl}<br><br>
            Episode ID: ${film.episode_id}<br><br>
            Release Date: ${film.release_date}<br><br>`
        }

        const films = document.querySelectorAll('#films .card')
        films.forEach((film) => {   
        if (film !== e.currentTarget) {
            film.classList.remove('highlighted')
            const openFilm = film.querySelector(
            '.film-details[style="display: block;"]'
            )
        if (openFilm) {
            openFilm.style.display = 'none'
            }
        }
        })
        const shipsDiv = document.getElementById('ships')
        shipsDiv.innerHTML = ''
        const pilotsDiv = document.getElementById('pilots')
        pilotsDiv.innerHTML = ''
    })

    starshipsButton.addEventListener('click', function(e) {
        fetchStarships(film.starships)
    })


    document.getElementById('films').appendChild(filmDiv)

}

    
function fetchStarships(starshipsUrls) {

    const fetchPromises = starshipsUrls.map((url) =>
        fetch(url).then((res) => res.json())
    )


    Promise.all(fetchPromises)
        .then((starships) => {

        const shipsDiv = document.getElementById('ships')
        shipsDiv.innerHTML = ''


        starships.forEach(createStarship)
    })
        .catch((error) => console.log(error))
}

function createStarship(starship) {
    const starshipDiv = document.createElement('div')
    starshipDiv.classList.add('card')
    //console.log(starship)

    const name = document.createElement('h3')
    name.textContent = starship.name
    starshipDiv.appendChild(name)

    const detailsDiv = document.createElement('div')
    detailsDiv.classList.add('starship-details')
    detailsDiv.style.display = 'none'
    starshipDiv.appendChild(detailsDiv)
    

    const btn = document.createElement('button')
    btn.textContent = 'Show Pilots'
    if(starship.pilots.length){
        starshipDiv.appendChild(btn)
    }


    document.getElementById('ships').appendChild(starshipDiv)

    btn.addEventListener('click', function(e) {
            fetchPilots(starship.pilots)
    })

    starshipDiv.addEventListener('click', function(e) {
        if (this.classList.contains('highlighted')) {
            return
        }

        this.classList.add('highlighted')
        const detailsDiv = this.querySelector('.starship-details')
        if(detailsDiv.style.display == 'none') {
            detailsDiv.style.display = 'block'
            detailsDiv.innerHTML = `Model: ${starship.model}<br><br>
            Max Atmosphering Speed: ${starship.max_atmosphering_speed}<br><br>
            Starship Class: ${starship.starship_class}<br><br>`
        }

        const starships = document.querySelectorAll('#ships .card')
        starships.forEach((ship) => {
        if (ship !== this) {
            ship.classList.remove('highlighted')
            const openStarship = ship.querySelector(
            '.starship-details[style="display: block;"]'
            )
        if (openStarship) {
            openStarship.style.display = 'none'
            }
        }
        })
        const pilotsDiv = document.getElementById('pilots')
        pilotsDiv.innerHTML = ''
    })


}


function fetchPilots(pilotsUrl) {
    const fetchPromises = pilotsUrl.map((url) => 
        fetch(url).then((res) => res.json())
    )

    Promise.all(fetchPromises)
    .then((pilots) => {
        const pilotsDiv = document.getElementById('pilots')
        pilotsDiv.innerHTML = ''


        pilots.forEach(createPilots)
    })
    .catch((error) => console.log(error))
}

function createPilots (pilot) {
    const pilotsDiv = document.createElement('div')
    pilotsDiv.classList.add('card')
    console.log(pilot)

    const name = document.createElement('h3')
    name.textContent = pilot.name
    pilotsDiv.appendChild(name)

    const btn = document.createElement('button')
    btn.innerHTML = 'Add to favourites'
    pilotsDiv.appendChild(btn)

    btn.addEventListener('click', function (e) {
        console.log(pilot)
        addFavouritePilot(pilot)
        // addFavouritePilot(e.currentTarget)
    })

    document.getElementById('pilots').appendChild(pilotsDiv)
}

function addFavouritePilot(pilot) {
    const favPilotsDiv = document.createElement('div');
    favPilotsDiv.classList.add('card')

    if (favouritePilotNames.includes(pilot.name)) {
        return;
    }

    const name = document.createElement('h3');
    name.textContent = pilot.name;
    favouritePilotNames.push(pilot.name);
    favPilotsDiv.appendChild(name);

    const btn = document.createElement('button');
    btn.innerHTML = 'Remove Pilot';
    favPilotsDiv.appendChild(btn);

    btn.addEventListener('click', function (e) {
        removeFavouritePilot(pilot.name, favPilotsDiv);
    });

    document.getElementById('favourite-pilots').appendChild(favPilotsDiv);
}

function removeFavouritePilot(pilotName, favPilotsDiv) {
    const index = favouritePilotNames.indexOf(pilotName);
    if (index > -1) {
        favouritePilotNames.splice(index, 1);
    }
    favPilotsDiv.parentNode.removeChild(favPilotsDiv);
}



fetchMovies()