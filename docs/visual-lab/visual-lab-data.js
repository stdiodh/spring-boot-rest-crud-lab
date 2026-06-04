window.visualLabData = {
  "kind": "hub",
  "sequence": "01",
  "title": "REST CRUD Visual Lab",
  "description": "HTTP 요청이 Controller와 Service, 메모리 저장소를 거쳐 Response DTO로 돌아오는 가장 짧은 CRUD 흐름을 확인합니다.",
  "repo": {
    "name": "spring-boot-rest-crud-lab",
    "path": "spring-boot-rest-crud-lab"
  },
  "visualLabPath": "docs/visual-lab/index.html",
  "visualLabHubPath": "docs/visual-lab/index.html",
  "flow": [
    {
      "id": "request-response",
      "label": "요청과 응답 경계",
      "problem": "HTTP 입구와 처리 흐름, 저장 방식, 응답 모양이 한 곳에 섞이면 다음 확장이 어려워집니다.",
      "concept": "Controller, Service, Repository, DTO",
      "action": "요청 DTO를 내부 모델로 바꾸고 저장 결과를 Response DTO로 돌려주는 흐름을 분리합니다.",
      "check": "Controller가 저장소를 직접 알지 않고 Service를 호출하는지 확인합니다."
    }
  ],
  "sequences": [
    {
      "sequence": "01",
      "id": "01",
      "title": "REST CRUD",
      "topic": "Spring Boot REST API",
      "href": "./sequences/01/index.html",
      "summary": "HTTP 요청이 서버 안에서 어떤 계층을 지나 응답 DTO로 돌아올까?"
    }
  ]
};
