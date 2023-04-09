# 목표

- [x] 동시에 여러 고객이 다양한 음료를 주문했을 때 주문해서 나올 때까지 한 명의 바리스타가 처리하는 작업을 시뮬레이션
- [x] 단일 스레드의 이벤트 처리에 대해 학습
- [x] 동기 함수들 보다 비동기 함수를 중심으로 구현
- [x] 이벤트 흐름을 그림으로 그리기

# 체크리스트

- [x] 주문 담당자
  - [x] 음료 주문을 받아 주문 대기표에 추가
- [x] 주문 대기표
- [x] 매니저
  - [x] 주문 대기표를 1초마다 확인
  - [x] 바리스타에게 작업 내역을 전달
  - [x] 바리스타에게 완료 이벤트를 받으면 결과를 출력
- [x] 바리스타
  - [x] 동시에 2개의 음료 제작 가능
  - [x] 만들기 시작할 때, 끝날 때 이벤트 발생시킴
  - [x] 이벤트 발생할 때마다 음료 작업에 대한 로그 출력

### 남은 것

- [x] 주문 받는 양식 수정하기
- [x] 음료가 완성되면 한개씩 알려주기

# 플로우 차트

https://www.figma.com/file/HP8vBrIYBpyRlFUsztntDD/%EC%9D%8C%EB%A3%8C%EC%88%98%EA%B0%80%EA%B2%8C?node-id=0%3A1&t=a9lKpM1yzQKpb3DW-1