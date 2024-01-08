const shortid = require("shortid");
// const URL = require("../models/url");
const urlData = {};
// async function handleGenerateNewShortURL(req, res) {
//   const body = req.body;
//   if (!body.url) return res.status(400).json({ error: "url is required" });
//   const shortID = shortid();

//   await URL.create({
//     shortId: shortID,
//     redirectURL: body.url,
//     visitHistory: [],
//   });

//   return res.json({ id: shortID });
// }

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  // Store data in-memory
  urlData[shortID] = {
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  };

  return res.json({ id: shortID });
}



// async function handleGetAnalytics(req, res) {
//   const shortId = req.params.shortId;
//   const result = await URL.findOne({ shortId });
//   return res.json({
//     totalClicks: result.visitHistory.length,
//     analytics: result.visitHistory,
//   });
// }
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = urlData[shortId];

  if (!result) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
