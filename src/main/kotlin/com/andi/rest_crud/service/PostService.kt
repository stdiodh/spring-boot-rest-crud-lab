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

    // TODO(A&I) 1. request 값으로 Post를 만드세요.
    // TODO(A&I) 2. id는 지금 단계에서 0L로 두고 저장소에 맡기세요.
    // TODO(A&I) 3. 저장 결과를 PostResponse.from(...)으로 변환하세요.
    // TODO(A&I) 4. Controller에서 직접 저장하지 않도록 이 함수가 흐름을 맡아야 합니다.
    fun create(request: PostCreateRequest): PostResponse {
        TODO("request -> Post -> save -> PostResponse 흐름을 완성하세요.")
    }

    // TODO(A&I) 1. 저장소에서 전체 글 목록을 가져오세요.
    // TODO(A&I) 2. 각 Post를 PostResponse로 변환하세요.
    fun getAll(): List<PostResponse> {
        TODO("findAll 결과를 응답 DTO 리스트로 변환하세요.")
    }

    // TODO(A&I) 1. 저장소에서 id로 글 하나를 찾으세요.
    // TODO(A&I) 2. 찾은 글을 PostResponse로 변환하세요.
    // TODO(A&I) 3. 이번 시퀀스는 정상 흐름이 핵심이므로 먼저 단건 조회 흐름이 보이게 만드세요.
    fun getById(id: Long): PostResponse {
        TODO("findById 결과를 응답 DTO로 변환하세요.")
    }
}
