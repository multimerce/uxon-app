require('dotenv').config();
require('./config/db/mongooseConfig');
const app = require('./config/express/expressConfig');

const PORT = parseInt(process.env.BACKEND_PORT || process.env.NODE_PORT, 10);

app.listen(PORT, () => console.log(`Server started and listen port: ${PORT}`));