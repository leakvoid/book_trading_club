'use strict';

var path = process.cwd();
var MainController = require(path + '/app/controllers/main_controller.js');
var default_route = '/';

module.exports = function(app, passport) {

    var main_controller = new MainController();

    app.route('/')
        .get(main_controller.all_books);

    /* books */
    app.route('/all_books')
        .get(main_controller.all_books);

    app.route('/my_books')
        .get(main_controller.my_books);

    app.route('/add_book')
        .post(main_controller.add_book);

    app.route('/remove_book')
        .post(main_controller.remove_book);

    /* transactions */
    app.route('/inc_transactions')
        .get(main_controller.inc_transactions);

    app.route('/out_transactions')
        .get(main_controller.out_transactions);

    app.route('/init_transaction')
        .post(main_controller.init_transaction);

    app.route('/confirm_transaction')
        .post(main_controller.confirm_transaction);

    /*app.route('/cancel_transaction')
        .post(main_controller.cancel_transaction);*/

    /* settings */
    app.route('/settings')
        .get(main_controller.settings);

    /* authentication */
    app.route('/logout')
        .get(function(req, res) {
            req.logout();
            res.redirect(default_route);
        });

    app.route('/auth/github')
        .get(passport.authenticate('github'));

    app.route('/auth/github/callback')
        .get(passport.authenticate('github', {
            successRedirect: default_route,
            failureRedirect: default_route
        }));
};
