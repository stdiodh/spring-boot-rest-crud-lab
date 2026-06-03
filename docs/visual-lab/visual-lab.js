(function () {
  const data = window.visualLabData || {};
  const state = {
    stepIndex: 0,
  };

  const $ = (id) => document.getElementById(id);

  function setText(id, value) {
    const element = $(id);
    if (element) {
      element.textContent = value || "";
    }
  }

  function makeElement(tagName, className, textContent) {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (textContent) {
      element.textContent = textContent;
    }
    return element;
  }

  function renderHeader() {
    const sequence = data.sequence || "NN";
    const title = data.title || "Visual Lab";
    document.title = `A&I ${sequence} Visual Lab`;
    setText("sequenceLabel", `Sequence ${sequence}`);
    setText("labTitle", title);
    setText("labGoal", data.goal || "이 시퀀스의 백엔드 흐름을 단계별로 확인한다.");
    setText("problemText", data.problem || "요청이 들어오고 응답이 나가는 핵심 흐름을 단계별로 확인한다.");
  }

  function renderConcepts() {
    const conceptList = $("conceptList");
    if (!conceptList) {
      return;
    }

    conceptList.replaceChildren();
    (data.concepts || []).forEach((concept) => {
      const card = makeElement("article", "concept-card");
      card.append(
        makeElement("h3", "", concept.name),
        makeElement("p", "", concept.description)
      );
      conceptList.appendChild(card);
    });
  }

  function flowLabel(step, index) {
    return step.label || step.title || `Step ${index + 1}`;
  }

  function renderFlowButtons() {
    const flowSteps = $("flowSteps");
    if (!flowSteps) {
      return;
    }

    flowSteps.replaceChildren();
    (data.flow || []).forEach((step, index) => {
      const button = makeElement("button", "flow-step");
      button.type = "button";
      button.setAttribute("aria-pressed", String(index === state.stepIndex));
      if (index === state.stepIndex) {
        button.classList.add("is-active");
      }

      button.append(
        makeElement("strong", "", `${index + 1}. ${flowLabel(step, index)}`),
        makeElement("span", "", step.concept || "단계별 흐름을 확인한다.")
      );
      button.addEventListener("click", () => selectStep(index));
      flowSteps.appendChild(button);
    });
  }

  function renderStepDetail() {
    const flow = data.flow || [];
    const step = flow[state.stepIndex];
    if (!step) {
      setText("stepMeta", "No data");
      setText("stepTitle", "표시할 흐름 데이터가 없습니다.");
      setText("stepProblem", "");
      setText("stepConcept", "");
      setText("stepAction", "");
      setText("stepCheck", "");
      setText("stepProgress", "0 / 0");
      return;
    }

    setText("stepMeta", `Step ${state.stepIndex + 1}`);
    setText("stepTitle", flowLabel(step, state.stepIndex));
    setText("stepProblem", step.problem);
    setText("stepConcept", step.concept);
    setText("stepAction", step.action);
    setText("stepCheck", step.check);
    setText("stepProgress", `${state.stepIndex + 1} / ${flow.length}`);

    setButtonState("prevStep", state.stepIndex === 0);
    setButtonState("nextStep", state.stepIndex === flow.length - 1);
  }

  function setButtonState(id, isUnavailable) {
    const button = $(id);
    if (!button) {
      return;
    }
    button.setAttribute("aria-disabled", String(isUnavailable));
  }

  function selectStep(index) {
    const flow = data.flow || [];
    if (!flow.length) {
      state.stepIndex = 0;
      renderFlowButtons();
      renderStepDetail();
      return;
    }
    state.stepIndex = Math.max(0, Math.min(index, flow.length - 1));
    renderFlowButtons();
    renderStepDetail();
  }

  function renderPractice() {
    const practiceList = $("practiceList");
    if (!practiceList) {
      return;
    }

    practiceList.replaceChildren();
    (data.practice || []).forEach((checkpoint) => {
      practiceList.appendChild(makeElement("li", "", checkpoint));
    });
  }

  function renderMentorHints() {
    const hintList = $("mentorHintList");
    if (!hintList) {
      return;
    }

    hintList.replaceChildren();
    (data.mentorHints || []).forEach((hint) => {
      hintList.appendChild(makeElement("li", "", hint));
    });
  }

  function bindControls() {
    const prev = $("prevStep");
    const next = $("nextStep");
    const mentorToggle = $("mentorToggle");
    const mentorHints = $("mentorHints");

    if (prev) {
      prev.addEventListener("click", () => selectStep(state.stepIndex - 1));
    }
    if (next) {
      next.addEventListener("click", () => selectStep(state.stepIndex + 1));
    }
    if (mentorToggle && mentorHints) {
      mentorToggle.addEventListener("click", () => {
        const expanded = mentorToggle.getAttribute("aria-expanded") === "true";
        mentorToggle.setAttribute("aria-expanded", String(!expanded));
        mentorHints.hidden = expanded;
        mentorToggle.querySelector("[aria-hidden='true']").textContent = expanded ? "펼치기" : "접기";
      });
    }
  }

  function init() {
    renderHeader();
    renderConcepts();
    renderPractice();
    renderMentorHints();
    bindControls();
    selectStep(0);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
