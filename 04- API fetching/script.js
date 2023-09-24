
let allData = "Habi jabi data";

function fetchJokes() {
    const url = 'https://dad-jokes.p.rapidapi.com/random/joke';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '<YOUR API KEY>',
            'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
        }
    };


    fetch(url, options)
        .then(response =>
            response.json()
        )
        .then(data => {
            console.log(data)
            populateData(data)
        })
        .catch(err => console.log(err))
        .finally(() => console.log("Runs anyway"))
}


window.addEventListener("load", fetchJokes)


function populateData(data) {
    document.getElementById("setup").innerText = data?.body[0]?.setup
    document.getElementById("punchline").innerText = data?.body[0]?.punchline
}