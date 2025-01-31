// Create and insert canvas
const canvas = document.createElement('canvas');
canvas.id = 'ripple-canvas';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

// Insert canvas as the first element in body
document.body.insertBefore(canvas, document.body.firstChild);

const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const cols = window.innerWidth;
const rows = window.innerHeight;
const dampening = 0.99;
const mouseSize = 2;
const mouseForce = 1;

let current = new Float32Array(cols * rows);
let previous = new Float32Array(cols * rows);

let mouseX = 0;
let mouseY = 0;
let isMouseDown = false;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const centerX = Math.floor(mouseX);
    const centerY = Math.floor(mouseY);
    
    for(let dy = -mouseSize; dy <= mouseSize; dy++) {
        for(let dx = -mouseSize; dx <= mouseSize; dx++) {
            const x = centerX + dx;
            const y = centerY + dy;
            
            if(x >= 0 && x < cols && y >= 0 && y < rows) {
                const distance = Math.sqrt(dx*dx + dy*dy);
                if(distance < mouseSize) {
                    const force = mouseForce * (1 - distance / mouseSize);
                    const index = y * cols + x;
                    previous[index] = force * (isMouseDown ? -1 : 1);
                }
            }
        }
    }
});

window.addEventListener('mousedown', () => isMouseDown = true);
window.addEventListener('mouseup', () => isMouseDown = false);

function update() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update ripple simulation
    for(let y = 1; y < rows - 1; y++) {
        for(let x = 1; x < cols - 1; x++) {
            const i = y * cols + x;
            current[i] = (
                previous[i - cols] +
                previous[i + cols] +
                previous[i - 1] +
                previous[i + 1]
            ) / 2 - current[i];
            
            current[i] *= dampening;
        }
    }

    // Draw dots
    ctx.fillStyle = 'black';
    const dotSpacing = 4;
    
    for(let y = 0; y < rows; y += dotSpacing) {
        for(let x = 0; x < cols; x += dotSpacing) {
            const i = y * cols + x;
            const height = Math.abs(current[i]);
            
            if(height > 0.01) {
                const size = Math.min(height * 1.5, 1);
                
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    [current, previous] = [previous, current];
    
    requestAnimationFrame(update);
}

// Start the animation
update();