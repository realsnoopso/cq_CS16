# 1. 프로세스 스케줄링 시각화🎯

## 구현 목표

- [x] 프로세스를 실행해서 때 종료될 때 까지 작업을 시뮬레이션
- [ ] 프로세스 스케줄링 방식 비교 시각화

## 기능 요구사항

- [x] 프로세스 종류: A부터 F까지 6개
- [x] 프로세스 마다 최대 동작 시간은 겹치지 않음
  - 예) 프로세스A : 3초, 프로세스B : 5초, 프로세스C : 7초, 프로세스D : 10초, 프로세스E : 15초, 프로세스F : 21초
- [x] 한 번에 프로세스 하나씩만 1초동안만 실행 가능
- [x] 1초 이후에는 같은 프로세스가 아니라 다른 프로세스를 실행
- [x] 프로세스 상태: 준비ready, 실행running, 대기waiting, 종료terminated
- [x] 프로세스마다 작업 정보를 포함하는 데이터 구조 또는 타입을 선언
- [x] 프로세스가 1개만 남은 경우 반복해서 같은 프로세스를 실행 가능

## 프로그래밍 요구사항

- [ ] 프로그램

  - [x] display: 1초마다 전체 프로세스 상태와 대기 시간과 누적 실행 시간을 표시
  - [x] 종료: 모든 프로세스가 종료 상태가 되면 종료
  - [x] 스케줄링 구현 (이 중 1개만 일단 구현)
    - [x] 라운드 로빈 스케줄링 (Round Robin scheduling)
    - [ ] 고정 우선순위 스케줄링 (static priority scheduling)
    - [ ] 기한부 스케줄링 (deadline scheduling)

- [x] 프로세스
  - [x] 준비
    - 랜덤으로 프로세스 3개를 생성, 대기 큐에 추가
  - [x] 대기
    - 입출력 대기나 다른 응답을 위해서 사용
  - [x] 실행
    - 준비 또는 대기 상태에서만 실행 상태로 변경 가능
    - 누적 동작 시간 >= 최대 동작 시간? 종료 상태로 변경
  - [x] 종료: 누적 동작 시간 < 최대 동작 시간? 대기 상태로 바꿨다가 준비 상태로 변경

## 동작 예시

```javascript
// 프로세스A(3초) , 프로세스B(5초), 프로세스C(7초)
`
A(ready), 0 / 3sec
B(ready), 0 / 5sec
C(ready), 0 / 7sec
.
A(running), 1 / 3sec , waiting 0 sec
B(waiting), 0 / 5sec , waiting 1 sec
C(waiting), 0 / 7sec , waiting 1 sec
.
A(waiting), 1 / 3sec , waiting 1 sec
B(running), 1 / 5sec , waiting 1 sec
C(waiting), 0 / 7sec , waiting 2 sec
.
A(waiting), 1 / 3sec , waiting 2 sec
B(waiting), 1 / 5sec , waiting 2 sec
C(running), 1 / 7sec , waiting 2 sec
.
A(running), 2 / 3sec , waiting 2 sec
B(waiting), 1 / 5sec , waiting 3 sec
C(waiting), 1 / 7sec , waiting 3 sec
.
A(waiting), 2 / 3sec , waiting 3 sec
B(running), 2 / 5sec , waiting 3 sec
C(waiting), 1 / 7sec , waiting 4 sec
.
A(waiting), 2 / 3sec , waiting 4 sec
B(waiting), 2 / 5sec , waiting 4 sec
C(running), 2 / 7sec , waiting 4 sec
.
A(running), 3 / 3sec , waiting 4 sec
B(waiting), 2 / 5sec , waiting 5 sec
C(waiting), 2 / 7sec , waiting 5 sec
.
A(terminated), 3 / 3sec , waiting 4 sec
B(running), 3 / 5sec , waiting 5 sec
C(waiting), 2 / 7sec , waiting 6 sec
.
A(terminated), 3 / 3sec , waiting 4 sec
B(waiting), 3 / 5sec , waiting 6 sec
C(running), 3 / 7sec , waiting 6 sec
.
A(terminated), 3 / 3sec , waiting 4 sec
B(running), 4 / 5sec , waiting 6 sec
C(waiting), 3 / 7sec , waiting 7 sec
.
A(terminated), 3 / 3sec , waiting 4 sec
B(waiting), 4 / 5sec , waiting 7 sec
C(running), 4 / 7sec , waiting 7 sec
.
A(terminated), 3 / 3sec , waiting 4 sec
B(running), 5 / 5sec , waiting 7 sec
C(waiting), 4 / 7sec , waiting 8 sec
.
A(terminated), 3 / 3sec , waiting 4 sec
B(terminated), 5 / 5sec , waiting 7 sec
C(running), 5 / 7sec , waiting 8 sec
.
A(terminated), 3 / 3sec , waiting 4 sec
B(terminated), 5 / 5sec , waiting 7 sec
C(running), 6 / 7sec , waiting 8 sec
.
A(terminated), 3 / 3sec , waiting 4 sec
B(terminated), 5 / 5sec , waiting 7 sec
C(running), 7 / 7sec , waiting 8 sec
.
A(terminated), 3 / 3sec , waiting 4 sec
B(terminated), 5 / 5sec , waiting 7 sec
C(terminated), 7 / 7sec , waiting 8 sec

