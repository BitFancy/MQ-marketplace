require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { body, query, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const reqHandler = require('./helpers/request')();
const responseCodes = require('./config/response_codes.json');
const cors = require('cors');
const models = require('./models/user');
const path = require('path');

app.use(cors());

Database = require('./helpers/database');

//app.get('/ip', (request, response) => response.send(request.ip));
//app.get('/x-forwarded-for', (request, response) => response.send(request.headers['x-forwarded-for']));

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      let result = req.resHandler.payload(false, 400, res.response_codes['400'], { errors: errors.array() });
      return req.resHandler.output(result, 200, 'application/json');
  }
  next();
};

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 60000,
};
const db = new Database(dbConfig);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, UUID');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS'){
    res.sendStatus(200);
  } 
  else {
    next();
  }
});

app.use((req, res, next) => {

  if (req.method === 'OPTIONS') {
    next(); // Skip the redirect for OPTIONS requests
  } 
  else if (req.path.substr(-1) !== '/' && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    res.redirect(307, req.path + '/' + query);
  } 
  else {
    next();
  }
});

// various listeners
app.use((req, res, next) => {

  //res.reqHandler = reqHandler;
  res.response_codes = responseCodes;
  //req.db = db;
  req.session = Math.random().toString(36).substring(2 , 12);
	req.logger = require('./helpers/logger')(req.session);
	req.resHandler = require('./helpers/response')(res);
  req.models = [];
  req.models.user = require('./models/user')(req, db);
	req.logger.request('Started processing ' + req.method + 
    ' request from ' + req.socket.remoteAddress + ' => ' + req.url);
	res.on('finish', function() {
		req.logger.request('Finished processing ' + req.method + 
      ' request from ' + req.socket.remoteAddress + ' => ' + req.url);
	});
	res.on('timeout', function() {
		req.logger.error( 'Request timeout ' + 
			req.socket.remoteAddress + ' => ' + req.url );
    let result = req.resHandler.timeout(408, responseCodes['408'], {});
		res.header('Content-Type', 'application/json');
		res.status(408).send(result);
	});
	res.on('close', function() {
		req.logger.simple('Closed connection');
	});
	next();
});

