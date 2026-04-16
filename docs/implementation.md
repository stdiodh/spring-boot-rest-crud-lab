# 요청-응답과 메모리 CRUD 구현 안내

## 오늘 학생이 완성할 최종 흐름

오늘 실습이 끝나면 학생은 아래 흐름을 직접 보여줄 수 있어야 합니다.

1. `POST /posts` 요청을 보내 새 글을 만듭니다.
2. `GET /posts`로 전체 목록을 확인합니다.
3. `GET /posts/{id}`로 단건을 조회합니다.
4. 요청이 Controller에서 시작해 Service와 메모리 저장소를 지나 응답으로 나가는 흐름을 설명합니다.
5. Swagger에서 직접 API를 실행합니다.

## 학생이 직접 구현할 순서

1. `PostCreateRequest`를 확인합니다.
2. `PostResponse`를 완성합니다.
3. `Post` 데이터 클래스를 확인합니다.
4. `PostMemoryRepository`를 완성합니다.
5. `PostService.create()`를 구현합니다.
6. `PostService.getAll()`을 구현합니다.
7. `PostService.getById()`를 구현합니다.
8. `PostController`에서 API를 연결합니다.
9. Swagger에서 POST / GET을 실행합니다.

이 순서는 바꾸지 않고 그대로 따라가는 것이 좋습니다.

## TODO를 넣을 파일

- `src/main/kotlin/com/andi/rest_crud/dto/PostCreateRequest.kt`
- `src/main/kotlin/com/andi/rest_crud/dto/PostResponse.kt`
- `src/main/kotlin/com/andi/rest_crud/model/Post.kt`
- `src/main/kotlin/com/andi/rest_crud/repository/PostMemoryRepository.kt`
- `src/main/kotlin/com/andi/rest_crud/service/PostService.kt`
- `src/main/kotlin/com/andi/rest_crud/controller/PostController.kt`

## 각 파일의 역할

- `PostCreateRequest.kt`: 생성 요청에서 받을 값을 담습니다.
- `PostResponse.kt`: 응답으로 돌려줄 모양을 정리합니다.
- `Post.kt`: 서버 안에서 다룰 기본 데이터입니다.
- `PostMemoryRepository.kt`: DB 대신 메모리에 저장하는 임시 저장소입니다.
- `PostService.kt`: 요청 데이터를 처리해 저장소와 응답 DTO를 연결합니다.
- `PostController.kt`: API 요청을 받아 Service에 넘깁니다.

## 단계별 구현 안내

### Step 1. Request DTO 확인

- `PostCreateRequest.kt`를 열어 어떤 값을 받을지 먼저 봅니다.
- 생성 요청에 필요한 값이 너무 많지 않은지 확인합니다.

실습 힌트:
- 이번 실습에서는 요청 값을 단순하게 유지하는 편이 좋습니다.
- title, content, author 정도만 있어도 흐름을 보기 충분합니다.

### Step 2. Response DTO 완성

- `PostResponse.from(...)`를 완성합니다.
- 내부 `Post` 데이터를 응답 모양으로 바꾸는 흐름을 만듭니다.

실습 힌트:
- 응답 DTO는 저장 구조를 그대로 복사하는 것이 아니라 바깥으로 보여줄 모양을 정리하는 역할입니다.

### Step 3. Post 데이터 클래스 확인

- `Post.kt`를 열어 서버 안에서 어떤 데이터를 다룰지 봅니다.
- id, title, content, author 구성이 이해되는지 확인합니다.

실습 힌트:
- 지금은 createdAt 같은 부가값보다 핵심 흐름이 먼저입니다.

### Step 4. 메모리 저장소 구현

- `PostMemoryRepository.kt`에서 저장, 전체 조회, 단건 조회 흐름을 만듭니다.
- `mutableListOf`와 간단한 id 증가 방식으로 구현합니다.

실습 힌트:
- 지금은 DB 대신 임시 저장소를 만든다고 생각하면 됩니다.
- repository 인터페이스를 만들지 않고 가장 단순한 클래스 하나로 갑니다.

### Step 5. Service.create() 구현

- 요청 DTO에서 값을 꺼내 `Post`를 만듭니다.
- 저장소에 저장하고 `PostResponse`로 바꿔 반환합니다.

실습 힌트:
- Controller에서 직접 저장하지 마세요.
- Service가 요청 -> 저장 -> 응답 변환 흐름을 모두 이어주는지 보세요.

### Step 6. Service.getAll() 구현

- 저장소에서 전체 목록을 가져옵니다.
- 응답 DTO 리스트로 바꿉니다.

실습 힌트:
- 내부 데이터 리스트를 그대로 내보내지 말고 응답 DTO로 변환해보세요.

### Step 7. Service.getById() 구현

- 저장소에서 id로 하나를 찾습니다.
- 찾은 데이터를 응답 DTO로 바꿉니다.

실습 힌트:
- 없는 id 처리까지 깊게 가르치는 시퀀스는 아닙니다.
- 이번에는 정상 흐름이 먼저 보이면 충분합니다.

### Step 8. Controller 연결

- `PostController.kt`에서 `POST /posts`, `GET /posts`, `GET /posts/{id}`를 연결합니다.
- Controller는 Service를 호출만 하도록 유지합니다.

실습 힌트:
- Controller에서 리스트를 직접 만지지 마세요.
- 요청 입구와 처리 흐름이 분리되는지 보세요.

### Step 9. Swagger 실행

- 서버를 실행합니다.
- `http://localhost:8080/swagger`에 접속합니다.
- POST와 GET을 직접 실행합니다.

실습 힌트:
- 요청 body를 직접 입력해보세요.
- 응답 JSON과 상태 코드를 함께 확인하세요.

## 실행 확인 방법

```bash
./gradlew bootRun
```

브라우저에서 아래 주소를 엽니다.

```text
http://localhost:8080/swagger
```

## 학생 체크 질문

- 생성 요청은 어떤 파일들을 지나 응답으로 돌아오나요?
- Controller와 Service의 역할은 무엇이 다른가요?
- 왜 지금은 메모리 저장소를 쓰나요?
- 서버를 재시작하면 데이터가 왜 사라지나요?

## 다음 시퀀스 연결 포인트

다음 시퀀스에서는 지금 메모리에 저장하던 흐름을 실제 영속 저장으로 바꾸게 됩니다.
이번 실습에서 요청 -> 처리 -> 응답 흐름이 잡혀 있어야, 그다음에는 "저장 위치가 바뀌는 것"에 집중할 수 있습니다.
