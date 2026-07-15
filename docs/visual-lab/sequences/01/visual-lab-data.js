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
    "title": "메모리 CRUD 요청 추적기",
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
        "boundary": "HTTP 외부"
      },
      "controller": {
        "label": "PostController",
        "icon": "api",
        "kind": "api",
        "role": "HTTP method와 path를 Service 호출에 연결합니다.",
        "boundary": "HTTP 입구",
        "codePointIds": ["controller-create"]
      },
      "service": {
        "label": "PostService",
        "icon": "service",
        "kind": "service",
        "role": "요청, 내부 모델, 저장과 응답 변환 순서를 조립합니다.",
        "boundary": "애플리케이션 처리",
        "codePointIds": ["memory-service"]
      },
      "memory-repository": {
        "label": "PostMemoryRepository",
        "icon": "memory",
        "kind": "repository",
        "role": "프로세스 안의 List를 소유하고 id 부여와 조회를 담당합니다.",
        "boundary": "프로세스 메모리",
        "codePointIds": ["memory-service"]
      }
    },
    "scenarios": [
      {
        "id": "create-in-memory",
        "label": "게시글 생성",
        "flowId": "create-post",
        "tone": "recovered",
        "prompt": "POST body는 어디에서 내부 Post가 되고 새 id를 가진 응답으로 돌아올까요?",
        "prediction": {
          "prompt": "POST body가 새 id를 가진 응답이 되기까지 책임을 어떻게 나누는 편이 맞을까요?",
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
          "explanation": "Controller는 HTTP 입구를 지키고 Service와 Repository가 처리·보관 책임을 나눕니다."
        },
        "diagram": {
          "caption": "Service가 요청 DTO를 내부 Post로 바꾸고, Repository가 id를 붙인 뒤 응답 DTO로 돌아옵니다.",
          "lanes": [
            {
              "id": "create-round-trip",
              "label": "생성 요청과 응답",
              "description": "HTTP 요청에서 메모리 저장과 JSON 응답까지의 왕복입니다.",
              "steps": [
                {
                  "from": "client",
                  "to": "controller",
                  "verb": "요청",
                  "payload": "POST /posts + JSON body",
                  "kind": "request",
                  "concept": "HTTP entry",
                  "check": "method, path, body를 확인합니다.",
                  "codePointIds": ["controller-create"]
                },
                {
                  "from": "controller",
                  "to": "service",
                  "verb": "호출",
                  "payload": "create(PostCreateRequest)",
                  "kind": "call",
                  "concept": "Request DTO",
                  "check": "Controller가 Repository를 직접 호출하지 않는지 확인합니다."
                },
                {
                  "from": "service",
                  "to": "service",
                  "verb": "변환",
                  "payload": "PostCreateRequest → Post",
                  "kind": "transform",
                  "concept": "외부 요청과 내부 모델 분리",
                  "check": "요청에 없던 id가 아직 임시 값인지 확인합니다.",
                  "codePointIds": ["memory-service"]
                },
                {
                  "from": "service",
                  "to": "memory-repository",
                  "verb": "저장",
                  "payload": "save(Post)",
                  "kind": "persist",
                  "concept": "in-process persistence",
                  "check": "Repository가 새 id를 붙이는지 확인합니다."
                },
                {
                  "from": "memory-repository",
                  "to": "service",
                  "verb": "반환",
                  "payload": "saved Post { id }",
                  "kind": "response",
                  "concept": "저장 결과",
                  "check": "반환된 Post에 id가 있는지 확인합니다."
                },
                {
                  "from": "service",
                  "to": "controller",
                  "verb": "변환",
                  "payload": "Post → PostResponse",
                  "kind": "transform",
                  "concept": "Response DTO",
                  "check": "내부 Post를 그대로 응답하지 않는지 확인합니다."
                },
                {
                  "from": "controller",
                  "to": "client",
                  "verb": "응답",
                  "payload": "201 Created + PostResponse JSON",
                  "kind": "response",
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
        "evidence": "Swagger 생성 응답과 PostMemoryRepository.save(...)가 붙인 id를 함께 확인합니다.",
        "outcome": "Controller는 입구를 지키고 Service가 DTO·내부 모델·저장소·응답 변환을 연결합니다."
      },
      {
        "id": "read-in-memory",
        "label": "전체·단건 조회",
        "flowId": "read-post",
        "tone": "signal",
        "prompt": "URL의 조회 의도와 id는 어떤 책임을 지나 응답 DTO가 될까요?",
        "prediction": {
          "prompt": "메모리에서 찾은 내부 Post를 API 응답으로 보낼 때 무엇을 거칠까요?",
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
          "caption": "조회 조건은 Controller에서 Service로 전달되고, 메모리 목록의 Post는 응답 DTO로 변환되어 돌아옵니다.",
          "lanes": [
            {
              "id": "read-round-trip",
              "label": "전체·단건 조회",
              "description": "URL과 id가 메모리 조회 결과와 JSON 응답으로 이어지는 흐름입니다.",
              "steps": [
                {
                  "from": "client",
                  "to": "controller",
                  "verb": "요청",
                  "payload": "GET /posts 또는 GET /posts/{id}",
                  "kind": "request",
                  "concept": "조회 URL",
                  "check": "전체 조회와 단건 조회 path를 구분합니다."
                },
                {
                  "from": "controller",
                  "to": "service",
                  "verb": "호출",
                  "payload": "getAll() 또는 getById(id)",
                  "kind": "call",
                  "concept": "요청 위임",
                  "check": "PathVariable id가 Service로 전달되는지 확인합니다."
                },
                {
                  "from": "service",
                  "to": "memory-repository",
                  "verb": "조회",
                  "payload": "findAll() 또는 findById(id)",
                  "kind": "call",
                  "concept": "메모리 조회",
                  "check": "의도와 맞는 Repository method인지 확인합니다."
                },
                {
                  "from": "memory-repository",
                  "to": "service",
                  "verb": "반환",
                  "payload": "Post 또는 List<Post>",
                  "kind": "response",
                  "concept": "내부 모델",
                  "check": "메모리 목록에서 찾은 결과를 확인합니다."
                },
                {
                  "from": "service",
                  "to": "service",
                  "verb": "변환",
                  "payload": "Post → PostResponse",
                  "kind": "transform",
                  "concept": "응답 경계",
                  "check": "각 Post가 Response DTO로 바뀌는지 확인합니다."
                },
                {
                  "from": "service",
                  "to": "controller",
                  "verb": "반환",
                  "payload": "PostResponse 또는 List<PostResponse>",
                  "kind": "response",
                  "concept": "Service result",
                  "check": "Controller가 결과 모양을 다시 조립하지 않는지 확인합니다."
                },
                {
                  "from": "controller",
                  "to": "client",
                  "verb": "응답",
                  "payload": "200 OK + JSON",
                  "kind": "response",
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
        "evidence": "Swagger의 전체·단건 조회 결과와 Service의 PostResponse 변환을 비교합니다.",
        "outcome": "조회 결과를 내부 Post 그대로 내보내지 않고 API 응답 DTO로 정리합니다."
      },
      {
        "id": "restart-memory",
        "label": "서버 재시작",
        "flowId": "create-post",
        "tone": "warning",
        "prompt": "저장에 성공했던 게시글이 서버 재시작 뒤 사라지는 이유는 무엇일까요?",
        "prediction": {
          "prompt": "메모리에 저장한 게시글은 서버 재시작 뒤 어떻게 될까요?",
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
          "explanation": "List는 실행 중인 프로세스 안에 있으므로 프로세스가 끝나면 저장 상태도 사라집니다."
        },
        "diagram": {
          "caption": "Repository가 가진 List는 애플리케이션 프로세스 안에 있으므로 재시작하면 새 빈 목록으로 만들어집니다.",
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
                  "kind": "request"
                },
                {
                  "from": "controller",
                  "to": "service",
                  "verb": "호출",
                  "payload": "create(PostCreateRequest)",
                  "kind": "call"
                },
                {
                  "from": "service",
                  "to": "memory-repository",
                  "verb": "저장",
                  "payload": "Post",
                  "kind": "persist",
                  "concept": "프로세스 메모리",
                  "check": "재시작 전 목록에 Post가 있는지 확인합니다."
                },
                {
                  "from": "memory-repository",
                  "to": "service",
                  "verb": "반환",
                  "payload": "saved Post { id }",
                  "kind": "response"
                }
              ]
            },
            {
              "id": "after-restart",
              "label": "재시작 후",
              "description": "새 프로세스에서 Repository의 List가 다시 초기화된 상태입니다.",
              "steps": [
                {
                  "from": "client",
                  "to": "controller",
                  "verb": "다시 조회",
                  "payload": "GET /posts",
                  "kind": "request"
                },
                {
                  "from": "controller",
                  "to": "service",
                  "verb": "호출",
                  "payload": "getAll()",
                  "kind": "call"
                },
                {
                  "from": "service",
                  "to": "memory-repository",
                  "verb": "조회",
                  "payload": "findAll()",
                  "kind": "call"
                },
                {
                  "from": "memory-repository",
                  "to": "service",
                  "verb": "반환",
                  "payload": "empty List<Post>",
                  "kind": "response",
                  "concept": "초기화된 메모리 상태",
                  "check": "조회 결과가 빈 목록인지 확인합니다."
                },
                {
                  "from": "service",
                  "to": "controller",
                  "verb": "반환",
                  "payload": "empty List<PostResponse>",
                  "kind": "response"
                },
                {
                  "from": "controller",
                  "to": "client",
                  "verb": "응답",
                  "payload": "200 OK + []",
                  "kind": "response"
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
        "evidence": "서버를 다시 실행한 뒤 GET /posts 결과가 비어 있는지 확인합니다.",
        "outcome": "메모리 컬렉션은 프로세스 수명과 함께 사라지므로 다음 시퀀스에서 DB 저장으로 교체해야 합니다."
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
          "concept": "Verification",
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
      "title": "Controller는 HTTP 요청을 Service로 넘깁니다",
      "file": "src/main/kotlin/com/andi/rest_crud/controller/PostController.kt",
      "language": "kotlin",
      "snippet": "@RestController\n@RequestMapping(\"/posts\")\nclass PostController(\n    private val postService: PostService\n) {\n\n    @PostMapping\n    @ResponseStatus(HttpStatus.CREATED)\n    fun create(@RequestBody request: PostCreateRequest): PostResponse {\n        return postService.create(request)\n    }\n}",
      "explanation": "Controller는 저장 세부사항을 모르고 요청 DTO를 Service에 전달합니다.",
      "check": "POST /posts가 어느 메서드로 들어오는지 확인합니다."
    },
    {
      "id": "memory-service",
      "title": "Service는 메모리 저장소와 응답 변환을 조립합니다",
      "file": "src/main/kotlin/com/andi/rest_crud/service/PostService.kt",
      "language": "kotlin",
      "snippet": "fun create(request: PostCreateRequest): PostResponse {\n    val post = Post(\n        id = 0L,\n        title = request.title,\n        content = request.content,\n        author = request.author\n    )\n    val saved = postMemoryRepository.save(post)\n    return PostResponse.from(saved)\n}",
      "explanation": "메모리 CRUD는 DB 없이 요청 값이 내부 모델과 응답으로 바뀌는 흐름을 보여줍니다.",
      "check": "서버 재시작 후 데이터가 사라지는 이유를 설명합니다."
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
