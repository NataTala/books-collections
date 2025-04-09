
let books = [
    {
        'title': '1984',
        'author': 'Джордж Орвелл',
        'genre': 'Антиутопія',
        'publish': 'Новий світ'
    },
    {
        'title': 'Майстер та Маргарита',
        'author': 'Михаїл Булгаков',
        'genre': 'Класика',
        'publish': 'Новий світ'
    },
    {
        'title': 'Три товариша',
        'author': 'Еріх Марія Ремарк',
        'genre': 'Класика',
        'publish': 'Новий світ'
    },
    {
        'title': 'Чарлі і шоколадна фабрика',
        'author': 'Роальд Дал',
        'genre': 'Казки',
        'publish': 'Азбука'
    },
    {
        'title': '11 хвилин',
        'author': 'Пауло Коельйо',
        'genre': 'Класика',
        'publish': 'Аверс'
    },
    {
        'title': 'Звіяні вітром',
        'author': 'Маргарет Мітчелл',
        'genre': 'Роман',
        'publish': 'Аверс'
    },
    {
        'title': 'Алхімік',
        'author': 'Пауло Коельйо',
        'genre': 'Класика',
        'publish': 'Аверс'
    },
    {
        'title': 'Великий Гетсбі',
        'author': 'Ф. С. Фіцджеральд',
        'genre': 'Роман',
        'publish': 'Джерело'
    },    
    {
        'title': 'Дари волхвів',
        'author': 'О. Генрі',
        'genre': 'Класична проза',
        'publish': 'Джерело'
    },    
    {
        'title': 'На Західному фронті без змін',
        'author': 'Еріх Марія Ремарк',
        'genre': 'Класика',
        'publish': 'Новий світ'
    },
    {
        'title': 'Заїр',
        'author': 'Пауло Коельйо',
        'genre': 'Класика',
        'publish': 'Аверс'
    },
    {
        'title': 'Пісочний чоловік',
        'author': 'Ніл Ґейман',
        'genre': 'Фантастика',
        'publish': 'Карамба'
    },
    {
        'title': 'Небудь-де',
        'author': 'Ніл Ґейман',
        'genre': 'Фантастика',
        'publish': 'Карамба'
    },
]

const $ = document.querySelector.bind(document);
const list = $('.list');
const addForm = $('.add-form');
const addFormTitle = $('.add-form-title');
const addFormAuthor = $('.add-form-author');
const addFormGenre = $('.add-form-genre');
const addFormPublish = $('.add-form-publish');
const btnAdd = $('.btn-add');
const btnSearch = $('.btn-search');
const btnBack = document.querySelector('.btn-back');


