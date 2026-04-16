# Spring Boot REST CRUD Lab

> 요청이 들어오고, Service가 처리하고, 메모리에 저장한 뒤, 응답 DTO로 돌려주는 가장 기본적인 백엔드 흐름을 익히는 실습 레포입니다.

## 이 시퀀스에서 무엇을 배우나요

이번 실습은 DB나 보안으로 넘어가기 전,
백엔드가 어떻게 요청을 받고 응답을 돌려주는지 가장 단순한 구조로 먼저 익히는 단계입니다.

이번 레포에서는 아래 흐름에만 집중합니다.

1. `POST /posts`로 생성 요청을 보냅니다.
2. `GET /posts`로 전체 목록을 조회합니다.
3. `GET /posts/{id}`로 단건을 조회합니다.
4. Controller와 Service의 역할 차이를 설명합니다.
5. 메모리 저장이라서 서버 재시작 후 데이터가 사라지는 이유를 설명합니다.

## 브랜치 사용 방법

- `implementation`: 학생 실습용 starter 브랜치
- `answer`: 비교용 정답 브랜치

학생은 반드시 `implementation`에서 시작합니다.

```bash
git clone -b implementation https://github.com/stdiodh/spring-boot-rest-crud-lab.git
cd spring-boot-rest-crud-lab
git checkout -b feat/<이름>
```

정답 비교가 필요할 때는 아래 흐름을 사용합니다.

```bash
git fetch origin
git diff implementation..answer
```

## 문서 안내

- [이론 문서](./docs/theory.md)
- [구현 안내](./docs/implementation.md)
- [정답 가이드](./docs/answer-guide.md)
- [체크리스트](./docs/checklist.md)
- [제공 자료 안내](./docs/assets.md)

## 파일을 어떻게 보면 좋나요

실습은 아래 순서로 보는 것을 권장합니다.

1. `docs/theory.md`에서 왜 이 흐름을 배우는지 먼저 읽습니다.
2. `docs/implementation.md`에서 오늘 구현 순서를 확인합니다.
3. 아래 핵심 파일을 순서대로 엽니다.

- `src/main/kotlin/com/andi/rest_crud/dto/PostCreateRequest.kt`
- `src/main/kotlin/com/andi/rest_crud/dto/PostResponse.kt`
- `src/main/kotlin/com/andi/rest_crud/model/Post.kt`
- `src/main/kotlin/com/andi/rest_crud/repository/PostMemoryRepository.kt`
- `src/main/kotlin/com/andi/rest_crud/service/PostService.kt`
- `src/main/kotlin/com/andi/rest_crud/controller/PostController.kt`

완성본 흐름은 `answer` 브랜치 코드와 `docs/answer-guide.md`를 함께 보면 빠르게 확인할 수 있습니다.

## 미리 제공되는 것

- Kotlin + Spring Boot 프로젝트 기본 설정
- Swagger UI 진입 설정
- 패키지 구조와 메인 애플리케이션 클래스
- 실행용 기본 설정
- 테스트 기본 클래스

학생은 핵심 흐름만 직접 구현합니다.

## 실행 방법

애플리케이션 실행:

```bash
./gradlew bootRun
```

Swagger UI 확인:

```text
http://localhost:8080/swagger
```

테스트 실행:

```bash
./gradlew test
```

## 이번 실습에서 직접 구현할 범위

- 생성 요청 DTO와 응답 DTO의 역할 이해
- 메모리 저장용 `PostMemoryRepository` 흐름 이해
- `PostService.create()`, `getAll()`, `getById()` 구현
- `PostController`에서 API 연결
- Swagger에서 POST / GET 직접 실행

이번 시퀀스에서는 DB, JPA, Validation, Security를 붙이지 않습니다.
