# 요청-응답과 메모리 CRUD 구현 안내

이번 실습은 요청이 Controller로 들어오고, Service를 지나, 메모리 저장소에 저장된 뒤, 응답 DTO로 돌아오는 흐름을 직접 완성하는 단계입니다.

## 실습에서 완성할 흐름

1. `POST /posts` 요청을 보내 새 글을 만듭니다.
2. `GET /posts`로 전체 목록을 확인합니다.
3. `GET /posts/{id}`로 단건을 조회합니다.
4. 요청이 Controller에서 시작해 Service와 메모리 저장소를 지나 응답으로 나가는 흐름을 설명합니다.
5. Swagger에서 직접 API를 실행합니다.

## TODO를 넣은 파일

- `src/main/kotlin/com/andi/rest_crud/dto/PostResponse.kt`
- `src/main/kotlin/com/andi/rest_crud/repository/PostMemoryRepository.kt`
- `src/main/kotlin/com/andi/rest_crud/service/PostService.kt`
- `src/main/kotlin/com/andi/rest_crud/controller/PostController.kt`

## 단계별 구현 안내

### Step 1. Request DTO 확인

- `PostCreateRequest.kt`를 열어 어떤 값을 받을지 확인합니다.
- 이번 실습에서는 `title`, `content`, `author`만 사용합니다.

### Step 2. Response DTO 완성

- `PostResponse.from(...)`를 완성합니다.
- 내부 `Post` 데이터를 응답 모양으로 바꾸는 흐름을 만듭니다.

```kotlin
fun from(post: Post): PostResponse = PostResponse(
    id = post.id,
    title = post.title,
    content = post.content,
    author = post.author
)
```

### Step 3. 메모리 저장소 구현

- `PostMemoryRepository.kt`에서 저장, 전체 조회, 단건 조회 흐름을 만듭니다.
- `mutableListOf`와 간단한 id 증가 방식으로 구현합니다.

확인할 것:

- `save()`가 새 id를 붙이는가
- `findAll()`이 현재 목록을 돌려주는가
- `findById()`가 id가 같은 글을 찾는가

### Step 4. Service 구현

- 요청 DTO에서 값을 꺼내 `Post`를 만듭니다.
- 저장소에 저장하고 `PostResponse`로 바꿔 반환합니다.
- 전체 조회와 단건 조회도 응답 DTO로 변환합니다.

핵심은 Controller에서 직접 저장하지 않고 Service가 흐름을 맡는 것입니다.

### Step 5. Controller 연결

- `POST /posts`, `GET /posts`, `GET /posts/{id}`를 연결합니다.
- Controller는 Service를 호출만 하도록 유지합니다.

### Step 6. Swagger 실행

- 서버를 실행합니다.
- `http://localhost:8080/swagger`에 접속합니다.
- POST와 GET을 직접 실행합니다.

## 실행 확인 방법

```bash
./gradlew bootRun
```

브라우저에서 아래 주소를 엽니다.

```text
http://localhost:8080/swagger
```

## 참고 구현 비교

수업 후 `01-answer` 브랜치에서 완성 코드와 비교합니다.
