import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';

const bookRouter = express.Router();

bookRouter.get('/', async (req,res) => {
    const books = await Book.find();
    res.send(books);
});

bookRouter.post('/add',
expressAsyncHandler(async (req,res) => {
    const newBook = new Book({
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        image: '/images/hp.jpg',
    });
    const book = await newBook.save();
    res.send({
        _id: book._id,
        name: book.name,
        author: book.author,
        description: book.description,
        image: '/images/hp.jpg',
        token: generateToken(book),
    });
}));

bookRouter.get('/:_id', async (req,res) => {
    const book = await Book.findOne({_id:req.params._id});
    if(book){
        res.send(book);
    }else{
        res.status(404).send({message: 'Book Not Found'});
    }
});

bookRouter.delete('/:_id', async (req,res) => {
    await Book.deleteOne({_id:req.params._id});
});


export default bookRouter;