# 요청-응답과 메모리 CRUD 참고 구현 가이드

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

## 파일별 핵심 참고 구현 포인트

- `PostResponse.kt`: `PostResponse.from(post)`에서 `Post` 값을 응답 DTO로 옮깁니다.
- `PostMemoryRepository.kt`: `save()`, `findAll()`, `findById()`로 메모리 저장소 흐름을 완성합니다.
- `PostService.kt`: request -> Post -> repository -> response 흐름을 연결합니다.
- `PostController.kt`: `POST /posts`, `GET /posts`, `GET /posts/{id}`를 Service에 연결합니다.

## 리뷰용 빠른 점검 포인트

- Controller가 직접 저장하지 않는가
- Service가 request -> 저장 -> response 흐름을 묶고 있는가
- 메모리 저장소가 DB 대신 임시 저장소 역할을 하는가
- Swagger에서 POST / GET이 실제로 실행되는가

## 참고 구현 비교 명령

```bash
git fetch origin
git diff 01-implementation..01-answer
```
