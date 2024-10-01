function degrees_ro_radian(degrees){
    var pi = Math.PI;
    return degrees = (pi/100);
}

// function drawTreeTop(ctx, x, y, radius) {
//     let treeTop = ctx.createRadialGradient(x, y - radius * 0.5, 0, x, y - radius * 0.5, radius);
//     treeTop.addColorStop(0, '#3b6d38'); // Dark green
//     treeTop.addColorStop(1, '#6ba870'); // Light green
    
//     ctx.fillStyle = treeTop;
//     ctx.beginPath();
//     ctx.arc(x, y, radius, 0, Math.PI);
//     ctx.fill();
// }

// function drawTree(ctx, x, y, radius) {
//     let treeTop = ctx.createLinearGradient(x, y - radius, x, y + radius);

//     // Define two color stops for the gradient for each half of the circle
//     treeTop.addColorStop(0, '#3b6d38'); // Dark green for the first half
//     treeTop.addColorStop(0.5, '#3b6d38'); // Dark green transition
//     treeTop.addColorStop(0.5, '#6ba870'); // Light green transition
//     treeTop.addColorStop(1, '#6ba870'); // Light green for the second half
    
//     ctx.fillStyle = treeTop;
//     ctx.beginPath();
//     ctx.arc(x, y, radius, 0, Math.PI * 2);
//     ctx.fill();
// }

// Get the footer element
const footer = document.querySelector('.footer');
const canvas = document.getElementById('footerImg');

let footerCtx = document.getElementById('footerImg').getContext("2d");


/*SMILEY******/
let sky = document.getElementById('footerImg').getContext('2d');
sky.beginPath();
sky.fillStyle = 'white';
sky.strokeStyle = 'white';
sky.stroke();
sky.moveTo(500, 400);
sky.lineTo(0, 400);
sky.fillRect(0, 0, 500, 400);
sky.stroke();

let mountain = document.getElementById('footerImg').getContext("2d");
mountain.beginPath();
mountain.moveTo(0, 500);
mountain.lineTo(0, 120);
mountain.arcTo(100, 80, 200, 180, 120); // Curved edge - adjust control points and radius

// Invert curve for valley
mountain.quadraticCurveTo(250, 250, 300, 250); // Adjust control point to create a valley
mountain.arcTo(400, 250, 500, 180, 180); // Curved edge - adjust control points and radius

mountain.lineTo(500, 500);
mountain.fillStyle = '#83c796';
mountain.fill();

mountain.lineWidth = 3;
mountain.strokeStyle = '#83c796';
mountain.stroke();


// let stem = document.getElementById('footerImg').getContext('2d');
// stem.beginPath();
// stem.fillStyle = 'black';
// stem.fill();
// stem.strokeStyle = 'black';
// stem.fillRect(80, 270, 1, 50);

// stem.stroke();

// let tree = document.getElementById('footerImg').getContext('2d');
// tree.beginPath();
// tree.arc(100, 100, 10, 0,2 * Math.PI, 5.7 * Math.PI, true);
// tree.lineWidth =3;

// tree.fillStyle = 'green';
// tree.fill();
// tree.strokeStyle = 'green';
// tree.stroke();

// // Example tree positions and sizes
// drawTreeTop(footerCtx, 100, 300, 30); // Draw a tree top at (100, 300) with a radius of 30
// drawTreeTop(footerCtx, 300, 210, 40); 

// drawTree(footerCtx, 50, 100, 50); // Draw a tree top at (100, 300) with a radius of 30
// drawTree(footerCtx, 250, 320, 40); // Draw another tree top at (250, 320) with a radius of 40
// // Add more trees as needed by calling drawTreeTop with different positions and sizes