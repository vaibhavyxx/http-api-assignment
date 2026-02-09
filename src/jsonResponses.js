const respond = (request, response, status, content, type) => {
  response.writeHead(status, {
    'Content-Type' : type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  response.write(content);
  response.end();
};

const success = (request, response) => {
  const accept = request.headers.accept || 'application/json';

  const data = {
    message: 'This is a successful response'
  }
  if(accept.includes('text/xml')){
    let responseXML = `<response>`
      responseXML += data.message;
      responseXML += `</response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  else{
    const dataJSON = JSON.stringify(data);
    return respond(request, response, 200, dataJSON, 'application/json');
  }
};

const notFound = (request, response) => {
  const accept = request.headers.accept || 'application/json';

  const data ={
    message: 'The page you are looking for was not found',
  }
  if(accept.includes('text/xml')){
    let responseXML = `<response>`
      responseXML += data.message;
      responseXML += `</response>`;
    return respond(request, response, 404, responseXML, 'text/xml');
  }
  else{
    const dataJSON = JSON.stringify(data);
    return respond(request, response, 404, dataJSON, 'application/json');
  }
}

const badRequest = (request, response) => {
  const accept = request.headers.accept || 'application/json';

  if (!request.query.valid || request.query.valid !== 'true') {
    const data ={
      message: 'The page you are looking for was not found',
    }

    if(accept.includes('text/xml')){
      let responseXML = `<response>`
      responseXML += data.message;
      responseXML += `</response>`;
      return respond(request, response, 400, responseXML, 'text/xml');
    }
    else{
      const dataJSON = JSON.stringify(data);
      return respond(request, response, 400, dataJSON, 'application/json');
    }
  }

  const dataParam ={
      message: 'This request had the required parameters',
    }
    if(accept.includes('text/xml')){
      let responseXML = `<response>`
      responseXML += data.message;
      responseXML += `</response>`;
      return respond(request, response, 200, responseXML, 'text/xml');
    }else{
      const dataJSON = JSON.stringify(data);
      return respond(request, response, 200, dataJSON, 'application/json');
    }
}
module.exports = {success, badRequest, notFound,};