document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const gridSize = 20;
    const gridWidth = canvas.width / gridSize;
    const gridHeight = canvas.height / gridSize;
    let snake = [{x: 10, y: 10}]; // Snake initial position
    let direction = 'right';
    let gameOver = false;

    function drawSnake() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'green';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });
    }

    function moveSnake() {
        if (gameOver) return;

        const head = {x: snake[0].x, y: snake[0].y};

        if (direction === 'up') head.y--;
        if (direction === 'down') head.y++;
        if (direction === 'left') head.x--;
        if (direction === 'right') head.x++;

        if (head.x < 0 || head.y < 0 || head.x >= gridWidth || head.y >= gridHeight) {
            gameOver = true;
            return;
        }

        snake.unshift(head);
        snake.pop();
    }

    function gameLoop() {
        moveSnake();
        drawSnake();
        if (gameOver) clearInterval(intervalId);
    }

    const intervalId = setInterval(gameLoop, 250); // Run gameLoop once every second

    document.addEventListener('keydown', function(event) {
        const key = event.key.toLowerCase();
        if (key === 'arrowup' && direction !== 'down') direction = 'up';
        if (key === 'arrowdown' && direction !== 'up') direction = 'down';
        if (key === 'arrowleft' && direction !== 'right') direction = 'left';
        if (key === 'arrowright' && direction !== 'left') direction = 'right';
    });
});