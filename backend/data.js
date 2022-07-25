import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Dylan Hall',
            email: 'dylanscotthall@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Ross Hatton',
            email: 'rossH@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        }
    ],
    books: [
        {
            name: 'Harry Potter',
            author: 'J.K. Rowling',
            image: '/images/hp.jpg',
            description:'this is description',
        },
        {
            name: 'Game of Thrones',
            author: 'George R.R. Martin',
            image: '/images/hp.jpg',
            description:'this is description',
        },
        {
            name: 'Hunger Games',
            author: 'Suzanne Collins',
            image: '/images/hp.jpg',
            description:'this is description',
        },
    ],
};

export default data;