const express = require('express');
const { initialDatabase } = require('../config/database');
const { initViewEngine } = require('../config/hbs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./router');
const { auth } = require('./middlewares/middleware');
const app = express();
const port = process.env.PORT || 3030;

initViewEngine(app);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(auth);
app.use(router);

initialDatabase()
    .then(() => {
        console.log("Database initialized successfully!");
        app.listen(port, () => console.log(`Server is working at: http://localhost:${port}`));
    })
    .catch((error) => {
        console.log("Database error: " + error.message);
    });

