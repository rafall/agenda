var User    = require('../models/user');
var _       = require('underscore');
var multer  = require('multer');
var path    = require('path');
var jwt = require('jsonwebtoken');

var users  = [];
var upload = multer( {dest: __dirname + '/../../app/assets/images'} );
// Testes
var secret = 'keyboard cat';

var firstUser = new User('Jeff', '1234', 'jeff@zeldman.com');
firstUser.addContact({id: 1, name: 'Alyssa Nicoll', email: 'alyssa@nicoll.com', phone: '55555555', photo: '/assets/images/QvqUlMKN'});
firstUser.addContact({id: 2, name: 'Jordan Wade'  , email: 'jordan@wade.com'  , phone: '88888888'});
users.push(firstUser);
// Fim dos Testes

function UserException(message) {
    this.message = message;
    this.name = "UserException";
}

function findUser(id) {
	var user = _.find(users, function(user) {
		return user.id === id;
	});

    if(user) {
        return user;    
    } else {
        throw new UserException('User not found!');
    }
}

function findUserByEmail(email) {
    var user = _.find(users, function(user) {
        return user.email === email;
    });

    if(user) {
        return user;    
    } else {
        throw new UserException('User ' + email + ' not found!');
    }
}

// Posso criar um middleware que sempre pega o usuário que
// fez a requisição e colocar no request (ou não)
// Mas fica pra depois

module.exports = function(app) {

    app.post('/login', function(request, response) {
        try {
            var user = findUserByEmail(request.body.email, 10);
            if(user.getPassword() != request.body.password) {
                response.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                
                var token = jwt.sign(user, secret, {
                    expiresIn: 60*60*24
                });
                
                response.json({
                    success: true,
                    message: 'Logged in!',
                    token: token,
                    user: user
                });
            }
        } catch(e) {
            response.json({
                success: false,
                message: e.message
            });
        }
        
    });

    app.post('/register', upload.any(), function(request, response) {
        var data = request.body;
        var newUser = new User(data.name, data.password, data.email);
        
        users.push(newUser);
        response.json({
            success: true,
            user: newUser
        });

    });

    // Deve ficar antes de todas as rotas que devem ser protegidas das batatas assassinas 
    app.use(function(request, response, next) {
        var token = request.body.token || request.query.token || request.headers['x-access-token'];

        if(token) {
            jwt.verify(token, secret, function(error, decoded) {
                if(error) {
                    return response.json( {
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    request.user = findUser(decoded.id);
                    next();
                }
            });
        } else {
            return response.status(403).json({
                success: false,
                message: 'Token not provided.'
            });
        }
    });

	app.get('/users/:id', function(request, response) {
		var user = request.user;

		user = {id: user.id, name: user.name, email: user.email};
		response.json(user);	
		
	});

	app.get('/users/:userid/contacts', function(request, response) {
		response.json(request.user.all());
	});

	app.post('/users/:userid/contacts', upload.any(), function(request, response) {
		var user = request.user;

		if(request.body === {}) {
			response.sendStatus(400);
		} else {
            var newContact = request.body;
            // Verifica se uma foto foi upada e se a extensão é válida
            if(request.files[0]) {
                var filetypes = /jpeg|jpg|png/;
                var extname = filetypes.test(path.extname(request.files[0].originalname));

                if(extname){
                    newContact.photo = '/assets/images/' + request.files[0].filename;
                    console.log(request.files[0]);
                } else {
                    console.log('Extension for file provided ' +  path.extname(request.files[0].originalname));
                    console.log('File extension did not match with ' + filetypes);
                    response.sendStatus(400);
                }
            }
            
			response.status(201).json(user.addContact(request.body));
		}
	});

	app.get('/users/:userid/contacts/:contactid', function(request, response) {
		var contact;
        var contactID = parseInt(request.params.contactid, 10);

        try {
            contact = request.user.get(contactID);
        } catch(e) {
            contact = undefined;
            console.log(e.message);
        }
        
		response.json(contact);
	});

	app.put('/users/:userid/contacts/:contactid', function(request, response) {
        var user;
        var contact;
        var status;

        try {
            contact = request.user.updateContact(parseInt(request.params.contactid), request.body);
            status = 200;
        } catch(e) {
            console.log(e.message);
            contact = undefined;
            status = 400;
        }

        response.status(status).json(contact);

	});

    app.delete('/users/:userid/contacts/:contactid', function(request, response) {
        var contactID = parseInt(request.params.contactid);

        response.json(request.user.delete(contactID));
    });
};