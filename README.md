<p align="center">
 <img src="https://user-images.githubusercontent.com/24728385/156980247-0347ddd1-137f-4969-b5d4-e0af642e4aad.png" width="80%"/>
</p>

<h1 align="middle">제품제작 견적요청 관리 서비스</h1>

<br/>

# 🔗 배포

[https://angry-albattani-8e8937.netlify.app](https://angry-albattani-8e8937.netlify.app/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a580b2b0-c471-4339-9128-f18b39de1a34/deploy-status)](https://app.netlify.com/sites/angry-albattani-8e8937/deploys)

<br/>

# ⚙️ 설치 및 시작하는 법

```
$ git clone https://github.com/pre-onboarding-course-team-6/2nd-week-ateam-ventures

$ cd 2nd-week-ateam-ventures

$ npm install

$ npm run start
```

<br/>


# ⚙️ 구현한 기능 설명

## 1. 필터링 기능
![](https://images.velog.io/images/minbr0ther/post/b8a60671-941c-467f-83a9-24d0938eb839/image.png)
1. 필터링은 '가공방식', '재료'로 나뉘어 진다.

  - 각각 '가공방식', '재료'안에서 조건을 동시에 여러개 선택하면 **합집합**으로 노출한다.

  - '가공방식', '재료'이 각각 하나 이상 조건이 선택되면 두 조건의 **교집합**으로 노출한다.

2. 필터가 선택되어 있으면 **'필터링 리셋'** 을 노출하고, 클릭하면 모든 필터가 해제된다.

3. **'상담 중인 요청만 보기'** 는 toggle button (on/off) 방식으로 작동한다.
<br/>

### 1.1 Checkbox States
```tsx
// 입력받은 '가공방식', '재료'의 개수만큼 false로 채운 배열을 반환한다.
const makeFalseArr = (target: string[]) => new Array(target.length).fill(false);

// 초기값으로 false배열을 저장한다
const [materialChecked, setMaterialChecked] = useState<boolean[]>(
    makeFalseArr(MATERIAL),
  );
  const [processingMethodChecked, setProcessingMethodChecked] = useState<
    boolean[]
  >(makeFalseArr(PROCESSING_METHOD));
```
<br/>

### 1.2 Checkbox OnChange Handler
```tsx
  const handleOnChange = (
    position: number, // 클릭한 체크박스의 index
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const target = e.target.name;

    // '가공방식', '재료' 분기처리
    if (MATERIAL.includes(target)) {
      const updatedChecked = materialChecked.map(
        // toggle 느낌으로 false -> true, true -> false 반환
        (item: boolean, index: number) => (index === position ? !item : item),
      );
      
      // 업데이트된 배열 리스트 setState
      setMaterialChecked(updatedChecked);
    } else {
      const updatedChecked = processingMethodChecked.map(
        (item: boolean, index: number) => (index === position ? !item : item),
      );
      
      setProcessingMethodChecked(updatedChecked);
    }
  };
```
<br/>

### 1.3 Checkbox + toggle useEffect
이 useEffect에서는 **materialChecked(재료), processingMethodChecked(가공방식), toggle(상담중인 요청 보기)** 의 상태가 변할때마다 작동하게 됩니다.

큰 순서는 다음과 같습니다.


1. '가공방식'이 체크되어있는 항목 필터링

2. '재료'가 체크되어있는 항목 필터링

3. '상담중인 요청' 토글 필터링


```tsx
  useEffect(() => {
    // '가공방식'과 '재료'로 각각 필터링된 항목 저장
    let filterCondition: { material: string[]; method: string[] } = {
      // makeCondition => 체크된 항목을 name[]로 반환 ex) ['밀링']
      method: makeCondition(processingMethodChecked, PROCESSING_METHOD),
      material: makeCondition(materialChecked, MATERIAL),
    };

    // orderFilter은 아래 2.4 에서 자세하기 설명하겠습니다.
    // 1. '가공방식'이 체크되어있는 항목 필터링
    const methodFiltered: OrderInfo[] = orderFilter(
      filterCondition,
      CategoryName.가공방식,
      orders,
    );

    // 전 단계에서 필터링된 methodFiltered을 사용해서 새로 필터링
    // 2. '재료'가 체크되어있는 항목 필터링
    const materialFiltered: OrderInfo[] = orderFilter(
      filterCondition,
      CategoryName.재료,
      methodFiltered,
    );

    let statusFiltered: OrderInfo[] = [];

    // 전 단계에서 필터링된 materialFiltered 사용해서 새로 필터링
    // 3. '상담중인 요청' 토글 필터링
    if (toggle) {
      materialFiltered.forEach((order: OrderInfo) => {
        const status = order.status;

        if (status === Status.상담중) {
          statusFiltered.push(order);
        }
      });
    } else {
      statusFiltered = materialFiltered;
    }

    // 4. 최종 결과를 렌더링에 쓰이는 filteredOrders에 업데이트 해줍니다.
    setFilteredOrders(statusFiltered);
  }, [materialChecked, processingMethodChecked, toggle]);
```
<br/>

### 1.4 useEffect > orderFilter
궁극적으로 필터링을 담당해주는 함수입니다.

매개변수는 다음과 같습니다.
>
>1. FilterCondition: { material: string[]; method: string[] }, 
  **➡️ ex) {method: ["밀링"], material: ["구리"]**

>
>2. category: Category, **➡️ 'material' 혹은 'method'**

>
>3. beforeFilter: OrderInfo[], **➡️ 이전에 필터링된 항목**

```tsx
export const orderFilter = (
  FilterCondition: { material: string[]; method: string[] },
  category: Category,
  beforeFilter: OrderInfo[],
) => {
  // 선택된 category를 통해 배열을 받습니다 ex) ["밀링"]
  const optional: string[] = FilterCondition[category];
  let afterFilter: OrderInfo[] = [];

  if (optional.length === 0) {
    // 선택된 필터가 없으면 그대로 반환합니다.
    afterFilter = beforeFilter;
  } else {
    // 선택된 필터가 있으면 주문들을 순회한다
    beforeFilter.forEach((order: OrderInfo) => {
      
      // 선택한 필터를 order가 가지고 있으면
      const found = order[category].some((r) => optional.includes(r));

      if (found) {
        // 결과 값에 push 한다
        afterFilter.push(order);
      }
    });
  }
  return afterFilter;
};

```

<br/>

# 🏗 프로젝트 구조

```
📦src
 ├──📂commons
 │   ├── 📜common.ts
 │   ├── 📜type.ts
 │   └── 📜utils.ts
 ├──📂components
 │   ├──📂Card
 │   │   └──📜index.tsx
 │   ├──📂Container
 │   │   └──📜index.tsx
 │   └──📂Header
 │       └──📜index.tsx
 ├──📂style
 │   ├──📜global.ts
 │   ├──📜style.ts
 │   ├──📜styled.d.ts
 │   └──📜theme.ts
 ├──📜App.css
 ├──📜App.tsx
 ├──📜index.css
 └──📜index.tsx
```

<br/>

## ✅ Git - Commit Message Convention [🔗](https://webruden.tistory.com/486)

- feat : 새로운 기능 추가 (a new feature)
- fix : 버그 수정 (a bug fix)
- docs : 문서 수정 (changes to documentation)
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 (formatting, missing semi colons, etc; no code change)
- refactor : 코드 리펙토링 (refactoring production code)
- test : 테스트 코드, 리펙토링 테스트 코드 추가 (adding tests, refactoring test; no production code change)
- chore : 빌드 업무 수정, 패키지 매니저 수정 (updating build tasks, package manager configs, etc; no production code change)

<br/>

## 👨‍👨‍👦‍👦 팀구성원 소개

| [<img src="https://github.com/minbr0ther.png" width="100px">](https://github.com/minbr0ther) | [<img src="https://github.com/BGM-109.png" width="100px">](https://github.com/BGM-109) | [<img src="https://github.com/wiseeee.png" width="100px">](https://github.com/wiseeee) | [<img src="https://github.com/gilmujjang.png" width="100px">](https://github.com/gilmujjang) |
| :------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: |
|                        [22_01 정민형](https://github.com/minbr0ther)                         |                       [22_01 김선명](https://github.com/BGM-109)                       |                       [22_01 이현명](https://github.com/wiseeee)                       |                        [22_01 민무길](https://github.com/gilmujjang)                         |
