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
