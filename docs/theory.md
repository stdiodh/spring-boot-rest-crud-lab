# 이론 정리

## 1. 왜 이 개념이 필요한가

백엔드 입문 단계에서 가장 먼저 필요한 것은 기술 이름을 많이 아는 것이 아니라 요청이 들어와 응답으로 나가기까지의 흐름을 설명하는 능력입니다.
흐름이 잡히지 않으면 DB, Validation, Security를 붙일 때 어떤 계층에 무엇을 둬야 하는지 판단하기 어렵습니다.

이번 시퀀스는 메모리 CRUD를 사용해 Controller, Service, Repository, DTO의 역할을 가장 짧은 형태로 확인합니다.

## 2. 기존 방식의 한계

Controller 안에서 요청 처리, 데이터 생성, 저장, 응답 변환을 모두 처리하면 처음에는 짧아 보입니다.
하지만 기능이 늘어나면 요청 입구와 처리 흐름, 저장 방식, 응답 모양이 한 파일에 섞입니다.

이렇게 섞인 코드는 다음 시퀀스에서 DB 저장소로 바꿀 때도 어디를 바꿔야 하는지 흐려집니다.
그래서 이번 단계부터 계층을 분리해 두고, 각 계층이 맡는 책임을 작게 유지합니다.

## 3. 이번 시퀀스에서 선택한 접근

- Controller는 HTTP endpoint와 Service 호출만 담당합니다.
- Service는 요청 DTO를 내부 데이터로 바꾸고 저장소와 응답 DTO를 연결합니다.
- Repository는 메모리 리스트를 사용해 저장과 조회를 담당합니다.
- DTO는 외부 요청/응답 모양을 내부 데이터와 분리합니다.

DB를 아직 붙이지 않는 이유는 저장 기술보다 요청-응답 흐름을 먼저 보기 위해서입니다.

## 4. 핵심 개념

### Controller

Controller는 요청이 처음 들어오는 입구입니다.
이번 코드에서는 `PostController`가 `POST /posts`, `GET /posts`, `GET /posts/{id}`를 Service에 연결합니다.

### Service

Service는 실제 처리 흐름을 모으는 곳입니다.
`PostService`는 요청 DTO를 `Post`로 바꾸고, 저장소를 호출하고, 응답 DTO로 다시 변환합니다.

### Repository

Repository는 데이터를 저장하고 조회하는 역할을 맡습니다.
이번에는 DB를 붙이지 않고 `PostMemoryRepository`가 애플리케이션 안의 리스트를 사용합니다.

### DTO

DTO는 요청과 응답을 주고받는 전용 데이터 모양입니다.
`PostCreateRequest`는 생성 요청에 필요한 값만 받고, `PostResponse`는 응답으로 돌려줄 값만 정리합니다.

## 5. 짧은 예제와 해설

```kotlin
@PostMapping
@ResponseStatus(HttpStatus.CREATED)
fun create(@RequestBody request: PostCreateRequest): PostResponse {
    return postService.create(request)
}
```

Controller는 요청을 받고 Service에 넘깁니다.
저장 방식이나 응답 변환 세부 로직을 Controller 안에 넣지 않습니다.

```kotlin
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
```

Service는 request -> domain -> repository -> response 흐름을 연결합니다.
`id = 0L`은 저장 전 임시 값이고, 실제 id는 메모리 저장소가 부여합니다.

## 6. 다음 구현으로 연결되는 지점

다음 DB Access 시퀀스에서는 메모리 리스트 대신 DB와 Repository 구현이 등장합니다.
이번 단계에서 Controller와 Service 흐름을 분리해 두면 저장소가 바뀌어도 요청 입구와 응답 모양을 더 안정적으로 유지할 수 있습니다.

<details>
<summary>멘토용 설명 포인트</summary>

- 멘티가 Controller를 "모든 일을 하는 파일"로 이해하지 않도록 Service 호출 경계를 먼저 짚습니다.
- `PostResponse.from(...)`은 정답 코드 암기가 아니라 내부 데이터와 응답 데이터 분리 기준으로 설명합니다.
- answer 브랜치 비교 시 `save()`에서 id를 부여하는 위치와 `findAll()`에서 복사본을 반환하는 이유를 확인합니다.

</details>
