package com.andi.rest_crud.dto

import com.andi.rest_crud.model.Post

data class PostResponse(
    val id: Long,
    val title: String,
    val content: String,
    val author: String
) {
    companion object {
        fun from(post: Post): PostResponse = PostResponse(
            id = post.id,
            title = post.title,
            content = post.content,
            author = post.author
        )
    }
}
