import {Request, Response, NextFunction, request} from 'express'
import mongoose from 'mongoose';
import Author from  '../models/author';

const createAuthor = (req: Request, res: Response, next: NextFunction)=>{
    const {name} = req.body;

    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name : name
    });

    return author
    .save()
    .then((result) =>{
        return res.status(201).json({
            author: result
        });
    })
    .catch((error)=>{
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};

const getAllAuthor =(req: Request, res: Response, next: NextFunction)=>{
    Author
    .find()
    .exec()
    .then((authors)=>{
        return res.status(200).json({
            authors: authors,
            count: authors.length
        });
    })
    .catch((error)=>{
        return res.status(500).json({
            message: error.message,
            error
        });
    });
    
};

const getAuthorById = (req: Request, res: Response, next: NextFunction)=>{
    const authorId = req.params.authorId;

    return Author
        .findById(authorId)
        .then((author)=>{
            author ? res.status(200).json({author}): res.status(404).json({
                message: 'Not found'
            })
        })
        .catch((error) =>{
            res.status(500).json({
                message: error.message,
                error
            })
        })
}

const updateAuthor = (req: Request, res: Response, next: NextFunction) =>{
    const authorId = req.params.authorId;

    return Author.findById(authorId)
    .then ((author)=>{
        if (author){
            author.set(req.body);
        
            return author
                .save()
                .then((result)=>{
                    return res.status(201).json({
                        author: result
                    })
                })
                .catch((error) =>{
                    return res.status(500).json({
                        message: error.message,
                        error
                    })
                })
        } else{
            res.status(404).json({message: 'Not found'})
        }
    })
    .catch((error) => res.status(500).json({message: error.message, error}))
}
   
const deleteAuthor = (req: Request, res: Response, next: NextFunction)=>{
    const authorId = req.params.authorId;

    return Author.findByIdAndDelete(authorId)
    .then((author)=>
        author
            ? res.status(201).json({message:'deleted'})
            : res.status(404).json({ message: 'Not found'})
    )
    .catch((error)=>{
        res.status(500).json({
            message: error.message,
            error
        })
    })
}

export default { createAuthor, getAuthorById, getAllAuthor, updateAuthor, deleteAuthor}