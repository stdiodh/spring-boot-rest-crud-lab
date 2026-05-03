# Spring Boot REST CRUD Lab

이 브랜치는 `01-answer` 정답 브랜치입니다.  
DB나 보안으로 넘어가기 전에 요청이 들어오고, Service가 처리하고, 메모리에 저장한 뒤, 응답 DTO로 돌아가는 가장 기본적인 백엔드 흐름을 확인합니다.

## 이번 시퀀스에서 확인하는 것

- `POST /posts` 생성 요청
- `GET /posts` 전체 조회
- `GET /posts/{id}` 단건 조회
- Controller, Service, Repository 역할 분리
- Request DTO와 Response DTO 분리
- 메모리 저장의 장점과 한계

## 문서

- [이론 문서](./docs/theory.md)
- [구현 안내](./docs/implementation.md)
- [정답 가이드](./docs/answer-guide.md)
- [체크리스트](./docs/checklist.md)
- [제공 자료 안내](./docs/assets.md)

## 핵심 파일

- `src/main/kotlin/com/andi/rest_crud/dto/PostResponse.kt`
- `src/main/kotlin/com/andi/rest_crud/repository/PostMemoryRepository.kt`
- `src/main/kotlin/com/andi/rest_crud/service/PostService.kt`
- `src/main/kotlin/com/andi/rest_crud/controller/PostController.kt`

## 실행 방법

```bash
./gradlew test
./gradlew bootRun
```

Swagger UI:

```text
http://localhost:8080/swagger
```
