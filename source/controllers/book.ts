import  {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import Book from '../models/book';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    let { author, title } = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        author,
        title
    });

    return book
        .save()
        .then((result) => {
            return res.status(201).json({
                book: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
    Book.find()
        .populate('author')
        .select('-__v')
        .exec()
        .then((books) => {
            return res.status(200).json({
                books: books,
                count: books.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};


const getBookById = (req: Request, res: Response, next: NextFunction)=>{
    const bookId = req.params.bookId;

    return Book.findById(bookId)
        .populate('author')
        .select('-__v')
        .then((book) =>
            book
                ? res.status(200).json({ book })
                : res.status(404).json({
                      message: 'Not found'
                  })
        )
        .catch((error) => {
            res.status(500).json({
                message: error.message,
                error
            });
        });
}

const updateBook = (req: Request, res: Response, next: NextFunction)=>{
    const bookId = req.params.bookId;

    return Book.findById(bookId)
        .then((book) => {
            if (book) {
                book.set(req.body);

                return book
                    .save()
                    .then((result) => {
                        return res.status(201).json({
                            book: result
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            message: error.message,
                            error
                        });
                    });
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ message: error.message, error }));
}
const deleteBook = (req:Request, res: Response, next: NextFunction) =>{
    const bookId = req.params.bookId;

    return Book.findByIdAndDelete(bookId)
    .then((book) =>
        book
            ? res.status(201).json({ message: 'deleted' })
            : res.status(404).json({
                  message: 'Not found'
              })
    )
    .catch((error) => {
            res.status(500).json({
                message: error.message,
                error
            })
        })
}

export default { createBook, getAllBooks, getBookById, updateBook, deleteBook };
