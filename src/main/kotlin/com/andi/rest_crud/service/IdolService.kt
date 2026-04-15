package com.andi.rest_crud.service

import com.andi.rest_crud.dto.IdolRequest
import com.andi.rest_crud.dto.IdolResponse
import com.andi.rest_crud.model.Idol
import org.springframework.stereotype.Service

@Service
class IdolService {

    private val idols = mutableListOf<Idol>()
    private var idSequence = 1L

    fun getAll(): List<IdolResponse> {
        return idols.map { IdolResponse.from(it) }
    }

    fun getById(id: Long): IdolResponse {
        val idol = idols.find { it.id == id }
            ?: throw NoSuchElementException("ID $id 에 해당하는 아이돌이 없습니다.")
        return IdolResponse.from(idol)
    }

    fun create(request: IdolRequest): IdolResponse {
        val idol = Idol(
            id = idSequence++,
            name = request.name,
            group = request.group,
            agency = request.agency,
            debutYear = request.debutYear
        )
        idols.add(idol)
        return IdolResponse.from(idol)
    }

    fun update(id: Long, request: IdolRequest): IdolResponse {
        val idol = idols.find { it.id == id }
            ?: throw NoSuchElementException("ID $id 에 해당하는 아이돌이 없습니다.")
        idol.name = request.name
        idol.group = request.group
        idol.agency = request.agency
        idol.debutYear = request.debutYear
        return IdolResponse.from(idol)
    }

    fun delete(id: Long) {
        val removed = idols.removeIf { it.id == id }
        if (!removed) throw NoSuchElementException("ID $id 에 해당하는 아이돌이 없습니다.")
    }
}
