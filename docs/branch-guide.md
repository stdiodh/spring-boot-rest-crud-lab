# 브랜치 가이드

## 브랜치 역할

- `main`: 레포 안내 브랜치
- `01-implementation`: 학생 실습 시작 브랜치
- `01-answer`: 정답 비교 브랜치

## 수업 운영 흐름

1. 학생에게 `01-implementation` 브랜치를 안내합니다.
2. 학생은 Controller, Service, Repository, DTO TODO를 채웁니다.
3. 실습 후 `01-answer` 브랜치와 비교합니다.

## Legacy cleanup 운영 메모

이 레포에는 과거 운영용 `implementation`, `answer` 브랜치가 남아 있을 수 있습니다.
이 브랜치들은 새 수업 안내에 사용하지 않고 deprecated 후보로만 기록합니다.
정식 수업 운영에서는 `main`, `01-implementation`, `01-answer`만 사용합니다.

GitHub remote default branch 변경은 Codex가 직접 수행하지 못합니다.
운영자가 GitHub Settings 또는 gh CLI로 default branch를 `main`으로 변경해야 합니다.
