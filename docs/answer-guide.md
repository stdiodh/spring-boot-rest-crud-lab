# 요청-응답과 메모리 CRUD 정답 가이드

## 빠른 흐름 정리

1. `PostController`가 요청을 받습니다.
2. `PostService`가 요청 DTO를 `Post`로 바꿉니다.
3. `PostMemoryRepository`가 메모리에 저장하거나 조회합니다.
4. `PostResponse`로 응답 모양을 정리해 반환합니다.

## 요청 / 응답 예시

### POST /posts 요청 예시

```json
{
  "title": "A&I 첫 글",
  "content": "메모리 CRUD 흐름을 연습합니다.",
  "author": "dh"
}
```

### POST /posts 응답 예시

```json
{
  "id": 1,
  "title": "A&I 첫 글",
  "content": "메모리 CRUD 흐름을 연습합니다.",
  "author": "dh"
}
```

### GET /posts 응답 예시

```json
[
  {
    "id": 1,
    "title": "A&I 첫 글",
    "content": "메모리 CRUD 흐름을 연습합니다.",
    "author": "dh"
  }
]
```

## 파일별 핵심 정답 포인트

### `PostResponse.kt`

- `PostResponse.from(post)`에서 `Post` 값을 그대로 응답 DTO로 옮깁니다.

### `PostMemoryRepository.kt`

- `save()`는 새 id를 붙여 메모리 리스트에 저장합니다.
- `findAll()`은 현재 리스트를 그대로 반환합니다.
- `findById()`는 id가 같은 글 하나를 찾습니다.

### `PostService.kt`

- `create()`는 request -> Post -> repository.save() -> PostResponse 흐름입니다.
- `getAll()`은 repository 결과를 응답 DTO 리스트로 바꿉니다.
- `getById()`는 단건을 찾아 응답 DTO로 바꿉니다.

### `PostController.kt`

- `POST /posts`는 `201 Created`로 응답합니다.
- `GET /posts`와 `GET /posts/{id}`는 Service 결과를 그대로 반환합니다.

## 핵심 정답 코드

### `PostResponse.from(...)`

```kotlin
companion object {
    fun from(post: Post): PostResponse = PostResponse(
        id = post.id,
        title = post.title,
        content = post.content,
        author = post.author
    )
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

### `PostController` 연결

```kotlin
@PostMapping
@ResponseStatus(HttpStatus.CREATED)
fun create(@RequestBody request: PostCreateRequest): PostResponse {
    return postService.create(request)
}
```

## 강사용 빠른 점검 포인트

- Controller가 직접 저장하지 않는가
- Service가 request -> 저장 -> response 흐름을 묶고 있는가
- 메모리 저장소가 DB 대신 임시 저장소 역할을 하는가
- Swagger에서 POST / GET이 실제로 실행되는가

## answer 브랜치 사용 방법

```bash
git fetch origin
git checkout answer
```

또는 차이만 보고 싶다면 아래 명령으로 확인합니다.

```bash
git diff implementation..answer
```
