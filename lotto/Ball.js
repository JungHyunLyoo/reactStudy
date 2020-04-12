import React, {memo} from 'react';

//hook 아님. setState, useEffect 등이 사용되어야 hook이라고 함
//memo는 purecomponent 역할을 하는 컴포넌트(hoc 고차 컴포넌트)
const Ball = memo(({number}) => {
    let background;
    if (number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }
    return (
        <div className="ball" style={{background}}>{number}</div>
    );
});

export default Ball;