# Spring Boot REST CRUD Lab

이 레포는 A&I 백엔드 커리큘럼의 `01. 요청/응답과 메모리 CRUD` 시퀀스를 담는 토픽 레포입니다.
`main`은 가이드 브랜치이고, 학생 실습은 `01-implementation`에서 시작합니다.

## 이 레포에서 배우는 것

- Controller가 요청을 받는 흐름
- Service가 처리 중심이 되는 흐름
- Repository가 메모리 저장소를 다루는 흐름
- DTO로 요청과 응답을 분리하는 이유
- 서버 재시작 후 메모리 데이터가 사라지는 이유

## 시작 방법

```bash
git clone https://github.com/stdiodh/spring-boot-rest-crud-lab.git
cd spring-boot-rest-crud-lab
git checkout 01-implementation
```

## 실습 브랜치

| 용도 | 브랜치 |
| --- | --- |
| 가이드 | `main` |
| 학생 시작 | `01-implementation` |
| 참고 정답 | `01-answer` |

## 실행 방법

```bash
./gradlew bootRun
```

실행 후 Swagger UI에서 API를 확인합니다.

```text
http://localhost:8080/swagger
```

## 테스트 방법

```bash
./gradlew test
```

테스트가 확인하는 것:

- Controller smoke test로 요청 경로가 연결되는지 확인합니다.
- 게시글 생성, 전체 조회, 단건 조회의 기본 성공 케이스를 확인합니다.
- 메모리 저장소가 요청 흐름 안에서 값을 저장하고 반환하는지 확인합니다.

실패하면 먼저 볼 것:

- 실패한 테스트 이름에서 어떤 API가 깨졌는지 먼저 읽습니다.
- Controller mapping, HTTP method, DTO 필드 이름을 확인합니다.

완료 기준:

- Controller smoke test가 통과합니다.
- CRUD API 기본 성공 케이스가 통과합니다.

## 정답과 비교하는 방법

실습 중 막혔거나 완료 후 확인이 필요할 때만 참고 정답 브랜치와 비교합니다.

```bash
git fetch origin
git diff 01-implementation..01-answer
```

## Visual Lab

Visual Lab은 아래 위치에 있습니다.

```text
docs/visual-lab/index.html
```

로컬 확인:

```bash
python3 -m http.server 8080 -d docs/visual-lab
```

접속 주소:

```text
http://localhost:8080
```

## 운영 메모

legacy `implementation` / `answer` 브랜치가 남아 있다면 deprecated로만 취급합니다.
정식 수업 운영에서는 `01-implementation` / `01-answer`만 사용합니다.
