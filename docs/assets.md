# 요청-응답과 메모리 CRUD 제공 자료 안내

## 미리 제공하는 것

| 항목 | 왜 제공하는가 | 학생이 직접 작성하지 않는 범위 |
| --- | --- | --- |
| Kotlin + Spring Boot 프로젝트 기본 설정 | 학생이 환경 설정보다 흐름 이해에 집중하게 하기 위해 | Gradle, 플러그인, 메인 클래스 |
| Swagger UI 의존성과 진입 설정 | API를 바로 실행해보게 하기 위해 | OpenAPI UI 연결 설정 |
| 패키지 구조 | Controller / Service / DTO / Repository 구분을 바로 보이게 하기 위해 | 기본 디렉터리 구조 |
| 테스트 기본 클래스 | 최소 실행 검증을 바로 할 수 있게 하기 위해 | 테스트 부트스트랩 |
| 실행용 `application.yaml` | 실행 진입점을 단순하게 유지하기 위해 | 앱 이름, Swagger 경로 설정 |

## 학생이 직접 구현하는 것

- `PostResponse` 변환 흐름
- `PostMemoryRepository` 저장 / 조회 흐름
- `PostService.create()`
- `PostService.getAll()`
- `PostService.getById()`
- `PostController` API 연결

## 운영 메모

- 이번 시퀀스에서는 Validation, DB, Security를 넣지 않습니다.
- 학생이 직접 작성할 범위를 너무 넓히지 않고 요청-응답 흐름에 집중합니다.
- answer 비교는 별도 `answer` 브랜치로 진행합니다.
