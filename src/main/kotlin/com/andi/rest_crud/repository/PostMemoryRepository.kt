package com.andi.rest_crud.repository

import com.andi.rest_crud.model.Post
import org.springframework.stereotype.Repository

@Repository
class PostMemoryRepository {

    private val posts = mutableListOf<Post>()
    private var nextId = 1L

    fun save(post: Post): Post {
        val savedPost = post.copy(id = nextId++)
        posts.add(savedPost)
        return savedPost
    }

    fun findAll(): List<Post> {
        return posts.toList()
    }

    fun findById(id: Long): Post? {
        return posts.find { it.id == id }
    }
}
