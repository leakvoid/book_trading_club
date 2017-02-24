'use strict';

var Users = require('../models/users.js');
var Transactions = require('../models/transactions.js');
var mongoose = require('mongoose');

function MainController() {

    /* db */
    function find_all_books(callback) {
        Users
            .find({})
            .exec( function(err, users) {
                if(err)
                    return callback(err);

                var all_books = users.reduce( function(prev, next) {
                    return prev.concat(next.books);
                }, []);

                callback(null, { 'users': users, 'books': all_books });
            });
    }

    function find_user(user_id, callback) {
        Users
            .findOne({ '_id': user_id })
            .exec( function(err, user) {
                if(err)
                    return callback(err);

                callback(null, { 'user': user });
            });
    }

    function save_book(relations, new_book, callback) {
        relations.user.books.push( new_book );
        relations.user.save( function(err, save_res) {
            if(err)
                return callback(err);

            var last_insert_book = save_res.books[save_res.books.length - 1];
            callback(null, { 'user': save_res, 'book': last_insert_book });
        });
    }

    function delete_book(relations, book_id, callback) {
        relations.user.books.pull( book_id );
        relations.user.save( function(err) {
            if(err)
                return callback(err);

            callback(null);
        });
    }

    function find_out_transactions(seller_id, callback) {
        //t.buyer_name;
        //t.book_name;
        //t.is_accepted;
        //t.id;
    }

    function find_inc_transactions(buyer_id, callback) {
        //t.seller_name;
        //t.book_name;
        //t.is_accepted;
        //t.id;
    }

    function save_transaction(data, callback) {
        //data.user_id;
        //data.book_id;
    }

    function update_transaction_status(data, callback) {
        //data.transaction_id;
        //data.is_accepted;
    }

    /* books */
    this.all_books = function(req, res) {
        find_all_books( function(err, fab_res) {
            if(err) throw err;

            res.render('main/all_books',
                       { 'title': 'All Books',
                         'auth_status': req.isAuthenticated(),
                         'book_list': fab_res.books });
        });
    };

    this.my_books = function(req, res) {
        find_user( req.user._id, function(err, fu_res) {
            if(err) throw err;

            res.render('main/my_books',
                       { 'title': 'My Books',
                         'auth_status': req.isAuthenticated(),
                         'book_list': fu_res.user.books });
        });
    };

    this.add_book = function(req, res) {
        find_user( req.user._id, function(err, fu_res) {
            if(err) throw err;

            save_book( fu_res, { 'name': req.body.book_name }, function(err, sb_res) {
                if(err) throw err;

                res.redirect('/my_books');
            });
        });
    };

    this.remove_book = function(req, res) {
        find_user( req.user._id, function(err, fu_res) {
            if(err) throw err;

            delete_book( fu_res, Object.keys(req.body.book_id)[0], function(err, db_res) {
                if(err) throw err;

                res.redirect('/my_books');
            });
        });
    };

    /* transactions */
    this.inc_transactions = function(req, res) {
        find_inc_transactions( req.user._id, function(err, fit_res) {
            if(err) throw err;

            res.render('main/inc_transactions',
                       { 'title': 'Requests From Others',
                         'auth_status': req.isAuthenticated(),
                         'transaction_list': fit_res.transactions });
        });
    };

    this.out_transactions = function(req, res) {
        find_out_transactions( req.user._id, function(err, fot_res) {
            if(err) throw err;

            res.render('main/out_transactions',
                       { 'title': 'My Requests',
                         'auth_status': req.isAuthenticated(),
                         'transaction_list': fot_res.transactions });
        });
    };

    this.init_transaction = function(req, res) {
        save_transaction( { 'user_id': req.user._id,
                            'book_id': Object.keys(req.body.book_id)[0] }, function(err, st_res) {
            if(err) throw err;

            res.redirect('/my_books');
        });
    };

    this.confirm_transaction = function(req, res) {
        update_transaction_status( { 'transaction_id': Object.keys(req.body.transaction_id)[0],
                                     'is_accepted': true }, function(err, uts_res) {
            if(err) throw err;

            res.redirect('/my_books');
        });
    };

    /*settings */
    this.settings = function(req, res) {
        res.render('main/settings',
                   { 'title': 'Settings',
                     'auth_status': req.isAuthenticated() });
    };
}

module.exports = MainController;
