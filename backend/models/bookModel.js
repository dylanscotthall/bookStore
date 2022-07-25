import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
    {
        name: {type: String},
        author: {type: String},
        image: {type: String},
        description: {type: String},
    },
);

const Book = mongoose.model('Book', bookSchema);

export default Book;