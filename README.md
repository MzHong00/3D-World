<p align="center">
<img width="83" alt="image" src="https://github.com/MzHong00/3D-World/assets/140405001/08353376-0ba8-4037-81dc-c7137ea8d152">
</p>

> 배포 링크: [우송 도서관](https://wslib.vercel.app/)

## 개요
우송 도서관의 열람실 내부를 3D 웹으로 구현한 개인 프로젝트이다.  
<br>

## 배경
우송 도서관 앱은 UI가 직관적이지 않다. 해당 앱에 익숙하지 않은 사용자는 이해하기 어려운 UI로 인해 예약한 자리의 위치가 헷갈리는 상황이 발생한다. 

따라서, 직관적인 3D UI를 제공하여 자리 위치 파악을 좀 더 쉽게 하고, 외부인 또는 우송 도서관을 모르는 인원에게 우송 도서관의 구조를 외부에서도 파악할 수 있게 서비스를 만들고자 하였다.


![우송도서관 UI](https://github.com/MzHong00/3D-World/assets/140405001/7e6bec05-2151-4942-8936-a8892d75e705)
<p align="center"><기존 우송 도서관 UI></p>

## 기술 스택
우송 도서관에서 요청하는 API를 나의 express 서버에서도 가져다 썼는데, 최근에 타임아웃 에러를 반환해서 막힌 것 같다. 따라서 현재는 서버를 안쓰고 클라이언트에서 임시 데이터로 좌석의 데이터를 표현하고 있다.
<img width="675" alt="image" src="https://github.com/MzHong00/3D-World/assets/140405001/84612d05-ee90-46f8-ad94-373c0a934de0">  

## IA
<img width="610" alt="image" src="https://github.com/user-attachments/assets/9d5567a7-ed0d-4cd8-aa18-a54e82525821">

## 성능
### 유리 재질 비용
`material`의 `transparent`속성을 `true`로 하면 유리 효과를 구현할 수 있다. 그러나 투과로 인한 **더 많은 계산과 버퍼 처리로 인해 성능 비용이 매우 크다.**

유리 재질 대신 **`mesh` 재질을 푸른색으로 하고 `roughness`와 `metalness`를 조절**하여 유리라는 것을 인식할 수 있게 만들었다. (투과 효과 X)

### 앞, 뒤, 양면 렌더링
뒷면을 볼 필요가 없는데, 양면으로 렌더링 하는 것은 불필요한 비용을 사용한 것이다. 한쪽 면을 렌더링 하는 것과 양면을 렌더링 하는 것에도 꽤나 비용 차이가 크다.  `THREE.FrontSide`, `THREE.BackSide`, `THREE.DoubleSide` 를 적절히 사용하여 **불필요한 면의 렌더링을 최적화**하였다.

### 많은 양의 3D 객체
도서관에는 총 400개가 넘는 객체들이 존재한다. 이 것을 웹에서 실행하는 것은 말도 안되는 성능을 요구한다. 따라서 `r3f-drei`의 `Instances`를 사용하여 **한 번의 그리기로 많은 객체를 정의하여 성능 문제를 해결**하였다. **( 5FPS -> 60FPS로 12배 향상 )**

### Instance의 1대1 매핑
`Instaces`는 오직 하나의 `mesh`와 매핑된다. 책상의 경우 4개의 다리와 1개의 상판으로 총 5개의 `mesh`가 필요하다. `Instacnes`의 단점을 해결하기 위해 `Merged`라는 API를 사용하여 여러 `mesh`들을 결합하고 재사용하였다. 

※ `Instances`와 `Merged` 성능 차이는 1FPS 정도로 크지 않았다.

### 의자, 책상 등을 뚫고 지나가는 이유
`r3f-rapier`을 사용하여 충돌체를 구현한다. 충돌체도 `InstancedRigidBodies`라는 API를 제공한다. 그러나 충돌체 연산 비용이 큰 이유로 거의 사용할 수 없을 정도의 성능 테스트를 보였다. 따라서 일부 객체들에만`InstancedRigidBodies`를 적용하였다.

## 트러블 슈팅
### 화면 전환 시, 2초를 기다려야 하는 이유
`PointerLockControls`에서 `lock`과 `unlock`을 연속으로 실행하면 크롬에서 자체적으로 오류가 발생한다. 따라서 포인터 해제 후 2초 동안 화면 터치를 막아 에러를 방지했다.

### 리렌더링시 3D 객체들이 안보이는 현상
`useEffect`를 사용하여 비동기적으로 객체들의 좌표를 얻고 리렌더링될 때, 해당 `Instances`가 보여지지 않는 에러가 발생하였다. 이를 해결하기 위해 `useLayoutEffect`를 사용하여 얻어진 좌표와 함께 렌더링을 하여 해당 문제를 해결하였다.

### 모달 관리
`canvas` 컴포넌트 내부에서 모달을 열고 닫기 위해, `zustand`를 사용하여 모달 창을 전역으로 관리했다.

[사용 기술에 대한 관련 글](https://velog.io/@mzhong/%EC%82%AC%EC%9D%B4%EB%93%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-react-three-fiber-%EC%82%AC%EC%9A%A9-%EA%B8%B0%EC%88%A0-%EC%A0%95%EB%A6%AC#threejs%EC%97%90%EC%84%9C-%EB%AA%A8%EB%8B%AC-%EC%B0%BD-%EA%B4%80%EB%A6%AC)