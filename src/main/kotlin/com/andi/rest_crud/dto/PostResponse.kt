package com.andi.rest_crud.dto

import com.andi.rest_crud.model.Post

data class PostResponse(
    val id: Long,
    val title: String,
    val content: String,
    val author: String
) {
    companion object {
        // TODO(A&I): Post의 필드를 응답 DTO로 옮기세요.
        fun from(post: Post): PostResponse {
            TODO("post 값을 PostResponse로 변환하세요.")
        }
    }
}
