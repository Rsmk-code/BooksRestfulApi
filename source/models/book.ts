import mongoose, { Schema, model, Document, Types } from 'mongoose';
import logging from '../config/logging';

export interface IBook {
    title: string;
    author: string;
}
export interface IBookModel extends IBook, Document{}
const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, required: true, ref:'Author' }
    },
    {
        timestamps: true
    }
);

BookSchema.post<IBook>('save', function () {
    logging.info('Mongo', 'Checkout the book we just saved: ', this);
});

const Book = model<IBook>('Book', BookSchema);
export default Book;
