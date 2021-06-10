const BibleEntity = require('./entity');
const Book = require('./book');
const Chapter = require('./chapter');
const Passage = require('./passage');

class  Bible extends BibleEntity {

    /**
     * All books in the bible. populated after running refreshData()
     * @type {Array<string>}
     * @public
     */
    books = [];

    /**
     * @param  {object|string} data full data object returned from api, or the id of a bible
     * @param  {BibleService|string} bibleService the BibleService, or the apikey that could be used to instantiate a service
     */
    constructor(data, bibleService ) {
        super(data, bibleService);

    }
    /**
     * Retrieves data from API and populates data property and books property.
     */
    async refreshData() {
        const data = await this.bibleService.getBible(this.id);
        const books = await this.getBooks();
        this.books.push(...books)
        this.data = data;
    }


    /** Gets all of the books associated with the Bible
     * @param  {BooksRequestParam} params
     */
    async getBooks(params) {
        const request = {...params, id : this.id };
        let result = null;
        
        try {
            const books = await this.bibleService.getBooks(request);
            result = books.map((book) => new Book(book));
        } catch (getError) {
            console.log(getError);
            result = error;
        }
        return result;
    }


    /**Gets a book from the Bible
     * @param  {BookRequestParam|string} params either an object with id or bookId, or a string that is the bookId
     */
    async getBook(params) {
        let result = null;
        const request = { id: this.id };
        if (typeof params === 'object') {
            let temp = {...params};
            if (temp.id) {
                temp.bookId = temp.id;
                delete temp.id;
            }
            Object.assign(request, temp);
        }

        if (typeof params === 'string') {
            request.bookId = params;
        }
        
        try {
            result = await this.bibleService.getBook(request);
            result = new Book(result);
        } catch (getError) {
            console.log(getError);
            result = error;
        }
        return result;
    }

    /** Gets a chapter by Id from the Bible
     * @param  {ChapterRequestParam|string} params
     */
    async getChapter(params) {
        let result = null;
        const request = { id: this.id };
        if (typeof params === 'object') {
            let temp = {...params};
            if (temp.id) {
                temp.chapterId = temp.id;
                delete temp.id;
            }
            Object.assign(request, temp);
        }

        if (typeof params === 'string') {
            request.chapterId = params;
        }
        
        try {
            result = await this.bibleService.getChapter(request);
            result = new Chapter(result);
        } catch (getError) {
            console.log(getError);
            result = error;
        }
        return result;
    }

    async getPassage(params) {
        let result = null;
        const request = { id: this.id };
        if (typeof params === 'object') {
            let temp = {...params};
            if (temp.id) {
                temp.passageId = temp.id;
                delete temp.id;
            }
            Object.assign(request, temp);
        }

        if (typeof params === 'string') {
            request.passageId = params;
        }
        
        
        try {
            result = await this.bibleService.getPassage(request);
            result = new Passage(result, this.bibleService);
        } catch (getError) {
            console.log(getError);
            result = error;
        }
        return result;
    }


}

module.exports = Bible;