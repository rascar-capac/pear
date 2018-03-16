const dbConnection = require('./db-connection');
const Session = require('../models/session');
const NotFound = require('../errors').NotFound;
const BadGateway = require('../errors').BadGateway;

function getAllSessions(req, next) {
    dbConnection.connect(function(err, db) {
        if(err) {
            return next(new BadGateway('The connection to MongoDB server has failed'));
        }
        else {
            Session.find(req.query, function(err, sessions) {
                db.close();
                if(!err) {
                    console.log(`${sessions.length} document(s) returned` +
                            ` from ${Session.collection.name} in ${Session.db.name}\n`);
                    console.log(`${sessions}\n`);
                }
                return next(err, sessions);
            });
        }
    });
}

function getSession(req, next) {
    dbConnection.connect(function(err, db) {
        if(err) {
            return next(new BadGateway('The connection to MongoDB server has failed'));
        }
        else {
            var id = req.params.sessionID;
            if(id == 'last')
                Session.findOne(req.query).sort('-_id').exec(processResult);
            else
                Session.findById(id, processResult);

            function processResult(err, session) {
                db.close();
                if(!session)
                    err = new NotFound(`The session with id ${id} could not be found`, session);
                if(!err) {
                    console.log(`1 document returned from ${session.collection.name}` +
                            ` in ${session.db.name}\n`);
                    console.log(`${session}\n`);
                }
                return next(err, session);
            }
        }
    })
}

function createSession(session, next) {
    dbConnection.connect(function(err, db) {
        if(err) {
            return next(new BadGateway('The connection to MongoDB server has failed'));
        }
        else {
            session.save(function(err, session) {
                db.close();
                if(!err) {
                    console.log(`1 document inserted into ${session.collection.name}` +
                            ` in ${session.db.name}\n`);
                    console.log(`${session}\n`);
                }
                return next(err, session);
            });
        }
    });
}

module.exports.getAllSessions = getAllSessions;
module.exports.getSession = getSession;
module.exports.createSession = createSession;