function main(){
    let currentPage = 1;
    let count = 10;
    let filteredBooks = books.slice();  // Копируем исходный массив

    function render(arrData, countPage, page){
        list.innerHTML = '';
        page--;
        const start = countPage * page;
        const end = start + countPage;
        const paginateData = arrData.slice(start, end);

        paginateData.forEach((item) => {
            const listItem = `
            <div class="item-flex">
                <div class="list-item">
                    <div class="item-title">${item.title}</div>
                    <div class="item-author">${item.author}</div>
                    <div class="item-genre">${item.genre}</div>
                    <div class="item-publish">${item.publish}</div>
                </div>
                <div class="list-btn">
                    <button class="btn-edit"><img src="img/edit.png" alt=""></button>
                    <button class="btn-del"><img src="img/bin_del.png" alt=""></button>
                </div> 
            </div>
            `
            list.insertAdjacentHTML('beforeend', listItem);
        })
    }

    function boxPagination(arrData, currentPage){
        const pageCount = Math.ceil(arrData.length / count);
        const ulElem = document.querySelector('.pagination-list');
        ulElem.innerHTML = ''; 

        for(let i = 0; i < pageCount; i++){
            const liElem = boxPaginationBtn(i+1);
            ulElem.appendChild(liElem);
        }
    }

    function boxPaginationBtn(page){
        const liElem = document.createElement('li');
        liElem.classList.add('pagination-item');
        liElem.innerText = page;
        liElem.addEventListener('click', function(){
            currentPage = page;
            render(filteredBooks, count, currentPage);
        })
        return liElem;
    }

    render(filteredBooks, count, currentPage);
    boxPagination(filteredBooks, currentPage);

    btnAdd.addEventListener('click', addItem);
    list.addEventListener('click', deleteItem);
    btnSearch.addEventListener('click', searchItem);
    btnBack.addEventListener('click', clearSearchResults);

    function addItem(e){
        e.preventDefault();
       
        if(addFormTitle.value && addFormAuthor.value){
            const newBook = {
                title: addFormTitle.value.trim(),
                author: addFormAuthor.value.trim(),
                genre: addFormGenre.value.trim(),
                publish: addFormPublish.value.trim()
            };
            books.push(newBook);
            filteredBooks.push(newBook);  
            render(filteredBooks, count, currentPage);
            boxPagination(filteredBooks, currentPage);
            clearForm();
        }else{
            alert("Обов'язково вкажіть назву та автора книги!");
            return
        }
    }

function clearForm(){
    addFormTitle.value = '';
    addFormAuthor.value = '';
    addFormGenre.value = '';
    addFormPublish.value = '';
}

function deleteItem(e){
    if(e.target.classList.contains('btn-del')){
        const parentItem = e.target.closest('.item-flex');
        parentItem.remove();
    }
}

function searchItem(e){
    e.preventDefault(); 
    
    if(!addFormTitle.value && !addFormAuthor.value && !addFormGenre.value && !addFormPublish.value){
        alert('Необхідно задати умови пошуку');
        return
    }else{
        const searchTermTitle = addFormTitle.value.toLowerCase().trim();
        const searchTermAuthor = addFormAuthor.value.toLowerCase().trim();
        const searchTermGenre = addFormGenre.value.toLowerCase().trim();
        const searchTermPublish = addFormPublish.value.toLowerCase().trim();

        if(searchTermTitle) {
            filteredBooks = books.filter(book => 
                book.title.toLowerCase().includes(searchTermTitle) 
            );
        }else if (searchTermAuthor) {
            filteredBooks = books.filter(book => 
                book.author.toLowerCase().includes(searchTermAuthor)
            );
        }else if (searchTermGenre) {
            filteredBooks = books.filter(book => 
                book.genre.toLowerCase().includes(searchTermGenre)
            );
        }else if (searchTermPublish) {
            filteredBooks = books.filter(book => 
                book.publish.toLowerCase().includes(searchTermPublish)
            );
        }

        // При поиске сбрасываем текущую страницу
        currentPage = 1;
        // Рендерим отфильтрованные книги
        render(filteredBooks, count, currentPage);

        boxPagination(filteredBooks, currentPage);
        btnBack.classList.remove('none');
    }
}

function clearSearchResults() {
    // возвращаемся к полному списку
    filteredBooks = books.slice();
    render(filteredBooks, count, currentPage);
    boxPagination(filteredBooks, currentPage);
     
    addFormTitle.value = '';
    addFormAuthor.value = '';
    addFormGenre.value = '';
    addFormPublish.value = '';
    btnBack.classList.add('none');
}

const btnSortUp = document.getElementById('sort-up');
    const btnSortDown = document.getElementById('sort-down');

    btnSortUp.addEventListener('click', function() {
        sortBooksByTitle(true);  // сортування в алфавітному порядку
    });

    btnSortDown.addEventListener('click', function() {
        sortBooksByTitle(false);  // сортування в зворотньому порядку
    });

    function sortBooksByTitle(direction) {
        filteredBooks.sort(function(a, b) {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (titleA < titleB) {
                return direction ? -1 : 1;
            }
            if (titleA > titleB) {
                return direction ? 1 : -1;
            }
            return 0;
        });

        render(filteredBooks, count, currentPage);
        boxPagination(filteredBooks, currentPage);
    }
 
}

main();
