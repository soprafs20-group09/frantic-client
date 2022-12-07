
/*
* This helper function returns a flag stating the current environment.
* If an environment variable is found with NODE_ENV set to true, (e.g. in Heroku)
* then it is a prod environment.
* Otherwise, dev.
 */
const isProduction = () => {
    return process.env.NODE_ENV === "production";
};

/**
 * This helper function returns the current domain of the API.
 * If the environment is production, the production Heroku URL will be returned.
 * Otherwise, the link localhost:8080 will be returned (Spring server default port).
 * @returns {string}
 */
const getDomain = () => {
    const prodUrl = 'https://backend.frantic.online/';
    const devUrl = 'http://localhost:8080/';

    return isProduction() ? prodUrl : devUrl;
};

export {
    isProduction,
    getDomain
};
