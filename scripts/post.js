// selecionando div pai que vai receber o card do post
const main = document.querySelector('.main-post-description');

const renderPost = () => {
    const postJson = JSON.parse(localStorage.getItem('post'));
    main.innerHTML = '';
    main.insertAdjacentHTML(
      'beforeend',
      `
       <div class="title-and-text-description">
            <h1 class="title-description">${postJson.title}</h1>
            <p class="text-description">${postJson.description}</p>
      </div>
      <div class="post-content">
      <figure class="figure-img-post">
            <img class="img-post" src="${postJson.image}" alt="">
      </figure>
      <p class="text-post">${postJson.content}</p>
      </div> 
    `,
    );
  };

renderPost()

const goToHomePage = () => {
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
    main.innerHTML = '';
    window.location.href = "/index.html"
    });
  };
goToHomePage();

const goToHomePage2 = () => {
    const home = document.querySelector('.button-home');
    home.addEventListener('click', () => {
    main.innerHTML = '';
    window.location.href = "/index.html"
    });
  };
goToHomePage2();








