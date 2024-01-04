export const createContainer = (book, alignment) => {
    const container = document.createElement('div');
    container.classList.add(`${alignment}-container`);
    if (alignment === 'left') {
        const bookCover = bookFrontCreater(book);
        container.appendChild(bookCover);
    }
    return container;
};
export const createTitleElement = (book, container) => {
    if (book.title) {
        const titleElement = document.createElement(book.title.elementType);
        titleElement.textContent = String(book.title.value);
        container.appendChild(titleElement);
    }
};
export function bookFrontCreater(book) {
    const bookFront = document.createElement('article');
    bookFront.classList.add('book-front');
    bookFront.style.backgroundColor = book.color.value;
    bookFront.setAttribute('data-title', book.title.value.toString());
    bookFront.setAttribute('data-author', book.author.value.toString());
    for (const key in book) {
        if (book[key].libraryPrinter) {
            const newElement = document.createElement(book[key].elementType);
            newElement.classList.add(book[key].className);
            newElement.textContent = book[key].value;
            bookFront.appendChild(newElement);
        }
    }
    return bookFront;
}
