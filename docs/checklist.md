# 체크리스트

## 1. 기능 확인

- [ ] `./gradlew test`가 통과합니다.
- [ ] `POST /posts`가 `201 Created`와 생성된 글 응답을 반환합니다.
- [ ] `GET /posts`가 현재 메모리에 저장된 목록을 반환합니다.
- [ ] `GET /posts/{id}`가 해당 id의 글을 반환합니다.

## 2. 코드 구조 확인

- [ ] Controller는 Service를 호출하고 저장 로직을 직접 갖지 않습니다.
- [ ] Service는 request -> domain -> repository -> response 흐름을 연결합니다.
- [ ] Repository는 메모리 리스트의 저장과 조회를 담당합니다.
- [ ] DTO는 요청 데이터와 응답 데이터를 분리합니다.

## 3. 실패 케이스 확인

- [ ] 존재하지 않는 id를 조회할 때 현재 구현의 한계를 설명할 수 있습니다.
- [ ] 서버를 재시작하면 메모리 데이터가 사라지는 이유를 설명할 수 있습니다.
- [ ] 아직 Validation이 없어 빈 문자열 요청을 막지 않는다는 점을 설명할 수 있습니다.

## 4. 설명할 수 있어야 하는 것

- [ ] Controller, Service, Repository의 역할을 한 문장씩 설명할 수 있습니다.
- [ ] `PostCreateRequest`와 `PostResponse`를 나누는 이유를 설명할 수 있습니다.
- [ ] `PostResponse.from(...)`이 응답 변환 지점이라는 것을 설명할 수 있습니다.
- [ ] 메모리 저장소와 DB 저장소의 차이를 설명할 수 있습니다.

## 5. 남은 한계와 다음 시퀀스 연결

이번 구현은 요청-응답 흐름을 보기 위한 최소 구현입니다.
데이터는 서버 메모리에만 있고, 입력 검증과 전역 예외 처리는 아직 다루지 않습니다.
다음 시퀀스에서는 DB 저장으로 넘어가면서 Repository 역할이 어떻게 달라지는지 확인합니다.

<details>
<summary>멘토용 리뷰 기준</summary>

- 통과 기준: 세 endpoint가 동작하고, 멘티가 요청 -> Controller -> Service -> Repository -> Response 흐름을 설명합니다.
- 보완 필요 기준: Controller가 저장 책임을 갖거나, DTO 변환 이유를 설명하지 못하면 계층 책임을 다시 짚습니다.
- 질문 예시: "id는 request에서 온 값인가요, 저장소에서 새로 정한 값인가요?"
- answer 브랜치 비교 포인트: `PostMemoryRepository.save()`, `PostService.create()`, `PostController.create()`의 책임 경계를 비교합니다.

</details>
