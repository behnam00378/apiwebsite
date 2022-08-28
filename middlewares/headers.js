//CORS policies
exports.setHeaders = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Orgin", "*"); //به جای ستاره سایت مورد نظر روباید گذاشت
  res.setHeader("Access-Control-Allow-Methods", "POST , PUT , DELETE , GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type , Authorization");
  res.setHeader("X-Powered-By", " ");
  next();
};
