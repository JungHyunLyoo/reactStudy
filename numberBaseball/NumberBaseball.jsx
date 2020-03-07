import React, {Component} from 'react';
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

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],//추가할 때, push를 사용하면 안됨. react는 기존 state와 새로 바뀔 state를 비교 후 rerender를 하는데, push를 하면 하나의 변수만을 가지고 비교하게 되어 변경 감지를 못함
    };

    restart = (e) => {
        this.setState({
            result: '',
            value: '',
            answer: getNumbers(),
            tries: []
        });
    }

    onSubmitForm = (e) => {
        console.log(this.state.answer);
        e.preventDefault();
        if (this.state.value === this.state.answer.join('')) {
            this.setState({
                result: '홈런!',
                tries: [...this.state.tries, {try: this.state.value, result: '홈런!'}],
            });
        } else {
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;

            for (let i = 0; i < 4; i++) {
                if (answerArray[i] === this.state.answer[i]) {
                    strike++;
                } else if (this.state.answer.includes(answerArray[i])) {
                    ball++;
                }
            }
            this.setState({
                tries: [...this.state.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                value: ''
            })
            if (this.state.tries.length == 9) {
                this.setState({
                    result: `10번 틀려서 실패~! 답은 ${this.state.answer.join('')}였습니다!`,
                });
            }
        }
    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    render() {
        return (
            <>
                {this.state.result === '' &&
                <div>
                    <form onSubmit={this.onSubmitForm}>
                        <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                    </form>
                </div>
                }
                {this.state.result !== '' &&
                <div>
                    <h1>{this.state.result}</h1>
                    <button onClick={this.restart}>다시하기</button>
                </div>
                }
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {/*배열 내 데이터를 일괄적으로 수정해야 할 경우, map을 사용하자*/
                        this.state.tries.map((v, i) => {
                                return <Try key={`${i + 1}차 시도:`} tryInfo={v} index={i}/>;
                                /*key에 index는 최대한 지양해야 한다*/
                            }
                        )
                    }
                </ul>
            </>
        );
    }
}

export default NumberBaseball;