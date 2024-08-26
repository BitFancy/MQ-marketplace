const jwt = require('jsonwebtoken');

module.exports = function(res)
{
	let module = {};
	
	module.payload = function(success, code, msg, data)
	{
		var dt = new Date( );
		return JSON.stringify
		({
			"result":
			{
				"success": success,
				"message": msg,
				"data": data,
				//"code": code
			} ,
			//"code": 200 ,
            "code": code,
			"time": dt.getTime( )
		});
	};
	
	module.timeout = function(code, msg, data)
	{
		var dt = new Date( );
		return JSON.stringify
		({
			"result":
			{
				"success": false ,
				"message": msg ,
				"data": data ,
				//"code": code
			} ,
			//"code": 408 ,
            "code": code,
			"time": dt.getTime( )
		});
	};
	
	module.notFound = function(msg, data)
	{
		var dt = new Date( );
		return JSON.stringify
		( {
			"result":
			{
				"success": false,
				"message": msg,
				"data": data
			} ,
			"code": 404 ,
			"time": dt.getTime( )
		} );
	};
	
	module.output = function(data, code, headers)
	{
		if(headers && code)
		{
			res.header('Content-Type', headers);
			res.status(code).send(data);
		}
		else if(code)
		{
			res.status(code).end(data);
		}
		else
		{
			res.end(data);
		}
	};

	module.buildJwToken = function(payload, options = { expiresIn: '10y' }) {

		const token = jwt.sign
		(
		  	{ 
				//userId: (payload?.sid ?? null), 
				address: (payload?.address ?? null),
				wallet: (payload?.wallet ?? null),
				auth_type: (payload?.auth_type ?? null),
				//particle_token: (payload?.particle_token ?? null),
				//particle_uuid: (payload?.particle_uuid ?? null),
		  	}, 
		  	process.env.JWT_SECRET,
		  	options
		);
		const decodedToken = jwt.decode(token);
		/*const timestamp = jwt_data.iat;
		const date = new Date(timestamp * 1000);
		console.log(date.toISOString()); */
		const jwt_data = {
			iat: decodedToken.iat,
			exp: decodedToken.exp,
			token: token,
			refresh_token: null
		  };
		return jwt_data;
	};

		/*module.buildJwToken = function(data)
	{
		const token = jwt.sign
		(
		  { 
			userId: (data?.sid ?? null), 
			address: (data?.address ?? null),
			//provider: (data?.provider ?? null),
			//particle_token: (data?.particle_token ?? null),
			//particle_uuid: (data?.particle_uuid ?? null),
		  }, 
		  process.env.JWT_SECRET,
		  //{ expiresIn: '1h' }
		);
		return token;
	};*/
	
	return module;
};