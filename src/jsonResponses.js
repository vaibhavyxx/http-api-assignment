//sends a json
const respondJSON = (request, response, status, object) => {
    const content = JSON.stringify(object);
    response.writeHead(status, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(content, 'utf8'),
    });

    response.write(content);
    response.end();
};

//for a success status code
const success = (request, response) => {
    const responseJSON = {
        message: 'This is a successful response',
    };
    respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response) => {
    const responseJSON = {
        message: 'This request had the required parameters',
    };

    if(!request.query.valid || request.query.valid !== 'true'){
        responseJSON.message = 'Missing valid query parameters';
        responseJSON.id = 'badRequest';
        return respondJSON(request, response, 400, responseJSON);
    }
    return respondJSON(request, response, 200, respondJSON);
};

const notFound = (response, request) => {
    const responseJSON = {
        message: 'The page you are looking for was not found',
        id: 'notFound',
    };
    respondJSON(request, response, 404,responseJSON);
}

module.exports = {success, badRequest, notFound,};