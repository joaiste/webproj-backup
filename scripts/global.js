const buttonToggleMenu = document.querySelector('.toggle-menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const exitNav = document.querySelector('.quit')
const insertBackdropDOM = document.querySelector('.body');


insertBackdropDOM.insertAdjacentHTML('afterbegin', `
  <div class="backdrop"></div> 
`);


const backdrop = document.querySelector('.backdrop')


buttonToggleMenu.addEventListener('click', () => {
  backdrop.style.display = 'block';
})


buttonToggleMenu.addEventListener('click', () => {
  mobileNav.style.display = 'block';
})


backdrop.addEventListener('click', () => {
  backdrop.style.display = 'none';
  mobileNav.style.display = 'none';
});

exitNav.addEventListener('click', () => {
  backdrop.style.display = 'none';
  mobileNav.style.display = 'none';
});


