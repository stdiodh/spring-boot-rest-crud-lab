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

    // TODO(A&I): request -> Post -> Repository 저장 -> PostResponse 변환 흐름을 완성하세요.
    fun create(request: PostCreateRequest): PostResponse {
        TODO("request -> Post -> save -> PostResponse 흐름을 완성하세요.")
    }

    // TODO(A&I): 저장소의 전체 글을 응답 DTO 목록으로 변환하세요.
    fun getAll(): List<PostResponse> {
        TODO("findAll 결과를 응답 DTO 리스트로 변환하세요.")
    }

    // TODO(A&I): id로 찾은 글을 응답 DTO로 변환하세요. 이번 단계는 정상 흐름에 집중합니다.
    fun getById(id: Long): PostResponse {
        TODO("findById 결과를 응답 DTO로 변환하세요.")
    }
}
