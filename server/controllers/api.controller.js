const sanitizeHtml = require('sanitize-html');
const Hotdog = require('../models/hotdog');

function getHotdogs(req, res) {
  Hotdog.find({}).exec((err, hotdogs) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ hotdogs });
  });
}

function createHotdog(req, res) {
  if (!req.body.hotdog.name) {
    res.status(403).end();
    return;
  }

  const newHotdog = new Hotdog(req.body.hotdog);

  newHotdog.name = sanitizeHtml(newHotdog.name);
  newHotdog.price = sanitizeHtml(newHotdog.price || 0);
  newHotdog.image = sanitizeHtml(newHotdog.image || '');
  newHotdog.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.json({ hotdog: saved });
  });
}

function updateHotdog(req, res) {
  if (!req.body.hotdog._id) {
    res.status(403).end();
    return;
  }

  Hotdog.updateOne({ _id: req.body.hotdog._id }, req.body.hotdog).exec((err, hotdog) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.json({ hotdog });
  });
}

function deleteHotdog(req, res) {
  if (!req.params.id) {
    res.status(403).end();
    return;
  }

  Hotdog.findOne({ _id: req.params.id }).exec((err, hotdog) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    hotdog.remove(() => {
      res.status(200).end();
    });
  });
}

module.exports = {
  getHotdogs,
  createHotdog,
  deleteHotdog,
  updateHotdog,
};
