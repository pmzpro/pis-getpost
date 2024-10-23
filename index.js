var express = require('express'); //importação do módulo
var app = express(); //inicialização do módulo
const path = require('path');

app.use(express.static(__dirname + '/public')); // Para carregar os ficheiros da pasta public no browser

app.use(express.urlencoded({ extended: true }));

// Global array to store request counts for each route
let requestCounts = [];

// Middleware function to track and count requests
function routeCounterMiddleware(req, res, next) {
    const route = req.originalUrl; // Get the full URL requested by the client

    // Ignore requests to /favicon.ico
    if (route === '/favicon.ico') {
        return next(); // Skip further processing and go to the next middleware
    }
    
    // Find if the route already exists in the array
    let routeEntry = requestCounts.find(entry => entry.url === route);

    if (routeEntry) {
        // If the route exists, increment the counter
        routeEntry.count++;
    } else {
        // If the route doesn't exist, add it to the array with count 1
        requestCounts.push({ url: route, count: 1 });
    }

    console.log(`Pedido solicitado na rota ${route}: ${routeEntry ? routeEntry.count : 1} vezes`);

    next(); // Pass control to the next middleware or route handler
}

// Apply the request counter middleware to all routes
app.use(routeCounterMiddleware);

var rotas = require('./public/routes/rotas-forms.js');

app.use(['/rotas/processar-form-get-aluno', '/rotas/processar-form-post-aluno'], (req, res, next) => {
    const currentTime = new Date(); // Create a new Date object from the current time
    const formattedTime = currentTime.toLocaleTimeString(); // Format the time in a readable way (HH:MM:SS)

    console.log("Novo pedido recebido às: " + formattedTime);
    next();
});

app.use('/rotas', rotas);

app.listen(8080, () => {
    console.log("O server está atualizado e a funcionar corretamente na porta 8080");
});

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Serve a página index.html
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'erro.html'));
});