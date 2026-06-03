window.visualLabData = {
  sequence: "01",
  title: "REST CRUD",
  goal: "HTTP 요청이 Controller, Service, 메모리 저장소를 지나 JSON 응답으로 돌아오는 흐름을 이해한다.",
  problem: "처음 백엔드를 배울 때는 API 코드가 여러 파일에 흩어져 보입니다. 이 시퀀스는 DB와 보안을 잠시 미루고, 요청이 어느 계층을 지나 응답으로 돌아오는지 한 화면에서 잡도록 돕습니다.",
  concepts: [
    {
      name: "Controller",
      description: "HTTP method와 path를 보고 어떤 Service 흐름을 실행할지 연결합니다.",
    },
    {
      name: "Service",
      description: "요청 데이터를 내부 데이터로 바꾸고 저장소 호출과 응답 변환을 조율합니다.",
    },
    {
      name: "DTO",
      description: "클라이언트가 보내는 값과 서버가 돌려주는 값을 명확한 모양으로 분리합니다.",
    },
    {
      name: "Memory Repository",
      description: "DB 없이 리스트에 데이터를 저장해 CRUD 흐름을 빠르게 확인합니다.",
    },
  ],
  flow: [
    {
      id: "step-1",
      label: "Request",
      problem: "클라이언트 요청이 어떤 코드로 들어오는지 먼저 보여야 합니다.",
      concept: "Controller는 API 입구입니다.",
      action: "`POST /posts`, `GET /posts`, `GET /posts/{id}` 요청을 Controller 메서드와 연결합니다.",
      check: "HTTP method와 path가 의도한 CRUD 동작과 맞는지 확인합니다.",
    },
    {
      id: "step-2",
      label: "DTO",
      problem: "요청 JSON을 그대로 내부 데이터처럼 쓰면 역할이 흐려집니다.",
      concept: "Request DTO와 Response DTO는 외부 입출력 모양을 맡습니다.",
      action: "`PostCreateRequest`로 입력 값을 받고 `PostResponse`로 응답 값을 정리합니다.",
      check: "요청 필드와 응답 필드가 API 의도와 맞는지 확인합니다.",
    },
    {
      id: "step-3",
      label: "Service",
      problem: "Controller가 저장까지 직접 맡으면 요청 처리와 작업 흐름이 섞입니다.",
      concept: "Service는 request -> model -> repository -> response 흐름을 조립합니다.",
      action: "`PostService`에서 게시글 생성과 조회 흐름을 연결합니다.",
      check: "Controller가 Service를 호출하는 입구 역할에 머무르는지 확인합니다.",
    },
    {
      id: "step-4",
      label: "Memory Store",
      problem: "DB 없이도 저장과 조회 흐름은 먼저 연습할 수 있습니다.",
      concept: "Memory Repository는 리스트 기반 임시 저장소입니다.",
      action: "`PostMemoryRepository`에서 저장, 전체 조회, 단건 조회를 연결합니다.",
      check: "서버 재시작 후 데이터가 사라지는 이유를 설명할 수 있는지 확인합니다.",
    },
    {
      id: "step-5",
      label: "Swagger Check",
      problem: "코드만 보고는 실제 요청과 응답이 맞는지 확인하기 어렵습니다.",
      concept: "Swagger는 초반 실습에서 API 실행 결과를 빠르게 확인하는 도구입니다.",
      action: "브라우저에서 생성, 전체 조회, 단건 조회를 실행합니다.",
      check: "응답 status와 JSON body가 예상 흐름과 맞는지 확인합니다.",
    },
  ],
  practice: [
    "Controller, Service, Repository 역할이 섞이지 않았는지 확인합니다.",
    "`POST /posts`, `GET /posts`, `GET /posts/{id}`를 직접 실행합니다.",
    "응답 status와 JSON body가 요청 의도와 맞는지 확인합니다.",
    "서버를 재시작하면 메모리 데이터가 사라지는 이유를 설명합니다.",
  ],
  mentorHints: [
    "학생이 Controller에서 바로 저장하려고 하면 Service로 역할을 나누는 이유를 질문합니다.",
    "DTO 설명은 필드 복사보다 외부 요청 모양과 내부 데이터 모양의 분리로 연결합니다.",
    "메모리 저장의 한계를 다음 시퀀스의 DB 저장 필요성과 연결합니다.",
  ],
};
