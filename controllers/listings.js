const geocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const listing = require("../models/listing");
const mbxGeocding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocding({ accessToken: mapToken });

//index route

module.exports.index = async (req, res, next) => {
  let allListings = await listing.find({});
  res.render("listings/index.ejs", { allListings });
};
//new form
module.exports.renderNewForm = (req, res) => {
  console.log(req.user);

  res.render("listings/new.ejs");
};

//show route

module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  let listingDetails = await listing
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })

    .populate("owner");
  if (!listingDetails) {
    req.flash("error", "the listing you search for doesn't exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listingDetails });
};

//create route

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listings.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  let newListing = new listing(req.body.listings);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = response.body.features[0].geometry;

  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "new listing is created");
  res.redirect("/listings");
};

//edit route

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listingDetails = await listing.findById(id);
  if (!listingDetails) {
    req.flash("error", "the listing you search for doesn't exist");
    return res.redirect("/listings");
  }

  let originalImageUrl = listingDetails.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_250");

  res.render("listings/edit.ejs", { listingDetails, originalImageUrl });
};

//update route
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let updateListing = await listing.findByIdAndUpdate(id, {
    ...req.body.listings,
  });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    updateListing.image = { url, filename };
    await updateListing.save();
  }

  req.flash("success", " listing is updated");
  res.redirect(`/listings/${id}`);
};

//delete route

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await listing.findByIdAndDelete(id);
  req.flash("success", " listing is deleted");
  res.redirect("/listings");
};
