# 요청-응답과 메모리 CRUD 이론 정리

이번 시퀀스는 백엔드가 요청을 받고, 처리하고, 응답으로 돌려주는 가장 기본 흐름을 가볍게 경험하는 단계입니다.

## 먼저 이것만 기억해도 됩니다

- Controller는 요청이 들어오는 입구입니다.
- Service는 실제 처리 흐름을 모으는 곳입니다.
- Repository는 데이터를 저장하고 조회하는 역할을 맡습니다.
- DTO는 요청과 응답의 데이터 모양을 정리합니다.
- 지금은 DB 대신 메모리 저장소를 써서 흐름부터 먼저 익힙니다.

## 왜 이 시퀀스가 필요한가

백엔드를 처음 배울 때 가장 헷갈리는 것은 기술 이름보다 흐름입니다.
요청이 어디서 시작하고, 누가 처리하고, 어떤 모양으로 응답이 나가는지가 안 잡히면 다음 단계가 전부 어렵게 느껴집니다.

그래서 이번 실습에서는 기능을 과하게 늘리지 않습니다.
메모리 기반 CRUD로 가장 짧은 요청-응답 장면을 먼저 잡고, 다음 시퀀스에서 저장 방식을 어떻게 바꿀지 자연스럽게 이어가도록 만듭니다.

실무에서도 장애를 볼 때는 먼저 요청이 어느 계층을 지나 응답으로 나갔는지부터 추적합니다.

## 기초 개념

### Controller

Controller는 요청이 처음 들어오는 입구입니다.
이번 코드에서는 `PostController`가 이 역할을 맡습니다.

### Service

Service는 실제 처리 흐름을 모으는 곳입니다.
이번 코드에서는 `PostService`가 이 역할을 맡습니다.

### Repository

Repository는 데이터를 저장하고 조회하는 역할을 맡습니다.
이번에는 DB를 붙이지 않고 `PostMemoryRepository`가 메모리 리스트를 사용합니다.

### DTO

DTO는 요청과 응답을 주고받는 전용 데이터 모양입니다.

- `PostCreateRequest`: 생성 요청에 필요한 값
- `PostResponse`: 응답으로 돌려줄 값

## 현재 코드 흐름

이번 실습의 핵심 흐름은 아래와 같습니다.

1. 클라이언트가 `POST /posts`로 생성 요청을 보냅니다.
2. `PostController`가 요청을 받습니다.
3. `PostService`가 요청 DTO를 `Post` 데이터로 바꿉니다.
4. `PostMemoryRepository`가 메모리에 저장합니다.
5. `PostResponse`로 응답 형태를 정리해 돌려줍니다.

```kotlin
@PostMapping
@ResponseStatus(HttpStatus.CREATED)
fun create(@RequestBody request: PostCreateRequest): PostResponse {
    return postService.create(request)
}
```

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

## 자주 헷갈리는 포인트

- Controller는 요청을 받는 곳이지 데이터를 직접 저장하는 곳이 아닙니다.
- Service는 어려운 로직만 모으는 곳이 아니라 처리 흐름을 정리하는 곳입니다.
- 메모리 저장은 DB가 아니기 때문에 서버 재시작 뒤 데이터가 남지 않습니다.
- Swagger는 이번 단계에서 API 실행 확인 도구로 보면 됩니다.

## 복습 체크리스트

- [ ] `POST /posts` 생성 흐름을 순서대로 설명할 수 있습니다.
- [ ] `GET /posts`와 `GET /posts/{id}`의 차이를 설명할 수 있습니다.
- [ ] Controller와 Service 역할 차이를 말할 수 있습니다.
- [ ] 메모리 저장의 장점과 한계를 한 문장으로 설명할 수 있습니다.
- [ ] Swagger에서 API를 직접 실행할 수 있습니다.
