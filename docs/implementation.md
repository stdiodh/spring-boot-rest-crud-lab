# 요청-응답과 메모리 CRUD 구현 안내

이번 실습은 요청이 Controller로 들어오고, Service를 지나, 메모리 저장소에 저장된 뒤, 응답 DTO로 돌아오는 흐름을 직접 완성하는 단계입니다.

## 구현 흐름

1. 요청 DTO와 응답 DTO 역할을 확인합니다.
2. 메모리 저장소의 저장, 전체 조회, 단건 조회를 구현합니다.
3. Service에서 요청을 받아 저장소와 응답 DTO를 연결합니다.
4. Controller에서 API 엔드포인트를 Service에 연결합니다.
5. Swagger에서 POST와 GET을 직접 실행합니다.

## 핵심 참고 구현 흐름

### `PostResponse.from(...)`

```kotlin
fun from(post: Post): PostResponse = PostResponse(
    id = post.id,
    title = post.title,
    content = post.content,
    author = post.author
)
```

### `PostMemoryRepository.save(...)`

```kotlin
fun save(post: Post): Post {
    val savedPost = post.copy(id = nextId++)
    posts.add(savedPost)
    return savedPost
}
```

### `PostService.create(...)`

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

## 실행 확인 방법

```bash
./gradlew test
./gradlew bootRun
```

브라우저에서 아래 주소를 엽니다.

```text
http://localhost:8080/swagger
```
