const Review = require("../Models/reviewModel");
const factory = require('./handlerFactory');



exports.setTourUserIds = (req,res, next) =>{
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;
  next();
}

// Get all reviews
exports.getAllReviews = factory.getAll(Review);

// get review
exports.getReview = factory.getOne(Review);

// Create a review
exports.createReview = factory.createOne(Review)

// Update a review
exports.updateReview = factory.updateOne(Review);

// Delete a review
exports.deleteReview = factory.deleteOne(Review)
    