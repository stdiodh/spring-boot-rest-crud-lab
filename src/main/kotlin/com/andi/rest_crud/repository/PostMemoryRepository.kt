package com.andi.rest_crud.repository

import com.andi.rest_crud.model.Post
import org.springframework.stereotype.Repository

@Repository
class PostMemoryRepository {

    private val posts = mutableListOf<Post>()
    private var nextId = 1L

    // TODO(A&I) 1. post.copy(...)를 사용해 새 id가 들어간 Post를 만드세요.
    // TODO(A&I) 2. 새 Post를 posts 리스트에 추가하세요.
    // TODO(A&I) 3. 저장된 Post를 반환하세요.
    fun save(post: Post): Post {
        TODO("메모리 리스트에 새 Post를 저장하고 반환하세요.")
    }

    // TODO(A&I) 1. 현재 메모리 리스트를 그대로 반환하세요.
    fun findAll(): List<Post> {
        TODO("posts 리스트를 반환하세요.")
    }

    // TODO(A&I) 1. id가 같은 Post 하나를 찾으세요.
    // TODO(A&I) 2. 찾지 못하면 null을 반환하세요.
    fun findById(id: Long): Post? {
        TODO("id로 Post를 찾아 반환하세요.")
    }
}
