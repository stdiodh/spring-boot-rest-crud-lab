# Spring Boot REST CRUD Lab

이 레포는 A&I 백엔드 커리큘럼의 `01. 요청/응답과 메모리 CRUD` 시퀀스를 담는 안내 브랜치입니다.

## 이 레포의 역할

- `main`은 안내 브랜치입니다.
- 학생은 `01-implementation`에서 실습을 시작합니다.
- 강사는 `01-answer`에서 정답 코드와 비교합니다.
- 이번 레포는 DB 없이 메모리 저장소로 REST CRUD의 첫 흐름을 익힙니다.

## 이 레포에서 배우는 것

- Controller가 요청을 받는 흐름
- Service가 처리 중심이 되는 흐름
- Repository가 메모리 저장소를 다루는 흐름
- DTO로 요청과 응답을 분리하는 이유
- 서버 재시작 후 메모리 데이터가 사라지는 이유

## 브랜치 사용법

1. `main`에서 레포 목적과 브랜치 구조를 확인합니다.
2. `01-implementation`으로 이동해 TODO starter를 따라갑니다.
3. 실습을 마친 뒤 `01-answer`와 비교합니다.

```bash
git fetch origin
git switch 01-implementation
```

## 문서 안내

실습 문서는 `01-implementation`, `01-answer` 브랜치에서 확인합니다.

- `README.md`
- `docs/theory.md`
- `docs/implementation.md`
- `docs/answer-guide.md`
- `docs/checklist.md`
- `docs/assets.md`

## 빠른 시작

```bash
./gradlew test
./gradlew bootRun
```

실행 후 Swagger UI에서 확인합니다.

```text
http://localhost:8080/swagger
```
