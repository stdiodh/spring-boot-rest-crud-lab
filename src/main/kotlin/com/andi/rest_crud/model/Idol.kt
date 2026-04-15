package com.andi.rest_crud.model

data class Idol(
    val id: Long,
    var name: String,
    var group: String,
    var agency: String,
    var debutYear: Int
)
