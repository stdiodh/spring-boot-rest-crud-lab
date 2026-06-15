# 요청-응답과 메모리 CRUD 체크리스트

## 시작 전

- [ ] `01-implementation` 브랜치에서 시작했습니다.
- [ ] 수정 파일이 `controller`, `service`, `repository`, `dto`, `model` 안에 있는지 확인했습니다.
- [ ] `POST /posts`, `GET /posts`, `GET /posts/{id}` 목표를 확인했습니다.

## 구현 중

- [ ] `PostCreateRequest`의 `title`, `content`, `author` 값을 확인했습니다.
- [ ] `PostResponse.from(...)`에서 `Post`를 응답 DTO로 바꿨습니다.
- [ ] `PostMemoryRepository.save(...)`에서 새 id를 붙여 메모리에 저장했습니다.
- [ ] `PostMemoryRepository.findAll()`과 `findById(id)`를 구현했습니다.
- [ ] `PostService.create(...)`, `getAll()`, `getById(id)`가 Repository와 DTO를 연결합니다.
- [ ] `PostController`가 Service만 호출하도록 유지했습니다.

## 실행 확인

- [ ] `./gradlew bootRun`으로 서버를 실행했습니다.
- [ ] Swagger에서 `POST /posts`로 글을 생성했습니다.
- [ ] Swagger에서 `GET /posts`로 전체 목록을 확인했습니다.
- [ ] Swagger에서 `GET /posts/{id}`로 단건 조회를 확인했습니다.
- [ ] `./gradlew test`를 실행했습니다.
- [ ] 테스트가 실패하면 실패한 테스트 이름을 먼저 읽었습니다.

## 비교와 마무리

- [ ] 구현을 마친 뒤 `01-answer`와 diff를 비교했습니다.
- [ ] `git diff 01-implementation..01-answer` 결과에서 놓친 흐름을 확인했습니다.
- [ ] 서버 재시작 후 메모리 데이터가 사라지는 이유를 설명할 수 있습니다.
