### 1. 분산 처리 https://www.acmicpc.net/problem/1009

- [x] property 설정하기
  - data = [
    { a: 1, b: 6 },
    { a: 3, b: 7 },
    { a: 6, b: 2 },
    { a: 7, b: 100 },
    { a: 9, b: 635 },
    ]
- [x] 컴퓨터의 위치 구하기
  - a\*\*b%10
    - 위와 같은 경우 infinity가 출력되는 문제 발생
    - 문제가 마지막 자리 숫자를 출력하는 것이므로 제곱의 패턴을 찾음. 아래는 입력된 숫자의 마지막 자리 수를 기준으로, 몇번을 제곱했을 때 자기 자신이 등장하는지를 나타냄.
      - powPattern = { 0: 1, 1: 1, 2: 4, 3: 4, 4: 2, 5: 1, 6: 1, 7: 4, 8: 4, 9: 2 };
      - 2**1 === 2, 2**2 === 4, 2**3 === 8, 2**4 === 16, 2\*\*5 === 24. 즉 마지막 자리가 4가 된 이후부터 자기 자신이 등장하고 이후 패턴이 반복됨.

### 2. 저항 https://www.acmicpc.net/problem/1076

- [x] resistance: 저항 값과 곱을 저장한 object 만들기
- [x] getResistance: (a*10+b)*c 가 출력되는 함수 만들기

### 3. 물병 https://www.acmicpc.net/problem/1052

- [x] pour 함수 작성
  - count라는 변수를 두고 k 값 이하가 되기 전까지 반복문 실행하여 count를 2로 나눔
  - 2로 나눴을 때 나머지가 있는 경우 다른 그릇의 무게만큼을 쇼핑함
  - 쇼핑한 물병을 모두 더한 값을 결과로 전달

### 4. 큰 수 A+B https://www.acmicpc.net/problem/10757

- [ ] 함수 sum 만들기
  - a, b의 각 자리 수를 array에 저장하고 이진법 덧셈과 같은 방식으로 연산한다.
  - 해당 덧셈이 10을 넘는 경우 올림이 있음을 표기하고 다음 자리수에 올려준다.
  - 위 덧셈이 완료된 후 array를 int 로 변환해 반환한다.