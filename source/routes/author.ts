import express from 'express';
import controller from '../controllers/author';

const router = express.Router();

router.post('/create/author', controller.createAuthor);
router.get('/get/:authorId', controller.getAuthorById);
router.get('/get/', controller.getAllAuthor);
router.patch('/update/:authorId', controller.updateAuthor);
router.delete('/delete/:authorId', controller.deleteAuthor);
export = router;