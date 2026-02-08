const { request } = require("http");

//sends a json
const respond = (request, response, status, object, isJSON) => {
    let content;
    if (isJSON) {
        content = JSON.stringify(object);
    } else {
        content = object; // already a string (XML, text, etc.)
    }
    const headers = {
    'Content-Type': isJSON ? 'application/json' : 'text/xml',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
    };
    response.writeHead(status, headers);
    response.write(content);
    response.end();
    //console.log(content);
};

const unauthorized = (request, response) => {
    const responseJSON = {
        message: 'Missing loggedIn query parameter set to yes',
    };
    if(!request.unauthorized.valid || request.unauthorized.valid !== 'true'){
        responseJSON.message = 'Missing loggedIn query parameter set to yes';
    }
    respond(request, response, 200, responseJSON, true);
}

//for a success status code
const success = (request, response) => {
    const responseJSON = {
        message: 'This is a successful response',
    };
    respond(request, response, 200, responseJSON, true);
};

const responseXML= (request, response, responseJSON) => {
    if(request.acceptedTypes[0] === 'text/xml'){
        let responseXML = `<response>${responseJSON.message}</response>`
        return respond(request, response, 200, responseXML, false);
    }
}

const badRequest = (request, response) => {
    const responseJSON = {
        message: 'This request had the required parameters',
    };

    if(!request.query.valid || request.query.valid !== 'true'){
        responseJSON.message = 'Missing valid query parameters';
        responseJSON.id = 'badRequest';
        return respond(request, response, 400, responseJSON, true);
    }
    return respond(request, response, 200, responseJSON, true);
};

const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found',
        id: 'notFound',
    };
    respond(request, response, 404,responseJSON, true);
}

module.exports = {success, badRequest, notFound,};