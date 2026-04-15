# REST API로 요청과 응답 흐름 익히기

> 백엔드가 "요청을 받고, 처리하고, 응답을 돌려주는 구조"라는 걸 가장 단순한 형태로 직접 확인해보자.

## 이 주제를 왜 배우는가

백엔드를 처음 보면 기능보다 흐름이 더 어렵다.
"요청이 어디로 들어오고, 누가 처리하고, 무엇을 돌려주는지"가 머릿속에 안 잡히면 이후 DB나 보안도 전부 어렵게 느껴진다.
그래서 이번 실습에서는 가장 기본적인 CRUD API를 직접 만들면서 요청 → 처리 → 응답 흐름을 손으로 익힌다.
이 흐름이 잡히면 다음에는 "그 데이터를 어디에 저장할까?"라는 질문으로 자연스럽게 넘어갈 수 있다.

---

## 핵심 용어 정리

### Resource

- **정의**
  Resource는 API가 다루는 대상이다.
- **왜 중요한가**
  REST에서는 "무엇을 다루는지"를 먼저 분명하게 보여줘야 하기 때문이다.
- **이번 코드에서는 어디에 보이는가**
  이 레포에서는 `Idol` 정보가 Resource이고, URL은 `/idols`, `/idols/{id}`처럼 표현된다.

> 한 줄 감각
> Resource는 "API가 관리하는 대상"이라고 보면 된다.

### URI

- **정의**
  URI는 자원을 구분하는 주소다.
- **왜 중요한가**
  URL만 봐도 "아 이 API는 아이돌 목록을 다루는구나"가 보여야 REST스럽기 때문이다.
- **이번 코드에서는 어디에 보이는가**
  `IdolController`의 `@RequestMapping("/idols")`, `@GetMapping("/{id}")` 같은 부분에서 확인할 수 있다.

> 한 줄 감각
> URI는 "어디에 요청하는지"를 보여주는 주소표라고 생각하면 된다.

### HTTP Method

- **정의**
  HTTP Method는 이 요청이 조회인지, 생성인지, 수정인지, 삭제인지를 구분해준다.
- **왜 중요한가**
  같은 `/idols`라도 `GET`인지 `POST`인지에 따라 완전히 다른 동작을 하게 되기 때문이다.
- **이번 코드에서는 어디에 보이는가**
  `IdolController`의 `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`이 그 역할을 맡는다.

| Method | 의미 | 예시 |
|------|------|------|
| `GET` | 조회 | 전체 목록 조회, 단건 조회 |
| `POST` | 생성 | 새 데이터 생성 |
| `PUT` | 수정 | 기존 데이터 수정 |
| `DELETE` | 삭제 | 기존 데이터 삭제 |

### DTO

- **정의**
  데이터를 주고받기 위한 객체다.
- **왜 중요한가**
  요청 형식과 응답 형식을 깔끔하게 나누면 코드가 읽기 쉬워진다.
- **이번 코드에서는 어디에 보이는가**
  `IdolRequest`, `IdolResponse`가 그 역할을 맡는다.

> 한 줄 감각
> DTO는 "들어오는 데이터 포장지"와 "나가는 데이터 포장지"라고 생각하면 쉽다.

### Status Code

- **정의**
  요청 결과를 숫자로 보여주는 약속이다.
- **왜 중요한가**
  단순히 데이터만 돌려주는 것이 아니라, 요청이 성공했는지 실패했는지를 함께 알려줘야 하기 때문이다.
- **이번 코드에서는 어디에 보이는가**
  `@ResponseStatus(HttpStatus.CREATED)`, `HttpStatus.NO_CONTENT` 같은 부분에서 볼 수 있다.

| 코드 | 의미 | 언제 쓰는가 |
|------|------|------------|
| `200 OK` | 성공 | 조회, 수정 성공 |
| `201 Created` | 생성 성공 | POST 요청 성공 |
| `204 No Content` | 성공, 본문 없음 | 삭제 성공 |
| `400 Bad Request` | 잘못된 요청 | 요청 데이터가 잘못됨 |
| `404 Not Found` | 대상 없음 | 없는 id 조회 |
| `500 Internal Server Error` | 서버 오류 | 예상 못한 실패 |

---

## 핵심 개념 설명

### 1. Controller와 Service는 역할이 다르다

Controller는 요청을 받고, Service는 실제 처리 흐름을 만든다.
쉽게 말하면 Controller는 입구이고, Service는 안쪽 처리 담당이다.
이번 실습에서는 `IdolController`가 `idolService.getAll()`, `idolService.create(request)` 같은 식으로 처리를 넘기는 흐름이 핵심이다.

### 2. CRUD는 백엔드 기본 동작을 한 번에 보여준다

