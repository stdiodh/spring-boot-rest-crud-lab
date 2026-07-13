package com.andi.rest_crud.repository

import com.andi.rest_crud.model.Post
import org.springframework.stereotype.Repository

@Repository
class PostMemoryRepository {

    private val posts = mutableListOf<Post>()
    private var nextId = 1L

    // TODO(A&I): 새 id를 부여한 Post를 목록에 저장하고 반환하세요.
    fun save(post: Post): Post {
        TODO("메모리 리스트에 새 Post를 저장하고 반환하세요.")
    }

    // TODO(A&I): 현재 메모리 목록을 반환하세요.
    fun findAll(): List<Post> {
        TODO("posts 리스트를 반환하세요.")
    }

    // TODO(A&I): id가 같은 Post를 찾고 없으면 null을 반환하세요.
    fun findById(id: Long): Post? {
        TODO("id로 Post를 찾아 반환하세요.")
    }
}
