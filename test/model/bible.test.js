const BibleService = require('../../src/bibleService');
const Bible = require('../../src/models/bible');
const Book = require('../../src/models/book');
const Chapter = require('../../src/models/chapter');

const service = new BibleService('5ae573a324440896fabd2942943728a5', 1);

const asvMock = {
    "id": "06125adad2d5898a-01",
    "dblId": "06125adad2d5898a",
    "relatedDbl": null,
    "name": "The Holy Bible, American Standard Version",
    "nameLocal": "The Holy Bible, American Standard Version",
    "abbreviation": "ASV",
    "abbreviationLocal": "ASV",
    "description": "Bible",
    "descriptionLocal": "Bible",
    "language": {
        "id": "eng",
        "name": "English",
        "nameLocal": "English",
        "script": "Latin",
        "scriptDirection": "LTR"
    },
    "countries": [
        {
            "id": "US",
            "name": "United States of America",
            "nameLocal": "United States of America"
        }
    ],
    "type": "text",
    "updatedAt": "2021-01-22T09:07:29.000Z",
    "copyright": "\n          \n            PUBLIC DOMAIN\n          \n        ",
    "info": "\n        This public domain Bible translation is brought to you courtesy of eBible.org.\n        For additional formats and downloads, please see https://eBible.org/find/details.php?id=eng-asv.\n      ",
    "audioBibles": []
};

describe('Model: Bible', () => {
    describe('constructor', () => {

        describe('default props', () => {
            const ASV = new Bible();
            it('has an id', () => {
                expect(ASV).toHaveProperty('id', '');
            }); 
            it('has empty data', () => {
                expect(ASV).toHaveProperty('data');
                expect(ASV.data).toMatchObject({});
            }); 
            it('has a service', () => {
                expect(ASV).toHaveProperty('bibleService');
                expect(ASV.bibleService).toBeInstanceOf(BibleService);
            });
        });
        describe('data param is a string', () => {
            const ASV = new Bible('06125adad2d5898a-01');
            it('has a service', () => {
                expect(ASV).toHaveProperty('id', '06125adad2d5898a-01');
            }); 
            it('has empty data', () => {
                expect(ASV).toHaveProperty('data');
                expect(ASV.data).toMatchObject({});

            }); 
        });
        describe('data param is an object', () => {
            
            it('has an id', async () => {
                let bibleData = await service.getBible('06125adad2d5898a-01');
                const ASV = new Bible(bibleData);
                expect(ASV).toHaveProperty('id', '06125adad2d5898a-01');
            }); 
            it('the data object is not empty data', async () => {
                let bibleData = await service.getBible('06125adad2d5898a-01');
                const ASV = new Bible(bibleData);
                expect(ASV).toHaveProperty('data');
                expect(ASV.data).toMatchObject(bibleData);
            }); 
        });
        describe('service param is a string', () => {
            it('the bible service as an apikey', () => {
                const ASV = new Bible(asvMock, '123456');
                expect(ASV.bibleService).toHaveProperty('apikey', '123456');
            }); 
            it('has version and type', async () => {
                const ASV = new Bible(asvMock, 123456);
                expect(ASV.bibleService).toHaveProperty('version', 1);
                expect(ASV.bibleService).toHaveProperty('medium', 'text');
            }); 
        });
        describe('service param is a BibleService', () => {
            const fakeService = new BibleService('1234567')
            const ASV = new Bible('', fakeService);
            it('the bible service as an apikey', () => {
                expect(ASV.bibleService).toHaveProperty('apikey', '1234567');
            }); 
            it('the bible service is the same one sent in', () => {
                expect(ASV.bibleService).toMatchObject(fakeService);
            })
        });

        
    });
    describe('refreshData', () => {
        it(' will populate data', async () => {
            const ASV = new Bible('06125adad2d5898a-01', service);

            await ASV.refreshData();
            expect(ASV.data).toHaveProperty('language');
            expect(ASV.books.length).toBeGreaterThan(50);
        });
    });
    describe('getBooks', () => {
        it('gets an array of books', async () => {
            const ASV = new Bible('06125adad2d5898a-01', service);
            const books = await ASV.getBooks();

            expect(books).toBeInstanceOf(Array);
            expect(books.length).toBeGreaterThan(50);
        });
        it('the array of books are all of the type Book ', async () => {
            const ASV = new Bible('06125adad2d5898a-01', service);
            const books = await ASV.getBooks();

            expect(books).toBeInstanceOf(Array);
            expect(books.length).toBeGreaterThan(50);
            expect(books[0]).toBeInstanceOf(Book);
        });
        describe('getBook', () => {

            it('gets a single book by string', async () => {
                const ASV = new Bible('06125adad2d5898a-01', service);
                const book = await ASV.getBook('GEN');
                
                expect(book).toBeInstanceOf(Book);
            });
            it('gets a single book by object with bookId', async () => {
                const ASV = new Bible('06125adad2d5898a-01', service);
                const book = await ASV.getBook({bookId: 'GEN'});
                
                expect(book).toBeInstanceOf(Book);
            });
            it('gets a single book by object with id', async () => {
                const ASV = new Bible('06125adad2d5898a-01', service);
                const book = await ASV.getBook({id: 'GEN'});
                
                expect(book).toBeInstanceOf(Book);
            });
        });
        describe('getChapter', () => {

            it('gets a single chapter by string', async () => {
                const ASV = new Bible('06125adad2d5898a-01', service);
                const chapter = await ASV.getChapter('GEN.1');
                
                expect(chapter).toBeInstanceOf(Chapter);
            });
            it('gets a single chapter by object with chapterId', async () => {
                const ASV = new Bible('06125adad2d5898a-01', service);
                const chapter = await ASV.getChapter({chapterId: 'GEN.1'});
                
                expect(chapter).toBeInstanceOf(Chapter);
            });
            it('gets a single chapter by object with id', async () => {
                const ASV = new Bible('06125adad2d5898a-01', service);
                const chapter = await ASV.getChapter({id: 'GEN.1'});
                
                expect(chapter).toBeInstanceOf(Chapter);
            });
        });
    });
});