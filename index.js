const server = require('./api/server');

const port = 3003;

// START YOUR SERVER HERE
server.listen(port, () => {
    console.log("Server started on http://localhost:3003")
})