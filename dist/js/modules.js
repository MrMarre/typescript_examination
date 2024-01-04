export const createLeftContainer = (book) => {
    const leftContainer = document.createElement('div');
    leftContainer.classList.add('left-container');
    const bookCover = bookFrontCreater(book);
    leftContainer.appendChild(bookCover);
    return leftContainer;
};
export const createRightContainer = (book) => {
    const rightContainer = document.createElement('div');
    rightContainer.classList.add('right-container');
    createTitleElement(book, rightContainer);
    return rightContainer;
};
export const createTitleElement = (book, container) => {
    if (book.title) {
        const titleElement = document.createElement('h2');
        titleElement.textContent = String(book.title);
        container.appendChild(titleElement);
    }
};
export function bookFrontCreater(book) {
    const bookFront = document.createElement('article');
    bookFront.classList.add('book-front');
    bookFront.style.backgroundColor = book.color;
    const titleElement = document.createElement('h2');
    titleElement.classList.add('book-front--title');
    titleElement.textContent = book.title;
    const authorElement = document.createElement('p');
    authorElement.classList.add('book-front--author');
    authorElement.textContent = book.author;
    bookFront.appendChild(titleElement);
    bookFront.appendChild(authorElement);
    return bookFront;
}
