import React, {useState, useRef, useEffect} from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    바위: 1,
    가위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
        return v[1] === imgCoord;
    })[0];
}

const RockScissorsPaper = () => {
    //class style과 다르게, function style은 rerendering 될 때 컴포넌트 전체가 다시 실행된다.
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.가위);
    const [score, setScore] = useState(0);
    const interval = useRef();

    useEffect(() => {
        //componentDidMount + componentDidUpdate
        interval.current = setInterval(changeHand, 100);
        return () => {
            //componentWillUnmount
            clearInterval(interval.current);
            //setInterval의 의미가 없음.
            //set했다가 clear했다가 ... 무한반복
            //life cycle api들이 짬뽕돼서 이런 현상이 나타나는 듯
            //어떻게 하면 효율적으로 고칠 수 있을까??
        }
    },[]);

    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    };

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);

        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겼습니다!');
        } else if ([1, -2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다!');
            setScore((prevScore) => prevScore - 1);
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 2000);
    };

    return (
        <>
            <div id="computer"
                 style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}/>
            <div>
                <button id="rock" className="btn" onClick={onClickBtn(scores.바위)}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn(scores.가위)}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn(scores.보)}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}

export default RockScissorsPaper;