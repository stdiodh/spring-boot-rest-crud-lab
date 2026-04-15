# Spring Boot REST CRUD Lab

> A&I 백엔드 커리큘럼 13주차 실습용 토픽 레포입니다.

## 브랜치 안내

- `implementation`: 학생 실습용 starter
- `answer`: 수업 후 공개되는 완성본

학생은 반드시 `implementation` 브랜치에서 시작합니다.

```bash
git clone -b implementation https://github.com/stdiodh/spring-boot-rest-crud-lab.git week13-rest-crud
cd week13-rest-crud
git checkout -b feat/<이름>
```

## 학습 목표

- REST API와 CRUD의 기본 흐름을 이해합니다.
- Controller -> Service -> Response 흐름을 직접 구현합니다.
- 요청 DTO와 응답 DTO를 왜 나누는지 감을 잡습니다.

## 이번 주 직접 구현 범위

- `GET /idols`
- `GET /idols/{id}`
- `POST /idols`
- `PUT /idols/{id}`
- `DELETE /idols/{id}`
- Controller에서 Service를 호출하는 코드
- Service에서 메모리 리스트를 다루는 코드

## 미리 제공된 코드

- Spring Boot 프로젝트 설정
- DTO / 모델 클래스 기본 구조
- Validation 어노테이션
- 테스트용 기본 클래스

## TODO 위치

- `src/main/kotlin/com/andi/rest_crud/controller/IdolController.kt`
- `src/main/kotlin/com/andi/rest_crud/service/IdolService.kt`

코드에서 아래 키워드를 검색하면 빠르게 찾을 수 있습니다.

- `TODO(A&I)`
- `HINT(A&I)`
- `CHECK(A&I)`

## 실행 방법

```bash
./gradlew bootRun
```

테스트 실행:

```bash
./gradlew test
```

## 체크 포인트

- Controller가 직접 비즈니스 로직을 처리하지 않는지 확인합니다.
- Service가 요청을 받아 데이터를 가공하는 흐름을 설명할 수 있어야 합니다.
- 서버를 재시작하면 데이터가 사라지는 이유를 설명할 수 있어야 합니다.

## 정답 브랜치 안내

정답은 수업 종료 후 `answer` 브랜치로 공개됩니다.

비교가 필요하면 아래 명령을 사용할 수 있습니다.

```bash
git fetch origin
git diff implementation..answer
```
