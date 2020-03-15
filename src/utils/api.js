import axios from 'axios';
import { getDomain } from 'utils/DomainUtils';

const api = axios.create({
    baseURL: getDomain(),
    headers: { 'Content-Type': 'application/json' }
});

const handleError = error => {
    if (error.response) {
        let info = '';
        info += `\nrequest to: ${error.response.request.responseURL}`;
        info += `\nstatus code: ${error.response.status}`;
        info += `\nstatus text: ${error.statusText}`;
        info += `\nerror: ${error.response.data.error}`;
        info += `\nerror message: ${error.response.data.message}`;

        console.error('The request was made and answered but was unsuccessful.', error.response);
        return info;
    } else {
        if (error.message.match(/Network Error/)) {
            console.error('The server cannot be reached. Is it running?');
            return error.message;
        }

        console.error('An unknown error happened.', error);
        return error.message;
    }
};

export {
    api,
    handleError
}