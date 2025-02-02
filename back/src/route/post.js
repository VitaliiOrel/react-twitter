// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { Post } = require('../class/post')

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/post-create', function (req, res) {
  try {
    const { username, text, postId } = req.body

    console.log(postId, 'postId-back', req.body)

    if (!username || !text) {
      return res
        .status(400)
        .json({ message: 'Required data missing' })
    }

    let post = null

    if (postId) {
      post = Post.getById(Number(postId))
      console.log('post', post)

      if (!post) {
        return res
          .status(400)
          .json({ message: 'Such post does not exist' })
      }
    }

    const newPost = Post.create(username, text, post)

    return res.status(200).json({
      post: {
        id: newPost.id,
        text: newPost.text,
        username: newPost.username,
        date: newPost.date,
      },
    })
  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
})

router.get('/post-list', function (req, res) {
  try {
    const list = Post.getList()

    if (list.length === 0) {
      return res.status(200).json({ list: [] })
    }

    return res.status(200).json({
      list: list.map(({ id, username, text, date }) => ({
        id,
        username,
        text,
        date,
      })),
    })
  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
})

router.get('/post-item', function (req, res) {
  try {
    const { id } = req.query

    console.log('IDback:', id)

    if (!id) {
      return res
        .status(400)
        .json({ message: 'Post ID is required' })
    }

    const post = Post.getById(Number(id))

    if (!post) {
      return res
        .status(400)
        .json({ message: 'Such post does not exist' })
    }

    return res.status(200).json({
      post: {
        id: post.id,
        text: post.text,
        username: post.username,
        date: post.date,

        reply: post.reply.map((reply) => ({
          id: reply.id,
          text: reply.text,
          username: reply.username,
          date: reply.date,
        })),
      },
    })
  } catch (e) {
    return res.status(400).json({ message: e.message })
  }
})

// Підключаємо роутер до бек-енду
module.exports = router
