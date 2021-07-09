import bcrypt from 'bcrypt';

const data = {
    users: [
        {
            name: "ewer",
            password: bcrypt.hashSync('1234', 8),
            email: "ewer@gmail.com",
            isAdmin: true
        }
    ],
    memes: [ 
        {
            tittle: "test",
            description: "test",
            creator: "test12",
            file: "test",
            likes: ["test", "test2"]
        }
    ]
};

export default data;