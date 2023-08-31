import express from 'express';
import controller from '../controllers/author';
import {Schemas, ValidateSchema } from '../middleware/ValidateSchema'
const router = express.Router();

router.post('/create/author', ValidateSchema(Schemas.author.create) , controller.createAuthor);
router.get('/get/:authorId', controller.getAuthorById);
router.get('/get/', controller.getAllAuthor);
router.patch('/update/:authorId', ValidateSchema(Schemas.author.create), controller.updateAuthor);
router.delete('/delete/:authorId', controller.deleteAuthor);
export = router;