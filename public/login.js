window.onload = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = '60px digital-clock-font';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    function drawClock() {
        const date = new Date();
        const h = String(date.getHours()).padStart(2, '0');
        const m = String(date.getMinutes()).padStart(2, '0');
        const s = String(date.getSeconds()).padStart(2, '0');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        const x1 = 0;
        const x2 = canvas.width / 3;
        const x3 = canvas.width / 3 * 2;
        const y = canvas.height / 2;
        ctx.font = "50px serif";
        
        ctx.fillText(h, x1 + ctx.measureText(h).width / 2, y);
        ctx.fillText(':', x2 - ctx.measureText(':').width / 2, y);
        ctx.fillText(m, x2 + ctx.measureText(m).width / (2), y);
        ctx.fillText(':', x3 - ctx.measureText(':').width / 2, y);
        ctx.fillText(s, x3 + ctx.measureText(s).width / 2, y);
    }

    function updateClock() {
        drawClock();
        setTimeout(updateClock, 1000);
    }

    updateClock();
}