window.visualLabData = {
  "kind": "sequence",
  "sequence": "01",
  "title": "REST CRUD",
  "subtitle": "Spring Boot REST API",
  "goal": "Controller, Service, 메모리 저장소, DTO의 책임을 분리해 가장 작은 CRUD 흐름을 이해합니다.",
  "problem": "백엔드 코드는 사용자의 HTTP 요청을 받아 처리하고 응답을 돌려주는 흐름으로 시작합니다.",
  "repo": {
    "name": "spring-boot-rest-crud-lab",
    "path": "spring-boot-rest-crud-lab"
  },
  "defaultSequence": "01",
  "workbench": {
    "kind": "request-trace",
    "title": "메모리 CRUD 요청이 왕복하는 과정",
    "instruction": "요청 종류를 선택하고 Controller, Service, 메모리 Repository, DTO가 맡는 책임을 경로와 실행 증거로 확인하세요.",
    "visual": {
      "src": "../../assets/diagrams/01-memory-crud-map.svg",
      "alt": "Client 요청이 Controller, Service, 메모리 Repository를 거쳐 응답 DTO로 돌아오는 구조",
      "caption": "HTTP 입구와 애플리케이션 처리, 프로세스 메모리의 책임을 분리합니다."
    },
    "terms": [
      {
        "term": "DTO",
        "meaning": "HTTP 요청·응답처럼 경계 사이에서 필요한 데이터만 옮기는 객체입니다."
      },
      {
        "term": "Service",
        "meaning": "변환과 저장, 조회 순서를 조립하는 애플리케이션 책임입니다."
      },
      {
        "term": "Repository",
        "meaning": "데이터를 보관하고 다시 찾는 방법을 캡슐화하는 책임입니다."
      },
      {
        "term": "메모리 저장소",
        "meaning": "실행 중인 프로세스 안의 컬렉션에만 데이터를 보관하는 저장 방식입니다."
      }
    ],
    "comparison": {
      "label": "같은 Repository라도 다른 데이터 수명",
      "left": {
        "title": "프로세스 메모리",
        "body": "빠르게 CRUD 흐름을 배우지만 서버 재시작과 함께 데이터가 사라집니다."
      },
      "right": {
        "title": "외부 DB",
        "body": "애플리케이션 프로세스와 분리되어 재시작 뒤에도 데이터를 다시 조회할 수 있습니다."
      }
    },
    "nodes": {
      "client": {
        "label": "Client",
        "icon": "client",
        "kind": "client",
        "role": "HTTP 요청을 보내고 JSON 응답을 읽습니다.",
        "systemLayer": "outside",
        "boundary": "HTTP 외부"
      },
      "controller": {
        "label": "PostController",
        "icon": "api",
        "kind": "api",
        "role": "HTTP method와 path를 Service 호출에 연결합니다.",
        "systemLayer": "interface",
        "boundary": "HTTP 입구",
        "codePointIds": ["controller-create"]
      },
      "service": {
        "label": "PostService",
        "icon": "service",
        "kind": "service",
        "role": "요청, 내부 모델, 저장과 응답 변환 순서를 조립합니다.",
        "systemLayer": "application",
        "boundary": "애플리케이션 처리",
        "codePointIds": ["memory-service"]
      },
      "app-runtime": {
        "label": "Spring Boot process",
        "icon": "service",
        "kind": "service",
        "role": "애플리케이션과 그 안의 Repository 인스턴스를 시작하고 종료합니다.",
        "systemLayer": "runtime",
        "boundary": "프로세스 수명"
      },
      "memory-repository": {
        "label": "PostMemoryRepository",
        "icon": "memory",
        "kind": "repository",
        "role": "프로세스 안의 List를 소유하고 id 부여와 조회를 담당합니다.",
        "systemLayer": "resource",
        "boundary": "프로세스 메모리",
        "codePointIds": ["memory-repository"]
      }
    },
    "scenarios": [
      {
        "id": "create-in-memory",
        "label": "게시글 생성",
        "flowId": "create-post",
        "tone": "recovered",
        "prompt": "POST /posts JSON에는 id가 없고 저장 응답에는 새 id가 필요합니다.",
        "observationTitle": "요청 JSON에 새 id가 생기는 지점",
        "reflection": {
          "prompt": "id가 생기는 지점을 중심으로 세 계층의 역할을 자기 말로 이어 보세요.",
          "hint": "binding, 내부 데이터 변환, id 부여, 응답 변환을 순서대로 연결하세요."
        },
        "theoryRef": "../../../theory.md#seq-01",
        "prediction": {
          "prompt": "HTTP 입구, 변환 순서, id 부여를 어느 책임에 나눌까요?",
          "options": [
            {
              "id": "controller-direct",
              "label": "Controller가 변환과 저장을 모두 직접 처리한다"
            },
            {
              "id": "service-repository",
              "label": "Service가 변환을 조립하고 Repository가 id와 저장을 맡는다"
            }
          ],
          "answer": "service-repository",
          "explanation": "요청 mapping, 처리 순서, 저장 상태를 분리해야 변화가 생긴 계층을 찾을 수 있습니다."
        },
        "diagram": {
          "caption": "Client → Controller → Service에서 요청을 변환하고 Repository가 id를 붙여 응답 DTO로 돌려줍니다.",
          "lanes": [
            {
              "id": "create-round-trip",
              "label": "생성 요청과 응답",
              "description": "한 생성 요청의 HTTP 입구, 메모리 저장, 응답 반환을 잇습니다.",
              "steps": [
                {
                  "from": "client",
                  "to": "controller",
                  "verb": "요청",
                  "payload": "POST /posts + JSON body",
                  "kind": "request",
                  "effect": {
                    "kind": "transfer",
                    "subject": "POST /posts + JSON body",
                    "before": "Client: POST /posts + JSON body 전송 준비",
                    "after": "PostController: POST /posts + JSON body 수신"
                  },
                  "evidenceScope": "manual",
                  "concept": "HTTP entry",
                  "check": "method, path, body를 확인합니다.",
                  "codePointIds": [
                    "controller-create"
                  ]
                },
                {
                  "from": "controller",
                  "to": "service",
                  "verb": "호출",
                  "payload": "create(PostCreateRequest)",
                  "kind": "call",
                  "effect": {
                    "kind": "transfer",
                    "subject": "create(PostCreateRequest)",
                    "before": "PostController: method argument create(PostCreateRequest) 구성",
                    "after": "PostService: create(PostCreateRequest) method 진입"
                  },
                  "evidenceScope": "code",
                  "concept": "Request DTO",
                  "check": "Controller가 Repository를 직접 호출하지 않는지 확인합니다."
                },
                {
                  "from": "service",
                  "to": "service",
                  "verb": "변환",
                  "payload": "PostCreateRequest → Post",
                  "kind": "transform",
                  "effect": {
                    "kind": "transform",
                    "subject": "PostCreateRequest → Post",
                    "before": "PostService: PostCreateRequest",
                    "after": "PostService: Post"
                  },
                  "evidenceScope": "code",
                  "concept": "외부 요청과 내부 모델 분리",
                  "check": "요청에 없던 id가 아직 임시 값인지 확인합니다.",
                  "codePointIds": [
                    "memory-service"
                  ]
                },
                {
                  "from": "service",
                  "to": "memory-repository",
                  "verb": "저장",
                  "payload": "save(Post)",
                  "kind": "persist",
                  "effect": {
                    "kind": "persist",
                    "subject": "save(Post)",
                    "before": "PostMemoryRepository.posts: 해당 게시글 0건",
                    "after": "PostMemoryRepository.posts: 새 id가 붙은 Post 1건"
                  },
                  "evidenceScope": "code",
                  "concept": "in-process persistence",
                  "check": "Repository가 새 id를 붙이는지 확인합니다."
                },
                {
                  "from": "memory-repository",
                  "to": "service",
                  "verb": "반환",
                  "payload": "saved Post { id }",
                  "kind": "response",
                  "effect": {
                    "kind": "return",
                    "subject": "saved Post { id }",
                    "before": "PostService: id가 확정된 Post 없음",
                    "after": "PostService: 새 id가 있는 saved Post 확보"
                  },
                  "evidenceScope": "code",
                  "concept": "저장 결과",
                  "check": "반환된 Post에 id가 있는지 확인합니다."
                },
                {
                  "from": "service",
                  "to": "controller",
                  "verb": "변환",
                  "payload": "Post → PostResponse",
                  "kind": "transform",
                  "effect": {
                    "kind": "transform",
                    "subject": "Post → PostResponse",
                    "before": "PostService: Post",
                    "after": "PostController: PostResponse"
                  },
                  "evidenceScope": "code",
                  "concept": "Response DTO",
                  "check": "내부 Post를 그대로 응답하지 않는지 확인합니다."
                },
                {
                  "from": "controller",
                  "to": "client",
                  "verb": "응답",
                  "payload": "201 Created + PostResponse JSON",
                  "kind": "response",
                  "effect": {
                    "kind": "return",
                    "subject": "201 Created + PostResponse JSON",
                    "before": "Client: HTTP status와 body 미확정",
                    "after": "Client: 201 Created + PostResponse JSON"
                  },
                  "evidenceScope": "runtime",
                  "concept": "HTTP response",
                  "check": "Swagger 응답 status와 id를 확인합니다."
                }
              ]
            }
          ]
        },
        "route": [
          "Client",
          "PostController",
          "PostCreateRequest",
          "PostService",
          "PostMemoryRepository",
          "Memory Store",
          "PostResponse",
          "Client"
        ],
        "snapshot": [
          { "label": "Request", "value": "POST /posts" },
          { "label": "저장 결과", "value": "id가 붙은 Post", "tone": "recovered" },
          { "label": "Response", "value": "201 Created + JSON" }
        ],
        "evidence": "Swagger의 201 응답과 PostMemoryRepository.save(...)가 붙인 id를 대조합니다. 재시작 뒤 보존은 증명하지 않습니다.",
        "outcome": "새 id는 요청이 아니라 Repository의 메모리 저장 결과에서 확정됩니다."
      },
      {
        "id": "read-in-memory",
        "label": "전체·단건 조회",
        "flowId": "read-post",
        "tone": "signal",
        "prompt": "GET /posts 또는 GET /posts/{id}가 Controller에 들어옵니다.",
        "observationTitle": "조회 조건이 응답 DTO가 되는 경로",
        "reflection": {
          "prompt": "전체 조회와 단건 조회가 같은 계층을 지나면서 달라지는 입력 조건은 무엇인가요?",
          "hint": "`findAll()`과 `findById(id)`가 선택되는 원인을 URL의 id 유무에서 찾으세요."
        },
        "theoryRef": "../../../theory.md#seq-01",
        "prediction": {
          "prompt": "메모리에서 찾은 Post를 외부 응답으로 보낼 때 무엇을 거칠까요?",
          "options": [
            {
              "id": "return-model",
              "label": "내부 Post를 그대로 반환한다"
            },
            {
              "id": "response-dto",
              "label": "Service가 PostResponse DTO로 변환한다"
            }
          ],
          "answer": "response-dto",
          "explanation": "외부 응답 계약과 내부 모델을 분리하기 위해 조회 결과도 Response DTO로 변환합니다."
        },
        "diagram": {
          "caption": "Client의 조회 조건이 Controller → Service → Memory Repository를 지나 PostResponse로 돌아옵니다.",
          "lanes": [
            {
              "id": "read-round-trip",
              "label": "전체·단건 조회",
              "description": "전체 조회와 id 단건 조회가 같은 응답 변환 책임을 공유합니다.",
              "steps": [
                {
                  "from": "client",
                  "to": "controller",
                  "verb": "요청",
                  "payload": "GET /posts 또는 GET /posts/{id}",
                  "kind": "request",
                  "effect": {
                    "kind": "transfer",
                    "subject": "GET /posts 또는 GET /posts/{id}",
                    "before": "Client: GET /posts 또는 GET /posts/{id} 전송 준비",
                    "after": "PostController: GET /posts 또는 GET /posts/{id} 수신"
                  },
                  "evidenceScope": "manual",
                  "concept": "조회 URL",
                  "check": "전체 조회와 단건 조회 path를 구분합니다."
                },
                {
                  "from": "controller",
                  "to": "service",
                  "verb": "호출",
                  "payload": "getAll() 또는 getById(id)",
                  "kind": "call",
                  "effect": {
                    "kind": "transfer",
                    "subject": "getAll() 또는 getById(id)",
                    "before": "PostController: method argument getAll() 또는 getById(id) 구성",
                    "after": "PostService: getAll() 또는 getById(id) method 진입"
                  },
                  "evidenceScope": "code",
                  "concept": "요청 위임",
                  "check": "PathVariable id가 Service로 전달되는지 확인합니다."
                },
                {
                  "from": "service",
                  "to": "memory-repository",
                  "verb": "조회",
                  "payload": "findAll() 또는 findById(id)",
                  "kind": "call",
                  "effect": {
                    "kind": "transfer",
                    "subject": "findAll() 또는 findById(id)",
                    "before": "PostService: 전체 조회 또는 단건 id 조건을 선택",
                    "after": "PostMemoryRepository: posts 전체 반환 또는 같은 id 검색"
                  },
                  "evidenceScope": "code",
                  "concept": "메모리 조회",
                  "check": "의도와 맞는 Repository method인지 확인합니다."
                },
                {
                  "from": "memory-repository",
                  "to": "service",
                  "verb": "반환",
                  "payload": "Post 또는 List<Post>",
                  "kind": "response",
                  "effect": {
                    "kind": "return",
                    "subject": "Post 또는 List<Post>",
                    "before": "PostService: 메모리 조회 결과 없음",
                    "after": "PostService: 단건 Post 또는 현재 List<Post> 확보"
                  },
                  "evidenceScope": "code",
                  "concept": "내부 모델",
                  "check": "메모리 목록에서 찾은 결과를 확인합니다."
                },
                {
                  "from": "service",
                  "to": "service",
                  "verb": "변환",
                  "payload": "Post → PostResponse",
                  "kind": "transform",
                  "effect": {
                    "kind": "transform",
                    "subject": "Post → PostResponse",
                    "before": "PostService: Post",
                    "after": "PostService: PostResponse"
                  },
                  "evidenceScope": "code",
                  "concept": "응답 경계",
                  "check": "각 Post가 Response DTO로 바뀌는지 확인합니다."
                },
                {
                  "from": "service",
                  "to": "controller",
                  "verb": "반환",
                  "payload": "PostResponse 또는 List<PostResponse>",
                  "kind": "response",
                  "effect": {
                    "kind": "return",
                    "subject": "PostResponse 또는 List<PostResponse>",
                    "before": "PostController: HTTP body로 보낼 DTO 없음",
                    "after": "PostController: 단건 PostResponse 또는 변환된 목록 확보"
                  },
                  "evidenceScope": "code",
                  "concept": "Service result",
                  "check": "Controller가 결과 모양을 다시 조립하지 않는지 확인합니다."
                },
                {
                  "from": "controller",
                  "to": "client",
                  "verb": "응답",
                  "payload": "200 OK + JSON",
                  "kind": "response",
                  "effect": {
                    "kind": "return",
                    "subject": "200 OK + JSON",
                    "before": "Client: HTTP status와 body 미확정",
                    "after": "Client: 200 OK + JSON"
                  },
                  "evidenceScope": "runtime",
                  "concept": "HTTP response",
                  "check": "Swagger에서 전체·단건 응답을 확인합니다."
                }
              ]
            }
          ]
        },
        "route": [
          "Client",
          "PostController",
          "PostService",
          "PostMemoryRepository",
          "Memory Store",
          "PostResponse",
          "Client"
        ],
        "snapshot": [
          { "label": "Request", "value": "GET /posts 또는 GET /posts/{id}" },
          { "label": "Repository", "value": "findAll / findById" },
          { "label": "Response", "value": "PostResponse 또는 목록" }
        ],
        "evidence": "Swagger의 전체·단건 응답과 Service의 PostResponse 변환 코드를 대조합니다.",
        "outcome": "전체와 단건 조회는 선택 조건만 다르고 내부 Post는 모두 API 응답 DTO로 변환됩니다."
      },
      {
        "id": "restart-memory",
        "label": "서버 재시작",
        "flowId": "create-post",
        "tone": "warning",
        "prompt": "201로 만든 게시글이 애플리케이션의 메모리 List에만 있습니다.",
        "observationTitle": "프로세스 재시작 뒤 메모리 상태",
        "reflection": {
          "prompt": "프로세스와 메모리 저장소의 수명을 자기 말로 연결해 보세요.",
          "hint": "list의 수명이 프로세스와 같고 외부 저장소에는 기록되지 않았다는 점을 연결하세요."
        },
        "theoryRef": "../../../theory.md#seq-01",
        "prediction": {
          "prompt": "이 서버를 재시작하면 저장한 게시글은 어떻게 될까요?",
          "options": [
            {
              "id": "remains",
              "label": "같은 id와 내용으로 남는다"
            },
            {
              "id": "cleared",
              "label": "프로세스와 함께 사라져 조회 결과가 비어진다"
            }
          ],
          "answer": "cleared",
          "explanation": "저장 위치가 프로세스 메모리인지 외부 저장소인지가 수명을 결정합니다."
        },
        "diagram": {
          "caption": "기존 프로세스가 끝나며 List가 사라지고 새 프로세스는 빈 Repository로 시작합니다.",
          "lanes": [
            {
              "id": "before-restart",
              "label": "재시작 전",
              "description": "프로세스 안의 Repository 목록에 게시글이 저장된 상태입니다.",
              "steps": [
                {
                  "from": "client",
                  "to": "controller",
                  "verb": "요청",
                  "payload": "POST /posts + JSON",
                  "kind": "request",
                  "effect": {
                    "kind": "transfer",
                    "subject": "POST /posts + JSON",
                    "before": "Client: POST /posts + JSON 전송 준비",
                    "after": "PostController: POST /posts + JSON 수신"
                  },
                  "evidenceScope": "manual"
                },
                {
                  "from": "controller",
                  "to": "service",
                  "verb": "호출",
                  "payload": "create(PostCreateRequest)",
                  "kind": "call",
                  "effect": {
                    "kind": "transfer",
                    "subject": "create(PostCreateRequest)",
                    "before": "PostController: method argument create(PostCreateRequest) 구성",
                    "after": "PostService: create(PostCreateRequest) method 진입"
                  },
                  "evidenceScope": "code"
                },
                {
                  "from": "service",
                  "to": "memory-repository",
                  "verb": "저장",
                  "payload": "Post",
                  "kind": "persist",
                  "effect": {
                    "kind": "persist",
                    "subject": "Post",
                    "before": "PostMemoryRepository.posts: 해당 게시글 0건",
                    "after": "PostMemoryRepository.posts: 새 id가 붙은 Post 1건"
                  },
                  "evidenceScope": "code",
                  "concept": "프로세스 메모리",
                  "check": "재시작 전 목록에 Post가 있는지 확인합니다."
                },
                {
                  "from": "memory-repository",
                  "to": "service",
                  "verb": "반환",
                  "payload": "saved Post { id }",
                  "kind": "response",
                  "effect": {
                    "kind": "return",
                    "subject": "saved Post { id }",
                    "before": "PostService: id가 확정된 Post 없음",
                    "after": "PostService: 새 id가 있는 saved Post 확보"
                  },
                  "evidenceScope": "code"
                }
              ]
            },
            {
              "id": "restart-transition",
              "label": "프로세스 교체",
              "description": "이전 프로세스를 종료하고 새 Repository와 빈 List를 가진 프로세스를 시작합니다.",
              "steps": [
                {
                  "from": "app-runtime",
                  "to": "app-runtime",
                  "verb": "프로세스 재시작",
                  "payload": "실행 중 process 종료 → 새 process 시작",
                  "kind": "event",
                  "effect": {
                    "kind": "persist",
                    "subject": "실행 중 process 종료 → 새 process 시작",
                    "before": "기존 애플리케이션 process와 그 인스턴스가 실행 중",
                    "after": "기존 process 종료 후 새 process와 새 인스턴스 실행"
                  },
                  "evidenceScope": "manual",
                  "concept": "프로세스 수명"
                },
                {
                  "from": "app-runtime",
                  "to": "memory-repository",
                  "verb": "Repository 생성",
                  "payload": "PostMemoryRepository + empty mutableListOf<Post>()",
                  "kind": "event",
                  "effect": {
                    "kind": "persist",
                    "subject": "PostMemoryRepository + empty mutableListOf<Post>()",
                    "before": "종료된 Repository list: 게시글 1건",
                    "after": "새 PostMemoryRepository list: 게시글 0건"
                  },
                  "evidenceScope": "code",
                  "concept": "in-process state"
                }
              ]
            },
            {
              "id": "after-restart",
              "label": "재시작 후 조회",
              "description": "새 프로세스의 빈 Repository 목록을 HTTP 응답으로 확인합니다.",
              "steps": [
                {
                  "from": "client",
                  "to": "controller",
                  "verb": "다시 조회",
                  "payload": "GET /posts",
                  "kind": "request",
                  "effect": {
                    "kind": "transfer",
                    "subject": "GET /posts",
                    "before": "Client: GET /posts 전송 준비",
                    "after": "PostController: GET /posts 수신"
                  },
                  "evidenceScope": "manual"
                },
                {
                  "from": "controller",
                  "to": "service",
                  "verb": "호출",
                  "payload": "getAll()",
                  "kind": "call",
                  "effect": {
                    "kind": "transfer",
                    "subject": "getAll()",
                    "before": "PostController: method argument getAll() 구성",
                    "after": "PostService: getAll() method 진입"
                  },
                  "evidenceScope": "code"
                },
                {
                  "from": "service",
                  "to": "memory-repository",
                  "verb": "조회",
                  "payload": "findAll()",
                  "kind": "call",
                  "effect": {
                    "kind": "transfer",
                    "subject": "findAll()",
                    "before": "PostService: 재시작 뒤 전체 목록 조회 선택",
                    "after": "PostMemoryRepository: 새 posts list의 현재 항목 반환"
                  },
                  "evidenceScope": "code"
                },
                {
                  "from": "memory-repository",
                  "to": "service",
                  "verb": "반환",
                  "payload": "empty List<Post>",
                  "kind": "response",
                  "effect": {
                    "kind": "return",
                    "subject": "empty List<Post>",
                    "before": "PostService: 새 Repository의 목록 크기 미확인",
                    "after": "PostService: size=0인 List<Post> 확보"
                  },
                  "evidenceScope": "code",
                  "concept": "초기화된 메모리 상태",
                  "check": "조회 결과가 빈 목록인지 확인합니다."
                },
                {
                  "from": "service",
                  "to": "controller",
                  "verb": "반환",
                  "payload": "empty List<PostResponse>",
                  "kind": "response",
                  "effect": {
                    "kind": "return",
                    "subject": "empty List<PostResponse>",
                    "before": "PostController: 응답 목록 미구성",
                    "after": "PostController: size=0인 List<PostResponse> 확보"
                  },
                  "evidenceScope": "code"
                },
                {
                  "from": "controller",
                  "to": "client",
                  "verb": "응답",
                  "payload": "200 OK + []",
                  "kind": "response",
                  "effect": {
                    "kind": "return",
                    "subject": "200 OK + []",
                    "before": "Client: HTTP status와 body 미확정",
                    "after": "Client: 200 OK + []"
                  },
                  "evidenceScope": "runtime"
                }
              ]
            }
          ],
          "notReached": [
            {
              "label": "영속 저장소",
              "reason": "이 시퀀스는 DB를 사용하지 않아 프로세스 밖에 데이터를 남기지 않습니다."
            }
          ]
        },
        "route": [
          "Client",
          "PostController",
          "PostService",
          "PostMemoryRepository",
          "Memory Store",
          "서버 재시작",
          "Memory Store"
        ],
        "snapshot": [
          { "label": "재시작 전", "value": "메모리 목록에 존재" },
          { "label": "재시작 후", "value": "빈 목록", "tone": "warning" },
          { "label": "다음 질문", "value": "프로세스 밖 영속 저장소" }
        ],
        "evidence": "서버 재시작 전후 GET /posts를 비교합니다. 외부 DB나 파일 저장은 이 시퀀스에 없습니다.",
        "outcome": "프로세스가 교체되면 그 안의 List도 새로 만들어져 이전 게시글은 남지 않습니다."
      }
    ]
  },
  "actors": [
    {
      "id": "client",
      "label": "Client",
      "kind": "client"
    },
    {
      "id": "controller",
      "label": "PostController",
      "kind": "server"
    },
    {
      "id": "service",
      "label": "PostService",
      "kind": "logic"
    },
    {
      "id": "repository",
      "label": "PostMemoryRepository",
      "kind": "logic"
    },
    {
      "id": "memory",
      "label": "Memory Store",
      "kind": "cache"
    }
  ],
  "flows": [
    {
      "id": "create-post",
      "title": "게시글 생성 흐름",
      "summary": "POST 요청 body가 Request DTO로 들어와 내부 모델과 메모리 저장소를 거쳐 Response DTO로 돌아옵니다.",
      "mermaid": "sequenceDiagram\n  actor Client\n  participant Controller as PostController\n  participant Service as PostService\n  participant Store as In-memory Repository\n  Client->>Controller: POST /posts + request body\n  Controller->>Service: create(request)\n  Service->>Store: save(Post)\n  Store-->>Service: saved Post with id\n  Service-->>Controller: PostResponse\n  Controller-->>Client: JSON response",
      "steps": [
        {
          "order": 1,
          "actor": "Client",
          "input": "POST /posts + PostCreateRequest",
          "owner": "PostController",
          "action": "HTTP 요청 본문을 Request DTO로 받습니다.",
          "output": "PostCreateRequest",
          "note": "Controller는 요청 입구입니다. 저장 방식은 직접 알지 않습니다.",
          "id": "create-post-step-1",
          "from": "Client",
          "to": "PostController",
          "message": "HTTP 요청 본문을 Request DTO로 받습니다.",
          "messageKind": "request",
          "problem": "POST /posts + PostCreateRequest",
          "concept": "PostController",
          "check": "PostCreateRequest",
          "codePointIds": [
            "controller-create",
            "memory-service"
          ]
        },
        {
          "order": 2,
          "actor": "PostController",
          "input": "PostCreateRequest",
          "owner": "PostService",
          "action": "request 값을 내부 Post 모델로 바꾸고 저장 흐름을 조립합니다.",
          "output": "Post",
          "note": "처리 흐름은 Service에 모아야 다음 저장소 교체가 쉬워집니다.",
          "id": "create-post-step-2",
          "from": "PostController",
          "to": "PostService",
          "message": "request 값을 내부 Post 모델로 바꾸고 저장 흐름을 조립합니다.",
          "messageKind": "request",
          "problem": "PostCreateRequest",
          "concept": "PostService",
          "check": "Post",
          "codePointIds": [
            "memory-service",
            "controller-create"
          ]
        },
        {
          "order": 3,
          "actor": "PostService",
          "input": "Post",
          "owner": "In-memory Store",
          "action": "메모리 컬렉션에 저장하고 id가 있는 결과를 돌려줍니다.",
          "output": "Saved Post",
          "note": "이번 저장소는 학습용이며 서버 재시작 후 데이터가 사라집니다.",
          "id": "create-post-step-3",
          "from": "PostService",
          "to": "In-memory Store",
          "message": "메모리 컬렉션에 저장하고 id가 있는 결과를 돌려줍니다.",
          "messageKind": "request",
          "problem": "Post",
          "concept": "In-memory Store",
          "check": "Saved Post",
          "codePointIds": [
            "controller-create",
            "memory-service"
          ]
        },
        {
          "order": 4,
          "actor": "PostService",
          "input": "Saved Post",
          "owner": "PostResponse",
          "action": "내부 모델을 외부 응답 DTO로 변환합니다.",
          "output": "JSON response",
          "note": "API 응답 모양과 내부 처리 모델을 분리하는 첫 경계입니다.",
          "id": "create-post-step-4",
          "from": "PostService",
          "to": "PostResponse",
          "message": "내부 모델을 외부 응답 DTO로 변환합니다.",
          "messageKind": "response",
          "problem": "Saved Post",
          "concept": "PostResponse",
          "check": "JSON response",
          "codePointIds": [
            "memory-service",
            "controller-create"
          ]
        }
      ],
      "bandKind": "scenario"
    },
    {
      "id": "read-post",
      "title": "게시글 조회 흐름",
      "summary": "조회 요청은 id 또는 전체 목록을 메모리 저장소에서 찾고 응답 DTO 목록으로 정리합니다.",
      "mermaid": "sequenceDiagram\n  actor Client\n  participant Controller as PostController\n  participant Service as PostService\n  participant Store as In-memory Repository\n  Client->>Controller: GET /posts or GET /posts/{id}\n  Controller->>Service: find request\n  Service->>Store: findAll or findById\n  Store-->>Service: Post data\n  Service-->>Controller: PostResponse\n  Controller-->>Client: JSON response",
      "steps": [
        {
          "order": 1,
          "actor": "Client",
          "input": "GET /posts 또는 GET /posts/{id}",
          "owner": "PostController",
          "action": "조회 요청을 받고 필요한 id를 Service로 넘깁니다.",
          "output": "조회 요청",
          "note": "조회는 요청 body보다 URL과 id 경계를 먼저 봅니다.",
          "id": "read-post-step-1",
          "from": "Client",
          "to": "PostController",
          "message": "조회 요청을 받고 필요한 id를 Service로 넘깁니다.",
          "messageKind": "request",
          "problem": "GET /posts 또는 GET /posts/{id}",
          "concept": "PostController",
          "check": "조회 요청",
          "codePointIds": [
            "controller-create",
            "memory-service"
          ]
        },
        {
          "order": 2,
          "actor": "PostController",
          "input": "조회 요청",
          "owner": "PostService",
          "action": "저장소 조회를 요청하고 결과를 응답 DTO로 정리합니다.",
          "output": "PostResponse 또는 목록",
          "note": "Service는 저장소 결과를 그대로 밖으로 내보내지 않습니다.",
          "id": "read-post-step-2",
          "from": "PostController",
          "to": "PostService",
          "message": "저장소 조회를 요청하고 결과를 응답 DTO로 정리합니다.",
          "messageKind": "request",
          "problem": "조회 요청",
          "concept": "PostService",
          "check": "PostResponse 또는 목록",
          "codePointIds": [
            "memory-service",
            "controller-create"
          ]
        },
        {
          "order": 3,
          "actor": "PostService",
          "input": "findAll/findById",
          "owner": "In-memory Store",
          "action": "메모리 안의 데이터를 찾습니다.",
          "output": "Post data",
          "note": "이번 단계에서는 없는 id 예외 흐름을 깊게 다루지 않고 다음 시퀀스로 남깁니다.",
          "id": "read-post-step-3",
          "from": "PostService",
          "to": "In-memory Store",
          "message": "메모리 안의 데이터를 찾습니다.",
          "messageKind": "response",
          "problem": "findAll/findById",
          "concept": "In-memory Store",
          "check": "Post data",
          "codePointIds": [
            "controller-create",
            "memory-service"
          ]
        },
        {
          "id": "read-post-check-4",
          "order": 4,
          "actor": "In-memory Store",
          "owner": "확인 지점",
          "from": "In-memory Store",
          "to": "확인 지점",
          "message": "결과와 실패 지점을 확인합니다.",
          "messageKind": "response",
          "problem": "구현 후 실제로 어느 지점이 통과했는지 확인해야 합니다.",
          "concept": "CRUD 실행 결과 확인",
          "action": "문서의 확인 명령이나 화면에서 결과를 검증합니다.",
          "check": "성공 흐름과 실패 흐름을 말로 설명합니다.",
          "note": "Visual Lab은 코드를 대신 완성하지 않고 확인 지점을 고정합니다.",
          "codePointIds": [
            "memory-service"
          ]
        }
      ],
      "bandKind": "scenario"
    }
  ],
  "flow": [
    {
      "id": "create-post-step-1",
      "label": "PostController",
      "problem": "POST /posts + PostCreateRequest",
      "concept": "PostController",
      "action": "HTTP 요청 본문을 Request DTO로 받습니다.",
      "check": "PostCreateRequest",
      "codePointIds": [
        "controller-create",
        "memory-service"
      ]
    },
    {
      "id": "create-post-step-2",
      "label": "PostService",
      "problem": "PostCreateRequest",
      "concept": "PostService",
      "action": "request 값을 내부 Post 모델로 바꾸고 저장 흐름을 조립합니다.",
      "check": "Post",
      "codePointIds": [
        "memory-service",
        "controller-create"
      ]
    },
    {
      "id": "create-post-step-3",
      "label": "In-memory Store",
      "problem": "Post",
      "concept": "In-memory Store",
      "action": "메모리 컬렉션에 저장하고 id가 있는 결과를 돌려줍니다.",
      "check": "Saved Post",
      "codePointIds": [
        "controller-create",
        "memory-service"
      ]
    },
    {
      "id": "create-post-step-4",
      "label": "PostResponse",
      "problem": "Saved Post",
      "concept": "PostResponse",
      "action": "내부 모델을 외부 응답 DTO로 변환합니다.",
      "check": "JSON response",
      "codePointIds": [
        "memory-service",
        "controller-create"
      ]
    }
  ],
  "codePoints": [
    {
      "id": "controller-create",
      "title": "starter의 Controller TODO에서 Service 연결을 완성합니다",
      "file": "src/main/kotlin/com/andi/rest_crud/controller/PostController.kt",
      "language": "kotlin",
      "snippet": "// starter TODO: 요청 DTO를 Service로 넘기고 201 응답 body를 반환합니다.\n@PostMapping\n@ResponseStatus(HttpStatus.CREATED)\nfun create(@RequestBody request: PostCreateRequest): PostResponse {\n    TODO(\"postService.create(request)를 반환하세요.\")\n}",
      "explanation": "01-implementation에는 signature와 TODO가 있으며, 학습자는 `postService.create(request)` 반환을 연결합니다.",
      "check": "완성 코드를 전제로 읽지 말고 이 TODO가 Service 호출로 바뀌는지 확인합니다."
    },
    {
      "id": "memory-service",
      "title": "starter의 Service TODO에서 생성 순서를 구현합니다",
      "file": "src/main/kotlin/com/andi/rest_crud/service/PostService.kt",
      "language": "kotlin",
      "snippet": "// starter TODO: 요청, 내부 Post, 저장, 응답 변환 순서를 완성합니다.\nfun create(request: PostCreateRequest): PostResponse {\n    TODO(\"request -> Post -> save -> PostResponse 흐름을 완성하세요.\")\n}",
      "explanation": "01-implementation은 완성 코드가 아니라 구현 순서를 적은 TODO를 제공합니다.",
      "check": "구현 뒤 Repository가 붙인 id가 PostResponse까지 보존되는지 확인합니다."
    },
    {
      "id": "memory-repository",
      "title": "starter의 Repository TODO에서 list 저장을 구현합니다",
      "file": "src/main/kotlin/com/andi/rest_crud/repository/PostMemoryRepository.kt",
      "language": "kotlin",
      "snippet": "// starter TODO: 새 id를 붙인 Post를 process 안의 list에 저장합니다.\nfun save(post: Post): Post {\n    TODO(\"메모리 리스트에 새 Post를 저장하고 반환하세요.\")\n}",
      "explanation": "실제 starter는 `posts`와 `nextId`를 갖지만 `save` 본문은 아직 TODO입니다.",
      "check": "완성 뒤 새 id가 붙은 Post가 list와 반환값에 모두 남는지 확인합니다."
    }
  ],
  "concepts": [
    {
      "title": "Controller는 HTTP 입구입니다",
      "body": "method, URL, request body를 받아 Service로 넘기고 응답을 돌려주는 경계입니다."
    },
    {
      "title": "Service는 흐름을 조립합니다",
      "body": "요청 DTO를 내부 모델로 바꾸고 저장소 결과를 응답 DTO로 바꿉니다."
    },
    {
      "title": "Repository는 저장 방식을 감춥니다",
      "body": "이번에는 메모리지만 다음 시퀀스에서는 DB 저장소로 바뀔 수 있습니다."
    },
    {
      "title": "DTO는 API 계약입니다",
      "body": "외부로 보여줄 요청과 응답 모양을 내부 모델과 분리합니다."
    }
  ],
  "practice": [
    "POST 요청이 Controller, Service, 저장소, Response DTO를 어떤 순서로 지나는지 설명할 수 있나요?",
    "Controller가 저장소를 직접 알지 않아야 하는 이유를 말할 수 있나요?",
    "Request DTO와 Response DTO의 역할 차이를 설명할 수 있나요?",
    "메모리 저장소의 한계가 다음 DB 시퀀스로 어떻게 이어지는지 설명할 수 있나요?"
  ],
  "mentorHints": [],
  "relatedDocs": [],
  "relatedCode": [],
  "topic": "Spring Boot REST API",
  "question": "HTTP 요청이 서버 안에서 어떤 계층을 지나 응답 DTO로 돌아올까?",
  "source": {
    "theory": "../../../theory.md",
    "implementation": "../../../implementation.md",
    "checklist": "../../../checklist.md"
  },
  "why": {
    "problem": "백엔드 코드는 사용자의 HTTP 요청을 받아 처리하고 응답을 돌려주는 흐름으로 시작합니다.",
    "limits": [
      "Controller에 모든 처리를 넣으면 HTTP 입구와 비즈니스 흐름이 섞입니다.",
      "저장 방식을 바로 노출하면 다음 DB 전환 때 수정 범위가 커집니다.",
      "내부 모델을 그대로 응답하면 API 계약과 서버 내부 구조가 함께 흔들립니다."
    ],
    "choice": "Controller는 HTTP 입구로 두고, Service가 request -> domain -> repository -> response 흐름을 조립하게 합니다."
  },
  "overview": [
    "Request DTO",
    "PostController",
    "PostService",
    "In-memory Store",
    "Post",
    "PostResponse"
  ],
  "responsibilities": [
    {
      "name": "PostController",
      "role": "HTTP 요청과 응답의 경계를 담당합니다.",
      "caution": "저장소를 직접 호출하지 않고 Service를 호출합니다."
    },
    {
      "name": "PostService",
      "role": "request -> domain -> repository -> response 흐름을 조립합니다.",
      "caution": "HTTP annotation을 직접 다루지 않습니다."
    },
    {
      "name": "In-memory Repository",
      "role": "실습용 데이터 저장과 조회를 맡습니다.",
      "caution": "운영 저장소가 아니며 서버 재시작 후 데이터가 사라집니다."
    },
    {
      "name": "DTO",
      "role": "외부 요청/응답 계약을 표현합니다.",
      "caution": "내부 모델과 필드가 비슷해도 같은 책임이 아닙니다."
    }
  ],
  "glossary": [
    {
      "term": "Request DTO",
      "meaning": "HTTP 요청 body를 받는 입력 모델입니다.",
      "caution": "저장소에 그대로 보관하는 내부 모델이 아닙니다."
    },
    {
      "term": "Response DTO",
      "meaning": "클라이언트로 내보낼 응답 모양입니다.",
      "caution": "내부 모델을 그대로 반환하면 API 계약이 흔들릴 수 있습니다."
    },
    {
      "term": "Controller",
      "meaning": "HTTP 요청이 처음 들어오는 계층입니다.",
      "caution": "처리와 저장 책임까지 모두 넣으면 금방 커집니다."
    },
    {
      "term": "Service",
      "meaning": "실제 처리 흐름을 모으는 계층입니다.",
      "caution": "HTTP와 저장 기술 세부사항을 직접 떠안지 않게 유지합니다."
    },
    {
      "term": "Memory store",
      "meaning": "프로세스 안에 데이터를 보관하는 실습용 저장소입니다.",
      "caution": "서버가 재시작되면 데이터가 사라지는 것이 정상입니다."
    }
  ],
  "practical": [
    {
      "title": "처음부터 DB를 붙이지 않는 이유",
      "body": "요청/응답 계층 책임을 먼저 잡아야 DB, Validation, Security가 붙어도 흐름이 무너지지 않습니다."
    },
    {
      "title": "메모리 저장소는 한계를 드러내는 장치입니다",
      "body": "운영 저장소가 아니라 다음 DB 시퀀스로 넘어갈 이유를 보여주는 학습 단계입니다."
    },
    {
      "title": "내부 모델을 응답으로 바로 내보내지 않습니다",
      "body": "API 응답 구조와 내부 처리 구조를 분리해야 다음 변경의 영향 범위를 줄일 수 있습니다."
    }
  ],
  "checks": [
    "POST 요청이 Controller, Service, 저장소, Response DTO를 어떤 순서로 지나는지 설명할 수 있나요?",
    "Controller가 저장소를 직접 알지 않아야 하는 이유를 말할 수 있나요?",
    "Request DTO와 Response DTO의 역할 차이를 설명할 수 있나요?",
    "메모리 저장소의 한계가 다음 DB 시퀀스로 어떻게 이어지는지 설명할 수 있나요?"
  ],
  "next": {
    "id": "02",
    "title": "DB Access",
    "reason": "요청/응답 계층 흐름을 이해했다면, 다음에는 메모리 저장소를 DB 기반 Repository로 바꿔 데이터가 애플리케이션 밖에 남는 흐름을 다룹니다."
  },
  "sourceDocs": []
};
