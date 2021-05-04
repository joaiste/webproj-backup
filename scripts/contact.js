const foxResult = document.getElementById('fox-pic-container');
const getFoxButton = document.getElementById('get-fox');

getFoxButton.addEventListener('click', getFoxResult);

function getFoxResult () {
  fetch('https://randomfox.ca/floof/')
  .then(res => res.json())
  .then(data =>  {

    foxResult.innerHTML = `<img src="${data.image}"/>`
  })
  
}


const submitButton = document.querySelector('.btn-submit');

submitButton.addEventListener('click', () => {
  alert('your details, if input correctly, will be submitted')
});



