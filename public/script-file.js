document.addEventListener('keydown', function(event) {
    if (event.key.startsWith('Arrow')) {
        event.preventDefault();
    }
});

function changeSnakeCol(BtnId) {
    const root = document.documentElement;  
    if (BtnId == 'Btn1'){
        root.style.setProperty('--snake1', 'red');
        root.style.setProperty('--snake2', 'yellow');
    }
    else if (BtnId == 'Btn2'){
        root.style.setProperty('--snake1', 'green');
        root.style.setProperty('--snake2', 'cyan');
    }
    else if (BtnId == 'Btn3') {
        root.style.setProperty('--snake1', 'black');
        root.style.setProperty('--snake2', 'purple');
    }
    else {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        console.log(randomColor);
        root.style.setProperty('--snake1', '#' + randomColor);
        randomColor = Math.floor(Math.random()*16777215).toString(16);
        console.log(randomColor);
        root.style.setProperty('--snake2', '#' + randomColor);
    }
}

window.onload = function() {
    handleDropdown();
    setUpDifficultyButtons();
    createPlayButton();
    positionEndGameScreen();
    moveHeader();
}    

function handleDropdown() {
    const Btn1 = document.getElementById('Btn1');
    const Btn2 = document.getElementById('Btn2');
    const Btn3 = document.getElementById('Btn3');
    const Btn4 = document.getElementById('Btn4');
    Btn1.addEventListener('click', function() {
        changeSnakeCol('Btn1');
    });
    Btn2.addEventListener('click', function() {
        changeSnakeCol('Btn2');
    });
    Btn3.addEventListener('click', function() {
        changeSnakeCol('Btn3');
    });
    Btn4.addEventListener('click', function() {
        changeSnakeCol('Btn4');
    });
}

var difficulty = 1000;

function setUpDifficultyButtons() {
    const difficultyBtns = document.querySelectorAll('input[name="difficulty"]');
    difficultyBtns.forEach(btn => {
        btn.addEventListener('change', function() { difficulty = btn.value;})
    })
}

var runGame = function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const gridSize = 20;
    const gridWidth = canvas.width / gridSize;
    const gridHeight = canvas.height / gridSize;
    var snake = [{x: 10, y: 10}]; // Snake initial position
    var direction = 'right';
    var gameOver = false;
    var food = {x: Math.floor(Math.random() * gridHeight), y: Math.floor(Math.random() * gridWidth)};
    var canTakeInput = true;
    var score = 0;
    
    const intervalId = setInterval(gameLoop, difficulty);

    function gameLoop() {
        moveSnake();
        drawSnake();
        if (gameOver) clearInterval(intervalId);
        canTakeInput = true;
    }

    async function moveSnake() {
        if (gameOver) return;

        const head = {x: snake[0].x, y: snake[0].y};

        if (direction == 'up') head.y--;
        if (direction == 'down') head.y++;
        if (direction == 'left') head.x--;
        if (direction == 'right') head.x++;
        // daca mananc mancarea
        if (head.x === food.x && head.y === food.y) {
            score++;
            addSegment(head);
            // generez mancare noua
            food = {x: Math.floor(Math.random() * gridHeight), y: Math.floor(Math.random() * gridWidth)};
            // verifica daca nu s-a generat pe o casuta ocupata de sarpe
            let ok = false;
            while (!ok) {
                ok = true
                for (let i = 0; i < snake.length; i++) {
                    if (snake[i].x == food.x && snake[i].y == food.y) {
                        food = {x: Math.floor(Math.random() * gridHeight), y: Math.floor(Math.random() * gridWidth)};
                        ok = false;
                        break;
                    }
                }
            }
        }
            

        // daca apare o coliziune opreste jocul
        if (head.x < 0 || head.y < 0 || head.x >= gridWidth || head.y >= gridHeight ||
            snake.some(segment => (head.x == segment.x && head.y == segment.y)))
        {
            gameOver = true;
            const highscores = JSON.parse(localStorage.getItem('highscores'));
            // verific daca este un nou highscore
            if (highscores.length < 10 || score > highscores[9].score)
                var nume = await getName();
            updateEndGameScreen(score, nume);
            createPlayButton();
            return;
        }
        // misca sarpele cu o casuta
        snake.unshift(head);
        snake.pop();
    }

    function drawSnake() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'green';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * gridSize, food.y * gridHeight, gridSize, gridWidth);
    }

    function addSegment(head) {
        if (snake.length == 1) {
            if (direction == 'up') snake.push({x: head.x, y: head.y + 1});
            if (direction == 'down') snake.push({x: head.x, y: head.y - 1});
            if (direction == 'left') snake.push({x: head.x + 1, y: head.y});
            if (direction == 'right') snake.push({x: head.x - 1, y: head.y});
            return;
        }
        // daca are mai mult de 1 bucata
        const lastSegment = snake[snake.length - 1];
        const secondToLastSegment = snake[snake.length - 2];
        if (lastSegment.y == secondToLastSegment.y)
            // pun pe cealalta parte fata de ultimul segment
            snake.push({x: lastSegment.x + Math.pow(-1, !!(lastSegment.x < secondToLastSegment.x)), y: head.y});
        else if (lastSegment.x == secondToLastSegment.x)
            snake.push({x: head.x, y: lastSegment.y + Math.pow(-1, !!(lastSegment.y > secondToLastSegment.y))});
    }

    document.addEventListener('keydown', function(event) {
        if (canTakeInput) {
            const key = event.key.toLowerCase();
            if (key == 'arrowup' && direction != 'down') direction = 'up';
            if (key == 'arrowdown' && direction != 'up') direction = 'down';
            if (key == 'arrowleft' && direction != 'right') direction = 'left';
            if (key == 'arrowright' && direction != 'left') direction = 'right';
            canTakeInput = false;
        }
    });
};






