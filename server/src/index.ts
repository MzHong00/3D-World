import expressLoader from 'loaders/express'
import webSocketLoader from 'loaders/webSocket'

async function server() {
    const http = expressLoader();
    webSocketLoader(http);    
}

server();