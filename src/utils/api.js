import axios from 'axios';
import {getDomain} from 'utils/DomainUtils';
import React from "react";

const api = axios.create({
    baseURL: getDomain(),
    headers: {'Content-Type': 'application/json'}
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

function parseCommonErrors(error, title) {
    let response = {};
    if (error.message === 'Network Error') {
        response = {
            title: "I couldn't talk to the server!",
            description:
                <p>
                    I couldn't reach the backend, is it running?
                    <br/>
                </p>
        }
    } else if (error.response) {
        response = {
            title: "Something went wrong!",
            description:
                <p>
                    {error.response.data.message} <br/><br/>
                    <code>{error.response.data.status} {error.response.data.error}</code>
                </p>
        }
    }
    if (title) {
        response.title = title;
    }

    return response;
}

const getPlayerAvatar = (name, style) => {
    return `https://avatars.dicebear.com/v2/${style || 'bottts'}/${name}.svg`;
};

export {
    api,
    handleError,
    parseCommonErrors,
    getPlayerAvatar
};