if (process.env.ENVIRONMENT === 'prod'){

  // Apply the rate limiter to all requests
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
    handler: (req, res, next) => {
      let result = req.resHandler.payload(false, 429, res.response_codes['429'], {});
      req.resHandler.output(result, 429, 'application/json');
    }
  }));
}
/*
** method: GET
** uri: /-sds6spfffrfnulscabbo

app.get('/', (req, res) => {
  let result = req.resHandler.payload(true, 200, "nft market api", {});
  req.resHandler.output(result, 200, 'application/json');
  
});
/*
** method: GET
** uri: /env
*/
app.get('/env', (req, res) => {
  
  let result = req.resHandler.payload(true, 200, "nft market api", { env: process.env.ENVIRONMENT });
  req.resHandler.output(result, 200, 'application/json');
});
/*
** method: POST
** uri: /authenticate-user/
** description: Authenticates a user with one of the given authentication types
** params: address, wallet, auth_type (particle|wallet), ? particle[token, uuid], ? wallet[message, signature]
** return: user details and jwt data
*/
app.post('/authenticate-user', [
  body('address').notEmpty().withMessage('`address` is required and cannot be empty'),
  body('auth_type').notEmpty().withMessage('`auth_type` is required and cannot be empty'),
  body('wallet').notEmpty().withMessage('`wallet` is required and cannot be empty'),
],  handleValidationErrors, reqHandler.checkUserAuthentication, async (req, res) => {
  try {
    let user = await req.models.user.single(req.body.address); 
    
    if (!user) {
      const new_user_data = {
        address: req.body.address,
        wallet: req.body.wallet,
        email: (req?.user?.email ?? null),
        firstname: (req?.user?.firtstname ?? null),
        lastname: (req?.user?.lastname ?? null),
        phone: (req?.user?.phone ?? null),
        status: 1
      };
      let newuser = await req.models.user.create(new_user_data);
      user = newuser;
    }
    console.log(user);
    if (user) {

      if (user.status == 0) {
        let result = req.resHandler.payload(false, 601, res.response_codes['601'], {});
        return req.resHandler.output(result, 601, 'application/json');
      }

      if(req.body.wallet != user.wallet) {
        await req.models.user.update(user.id, { wallet: req.body.wallet });
        user.wallet = req.body.wallet;
      }

      user.particle_token = (req.body.token) ? req.body.token : null;
      user.particle_uuid =  (req.body.uuid) ? req.body.uuid : null;
      const response = {
        ...req.models.user.sanitize(user),
        auth_type: req.body.auth_type
      };
      response.jwt_data = req.resHandler.buildJwToken(response);
      let result = req.resHandler.payload(true, 200, "Success retrieving user data", response);
      console.log(result);
      return req.resHandler.output(result, 200, 'application/json');
    }
    let result = req.resHandler.payload(false, 600, res.response_codes['600'], {});
    return req.resHandler.output(result, 200, 'application/json');

  } catch (err) {
    req.logger.error('Error retrieving user data:', err);
    let errorResult = req.resHandler.payload(false, 500, "Internal Server Error", {});
    return req.resHandler.output(errorResult, 500, 'application/json');
  }
});
/*
** method: PUT
** uri: /user/details:address
** params: art_name, avatar
*/
app.put('/user/details/:address', reqHandler.verifyJwtToken, 
[
  body('art_name').notEmpty().withMessage('`art_name` is required and cannot be empty'),
], handleValidationErrors, async (req, res) => {

  const address = req.params.address;
  const expectedParams = ['art_name', 'avatar'];
  const userData = expectedParams.map(param => req.body[param] || '');
  //userData.push(req.user.email); // Add req.user.email to userData
  const [art_name, avatar] = userData;
  let user = null;

  if (art_name !== 'unnamed') {
    user = await req.models.user.single({art_name: art_name}); 
    if (user && user.address !== address) {
      let result = req.resHandler.payload(false, 602, res.response_codes['602'], {});
      return req.resHandler.output(result, 200, 'application/json');
    }
  }

  try {

    user = await req.models.user.single({address: address}); 

    if (!user) {
      let result = req.resHandler.payload(false, 600, res.response_codes['600'], {});
      return req.resHandler.output(result, 500, 'application/json');
    }

    const data = {
      art_name: art_name,
      avatar: avatar
    };
    let update = await req.models.user.update(user.id, data);

    if (!update) {
      req.logger.error('Error updating user:', error);
      let result = req.resHandler.payload(false, 500, res.response_codes['500'], {});
      return req.resHandler.output(result, 500, 'application/json');
    }

    user = await req.models.user.single({address: address}); 
    //const sanitizedData = data.map(({ id, ...rest }) => rest);
    const sanitizedData =  req.models.user.sanitize(user, req.models.user.formSchema);
    let result = req.resHandler.payload(true, 200, 'User updated successfully', sanitizedData);
    return req.resHandler.output(result, 200, 'application/json');

  } catch (error) {
    req.logger.error('Error updating user:', error);
    let result = req.resHandler.payload(false, 500, res.response_codes['500'], {});
    return req.resHandler.output(result, 500, 'application/json');
  }
});
/*
** method: get
** uri: /user/check-artname
** params: art_name, address
*/
app.get('/user/check-artname', reqHandler.verifyJwtToken, 
[
  query('art_name').notEmpty().withMessage('`art_name` is required and cannot be empty'),
  query('address').notEmpty().withMessage('`address` is required and cannot be empty')

], handleValidationErrors, async (req, res) => {

  try {

    const art_name = req.query.art_name.toLowerCase();
    const address = req.query.address;

    if (art_name === "unnamed"){
      let result = req.resHandler.payload(true, 200, "Default artname", {});
      return req.resHandler.output(result, 200, 'application/json');
    }

    const user = await req.models.user.single({art_name: art_name}); 

    if (user && user.address !== address) {
      let result = req.resHandler.payload(false, 602, res.response_codes['602'], {});
      return req.resHandler.output(result, 200, 'application/json');
    }

    let result = req.resHandler.payload(true, 200, "Artname does not exist", {});
    return req.resHandler.output(result, 200, 'application/json');

  } catch (error) {
    req.logger.error('Error checking user `art_name`:', error);
    let result = req.resHandler.payload(false, 500, res.response_codes['500'], {});
    return req.resHandler.output(result, 500, 'application/json');
  }
});
/*
** method: GET
** uri: /check-jwt-token
*/
app.get('/check-jwt-token', reqHandler.verifyJwtToken, async(req, res) => {

  const jwt_data = req.jwt_data;
  console.log(jwt_data);
  const timestamp = jwt_data.exp;
  const date = new Date(timestamp * 1000);
  console.log(date.toISOString()); 
  const timestamp1 = jwt_data.iat;
  const date1 = new Date(timestamp1 * 1000);
  console.log(date1.toISOString()); 
  let result = req.resHandler.payload(true, 200, res.response_codes['200'], {});
  return req.resHandler.output(result, 200, 'application/json');
});
/*
** method: GET
** uri: /user/details/:sid
*/
app.get('/user/details/:address', async (req, res) => {

  try {
    const userData = await db.query('SELECT * FROM users WHERE address = ? AND status = ?', [req.params.address, 1]);
    if (userData.length == 0) {
      let result = req.resHandler.payload(false, 600, res.response_codes['600'], {sid:req.params.address, address:req.params.address, art_name: 'unnamed', avatar: null, listings: {}});
      return req.resHandler.output(result, 500, 'application/json');
    }
    const data = {
      sid: userData[0].address,
      address: userData[0].address,
      avatar: userData[0].avatar,
      //description: userData[0].description,
      //date_inserted: listing[0].date_inserted
      art_name: ((userData[0].art_name) ? userData[0].art_name : 'unnamed'),
      listings: {}
    }
    let result = req.resHandler.payload(true, 200, 'User data retrieved successfully', data);
    return req.resHandler.output(result, 200, 'application/json');
  
  } catch (error) {
    req.logger.error('Error inserting listing:', error);
    let result = req.resHandler.payload(false, 500, res.response_codes['500'], {});
    return req.resHandler.output(result, 500, 'application/json');
  }
});

// *** The 404 Route, last route ***
// app.all('*', (req , res) => {
//   let msg = 'No service is associated with the url => ' + req.url;
// 	req.logger.error(msg);
// 	let result = req.resHandler.notFound(msg, {});
// 	res.header('Content-Type', 'application/json');
//   console.log(msg);
// 	res.status(404).send(result);	
// });

app.use(function(err, req, res, next) {
	logger = require('./helpers/logger')(req.session);
	let error = (err.hasOwnProperty('stack')) ? err.stack.split("\n", 1).join("") : err;
	logger.error(((err.hasOwnProperty('stack')) ? err.stack : err));
	result = req.resHandler.payload(false, 500, responseCodes['500'], {});
	res.header('Content-Type', 'application/json');
	res.status(500).send(result);	
});

const port = process.env.SERVICE_PORT || 5000;
const host = process.env.SERVICE_ADDRESS || '0.0.0.0';
const timeout = parseInt(process.env.TIMEOUT);

app.listen(port,() => {
	let start_time = new Date( );
	console.log('\x1b[35m%s\x1b[0m', '[' + start_time.toString() + 
		        '] Node server running on http://' + host + ':' + port);
	
});