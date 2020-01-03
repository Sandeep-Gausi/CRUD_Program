var express = require('express');
var router = express.Router();

//set Page model
var Page = require('../models/page');

/*
* GET PAGES INDEX
*/
router.get('/', function (req, res) {
  
   Page.find().then(function(pages){
      res.render('pages', {
               pages: pages
            });
   });
});


/*
* GET add pages
*/
router.get('/add-page', function (req, res) {
   var name = "";
   var department = "";
   var designation = "";

   res.render('add_pages', {
      name: name,
      department: department,
      designation: designation
   });
});


/*
* POST add pages
*/
router.post('/add-page', function (req, res) {

   console.log(req.body);
   var name = req.body.name;
   var department = req.body.department;
   var designation = req.body.designation;


   var errors = "";
   if (errors) {
      res.render('add_page', {
         errors: errors,
         name: name,
         department: department,
         designation: designation
      });
   } else {
      console.log('success');

      Page.findOne({ name: name }, function (err, page) {
         if (page) {
            res.render('add_pages', {
               name: name,
               department: department,
               designation: designation
            });
         } else {
            var page = new Page({
               name: name,
               department: department,
               designation: designation
            });

            page.save(function (err) {
               if (err)
                  return console.log(err);

               res.redirect('/');
            });
         }
      });
   }
});




/*
* GET edit pages
*/
router.get('/edit-page/:id', function (req, res) {
   Page.findById(req.params.id, function (err, page) {
      if (err)
         return console.log(err);

      res.render('edit_pages', {
         name: page.name, 
         department:  page.department,
         designation:  page.designation,
         id: page._id
      });
   });

});


/*
* POST edit pages
*/
router.post('/edit-page/:id', function (req, res) {


   var name = req.body.name;
   var department = req.body.department;
   var designation = req.body.designation;
   var id = req.params.id;



   var errors = "";
   if (errors) {
      res.render('edit_pages', {
         errors: errors,
         name: name,
         department: department,
         designation: designation,
         id:id
      });
   } else {
      console.log('success');
      Page.findOne({ name: name, _id: {'$ne':id} }, function (err, page) {
         if (page) {
            res.render('edit_pages', {
               name: name,
               department: department,
               designation: designation,
               id:id
            });
         } else {

         Page.findByIdAndUpdate({_id:id},req.body).then(function(err){
               res.redirect('/');
         });

         }
      });
   }
});

/*
* GET delete page
*/
router.get('/delete-page/:id', function (req, res) {
   Page.findByIdAndRemove(req.params.id, function(err){
      if(err)
        return console.log(err);

      //   req.flash('success', 'Page deleted');
        res.redirect('/');
   });
});


//Exports
module.exports = router;