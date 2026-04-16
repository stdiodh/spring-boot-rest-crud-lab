package com.andi.rest_crud.dto

data class PostCreateRequest(
    // TODO(A&I): 생성 요청에서 어떤 값을 받을지 먼저 읽어보세요.
    // title, content, author 세 값만으로도 요청 흐름을 충분히 연습할 수 있습니다.
    val title: String,
    val content: String,
    val author: String
)
