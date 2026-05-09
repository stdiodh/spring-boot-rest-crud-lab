# 요청-응답과 메모리 CRUD 참고 구현 비교 가이드

이 브랜치는 starter이므로 참고 구현를 그대로 싣지 않습니다.
완성된 흐름은 `01-answer` 브랜치에서 확인합니다.

## 참고 구현 브랜치에서 비교할 파일

- `PostResponse.kt`
- `PostMemoryRepository.kt`
- `PostService.kt`
- `PostController.kt`

## 비교할 질문

- `PostResponse.from(...)`이 내부 데이터를 응답 DTO로 바꾸는가
- `PostMemoryRepository.save(...)`가 새 id를 붙이고 리스트에 저장하는가
- `PostService.create(...)`가 request -> Post -> save -> response 흐름을 갖는가
- `PostController`가 직접 저장하지 않고 Service만 호출하는가
- Swagger에서 POST / GET 흐름이 실행되는가

## 참고 구현 비교 명령

```bash
git fetch origin
git diff 01-implementation..01-answer
```
