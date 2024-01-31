const http = require('http')

let requestsCount = 0

const server = http.createServer((request, response)=> {

    switch (request.url){
        case '/favicon.ico':
            break;
        case '/students':
            response.write('Students');
            requestsCount++
            break;
        case '/courses':
            response.write('FONT + BACK')
            requestsCount++
            break;
        default:
            response.write('404')
            requestsCount++


    }
    response.write(' IBlaBlabla ' + requestsCount);
    response.end()
})

server.listen(3003)