var moveHeader = function() {
    const trySection = document.getElementById("try");
    trySection.addEventListener("mouseenter", moveUp, true);
    trySection.addEventListener("mouseout", moveBack, true);
}

var animationFrameId = null;
const animationDuartion = 2000;

function moveUp(event) {
    event.stopPropagation();
    // adaug un border albastru la elementul pe care e mouse-ul daca nu e tot section-ul
    if (event.target == document.getElementById('snakeIframe') || event.target == document.getElementById('gameCanvas') ||
    event.target == document.getElementById('endScreen'))
        event.target.classList.add('blueBorder');
    cancelAnimationFrame(animationFrameId);
    const element = document.getElementsByTagName("header")[0];
    const r = /\d+/;
    if (element.style.transform) {
        var len = parseInt(element.style.transform.match(r)); // len negativ
        var duration = (1 - len / 100) * animationDuartion; 
    }
    else {
        var duration = animationDuartion;
        var len = 0;
    }
    let start = null;
    len = parseInt(len);

    function step(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        let translateY = len + Math.min(progress / duration * (100 - len), (100 - len));
        element.style.transform = `translateY(${-translateY}px)`;
        
        if (progress < duration) {
            animationFrameId = window.requestAnimationFrame(step);
        }
    }

    animationFrameId = window.requestAnimationFrame(step);
}

function moveBack(event) {
    event.stopPropagation();
    if (event.target == document.getElementById('snakeIframe') || event.target == document.getElementById('gameCanvas') ||
    event.target == document.getElementById('endScreen'))
        event.target.classList.remove('blueBorder');
    cancelAnimationFrame(animationFrameId);
    const element = document.getElementsByTagName("header")[0];
    const r = /\d+/;
    if (element.style.transform) {
        var len = element.style.transform.match(r); // numarul din prop
        var duration = len / 100 * 2000; //procent exhivalent din durata
    }
    else return;
        let start = null;
    
    function step(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        let translateY = (1 - progress / duration) * len;
        element.style.transform = `translateY(${-translateY}px)`;
        //console.log(element.style.transform.match(r));

        if (progress < duration && Math.floor(translateY) > 0) {
        animationFrameId = window.requestAnimationFrame(step);
        }
    }
    
    animationFrameId = window.requestAnimationFrame(step);
}

function createPlayButton() {
    const button = document.createElement('button');
    button.id = 'playButton';
    button.textContent = 'Play';
    button.style.position = 'absolute';
    button.style.marginTop = '7em';
    button.style.width = '15%';
    button.style.height = '10%';
    button.style.fontSize = '2rem';
    button.style.zIndex = 10;
    button.style.backgroundColor = 'white';
    // inserez butonul in canvas
    const canvasDiv = document.getElementsByClassName('canvasDiv')[0];
    canvasDiv.appendChild(button);
    button.addEventListener('click', function() { runGame(); destroyPlayButton(); });
}

function destroyPlayButton() {
    document.getElementById('endScreen').style.display = "none";
    const button = document.getElementById('playButton');
    if (button) {
        button.remove();
    }
}



function positionEndGameScreen() {
    const Canvas = document.getElementById('gameCanvas');
    const dim = window.getComputedStyle(Canvas);
    const endScreen = document.getElementById('endScreen');
    endScreen.style.width = dim.getPropertyValue('width');
    endScreen.style.height = dim.getPropertyValue('width');
    endScreen.style.display = 'none';

    endScreen.style.zIndex = 10;
}

const highscores = [];
localStorage.setItem('highscores', JSON.stringify(highscores));

function updateEndGameScreen(score, name) {
    const endScreen = document.getElementById('endScreen');
    document.getElementById('score').innerHTML = 'Your score: ' + score;
    endScreen.style.display = 'flex';

    console.log(score)
    // updatez obiectul sa contina cele mai mari 10 score-uri
    const highscores = JSON.parse(localStorage.getItem('highscores'));
    console.log(highscores);
    if (highscores.length < 10 || score > highscores[9].score) {
        highscores.push({name: name, score: score});
        highscores.sort((a, b) => b.score - a.score);
        if (highscores.length > 10)
            highscores.pop();
        localStorage.setItem('highscores', JSON.stringify(highscores));
    }
    
    // adaug highscore-urile in div
    const highScoresDiv = document.getElementById('highScores');
    highScoresDiv.replaceChildren();
    highScoresDiv.textContent = 'Highscores: '; 
    highscores.forEach((entry, index) => {
        const highscoreElement = document.createElement('div'); 
        highscoreElement.classList.add('highscore');
        highscoreElement.textContent = `${index + 1}. ${entry.name} - ${entry.score}`;
        highScoresDiv.appendChild(highscoreElement);
    });
}

function getName() {
    var nameInput = document.getElementById('newHighScore');
    nameInput.style.display = 'flex';
    var nameField = document.getElementById('nameInput');
    // resetez la valoarea default - alias
    nameField.value = nameField.getAttribute('value');
    
    return new Promise((resolve) => {
        nameInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (nameField.validity.valid) {
                    nameInput.style.display = 'none';
                    console.log(nameField.value);
                    resolve(nameField.value);
                }
            }
        });
    });
}