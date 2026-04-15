package com.andi.rest_crud.service

import com.andi.rest_crud.dto.IdolRequest
import com.andi.rest_crud.dto.IdolResponse
import com.andi.rest_crud.model.Idol
import org.springframework.stereotype.Service

@Service
class IdolService {

    private val idols = mutableListOf<Idol>()
    private var idSequence = 1L

    // TODO(A&I): 전체 아이돌 목록을 반환하는 함수를 완성하세요.
    // HINT(A&I): 내부 Idol 모델을 응답 DTO로 바꿔서 내보내야 합니다.
    // CHECK(A&I): 리스트가 비어 있을 때도 빈 배열이 반환되는지 확인하세요.
    fun getAll(): List<IdolResponse> {
        TODO("idols 리스트를 IdolResponse로 변환해서 반환하세요. 힌트: map { IdolResponse.from(it) }")
    }

    // TODO(A&I): id로 아이돌 한 명을 조회하는 함수를 완성하세요.
    // HINT(A&I): 일치하는 Idol이 없으면 예외를 던져도 됩니다.
    // CHECK(A&I): 없는 id를 조회했을 때 어떤 일이 일어나는지 같이 확인하세요.
    fun getById(id: Long): IdolResponse {
        TODO("idols에서 id가 일치하는 아이돌을 찾아 반환하세요. 없으면 예외를 던지세요. 힌트: find { it.id == id }")
    }

    // TODO(A&I): 새 아이돌을 추가하는 함수를 완성하세요.
    // HINT(A&I): idSequence를 사용해 새 id를 만들고, request 값을 Idol로 옮기면 됩니다.
    // CHECK(A&I): 생성 후 응답의 id가 증가하는지 확인하세요.
    fun create(request: IdolRequest): IdolResponse {
        TODO("IdolRequest를 Idol로 변환해 idols에 추가하고 IdolResponse로 반환하세요. 힌트: idSequence++")
    }

    // TODO(A&I): 아이돌 정보를 수정하는 함수를 완성하세요.
    // HINT(A&I): 기존 Idol을 찾은 뒤 request 값으로 바꾸면 됩니다.
    // CHECK(A&I): 수정 후 다시 조회했을 때 값이 바뀌었는지 확인하세요.
    fun update(id: Long, request: IdolRequest): IdolResponse {
        TODO("id로 아이돌을 찾아 request의 값으로 수정 후 반환하세요.")
    }

    // TODO(A&I): 아이돌을 삭제하는 함수를 완성하세요.
    // HINT(A&I): removeIf를 활용하면 간단하게 처리할 수 있습니다.
    // CHECK(A&I): 삭제 후 전체 조회에서 해당 데이터가 빠졌는지 확인하세요.
    fun delete(id: Long) {
        TODO("id로 아이돌을 찾아 idols에서 제거하세요. 힌트: removeIf { it.id == id }")
    }
}
