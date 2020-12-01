const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors())

//posts Model
const Posts = require('../../models/Posts');

//@router GET api/posts
//@desc Get All post
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find();
        if (!posts) throw Error('No Item');
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
});

//@router POST api/posts
//@desc Create An post
router.post('/', async (req, res) => {
    const newPost = new Posts(req.body);

    try {
        const post = await newPost.save();
        if (!post) throw Error('Something wrong while saving');

        res.status(200).json(post);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
});

//@router Delete api/posts:id
//@desc delete an post
router.delete('/:id', async (req, res) => {
    try {
        const posts = await Posts.findByIdAndDelete(req.params.id);
        if (!posts) throw Error('Something wrong while delete');
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
});

//@router Update api/posts:id
//@desc update an post
router.patch('/:id', async (req, res) => {
    try {
        const posts = await Posts.findByIdAndUpdate(req.params.id, req.body);
        if (!posts) throw Error('Something wrong while update');
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
});

module.exports = router;