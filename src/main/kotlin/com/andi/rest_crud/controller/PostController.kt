package com.andi.rest_crud.controller

import com.andi.rest_crud.dto.PostCreateRequest
import com.andi.rest_crud.dto.PostResponse
import com.andi.rest_crud.service.PostService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/posts")
class PostController(
    private val postService: PostService
) {

    // TODO(A&I): 저장소를 직접 사용하지 말고 Service의 전체 조회를 호출하세요.
    @GetMapping
    fun getAll(): List<PostResponse> {
        TODO("postService.getAll()을 반환하세요.")
    }

    // TODO(A&I): 경로 변수 id를 Service로 넘기세요.
    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): PostResponse {
        TODO("postService.getById(id)를 반환하세요.")
    }

    // TODO(A&I): 요청 DTO를 Service로 넘기고 생성 성공 시 201을 반환하세요.
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody request: PostCreateRequest): PostResponse {
        TODO("postService.create(request)를 반환하세요.")
    }
}
