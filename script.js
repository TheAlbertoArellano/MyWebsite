document.addEventListener('DOMContentLoaded', () => {
  const eyes = document.querySelectorAll('.pupil');
  const eyesContainer = document.querySelector('.eyes-container');
  const textBox = document.querySelector('.text-box');
  let isTextBoxVisible = false;

  // Eye following cursor
  document.addEventListener('mousemove', (event) => {
    if (isTextBoxVisible) return; // Don't move eyes if text box is visible
    
    eyes.forEach(eye => {
      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + (rect.width / 2);
      const eyeCenterY = rect.top + (rect.height / 2);
      
      const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);
      const distance = Math.min(3, Math.sqrt(Math.pow(event.clientX - eyeCenterX, 2) + Math.pow(event.clientY - eyeCenterY, 2)) / 15);
      
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      eye.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  });

  // Toggle text box on click
  eyesContainer.addEventListener('click', () => {
    textBox.classList.toggle('visible');
    isTextBoxVisible = textBox.classList.contains('visible');
    
    if (isTextBoxVisible) {
      // Center pupils when speaking
      eyes.forEach(eye => {
        eye.style.transform = 'translate(-50%, -50%)';
      });
    }
  });

  // Hide text box when clicking outside
  document.addEventListener('click', (event) => {
    if (!eyesContainer.contains(event.target)) {
      textBox.classList.remove('visible');
      isTextBoxVisible = false;
    }
  });
});