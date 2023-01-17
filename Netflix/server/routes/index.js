import express from "express";
import {
    Login,
    Register,
    Logout,
    AuthVerification,
} from "../controllers/AuthController.js";
import { GetBannerMovie, GetBestOfYear, GetMostPopular, GetMovieBySearch } from "../controllers/MovieController.js";
import { Auth, Guest } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/login', Guest, Login);
router.post('/register', Guest, Register);

router.get('/auth/verification', AuthVerification);

router.post('/logout', Auth, Logout);

router.get('/movie/most/popular', Auth, GetMostPopular);
router.get('/movie/banner', Auth, GetBannerMovie);
router.get('/movie/bestOfYear', Auth, GetBestOfYear);
router.get('movie/search/:search', Auth, GetMovieBySearch);

export default router;