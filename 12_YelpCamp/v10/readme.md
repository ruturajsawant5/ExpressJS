

# Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route

#Deleting Campgrounds
* Add Destroy Route
* Add Delete button

#Authorization Part 1: Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

#Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

Campground Edit Route: <!--/campgrounds/:id/edit-->
Comment Edit Route:   <!--/campgrounds/:id/comments/:comment_id/edit-->

#Deleting Comments
* Add Destroy route
* Add Delete button

Campground Destroy Route: /campgrounds/:id
Comment Destroy Route:    /campgrounds/:id/comments/:comment_id

#Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware






* BOOTSTRAP NAV COLLPASE JS
* Flash Messages
* Refactor container div to header
* Show/hide delete and update buttons
* style login/register forms
* Random Background Landing Page
* Refactor middleware
* change styling in show template - comment delete/update
* UPDATE/DELETE CAMPGROUND


RESTFUL ROUTES

name      url      verb    desc.
===============================================
INDEX   /dogs      GET   Display a list of all dogs
NEW     /dogs/new  GET   Displays form to make a new dog
CREATE  /dogs      POST  Add new dog to DB
SHOW    /dogs/:id  GET   Shows info about one dog

INDEX   /campgrounds
NEW     /campgrounds/new
CREATE  /campgrounds
SHOW    /campgrounds/:id

NEW     campgrounds/:id/comments/new    GET
CREATE  campgrounds/:id/comments      POST