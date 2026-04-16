package com.andi.rest_crud.service

import com.andi.rest_crud.dto.PostCreateRequest
import com.andi.rest_crud.dto.PostResponse
import com.andi.rest_crud.model.Post
import com.andi.rest_crud.repository.PostMemoryRepository
import org.springframework.stereotype.Service

@Service
class PostService(
    private val postMemoryRepository: PostMemoryRepository
) {

    fun create(request: PostCreateRequest): PostResponse {
        val post = Post(
            id = 0L,
            title = request.title,
            content = request.content,
            author = request.author
        )
        val saved = postMemoryRepository.save(post)
        return PostResponse.from(saved)
    }

    fun getAll(): List<PostResponse> {
        return postMemoryRepository.findAll()
            .map(PostResponse::from)
    }

    fun getById(id: Long): PostResponse {
        val post = postMemoryRepository.findById(id)
            ?: throw NoSuchElementException("ID $id 에 해당하는 글이 없습니다.")
        return PostResponse.from(post)
    }
}
