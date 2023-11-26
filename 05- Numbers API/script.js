canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
cx = ctx.canvas.width / 2;
cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 80;
const gravity = 0.9;
const terminalVelocity = 10;
const drag = 0.175;
const colors = [
    { front: 'red', back: 'darkred' },
    { front: 'green', back: 'darkgreen' },
    { front: 'blue', back: 'darkblue' },
    { front: 'yellow', back: 'darkyellow' },
    { front: 'orange', back: 'darkorange' },
    { front: 'pink', back: 'darkpink' },
    { front: 'purple', back: 'darkpurple' },
    { front: 'turquoise', back: 'darkturquoise' }];


//-----------Functions--------------
resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cx = ctx.canvas.width / 2;
    cy = ctx.canvas.height / 2;
};

randomRange = (min, max) => Math.random() * (max - min) + min;

initConfetti = () => {
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            color: colors[Math.floor(randomRange(0, colors.length))],
            dimensions: {
                x: randomRange(10, 20),
                y: randomRange(10, 30)
            },

            position: {
                x: randomRange(0, canvas.width),
                y: canvas.height - 1
            },

            rotation: randomRange(0, 2 * Math.PI),
            scale: {
                x: 1,
                y: 1
            },

            velocity: {
                x: randomRange(-25, 25),
                y: randomRange(0, -50)
            }
        });


    }
};

//---------Render-----------
render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale.x;
        let height = confetto.dimensions.y * confetto.scale.y;

        // Move canvas to position and rotate
        ctx.translate(confetto.position.x, confetto.position.y);
        ctx.rotate(confetto.rotation);

        // Apply forces to velocity
        confetto.velocity.x -= confetto.velocity.x * drag;
        confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
        confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

        // Set position
        confetto.position.x += confetto.velocity.x;
        confetto.position.y += confetto.velocity.y;

        // Delete confetti when out of frame
        if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

        // Loop confetto x position
        if (confetto.position.x > canvas.width) confetto.position.x = 0;
        if (confetto.position.x < 0) confetto.position.x = canvas.width;

        // Spin confetto by scaling y
        confetto.scale.y = Math.cos(confetto.position.y * 0.1);
        ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

        // Draw confetti
        ctx.fillRect(-width / 2, -height / 2, width, height);

        // Reset transform matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    });

    // Fire off another round of confetti
    // if (confetti.length <= 10) initConfetti();

    window.requestAnimationFrame(render);
};

//---------Execution--------
// initConfetti();
render();

//----------Resize----------
window.addEventListener('resize', function () {
    resizeCanvas();
});

//------------MAIN HANDLER------------
const num = document.getElementById("numberTest");
const empty = document.getElementById("empty")
const content = document.querySelectorAll(".content")
const loader = document.querySelectorAll('#loader')
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '837e680a17mshe96f10e6239321dp17b272jsn04d210215e3a',
        'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
    }
};

const getYearFact = async () => {
    const url = `https://numbersapi.p.rapidapi.com/${num.value}/year?fragment=true&json=true`;
    try {
        const response = await fetch(url, options);
        const result = await response.json();

        document.getElementById('yearFact').textContent = result?.text
    } catch (error) {
        console.error(error);
    }
}
const getNumberFact = async () => {
    const url = `https://numbersapi.p.rapidapi.com/${num.value}/math?fragment=true&json=true`;
    try {
        const response = await fetch(url, options);
        const result = await response.json();

        document.getElementById('numFact').textContent = result?.text
    } catch (error) {
        console.error(error);
    }
}
const getNumberTrivia = async () => {
    const url = `https://numbersapi.p.rapidapi.com/random/trivia?min=${num.value}&max=${num.value}&fragment=true&json=true`;
    try {
        const response = await fetch(url, options);
        const result = await response.json();

        document.getElementById('triviaFact').textContent = result?.text
    } catch (error) {
        console.error(error);
    }
}


const getAllData = async () => {
    if (!num.value)
        return
    loader.forEach(load => load.classList.add("loader"))

    const responses = await Promise.all([getYearFact(), getNumberFact(), getNumberTrivia()])
    initConfetti()
    showData()
    loader.forEach(load => load.classList.remove("loader"))
}

const getRandomData = async () => {
    num.value = Math.floor((Math.random() * 3000) + 1);

    document.getElementById('shuffleIcon').classList.add("animate-spin")
    const responses = await Promise.all([getYearFact(), getNumberFact(), getNumberTrivia()])
    initConfetti()
    showData()
    document.getElementById('shuffleIcon').classList.remove("animate-spin")

}

const showData = () => {
    empty.classList.add("hidden")
    content.forEach(card => card.classList.remove("hidden"))
    document.getElementById('results').scrollIntoView()
}
const hideData = () => {
    empty.classList.remove("hidden")
    content.forEach(card => card.classList.add("hidden"))
}


document.getElementById('numberForm').addEventListener('submit', (e) => { e.preventDefault(); getAllData() })
document.getElementById('shuffle').addEventListener('click', getRandomData)
