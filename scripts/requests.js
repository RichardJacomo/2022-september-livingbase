// requisição da API
const BaseUrl = 'https://m2-api-living.herokuapp.com';

async function dataAPI(currentPage) {
    console.log(currentPage)
    try{
    const response = await fetch(`${BaseUrl}/news?page=${currentPage}`);
    const caracters = response.json()
    return caracters
    }catch(err){
        console.log(err)
    }
}

// exportando funções


async function dataAPIID(currentPageId) {
    console.log(currentPageId)
    try{
    const response = await fetch(`${BaseUrl}/news/${currentPageId}`);
    const caracters = response.json()
    return caracters
    }catch(err){
        console.log(err)
    }
}

// exportando funções
export{
    dataAPI,
    dataAPIID
}




