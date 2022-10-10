const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    console.log('here');
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        const posts = postData.map((project) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            // logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    console.log('here');
    try {
        const commentData = await Comment.findAll({
            include: [{ model: User }],
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        const comments = postData.map((project) => comment.get({ plain: true }));
        res.render('homepage', {
            comments,
            // logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router; 