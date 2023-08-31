import express from 'express';
import controller from '../controllers/book';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create/book', ValidateSchema(Schemas.book.create), controller.createBook);
router.get('/get/:bookId', controller.getBookById);
router.get('/get/', controller.getAllBooks);
router.patch('/update/:bookId', ValidateSchema(Schemas.book.update), controller.updateBook);
router.delete('/delete/:bookId', controller.deleteBook)
export = router;