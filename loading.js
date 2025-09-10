document.addEventListener('DOMContentLoaded', () => {
  const sword1 = document.querySelector('.sword1');
  const sword2 = document.querySelector('.sword2');

  if (sword1 && sword2) {
    sword1.addEventListener('animationend', () => {
      sword1.style.transform = 'translate(0, 0)';
      sword2.style.opacity = 1;
    });
  }
});