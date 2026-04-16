package com.andi.rest_crud.model

data class Post(
    val id: Long,
    val title: String,
    val content: String,
    val author: String
)
