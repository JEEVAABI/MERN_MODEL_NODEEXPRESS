const http = require('http');
const { parse } = require('querystring');

const server = http.createServer((request, response) => {
  const { method, url } = request;
  

  if (method === 'GET') {
    if (url === '/') {
      response.setHeader('Content-Type', 'text/plain');
      response.end('Hello, world!');
    } else if (url === '/users') {
      response.setHeader('Content-Type', 'application/json');
      const users = [
        { name: 'User 1', age: 25 },
        { name: 'User 2', age: 30 },
        { name: 'User 3', age: 35 }
      ];
      response.end(JSON.stringify(users));

  }
  
  if (method === 'POST') {
    if (url === '/users') {
      let body = '';
      
      request.on('data', (chunk) => {
        body += chunk.toString();
      });
      
      request.on('end', () => {
        const user = parse(body);
        response.statusCode = 201;
        response.end('User created successfully');
      });
    
    }
  }
  

  if (method === 'PUT') {
    if (url === '/users') {
      let body = '';
      
      request.on('data', (chunk) => {
        body += chunk.toString();
      });
      
      request.on('end', () => {
        const user = parse(body);
        response.statusCode = 200; 
        response.end('User updated successfully');
      });
    } 
  }
  
  if (method === 'DELETE') {
    if (url === '/users') {
    
      response.statusCode = 200; 
      response.end('User deleted successfully');
    } 
  }
}
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
