# 구현 가이드

이 문서는 `01-answer` 브랜치의 참고 구현을 기준으로 설명합니다.
starter 브랜치에서 먼저 구현한 뒤, 흐름과 완료 기준을 비교할 때 사용합니다.

## 1. 구현 전에 확인할 문제

이번 시퀀스의 목표는 복잡한 CRUD 기능을 많이 만드는 것이 아닙니다.
요청이 Controller로 들어오고, Service를 지나, 메모리 저장소에 저장된 뒤, 응답 DTO로 돌아오는 흐름을 한 번에 설명할 수 있어야 합니다.

## 2. 구현 순서

1. 요청 DTO와 응답 DTO 역할을 확인합니다.
2. 메모리 저장소의 저장, 전체 조회, 단건 조회를 구현합니다.
3. Service에서 요청을 내부 데이터로 바꾸고 저장소와 연결합니다.
4. Controller에서 API endpoint를 Service에 연결합니다.
5. Swagger와 테스트로 흐름을 확인합니다.

## 3. Step 1. Response DTO 변환

### 해야 할 일

`PostResponse.from(...)`에서 내부 `Post` 데이터를 응답 DTO로 옮깁니다.

```kotlin
fun from(post: Post): PostResponse = PostResponse(
    id = post.id,
    title = post.title,
    content = post.content,
    author = post.author
)
```

### 왜 이 작업을 하는가

응답 DTO를 따로 두면 내부 데이터 구조가 그대로 외부 API 응답으로 노출되지 않습니다.
이번 단계에서는 필드가 같아 보여도, 이후 DB나 인증 정보가 붙을 때 분리 기준이 중요해집니다.

### 확인 방법

`POST /posts` 응답에 `id`, `title`, `content`, `author`가 원하는 모양으로 나오는지 확인합니다.

## 4. Step 2. 메모리 저장소 구현

### 해야 할 일

`PostMemoryRepository`는 저장 전 `Post`에 새 id를 붙이고, 전체 조회와 단건 조회를 제공합니다.

```kotlin
fun save(post: Post): Post {
    val savedPost = post.copy(id = nextId++)
    posts.add(savedPost)
    return savedPost
}

fun findAll(): List<Post> {
    return posts.toList()
}

fun findById(id: Long): Post? {
    return posts.find { it.id == id }
}
```

### 왜 이 작업을 하는가

메모리 저장소는 DB를 배우기 전에 저장과 조회의 역할만 분리해 보는 장치입니다.
`toList()`를 반환하면 외부에서 내부 리스트를 직접 바꾸는 위험을 줄일 수 있습니다.

### 확인 방법

POST를 여러 번 실행한 뒤 `GET /posts`에서 id가 증가하는지 확인합니다.

## 5. Step 3. Service 흐름 연결

### 해야 할 일

요청 DTO를 내부 `Post`로 바꾸고, Repository에 저장한 뒤, `PostResponse`로 변환합니다.

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

### 왜 이 작업을 하는가

Service는 Controller와 Repository 사이에서 처리 흐름을 정리합니다.
Controller가 저장 로직을 직접 알지 않게 만들면 HTTP endpoint 변경과 저장 방식 변경을 분리해서 생각할 수 있습니다.

### 확인 방법

`create()`, `getAll()`, `getById()`가 모두 `PostResponse`를 반환하는지 확인합니다.

## 6. Step 4. Controller 연결

### 해야 할 일

`PostController`에서 세 endpoint를 Service 호출로 연결합니다.

```kotlin
@GetMapping
fun getAll(): List<PostResponse> {
    return postService.getAll()
}

@GetMapping("/{id}")
fun getById(@PathVariable id: Long): PostResponse {
    return postService.getById(id)
}

@PostMapping
@ResponseStatus(HttpStatus.CREATED)
fun create(@RequestBody request: PostCreateRequest): PostResponse {
    return postService.create(request)
}
```

### 왜 이 작업을 하는가

Controller는 HTTP 요청과 응답 상태를 표현하는 곳입니다.
처리 흐름은 Service로 넘겨 Controller가 요청 입구 역할에 집중하도록 합니다.

### 확인 방법

Swagger에서 `POST /posts`, `GET /posts`, `GET /posts/{id}`를 실행합니다.

## 마지막 확인

```bash
./gradlew test
./gradlew bootRun
```

Swagger UI:

```text
http://localhost:8080/swagger
```

<details>
<summary>멘토용 진행 포인트</summary>

- 각 Step에서 "어느 계층의 책임인가"를 먼저 묻고 코드 비교를 진행합니다.
- 힌트는 파일명과 메서드 역할까지만 먼저 제공합니다.
- 정답을 바로 보여주기보다 요청 -> 저장 -> 응답 순서를 멘티가 말하게 한 뒤 answer 브랜치와 비교합니다.

</details>
