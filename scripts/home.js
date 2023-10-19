import { dataAPI, dataAPIID } from "./requests.js"


const ul = document.querySelector('.ul-posts-list');
let page = 0;
// função que renderiza os posts
async function render(){
    const post = await dataAPI(page)
    post.news.map((elem) => {
    ul.insertAdjacentHTML(
      'beforebegin',
      `
      <li data-post="${elem.id}" class="li-post">
      <img class="img-post" src="${elem.image}" alt="">
      <div class="description-post">
          <h3 class="title-post">${elem.title.substring(0, 58)}...</h3>
          <p class="text-post">${elem.description.substring(0, 160)}</p>
          <p class="access-post">acessa conteúdo</p>
      </div>
      </li>
    `,
    );
  });
  getCurrentPost()
}

// função que cria scroll infinito
const observer = new IntersectionObserver((entries) => {
  if (entries.some((entry) => entry.isIntersecting)) {
    dataAPI(page);
    render()
    if(page < 3){
      page++
    }
  }
});
observer.observe(ul);

// selecionando post
async function getCurrentPost(){
    const posts = document.querySelectorAll('.li-post');
    posts.forEach((post) =>
    post.addEventListener('click', () => {
        const id = post.getAttribute('data-post');
        findPost(id);
        setTimeout(()=>{
          window.location.href = "/pages/post/index.html"
        }, 500)  
      }),
    );
};
getCurrentPost()

// função que salva id do post clicado no localStorage  
async function findPost(id){
    const post = await dataAPIID(id)
    localStorage.setItem('post', JSON.stringify(post));
    render();
};


function renderCategoryContent(elem){
return `
<li data-post="${elem.id}" class="li-post">
<img class="img-post" src="${elem.image}" alt="">
<div class="description-post">
    <h3 class="title-post">${elem.title.substring(0, 58)}...</h3>
    <p class="text-post">${elem.description.substring(0, 160)}</p>
    <p class="access-post">acessa conteúdo</p>
</div>
</li>
`
}

const divMain = document.querySelector('.main-posts')
// função que renderiza itens filtrados
async function getCategory(category){
  const post = await dataAPI(0)
  post.news.map((elem) =>{
    if(elem.category == category){  
      divMain.innerHTML = ""
      divMain.insertAdjacentHTML('beforeend', renderCategoryContent(elem)); 
    }else if(category == 'Todos'){
      window.location.reload(true)
    }
});
const post1 = await dataAPI(1)
post1.news.map((elem) =>{
  if(elem.category == category){  
    divMain.insertAdjacentHTML('beforeend', renderCategoryContent(elem)); 
  }else if(category == 'Todos'){
    window.location.reload(true)
  }
});
const post2 = await dataAPI(2)
post2.news.map((elem) =>{
  if(elem.category == category){  
    divMain.insertAdjacentHTML('beforeend', renderCategoryContent(elem));  
  }else if(category == 'Todos'){
    window.location.reload(true)
  }
});
getCurrentPost()
}

function menuButtons(){
    const buttons = document.querySelectorAll('.li-menu')
    buttons.forEach(button => {
        button.addEventListener('click', () =>{
          divMain.innerHTML = ""
          let category = button.innerText
          localStorage.setItem('category', JSON.stringify(category))   
          let value = getCategoryJson()  
          console.log(value)
          getCategory(value)
        })
    });
}
menuButtons()

function getCategoryJson(){
    const categoryLocal = JSON.parse(localStorage.getItem('category')) 
    return categoryLocal
}
