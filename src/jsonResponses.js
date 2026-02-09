//sends a json
const getResponseType = (response) => {
  const accept = response.headers.get('accept');

  if (accept && accept.includes('text/xml')) {
    return 'xml';
  }

  return 'json'; // default
};

const respond = (request, response, status, content) => {
    const headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
    };
    response.writeHead(status, headers);
    response.write(content);
    response.end();
};

//helper function for writing messages
function respondMessage(msg, response) {
    //const type = getResponseType(response);
    /*if (type === 'xml') {
        return `<response><message>${msg}</message></response>`;
    }*/
    return JSON.stringify({ message: msg });
}

//for a success status code
const success = (request, response) => {
    //const type = getResponseType(response);
    const body = respondMessage('This is a successful response', request);

    respond(request, response, 200, body);
    //respond(request, response, 200, respondMessage('This is a successful response', response));
};

const badRequest = (request, response) => {
    //const type = getResponseType(response);

  if (!request.query.valid || request.query.valid !== 'true') {
    const body = respondMessage('Missing valid query parameters', request);
    return respond(request, response, 400, body);
  }

  const body = respondMessage('This request had the required parameters', request);
  return respond(request, response, 200, body);
//return respond(request, response, 200, res);
};

const notFound = (request, response) => {
    //const type = getResponseType(response);
    const body = respondMessage('The page you are looking for was not found', request);

    respond(request, response, 404, body);
}

module.exports = {success, badRequest, notFound,};