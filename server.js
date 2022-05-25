const router = require('express').router();
const sequelize = require('sequelize');

const PORT = process.env.PORT || 3001;



router.listen(PORT, 'localhost', () => {
    console.log(`The server is listening at Port: ${PORT}`);
})
