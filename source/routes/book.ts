import express from 'express';
import controller from '../controllers/book';

const router = express.Router();

router.post('/create/book', controller.createBook);
router.get('/get/:bookId', controller.getBookById);
router.get('/get/', controller.getAllBooks);
router.patch('/update/:bookId', controller.updateBook);
router.delete('/delete/:bookId', controller.deleteBook)
export = router;