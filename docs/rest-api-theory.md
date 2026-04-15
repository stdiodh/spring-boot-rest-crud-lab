# REST API로 요청과 응답 흐름 익히기

> 백엔드가 "요청을 받고, 처리하고, 응답을 돌려주는 구조"라는 걸 가장 단순한 코드로 직접 확인해보자.

## 이 주제를 왜 배우는가

백엔드를 처음 배울 때 가장 헷갈리는 건 기능보다 흐름이다.
"요청이 어디로 들어오고, 누가 처리하고, 어떤 모양으로 응답이 나가는지"가 안 잡히면 뒤에서 배우는 DB나 보안도 전부 어렵게 느껴진다.
그래서 이번 실습에서는 복잡한 기술을 붙이기보다, CRUD API를 만들면서 요청 → 처리 → 응답 흐름을 손으로 먼저 익힌다.
이 흐름이 익숙해지면 다음에는 "이 데이터를 메모리가 아니라 DB에 저장하면 어떻게 바뀔까?"로 자연스럽게 넘어갈 수 있다.

---

## 핵심 용어 정리

### Resource

- **정의**
  API가 다루는 대상이다.
- **왜 중요한가**
  REST는 "무엇을 다루는 API인지"가 URL에서 바로 보여야 이해하기 쉽다.
- **이번 코드에서는 어디에 보이는가**
  이 레포에서는 `Idol` 정보가 Resource이고, `/idols`, `/idols/{id}`가 그 대상을 가리킨다.

> 한 줄 감각
> Resource는 "API가 관리하는 대상"이라고 보면 된다.

### HTTP Method

- **정의**
  요청이 조회인지, 생성인지, 수정인지, 삭제인지를 구분하는 약속이다.
- **왜 중요한가**
  같은 `/idols`라도 `GET`과 `POST`는 완전히 다른 의미를 가지기 때문이다.
- **이번 코드에서는 어디에 보이는가**
  `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`으로 확인할 수 있다.

> 한 줄 감각
> URI가 주소라면, HTTP Method는 "이 주소에서 뭘 할지"를 붙이는 동사에 가깝다.

### DTO

- **정의**
  요청과 응답 데이터를 주고받기 위한 객체다.
- **왜 중요한가**
  서버 안에서 쓰는 데이터와 바깥으로 주고받는 데이터를 나누면 코드가 훨씬 읽기 쉬워진다.
- **이번 코드에서는 어디에 보이는가**
  `IdolRequest`, `IdolResponse`가 그 역할을 맡는다.

> 한 줄 감각
> DTO는 "들어오는 데이터 포장지"와 "나가는 데이터 포장지"라고 생각하면 쉽다.

---

## 핵심 개념 설명

### 1. Controller는 입구이고, Service는 실제 처리 담당이다

Controller는 요청을 받는 곳이고, Service는 실제 CRUD 흐름을 처리하는 곳이다.
둘을 나눠두면 요청을 받는 코드와 비즈니스 로직이 섞이지 않아서 읽기 쉬워진다.
이번 실습에서는 `IdolController`가 `idolService.getAll()`이나 `idolService.create(request)`를 호출하는 모습이 이 역할 분리를 가장 잘 보여준다.

### 2. CRUD는 백엔드 기본 흐름을 한 번에 보여준다

CRUD는 생성, 조회, 수정, 삭제를 뜻한다.
대부분의 백엔드 서비스는 이름만 다를 뿐 결국 이 네 가지 흐름을 계속 반복한다.
그래서 이 실습에서 CRUD를 익혀두면 뒤에서 DB를 붙이든, 인증을 붙이든 같은 흐름을 다시 발견하게 된다.

### 3. 응답용 DTO를 따로 두면 반환 데이터가 깔끔해진다

서버 내부에서 쓰는 모델과 클라이언트에게 돌려주는 데이터는 목적이 다를 수 있다.
그래서 `IdolResponse.from(idol)`처럼 한 번 변환해서 응답을 만들면, 어떤 값이 밖으로 나가는지 분명해진다.
이 감각은 뒤에서 JPA Entity와 DTO를 분리할 때도 그대로 이어진다.

---

## 중요한 코드 먼저 보기

### 1. 요청이 시작되는 곳은 Controller다

```kotlin
@GetMapping
fun getAll(): List<IdolResponse> {
    // Controller는 요청을 받는 입구다.
    return idolService.getAll()
    // 실제 목록 조회는 Service에게 맡긴다.
}
```

- 이 코드를 보면 Controller가 "직접 처리"보다 "흐름을 넘기는 역할"에 가깝다는 점이 보인다.
- `GET /idols` 요청이 들어왔을 때 어디서 시작하는지 가장 먼저 잡아주기 좋은 코드다.
- 파일: `src/main/kotlin/com/andi/rest_crud/controller/IdolController.kt`

