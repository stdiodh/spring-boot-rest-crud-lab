# 요청-응답과 메모리 CRUD 구현 안내

## 1. 오늘 완성할 흐름

이번 실습은 세 API를 연결합니다.

- `POST /posts`: 글을 생성합니다.
- `GET /posts`: 전체 글을 조회합니다.
- `GET /posts/{id}`: id로 글 하나를 조회합니다.

요청은 Controller에서 시작하고, Service가 처리 순서를 모으며, Repository가 메모리에 저장합니다.

## 2. 실제 수정 파일

아래 파일만 보고 구현합니다.

- `src/main/kotlin/com/andi/rest_crud/dto/PostCreateRequest.kt`
- `src/main/kotlin/com/andi/rest_crud/dto/PostResponse.kt`
- `src/main/kotlin/com/andi/rest_crud/model/Post.kt`
- `src/main/kotlin/com/andi/rest_crud/repository/PostMemoryRepository.kt`
- `src/main/kotlin/com/andi/rest_crud/service/PostService.kt`
- `src/main/kotlin/com/andi/rest_crud/controller/PostController.kt`

각 디렉터리의 책임은 아래와 같습니다.

- `src/main/kotlin/com/andi/rest_crud/controller`: HTTP 요청을 받습니다.
- `src/main/kotlin/com/andi/rest_crud/service`: 요청 처리 순서를 모읍니다.
- `src/main/kotlin/com/andi/rest_crud/repository`: 메모리 저장소를 다룹니다.
- `src/main/kotlin/com/andi/rest_crud/dto`: 요청과 응답 JSON 모양을 정합니다.

## 3. DTO와 내부 데이터 확인

먼저 생성 요청에서 받는 값을 확인합니다.

```kotlin
data class PostCreateRequest(
    val title: String,
    val content: String,
    val author: String
)
```

요청에는 id가 없습니다.
id는 저장소가 새 글을 저장할 때 붙입니다.

응답은 저장된 글의 id까지 포함합니다.

```kotlin
data class PostResponse(
    val id: Long,
    val title: String,
    val content: String,
    val author: String
)
```

`PostResponse.from(post)`에서는 내부 데이터인 `Post`를 응답 DTO로 옮깁니다.

## 4. Repository 구현

`PostMemoryRepository.kt`는 DB 대신 리스트를 사용합니다.
저장할 때 새 id를 붙이고, 조회할 때 리스트에서 값을 찾습니다.

```kotlin
val savedPost = post.copy(id = nextId++)
posts.add(savedPost)
return savedPost
```

이 코드는 전달받은 `Post`를 그대로 수정하지 않고, 새 id가 들어간 값을 만들어 저장합니다.
`findAll()`은 현재 리스트를 반환하고, `findById(id)`는 id가 같은 글 하나를 찾습니다.

## 5. Service 구현

`PostService.kt`는 요청 DTO, 내부 데이터, 저장소, 응답 DTO를 연결합니다.

```kotlin
val post = Post(
    id = 0L,
    title = request.title,
    content = request.content,
    author = request.author
)
```

생성 시점의 id는 임시로 `0L`을 넣고 저장소에 넘깁니다.
저장소가 새 id를 붙인 뒤 반환하면 `PostResponse.from(savedPost)`로 응답을 만듭니다.

전체 조회는 `findAll()` 결과를 응답 DTO 리스트로 바꿉니다.

```kotlin
return postMemoryRepository.findAll()
    .map { PostResponse.from(it) }
```

단건 조회는 id로 찾은 글을 응답 DTO로 바꿉니다.
이번 시퀀스는 정상 흐름이 우선이므로 없는 id 처리는 다음 단계에서 더 다룹니다.

## 6. Controller 연결

`PostController.kt`는 URL과 Service 함수를 연결합니다.

```kotlin
@PostMapping
@ResponseStatus(HttpStatus.CREATED)
fun create(@RequestBody request: PostCreateRequest): PostResponse {
    return postService.create(request)
}
```

Controller는 저장소를 직접 부르지 않습니다.
요청 본문을 DTO로 받고 Service 결과를 그대로 응답합니다.

조회 API도 같은 기준으로 연결합니다.

```kotlin
@GetMapping("/{id}")
fun getById(@PathVariable id: Long): PostResponse {
    return postService.getById(id)
}
```

`@PathVariable`은 URL의 `{id}` 값을 함수 인자로 넘깁니다.

## 7. 실행 확인

서버를 실행합니다.

```bash
./gradlew bootRun
```

Swagger에서 생성과 조회를 확인합니다.

```text
http://localhost:8080/swagger
```

테스트를 실행합니다.

```bash
./gradlew test
```

테스트가 실패하면 실패한 테스트 클래스와 메서드 이름을 먼저 읽고, 어느 API 흐름이 깨졌는지 확인합니다.
