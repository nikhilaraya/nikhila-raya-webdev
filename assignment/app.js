var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/summer2_2017';
mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/widget.service.server');
require('./services/page.service.server');