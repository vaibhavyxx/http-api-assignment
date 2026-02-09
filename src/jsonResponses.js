const respond = (request, response, status, content, type) => {
  response.writeHead(status, {
    'Content-Type' : type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  response.write(content);
  response.end();
};

const jsonXMLData = (request, response, status, msg) => {
  const accept = request.headers.accept || 'application/json';

  const data = {
    message: msg,
  }
  if(accept.includes('text/xml')){
    let responseXML = `<response><message>`
      responseXML += data.message;
      responseXML += `</message></response>`;
    return respond(request, response, status, responseXML, 'text/xml');
  }
  else{
    const dataJSON = JSON.stringify(data);
    return respond(request, response, status, dataJSON, 'application/json');
  }
}

const success = (request, response) => {
  jsonXMLData(request, response, 200, 'This is a successful response');
};

const notFound = (request, response) => {
  jsonXMLData(request, response, 404, 'The page you are looking for was not found');
}

const unauthRequest = (request, response) => {

}

const forbiddenRequest = (request, response) => {
  jsonXMLData(request, response, 403, "Mssing loggedIn query param set to yes");
}

const internalRequest = (request, response) => {
  jsonXMLData(request, response, 500, "Internal Server Error. Something Went Wrong");
}

const notImplementedReq = (request, response) => {
  jsonXMLData(request, response, 501, "A get reuqest for this page has not been implemented yet. Check again later for updated content.");
}

const badRequest = (request, response) => {
  const accept = request.headers.accept || 'application/json';

  if (!request.query.valid || request.query.valid !== 'true') {
    //jsonXMLData(request, response, 400, 'The page you are looking for was not found');
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

  jsonXMLData(request, response, 200, 'This request had the required parameters');
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
module.exports = {success, badRequest, notFound, notImplementedReq, unauthRequest, forbiddenRequest, internalRequest};