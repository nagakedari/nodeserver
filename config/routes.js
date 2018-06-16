var express = require('express'),
    path = require('path'),
    util = require('util');

    function Router (app, optional_resources){
        this.router = express.Router();

        this.routes = require(path.join(__dirname,'routes.json'));

        this.getRoutes();

        app.use(this.router);
    };

    Router.CONTROLLER_DIR = "../controllers/";

    Router.prototype.getController = function(name){
        var cntrl, err;
        try{
            cntrl = require(path.join(Router.CONTROLLER_DIR,name));
        } catch(e){
            err = e;            
        }
        if(!cntrl) {
            throw new Error(util.format('Could not load the controller: ', name, err));
        }

        return cntrl;
    };

    Router.prototype.getRoutes = function() {
        var controllers = Object.keys(this.routes);
            router = this.router;
        controllers.forEach(function(name){
            var routes = this.routes[name];
            var cntrl =  this.getController(name);
            if(cntrl) {
                routes.forEach(function(route){
                    var method = route.method,
                        path = route.path,
                        action = route.action,
                        callback = cntrl[action];
                    router[method](path, callback);
                });
            } else {
                throw new Error(util.format('Could not load the routes for the controller: ', name))
            }
        }, this);
    };

    module.exports = Router;