const Review = require("../models/reviews.js");
const listing = require("../models/listing.js");

// post or create a review route

module.exports.createReview = async (req, res) => {
  console.log(req.params.id);
  let Listing = await listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);
  Listing.reviews.push(newReview);

  await newReview.save();
  await Listing.save();

  console.log("new review saved");
  req.flash("success", "new review is created");
  res.redirect(`/listings/${Listing._id}`);
};

//destroy review

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", " review is deleted");
  res.redirect(`/listings/${id}`);
};
