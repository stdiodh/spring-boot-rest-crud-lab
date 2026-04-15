package com.andi.rest_crud.controller

import com.andi.rest_crud.dto.IdolRequest
import com.andi.rest_crud.dto.IdolResponse
import com.andi.rest_crud.service.IdolService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/idols")
class IdolController(
    private val idolService: IdolService
) {

    // TODO(A&I): 전체 아이돌 목록을 조회하는 API를 완성하세요.
    // HINT(A&I): Controller는 service 호출 결과를 그대로 반환하는 흐름부터 익히면 됩니다.
    // CHECK(A&I): GET /idols 호출 시 200 응답과 리스트 JSON이 내려오는지 확인하세요.
    // GET /idols
    @GetMapping
    fun getAll(): List<IdolResponse> {
        TODO("idolService.getAll()을 호출해 반환하세요.")
    }

    // TODO(A&I): 특정 아이돌을 조회하는 API를 완성하세요.
    // HINT(A&I): 경로 변수 id를 service에 전달하면 됩니다.
    // CHECK(A&I): GET /idols/{id} 호출 시 단건 응답이 내려오는지 확인하세요.
    // GET /idols/{id}
    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): IdolResponse {
        TODO("idolService.getById(id)를 호출해 반환하세요.")
    }

    // TODO(A&I): 새 아이돌을 등록하는 API를 완성하세요.
    // HINT(A&I): 요청 본문은 IdolRequest로 받고, 생성은 service가 담당합니다.
    // CHECK(A&I): POST /idols 호출 시 201 응답이 내려오는지 확인하세요.
    // POST /idols
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@Valid @RequestBody request: IdolRequest): IdolResponse {
        TODO("idolService.create(request)를 호출해 반환하세요.")
    }

    // TODO(A&I): 아이돌 정보를 수정하는 API를 완성하세요.
    // HINT(A&I): 수정 대상 id와 요청 본문을 함께 service로 넘기면 됩니다.
    // CHECK(A&I): PUT /idols/{id} 호출 시 수정된 응답이 내려오는지 확인하세요.
    // PUT /idols/{id}
    @PutMapping("/{id}")
    fun update(@PathVariable id: Long, @Valid @RequestBody request: IdolRequest): IdolResponse {
        TODO("idolService.update(id, request)를 호출해 반환하세요.")
    }

    // TODO(A&I): 아이돌을 삭제하는 API를 완성하세요.
    // HINT(A&I): 삭제는 반환값이 없어도 service 호출은 필요합니다.
    // CHECK(A&I): DELETE /idols/{id} 호출 시 204 응답이 내려오는지 확인하세요.
    // DELETE /idols/{id}
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun delete(@PathVariable id: Long) {
        TODO("idolService.delete(id)를 호출하세요.")
    }
}
