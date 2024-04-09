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
    else {
        root.style.setProperty('--snake1', 'black');
        root.style.setProperty('--snake2', 'purple');
    }
}
window.onload = handleDropdown;
function handleDropdown() {
    const Btn1 = document.getElementById('Btn1');
    const Btn2 = document.getElementById('Btn2');
    const Btn3 = document.getElementById('Btn3');
    Btn1.addEventListener('click', function() {
        changeSnakeCol('Btn1');
    });
    Btn2.addEventListener('click', function() {
        changeSnakeCol('Btn2');
    });
    Btn3.addEventListener('click', function() {
        changeSnakeCol('Btn3');
    });
}

