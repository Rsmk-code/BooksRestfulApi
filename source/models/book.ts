import mongoose, { Schema, model, Document, Types } from 'mongoose';
import logging from '../config/logging';

export interface IBook extends Document {
    title: string;
    author: string;
}
const BookSchema = new Schema<IBook>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true }
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
