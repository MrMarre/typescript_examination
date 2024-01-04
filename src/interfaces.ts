
interface BookTemplate {
    id: number,
    title: string,
    author: string,
    publisher: string,
    year: number,
    pages: number,
    plot: string,
    audience: string,
    color: string,
}

type FieldConfig = {
    className: string;
    textInFrontOf: string;
    elementType: string;
    value: string | number;
    libraryPrinter: boolean;
}

type ExtendedBookTemplate = {
    [K in keyof BookTemplate]: FieldConfig;

};

const bookConverter = (book: BookTemplate): ExtendedBookTemplate => {



    return {
        id: {
            className: '',
            textInFrontOf: '',
            elementType: '',
            value: book.id,
            libraryPrinter: false,
        },
        title: {
            className: 'book-front--title',
            textInFrontOf: '',
            elementType: 'h2',
            value: book.title,
            libraryPrinter: true,
        },
        author: {
            className: 'book-front--author',
            textInFrontOf: 'By ',
            elementType: 'p',
            value: book.author,
            libraryPrinter: true,
        },
        publisher: {
            className: 'grid-item',
            textInFrontOf: 'Publisher: ',
            elementType: 'p',
            value: book.publisher,
            libraryPrinter: false,
        },
        year: {
            className: 'grid-item',
            textInFrontOf: 'First published: ',
            elementType: 'p',
            value: book.year,
            libraryPrinter: false,
        },
        pages: {
            className: 'grid-item',
            textInFrontOf: 'Pages: ',
            elementType: 'p',
            value: book.pages || 'Det skall du skita i!',
            libraryPrinter: false,
        },
        plot: {
            className: 'book-plot',
            textInFrontOf: '',
            elementType: 'p',
            value: book.plot,
            libraryPrinter: false,
        },
        audience: {
            className: 'grid-item',
            textInFrontOf: 'Audience: ',
            elementType: 'p',
            value: book.audience,
            libraryPrinter: false,
        },
        color: {
            className: '',
            textInFrontOf: '',
            elementType: '',
            value: book.color,
            libraryPrinter: false,
        },
    }
}

export { BookTemplate, ExtendedBookTemplate, bookConverter }