라운드로빈 방식 스케줄링이 종료되었습니다.
평균 대기시간 = (4 + 7 + 8) / 3 = 6.3sec
평균 반환시간 = (7 + 12 + 15) / 3 = 11.3sec`;
```

# 2. 스레드 스케줄링🎯

## 구현 목표

- [x] 프로세스와 스레드의 차이점 이해하기
- [x] 스레드로 병렬 처리를 할 수 있도록 구현
- [x] 프로세스, 스레드 스케줄링 방식과 알고리즘에 대해 이해
- [x] 우선순위 큐 방식 구현

## 기능 요구사항

- [x] 스레드가 있으면 스레드마다 병렬로 처리할 수 있음 -> 실행 시간을 단축하는 효과가 있다고 가정, 스레드 2개가 1초 동작하면, 스레드 1개가 2초 동작한 것보다 단축됨
- [x] 프로세스 별로 최대 작업 시간을 2로 나눴을 때 (소숫점을 버린) 몫만큼 스레드를 생성 예) 프로세스 3초 -> 스레드 1개 , 프로세스 6초 -> 스레드 3개
- [x] 프로그램이 시작하면 랜덤으로 프로세스 3개를 생성, 스레드 개수 표시
- [x] 프로그램은 모든 프로세스 작업이 끝나면 종료

## 프로그래밍 요구사항

- [x] 각자 언어와 환경에서 스레드를 생성, 각 스레드는 1초후에 동작을 완료
  - [x] Node.js: worker 모듈
- [x] 특정 프로세스는 할당된 스레드가 모두 동작을 완료해야 해당 프로세스는 동작을 멈춤
  - 예) 프로세스B가 5초 작업이라 스레드가 2개 생성해야 한다면, 한 번 실행할 때 1초 동안 2개 스레드가 모두 완료해야 다음 프로세스로 스케줄링이 넘어감

## 동작 예시

```javascript
// 실행 화면
`이 프로그램은
프로세스A(3초) - 스레드 1개
프로세스B(5초) - 스레드 2개
프로세스C(7초) - 스레드 3개
총 스레드는 6개입니다.`;

`
A(ready), 0 / 3sec
B(ready), 0 / 5sec
C(ready), 0 / 7sec
.
A(running), 2 / 3sec
B(waiting), 0 / 5sec
C(waiting), 0 / 7sec
.
A(waiting), 2 / 3sec
B(running), 4 / 5sec
C(waiting), 0 / 7sec
.
A(waiting), 2 / 3sec
B(waiting), 4 / 5sec
C(running), 6 / 7sec
.
A(running), 3 / 3sec
B(waiting), 4 / 5sec
C(waiting), 6 / 7sec
.
A(terminated), 3 / 3sec
B(running), 5 / 5sec
C(waiting), 6 / 7sec
.
A(terminated), 3 / 3sec
B(terminated), 5 / 5sec
C(running), 7 / 7sec
.
A(terminated), 3 / 3sec
B(terminated), 5 / 5sec
C(terminated), 7 / 7sec

모든 프로세스가 종료되었습니다.`;
```

# 새로운 개념 학습하기

## 프로세스와 스레드의 차이

프로세스는 컴퓨터에서 실행되는 프로그램의 인스턴스이다. 여러가지 지시, 메모리, 시스템 리소스들로 이루어져 있다. 프로세스는 자기 자신만의 메모리 공간을 갖고 있다. 이는 프로세스가 다른 프로세스의 영역을 침범하지 않는다는 걸 의미한다.

스레드는 프로세스 안의 실행의 한 단위이다. 프로세스는 멀티 스레드를 갖고 있을 수 있으며, 각각의 스레드는 카운터, 스택, 레지스터들을 갖는다. 이 때문에 스레드는 다른 스레드들과 의존하여 실행될 수 있다. 이는 스레드가 여러 작업을 동시에 수행할 수 있게 한다.

## 운영체제 명령어 중에서 프로세스 목록을 확인할 수 있는 명령이란?

```
Windows: tasklist
macOS/Linux: ps aux or top
Ubuntu: htop
```

## 같은 그룹의 스레드와 스레드와 스레드, 코드, 메모리 주소 공간, 운영체제 리소스 공유하기 때문에 발생하는 문제점이란?

"공유되는 리소스"라는 문제점은 "Race Condition"이라고 불리며, 같은 시간에 여러 스레드가 공유된 리소스에 동시에 접근하여 어떤 결과를 기대하는 것과 다르게 결과를 만들어 낼 수 있는 혼선을 일으키는 것입니다. 이 문제를 해결하기 위해서는 동시성 관리 방식의 적절한 적용, 예를 들어 뮤텍스, 세마포어 등을 활용해야 합니다.

## 자바스크립트가 실행되는 과정

## 자바스크립트는 왜 싱글스레드 방식을 택했는가?

자바스크립트는 한번에 하나의 지시 사항만 실행되는 싱글스레드이다. 자바스크립트는 애초에 웹페이지에 인터랙션, form 검증 등을 구현하기 위해 만들어진 것으로 복잡한 멀티 쓰레딩이 필요없었다.
https://blog.logrocket.com/node-js-multithreading-worker-threads-why-they-matter/

## 싱글스레드의 속도 문제를 개선하기 위해 자바스크립트는 어떤 방식을 사용하는가?

## node.js의 worker 모듈?

`worker_threads`
https://www.youtube.com/watch?v=Kq-6hGizSDs

```javascript

```
