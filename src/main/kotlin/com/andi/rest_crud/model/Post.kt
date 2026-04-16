package com.andi.rest_crud.model

data class Post(
    // TODO(A&I): 서버 안에서 다룰 데이터 모양을 먼저 익혀보세요.
    // 지금은 id, title, content, author 네 값만 있으면 충분합니다.
    val id: Long,
    val title: String,
    val content: String,
    val author: String
)
