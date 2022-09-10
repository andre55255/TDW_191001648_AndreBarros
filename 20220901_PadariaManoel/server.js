const app = require("./src/app");
const PORT_SERVER = process.env.PORT_SERVER || 8081;

app.listen(PORT_SERVER, 
    () => console.log(`Listening port ${PORT_SERVER}`));