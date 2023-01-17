import axios from 'axios';

export const GetMostPopular = async (req, res) => {
    try {
        const response = await axios.get(process.env.TMDB_API_URL + '/discover/movie?sort_by=popularity.desc&api_key=' + process.env.TMDB_API_KEY);

        return res.status(200).json({
            message: "Most popular movies",
            data: response.data.results
        });
    } catch (err) {
        return res.status(400).json({
            message: "Unable to get most popular movies",
            data: err
        });
    }
}

export const GetBannerMovie = async (req, res) => {
    try {
        const randomNumber = Math.floor(Math.random() * (600 - 400 + 1) + 400);
        const response = await axios.get(process.env.TMDB_API_URL + '/movie/' + randomNumber + '?api_key=' + process.env.TMDB_API_KEY);

        return res.status(200).json({
            message: "Banner movie",
            data: response.data
        });
    } catch (err) {
        return res.status(400).json({
            message: "Unable to get banner movie",
            data: err
        });
    }
};

export const GetBestOfYear = async (req, res) => {
    try {
        const response = await axios.get(process.env.TMDB_API_URL + '/discover/movie?primary_release_year=' + new Date().getFullYear + '&sort_by=vote_average.desc&api_key=' + process.env.TMDB_API_KEY);

        return res.status(200).json({
            message: "Best movies of the year",
            data: response.data.results
        });
    } catch (err) {
        return res.status(400).json({
            message: "Unable to get best movies of the year",
            data: err
        });
    }
};

export const GetMovieBySearch = async (req, res) => {
    try {
        const response = await axios.get(process.env.TMDB_API_URL + '/search/movie?api_key=' + process.env.TMDB_API_KEY + '&query=' + req.params.search);

        return res.status(200).json({
            message: "Movies by search",
            data: response.data.results
        });
    } catch (err) {
        return res.status(400).json({
            message: "Unable to get movies by search",
            data: err
        });
    }
}