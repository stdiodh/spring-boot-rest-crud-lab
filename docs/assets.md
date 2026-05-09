# 요청-응답과 메모리 CRUD 제공 자료 안내

## 미리 제공하는 것

| 항목 | 왜 제공하는가 |
| --- | --- |
| Kotlin + Spring Boot 프로젝트 기본 설정 | 환경 설정보다 요청/응답 흐름 이해에 집중하게 하기 위해 |
| Swagger UI 의존성과 진입 설정 | API를 바로 실행해보게 하기 위해 |
| 패키지 구조 | Controller, Service, DTO, Repository 구분을 바로 보이게 하기 위해 |
| 테스트 기본 클래스 | 최소 실행 검증을 바로 할 수 있게 하기 위해 |
| 실행용 `application.yaml` | 앱 이름과 Swagger 경로를 단순하게 유지하기 위해 |

## 실습에서 직접 구현하는 것

- `PostResponse` 변환 흐름
- `PostMemoryRepository` 저장 / 조회 흐름
- `PostService.create()`
- `PostService.getAll()`
- `PostService.getById()`
- `PostController` API 연결

## 실습에서 직접 작성하지 않는 범위

- Validation
- DB, JPA
- Security
- 전역 예외 처리
