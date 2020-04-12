import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import Ball from './Ball';

function getWinNumbers() {
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(),[]);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(() => {
        //es6 이후로, setTimeout에 들어가는 변수의 타입이 let인 경우 클로저문제가 생기지 않는다고 한다.
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prev) => [...prev, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {
          timeouts.current.forEach((v)=>{
              clearTimeout(v);
          });
        };
    }, [timeouts.current]);
    //조건에 표현식도 됨!!!! 원래 표현식 자리였던건가?

    //함수를 매번 생성시키면 너무 비효율적
    //useCallback으로 한번만 생성되도록 함(기억하도록)
    //useMemo는 값, useCallback은 함수를 각각 기억
    //두번째 매개변수가 변경되어야 아래 내용이 적절하게 동작함
    //useCallback은 자식 컴포넌트에 넘겨주는 메소드에 적용시키면 좋다.
    //매번 새로운거 넘기면 계속 리렌더링 될 수도 있기 때문
    const onClickRedo = useCallback(() => {
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    },[winNumbers]);

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v}/>)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
}

export default Lotto;