CRUD는 생성(Create), 조회(Read), 수정(Update), 삭제(Delete)를 뜻한다.
대부분의 백엔드 서비스는 이름만 다를 뿐 결국 이 네 가지 흐름을 여러 형태로 반복한다.
그래서 이번 실습에서 CRUD를 먼저 익혀두면 이후 DB, 인증, 테스트 주제에서도 같은 흐름을 다시 발견할 수 있다.

### 3. DTO를 쓰면 요청과 응답이 더 분명해진다

클라이언트가 보내는 값과 서버가 돌려주는 값을 같은 객체로만 처리하면 점점 헷갈리기 쉽다.
그래서 이번 실습에서는 `IdolRequest`, `IdolResponse`로 역할을 나눠서 본다.
특히 `IdolResponse.from(idol)` 같은 코드를 보면, 내부 모델을 응답 형식으로 바꾸는 감각을 익히기 좋다.

---

## 먼저 보면 좋은 코드

- `src/main/kotlin/com/andi/rest_crud/controller/IdolController.kt`
  - 요청이 어디서 시작되는지 가장 먼저 보이는 파일이다.
  - `getAll()`, `create()` 메서드를 먼저 보면 전체 흐름이 잡힌다.

- `src/main/kotlin/com/andi/rest_crud/service/IdolService.kt`
  - 이번 실습의 진짜 핵심이다.
  - `getAll()`, `create()`, `update()`를 보면 "실제로 처리하는 곳"이 어디인지 바로 보인다.

- `src/main/kotlin/com/andi/rest_crud/dto/IdolResponse.kt`
  - 왜 DTO를 따로 두는지 감 잡기 좋다.
  - `from(idol)` 메서드를 보면 내부 모델이 응답 데이터로 바뀌는 흐름이 보인다.

---

## 코드 구조와 연결해서 보기

### Controller는 무엇을 할까?
- 요청을 받고, 필요한 값을 꺼내고, Service를 호출한다.
- 이 레포에서는 `IdolController`가 그 역할을 맡는다.
- 예를 들어 `getAll()`은 직접 처리하지 않고 `idolService.getAll()`만 호출한다.

### Service는 무엇을 할까?
- 실제 CRUD 흐름을 만든다.
- 데이터를 찾고, 만들고, 수정하고, 삭제하는 처리가 여기에 있다.
- 이 레포에서는 `IdolService`가 그 역할을 맡는다.

### DTO는 왜 필요할까?
- 요청 형식과 응답 형식을 분리해 코드가 더 읽기 쉬워진다.
- 이 레포에서는 `IdolRequest`, `IdolResponse`가 그 역할을 맡는다.
- `IdolResponse.from(idol)`는 꼭 한 번 직접 보면 좋다.

---

## 이번 실습 흐름을 한 번에 보기

1. Postman이 `/idols`로 요청을 보낸다.
2. `IdolController`가 그 요청을 받는다.
3. `IdolService`가 실제 CRUD 처리를 한다.
4. 필요하면 `IdolResponse`로 응답 형식을 만든다.
5. 결과를 JSON과 상태 코드로 돌려준다.

짧게 말하면, 이번 실습은
**[요청] → [처리] → [응답]** 흐름을 손으로 익히는 과정이다.

---

## 실습에서 꼭 보면 좋은 포인트

- `IdolController`가 직접 처리하지 않고 Service에 넘기는 부분
- `IdolService.create()`에서 request 값으로 `Idol`을 만드는 부분
- `IdolResponse.from(...)`로 응답 형태를 정리하는 부분
- 지금은 메모리 리스트로 저장한다는 점

---

## 자주 헷갈리는 부분

### Q. 왜 Controller에 다 넣으면 안 되나요?
A. 처음엔 가능해 보여도, 기능이 늘어나면 요청 처리와 비즈니스 로직이 섞여서 금방 읽기 어려워진다.

### Q. 왜 DTO를 따로 두나요?
A. 요청으로 들어오는 값과 응답으로 보여줄 값을 분리하면 코드가 훨씬 명확해진다.

### Q. 지금 바로 DB를 붙이면 안 되나요?
A. 붙일 수는 있지만, 이번 실습 목표는 저장 기술보다 "요청 → 처리 → 응답" 흐름을 먼저 익히는 데 있다.

---

## 한 줄 예시로 감 잡기

> Controller는 주문을 받는 창구이고, Service는 주방에서 실제로 요리하는 쪽이라고 보면 된다.

---

## 오늘 실습에서 꼭 기억할 것

1. REST API는 "무엇을 다루는지"는 URI로, "무슨 행동을 하는지"는 HTTP Method로 표현한다.
2. 이번 코드에서는 `IdolController`와 `IdolService`가 요청과 처리 역할을 나눠 보여준다.
3. 다음 단계로 넘어가기 전에 요청이 들어와서 응답으로 나가기까지 흐름을 직접 설명할 수 있어야 한다.
