import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import bookRouter from './routes/bookRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('connected to database');
})
.catch((err) => {
    console.log(err.message);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/seed', seedRouter);

app.use('/api/books', bookRouter);

app.use('/api/users', userRouter);

if (process.env.NODE_ENV === "production"){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
    });
}



app .use((err, req, res, next) => {
    res.status(500).send({message:err.message});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serving at http://localhost:${port}`);
});