### 2. 생성 흐름은 Service에서 완성된다

```kotlin
fun create(request: IdolRequest): IdolResponse {
    val idol = Idol(
        id = idSequence++,
        name = request.name,
        group = request.group,
        agency = request.agency,
        debutYear = request.debutYear
    )
    idols.add(idol)
    return IdolResponse.from(idol)
}
```

- 여기서는 "요청 DTO를 받아서 모델을 만들고, 저장하고, 응답 DTO로 바꾼다"는 흐름이 한 번에 보인다.
- 아직은 DB가 아니라 메모리 리스트에 넣고 있다는 점도 같이 확인하면 좋다.
- 파일: `src/main/kotlin/com/andi/rest_crud/service/IdolService.kt`

### 3. 응답 DTO는 바깥으로 나갈 모양을 정리한다

```kotlin
companion object {
    fun from(idol: Idol): IdolResponse = IdolResponse(
        id = idol.id,
        name = idol.name,
        group = idol.group,
        agency = idol.agency,
        debutYear = idol.debutYear
    )
}
```

- 이 코드는 내부 모델 `Idol`을 응답용 데이터 `IdolResponse`로 바꾸는 부분이다.
- 나중에 Entity와 Response를 분리할 때도 이런 변환 메서드가 많이 등장하므로, 지금 감을 잡아두면 좋다.
- 파일: `src/main/kotlin/com/andi/rest_crud/dto/IdolResponse.kt`

---

## 코드 구조와 연결해서 보기

### Controller는 무엇을 할까?
- 요청을 받고, 필요한 값을 꺼내고, Service를 호출한다.
- 이 레포에서는 `IdolController`가 그 역할을 맡는다.
- `getAll()`이나 `create()`에서 직접 리스트를 만지지 않는다는 점을 먼저 보면 된다.

### Service는 무엇을 할까?
- 실제 CRUD 흐름을 만든다.
- 데이터를 찾고, 만들고, 수정하고, 삭제하는 처리가 여기에 모여 있다.
- 이 레포에서는 `IdolService`가 그 역할을 맡는다.

### DTO는 왜 필요할까?
- 요청 형식과 응답 형식을 분리하면 코드가 더 읽기 쉬워진다.
- 이 레포에서는 `IdolRequest`, `IdolResponse`가 그 역할을 맡는다.
- 특히 `IdolResponse.from(idol)`은 꼭 한 번 직접 보면 좋다.

---

## 이번 실습 흐름을 한 번에 보기

1. Postman이 `/idols`로 요청을 보낸다.
2. `IdolController`가 요청을 받는다.
3. `IdolService`가 실제 CRUD 처리를 한다.
4. 필요하면 `IdolResponse`로 응답 형식을 만든다.
5. 결과를 JSON과 상태 코드로 돌려준다.

짧게 말하면, 이번 실습은  
**요청 → 처리 → 응답** 흐름을 손으로 익히는 과정이다.

---

## 실습에서 꼭 보면 좋은 포인트

- `IdolController`가 직접 처리하지 않고 Service에 넘기는 부분
- `IdolService.create()`에서 request 값으로 `Idol`을 만드는 부분
- `IdolResponse.from(...)`가 응답 모양을 정리하는 부분
- 지금은 저장소가 DB가 아니라 메모리 리스트라는 점

---

## 자주 헷갈리는 부분

### Q. 왜 Controller에 다 넣으면 안 되나요?
A. 처음에는 가능해 보여도, 요청 처리와 비즈니스 로직이 한곳에 섞이면 금방 길어지고 테스트도 어려워진다.

### Q. 왜 DTO를 따로 두나요?
A. 요청으로 들어오는 값과 응답으로 보여줄 값을 나누면 코드가 훨씬 명확해진다.

### Q. 지금 바로 DB를 붙이면 안 되나요?
A. 할 수는 있지만, 이번 실습 목표는 저장 기술보다 "요청 → 처리 → 응답" 흐름을 먼저 익히는 데 있다.

---

## 한 줄 예시로 감 잡기

> Controller는 주문을 받는 창구이고, Service는 주방에서 실제로 요리하는 쪽이라고 보면 된다.

---

## 오늘 실습에서 꼭 기억할 것

1. REST API는 URI로 대상을 보여주고, HTTP Method로 행동을 구분한다.
2. 이번 코드에서는 `IdolController`와 `IdolService`가 요청과 처리 역할을 나눠 보여준다.
3. 다음 단계로 넘어가기 전에 "요청이 들어와서 어떤 코드를 거쳐 응답이 나가는지"를 직접 설명할 수 있어야 한다.
