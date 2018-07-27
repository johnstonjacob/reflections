const express = require('express');

const DB = require('../../database/index');

const router = express.Router();

// router.use(async (req, res, next) => {
//   const { sessionID } = req;

//   try {
//     const sessionCheckResult = await DB.User.verifySession(sessionID);
//     if (sessionCheckResult) next();
//     else {
//       res.status(403);
//       res.send('Unauthorized');
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// });

router.get('/', async (_, res) => {
  const tags = await DB.Tag.getAllTags();
  res.send(tags);
});

router.get('/:tag', async (req, res) => {
  const { tag } = req.params;
  const taggedReflections = await DB.Tag.getAllTaggedReflections({ tag });
  res.send(taggedReflections);
});

module.exports = router;
