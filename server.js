const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/<app-name>'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/ds2022-30241-coblisan-george-assignment-1-fe/index.html'));});
app.listen(process.env.PORT || 8080);