# Spring Boot REST CRUD Lab

이 브랜치는 `01-implementation` starter입니다.  
DB나 보안으로 넘어가기 전에 요청이 들어오고, Service가 처리하고, 메모리에 저장한 뒤, 응답 DTO로 돌아가는 가장 기본적인 백엔드 흐름을 익힙니다.

## 이번 시퀀스에서 다루는 것

- `POST /posts` 생성 요청
- `GET /posts` 전체 조회
- `GET /posts/{id}` 단건 조회
- Controller, Service, Repository 역할 분리
- Request DTO와 Response DTO 분리
- 메모리 저장의 장점과 한계

## 문서

- [이론 문서](./docs/theory.md)
- [구현 안내](./docs/implementation.md)
- [정답 비교 가이드](./docs/answer-guide.md)
- [체크리스트](./docs/checklist.md)
- [제공 자료 안내](./docs/assets.md)

## 학생이 직접 구현하는 핵심 파일

- `src/main/kotlin/com/andi/rest_crud/dto/PostResponse.kt`
- `src/main/kotlin/com/andi/rest_crud/repository/PostMemoryRepository.kt`
- `src/main/kotlin/com/andi/rest_crud/service/PostService.kt`
- `src/main/kotlin/com/andi/rest_crud/controller/PostController.kt`

## 실습 흐름

1. 요청 DTO와 응답 DTO 역할을 확인합니다.
2. 메모리 저장소의 저장, 전체 조회, 단건 조회를 구현합니다.
3. Service에서 요청을 받아 저장소와 응답 DTO를 연결합니다.
4. Controller에서 API 엔드포인트를 Service에 연결합니다.
5. Swagger에서 POST와 GET을 직접 실행합니다.

## 실행 방법

```bash
./gradlew test
./gradlew bootRun
```

Swagger UI:

```text
http://localhost:8080/swagger
```

정답 비교는 수업 후 `01-answer` 브랜치에서 합니다.
