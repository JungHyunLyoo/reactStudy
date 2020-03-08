import React, {useState} from 'react';
import Try from './Try';

function getNumbers() {
    //this를 쓰지 않으면 class 밖에 선언해서 사용해도 됨
    //유틸성 메소드에 적합한 형태
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);

    const restart = (e) => {
        setResult('');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (value === answer.join('')) {
            setResult('홈런!');
            setTries((prevTries) => {
                return [...prevTries, {try: value, result: '홈런!'}]
            });
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;

            for (let i = 0; i < 4; i++) {
                if (answerArray[i] === answer[i]) {
                    strike++;
                } else if (answer.includes(answerArray[i])) {
                    ball++;
                }
            }
            setTries((prevTries) => {
                return [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}]
            });
            setValue('');
            if (tries.length == 9) {
                setResult(`10번 틀려서 실패~! 답은 ${answer.join('')}였습니다!`);
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            {result === '' &&
            <div>
                <form onSubmit={onSubmitForm}>
                    <input maxLength={4} value={value} onChange={onChangeInput}/>
                </form>
            </div>
            }
            {result !== '' &&
            <div>
                <h1>{result}</h1>
                <button onClick={restart}>다시하기</button>
            </div>
            }
            <div>시도 : {tries.length}</div>
            <ul>
                {/*배열 내 데이터를 일괄적으로 수정해야 할 경우, map을 사용하자*/
                    tries.map((v, i) => {
                            return <Try key={`${i + 1}차 시도:`} tryInfo={v} index={i}/>;
                            /*key에 index는 최대한 지양해야 한다*/
                        }
                    )
                }
            </ul>
        </>
    );
}


export default NumberBaseball;