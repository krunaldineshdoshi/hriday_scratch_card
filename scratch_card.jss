document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('scratch-card');
  const ctx = canvas.getContext('2d');
  const hiddenAmount = '$50'; // Replace with the actual amount or dynamically set this value
  const fontSize = 24;
  const fontFamily = 'Arial';

  // Set canvas dimensions
  const width = canvas.width;
  const height = canvas.height;

  // Display the hidden amount text
  ctx.save();
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'black';
  ctx.fillText(hiddenAmount, width / 2, height / 2);
  ctx.restore();

  // Fill the canvas with a solid color (e.g., gray)
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, width, height);

  // Set composite operation to reveal the hidden amount
  ctx.globalCompositeOperation = 'destination-out';

  let isDrawing = false;

  // Function to handle the scratching effect
  function scratch(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    const radius = 15; // Radius of the brush

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Event listeners for mouse and touch events
  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    scratch(e);
  });

  canvas.addEventListener('mousemove', scratch);

  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
  });

  canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    scratch(e);
  });

  canvas.addEventListener('touchmove', scratch);

  canvas.addEventListener('touchend', () => {
    isDrawing = false;
  });
});
