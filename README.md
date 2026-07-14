# 01 요청-응답과 메모리 CRUD

이 브랜치는 `01-answer` 참고 구현 브랜치입니다.
DB나 보안으로 넘어가기 전에 요청이 들어오고, Service가 처리하고, 메모리에 저장한 뒤, 응답 DTO로 돌아가는 가장 기본적인 백엔드 흐름을 확인합니다.

## 이 시퀀스에서 다루는 문제

첫 Spring Boot 실습에서는 기능 수보다 요청이 어느 계층을 지나 응답으로 돌아오는지 잡는 것이 중요합니다.
이번 시퀀스는 `POST /posts`, `GET /posts`, `GET /posts/{id}`를 통해 Controller, Service, Repository, DTO가 나뉘는 이유를 확인합니다.

## 학습 목표

- `POST /posts` 생성 요청과 `201 Created` 응답을 설명합니다.
- `GET /posts` 전체 조회와 `GET /posts/{id}` 단건 조회를 구분합니다.
- Controller가 요청을 받고 Service가 흐름을 조립하는 기준을 확인합니다.
- Repository가 DB 대신 메모리 저장소로 동작하는 한계를 설명합니다.
- Request DTO와 Response DTO를 분리하는 이유를 코드로 비교합니다.

## 멘티 시작 흐름

이 브랜치는 실습을 먼저 풀어본 뒤 비교하는 용도입니다.
먼저 starter 브랜치의 TODO를 직접 채운 뒤, 막힌 지점이나 완료 기준을 확인할 때 이 브랜치의 구현과 문서를 읽습니다.

## 읽는 순서

1. [이론 정리](./docs/theory.md)
2. [구현 가이드](./docs/implementation.md)
3. [체크리스트](./docs/checklist.md)

## 실행 / 테스트 방법

```bash
./gradlew test
./gradlew bootRun
```

Swagger UI:

```text
http://localhost:8080/swagger
```

## 완료 기준

- 테스트가 통과합니다.
- Swagger에서 생성, 전체 조회, 단건 조회를 실행할 수 있습니다.
- 생성 응답의 `id`가 메모리 저장소에서 새로 부여되는 흐름을 설명할 수 있습니다.
- 서버를 재시작하면 메모리 데이터가 사라지는 한계를 설명할 수 있습니다.

<details>
<summary>멘토용 진행 포인트</summary>

## 수업 전 확인

- starter 브랜치에서 멘티가 직접 구현할 TODO 위치를 먼저 확인합니다.
- answer 브랜치의 코드는 비교 기준이지 먼저 보여줄 예시가 아님을 구분합니다.

## 수업 중 질문

- Controller가 직접 저장하지 않고 Service를 호출하는 이유를 질문합니다.
- `PostResponse.from(...)`이 내부 데이터와 응답 데이터를 분리하는 지점을 확인합니다.
- 메모리 저장소가 DB를 대체하지 못하는 이유를 서버 재시작 상황으로 연결합니다.

## 리뷰 기준

- API mapping이 Service 호출로만 이어지는지 확인합니다.
- Service가 request -> domain -> repository -> response 흐름을 맡는지 확인합니다.
- Repository가 외부에 mutable list를 직접 노출하지 않는지 확인합니다.

</details>
