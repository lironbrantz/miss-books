import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { books } from './books.js'

const CACHE_STORAGE_KEY = 'googleBooksCache'
const gGoogleBooksCache = utilService.loadFromStorage(CACHE_STORAGE_KEY) || {}

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    addReview,
    removeReview,
    addGoogleBook,
    getGoogleBooks,
    getFilterFromSearchParams,
    _getBookCountByCategoryMap,
    getCategoryStats

}


function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.author) {
                const search = filterBy.author.toLowerCase()

                books = books.filter(book =>
                    book.authors.some(author =>
                        author.toLowerCase()
                            .split(' ')
                            .some(word => word.startsWith(search))
                    )
                )
            }

            if (filterBy.language) {
                const regExp = new RegExp(filterBy.language, 'i')
                books = books.filter(book => regExp.test(book.language))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount <= filterBy.price)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => _setNextPrevBookId(book))
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook() {
    return {
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: '',
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: '',
        language: 'en',
        listPrice: {
            amount: 0,
            currencyCode: 'EUR',
            isOnSale: false
        },
        reviews: []
    }
}

function getDefaultFilter() {
    return {
        title: '',
        price: '',
        author: '',
        language: ''
    }
}

function getFilterFromSearchParams(searchParams) {
    const filterBy = getDefaultFilter()

    for (const key in filterBy) {
        filterBy[key] = searchParams.get(key) || ''
    }

    return filterBy
}

function _createBooks() {
    const savedBooks = utilService.loadFromStorage(BOOK_KEY)

    if (!savedBooks) {
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function addReview(bookId, review) {
    return get(bookId)
        .then(book => {
            if (!book.reviews) book.reviews = []
            book.reviews.push(review)

            return save(book)
        })
}

function removeReview(bookId, reviewIdx) {
    return get(bookId)
        .then(book => {
            if (!book.reviews) return
            book.reviews.splice(reviewIdx, 1)

            return save(book)
        })
}
function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)

        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]

        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id

        return book
    })
}

function getGoogleBooks(search) {
    if (!search) return Promise.resolve([])

    const key = search.trim().toLowerCase()
    if (gGoogleBooksCache[key]) return Promise.resolve(gGoogleBooksCache[key])

    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${encodeURIComponent(search)}`

    return axios.get(url)
        .then(res => {
            const books = _formatGoogleBooks(res.data.items || [])

            gGoogleBooksCache[key] = books
            utilService.saveToStorage(CACHE_STORAGE_KEY, gGoogleBooksCache)

            return books
        })
}

function _formatGoogleBooks(googleBooks) {
    return googleBooks.map(googleBook => {
        const { volumeInfo } = googleBook

        const book = {
            id: googleBook.id,
            title: volumeInfo.title,
            description: volumeInfo.description || '',
            pageCount: volumeInfo.pageCount,
            authors: volumeInfo.authors || [],
            categories: volumeInfo.categories || [],
            publishedDate: volumeInfo.publishedDate,
            language: volumeInfo.language,
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: 'EUR',
                isOnSale: Math.random() > 0.7
            },
            reviews: []
        }

        if (volumeInfo.imageLinks) book.thumbnail = volumeInfo.imageLinks.thumbnail

        return book
    })
}


function addGoogleBook(book) {
    return query()
        .then(books => {
            const isBookExist = books.some(currBook => currBook.id === book.id)
            if (isBookExist) return null

            return storageService.post(BOOK_KEY, book, false)
        })
}

function _getBookCountByCategoryMap(books) {
    const bookCountByCategoryMap = books.reduce((map, book) => {
        book.categories.forEach(category => {
            if (!map[category]) map[category] = 0
            map[category]++
        })
        return map
    }, {})

    return bookCountByCategoryMap
}

function getCategoryStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByCategoryMap = _getBookCountByCategoryMap(books)

            const data = Object.keys(bookCountByCategoryMap)
                .map(category => ({
                    title: category,
                    value: Math.round((bookCountByCategoryMap[category] / books.length) * 100)
                }))

            return data
        })
}