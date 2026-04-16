package com.andi.rest_crud.dto

import com.andi.rest_crud.model.Post

data class PostResponse(
    val id: Long,
    val title: String,
    val content: String,
    val author: String
) {
    companion object {
        // TODO(A&I) 1. Post에서 id를 꺼내세요.
        // TODO(A&I) 2. title, content, author를 그대로 응답 DTO로 옮기세요.
        // TODO(A&I) 3. 응답용 PostResponse를 반환하세요.
        fun from(post: Post): PostResponse {
            TODO("post 값을 PostResponse로 변환하세요.")
        }
    }
}
