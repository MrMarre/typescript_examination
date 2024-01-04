import { BookTemplate, ExtendedBookTemplate, bookConverter } from "./interfaces.js";
import { bookFrontCreater, createContainer } from './libraryUtilities.js';


const mainContainer = document.querySelector('.main__container') as HTMLElement;
const bookModal = document.querySelector('.book-modal') as HTMLElement;
const svgBack = document.getElementById('svg-back')
let bookArticles: NodeListOf<HTMLElement> | undefined;



const baseURL: string = `https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books`;

const fetchBooks = async (): Promise<ExtendedBookTemplate[]> => {
    try {
        const response = await fetch(baseURL);

        if (!response.ok) {
            throw new Error('Failed to fetch data: ${response.statusText}')
        }

        const data: BookTemplate[] = await response.json();
        const bookData: ExtendedBookTemplate[] = data.map((book) => bookConverter(book))
        console.log(data);
        return bookData

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
const searchBar = (books: ExtendedBookTemplate[]): void => {
    const input = document.querySelector('.search-field') as HTMLInputElement;
    input.addEventListener('input', function () {
        const value = input.value.toLowerCase();

        const filteredBooks = books.filter((book) => {
            const matchedTitle = String(book.title.value).toLowerCase().includes(value);
            const authorMatch = String(book.author.value).toLowerCase().includes(value);

            return matchedTitle || authorMatch
        })
        renderBooks(filteredBooks)
        addClickEvent(books)
    })
};

const renderBooks = (books: ExtendedBookTemplate[]) => {

    mainContainer.innerHTML = ''
    books.forEach((book) => {
        const bookCover = bookFrontCreater(book);
        mainContainer.appendChild(bookCover);

    })
}

const addClickEvent = (books: ExtendedBookTemplate[]): void => {
    bookArticles = document.querySelectorAll('article');

    Array.from(bookArticles).forEach((book, index) => {
        book.addEventListener('click', () => {
            let clickedBook = books[index];

            displayDetails(clickedBook);
            // return clickedBook??
        });
    });
};
const backButton = () => {
    svgBack.addEventListener('click', () => {
        bookModal.style.display = 'none';
        svgBack.style.display = 'none'
    })
}


const displayDetails = (book: ExtendedBookTemplate): void => {
    bookModal.style.display = 'flex';
    bookModal.innerHTML = ''; // Clear existing content
    svgBack.style.display = 'block';
    backButton()

    const bookModalInfo = document.createElement('div');
    bookModalInfo.classList.add('book-modal--infocontainer')

    const leftContainer = createContainer(book, 'left');
    const rightContainer = createContainer(book, 'right');

    const specialKeysContainer = document.createElement('div');
    specialKeysContainer.classList.add('special-keys-container');

    for (const key in book) {
        if (book[key].elementType) {
            const {
                className, textInFrontOf, elementType, value
            } = book[key];
            const propertyElement = document.createElement(elementType);
            propertyElement.classList.add(className);
            propertyElement.innerHTML = `<b>${textInFrontOf}</b>${value}`
            if (className === 'grid-item') {

                specialKeysContainer.append(propertyElement)
            }
            else {
                rightContainer.append(propertyElement)
            }
        }
    }

    const button = document.createElement('button') as HTMLButtonElement;
    button.classList.add('book-modal--button');
    button.textContent = 'Oh, i want to read it!';

    rightContainer.append(specialKeysContainer, button)

    leftContainer.appendChild(svgBack)
    bookModalInfo.append(leftContainer, rightContainer);
    bookModal.appendChild(bookModalInfo)

};

fetchBooks().then((books) => {
    searchBar(books)
    renderBooks(books)
    addClickEvent(books)
    /* addClickEvent() */
})