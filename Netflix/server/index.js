import express from "express";
import cors from "cors";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";

import db from "./config/Database.js";
import router from "./routes/index.js";

const app = express();

// Migrate database
// (async()=>{
//     await db.sync();
// })();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000
});

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use(express.json());

app.use('/api', router);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});