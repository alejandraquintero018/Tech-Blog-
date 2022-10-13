const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    console.log('here');
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
           // attributes: { exclude: ['password'] },
            //order: [['name', 'ASC']],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

 router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
      }
      res.render("login"); 

})

// router.get('/', async (req, res) => {
//     console.log('here');
//     try {
//         const commentData = await Comment.findAll({
//             include: [{ model: User }],
//             attributes: { exclude: ['password'] },
//             order: [['name', 'ASC']],
//         });

//         const comments = postData.map((comment) => comment.get({ plain: true }));
//         res.render('post', {
//             comments,
//             logged_in: req.session.logged_in,
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router; 