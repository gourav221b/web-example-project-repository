const loader = document.getElementById('loader')
const startBtn = document.getElementById('startBtn')
const gameContent = document.querySelector('.gameContent')
const gameStartContent = document.querySelector('.gameStartContent')
const gameContentItems = document.querySelector('.gameContentItems')
const playForm = document.querySelector('#playForm')
const fetchResults = async function (input) {
    let res = await fetch('https://eager-jodhpurs-bee.cyclic.app/game', {
        method: 'POST',
        body: JSON.stringify({
            input: input
        })
    })

    let data = await res.text()
    return data

}

const start_game = async () => {
    loader.classList.add("loader")
    const data = await fetchResults("START GAME")
    if (data?.split("\n")[0]?.toLowerCase().includes("Acknowledged"))
        data.replace("Acknowledged", "")
    gameContent.classList.remove("hidden")
    gameContentItems.innerText = String(data)
    loader.classList.remove("loader")
    gameStartContent.classList.add("hidden")

}

const play_game = async (text) => {
    loader.classList.add("loader")
    const data = await fetchResults(text)
    if (data?.split("\n")[0]?.toLowerCase().includes("Acknowledged"))
        data.replace("Acknowledged", "")
    gameContentItems.innerText = String(data)
    loader.classList.remove("loader")
}


startBtn.addEventListener('click', start_game)
playForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    await play_game(document.getElementById('prompt').value)
    document.getElementById('prompt').value = ""

})