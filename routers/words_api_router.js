const express = require('express');

const router = express.Router();
const wordsApi = require('../apis/wordsApi.js').getInstance();
const ERRORCODE = 400;

router.get('/:word', async (req, res) => {

  wordsApi.getWordDetails(req.params).then((data) => {
    res.send(data);
  }).catch((error) => {
    res.status(ERRORCODE).send(error);
  });
});


router.put('/:word', async (req, res) => {
  wordsApi.updateWordCount(req.params).then((data) => {
    res.status(200).send(data);
  }).catch((error) => {
    res.status(ERRORCODE).send(error);
  });
});


module.exports = router;
