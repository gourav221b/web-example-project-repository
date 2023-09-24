
let allData = "Habi jabi data";

function fetchUsers() {
    let url = "https://jsonplaceholder.typicode.com/users"
    fetch(url)
        .then(response =>
            response.json()
        )
        .then(data => {
            allData = structuredClone(data)
            console.log("All data inside fetch is,", allData)
        })
        .catch(err => console.log(err))
        .finally(() => console.log("Runs anyway"))
}

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
console.log("All data is,", allData)

// function willSheCall() {
//     console.log("inside function")
//     return new Promise((resolve, reject) => {
//         resolve("No calls")
//     })
// }

function populateData(data) {
    document.getElementById("setup").innerText = data?.body[0]?.setup
    document.getElementById("punchline").innerText = data?.body[0]?.punchline
}