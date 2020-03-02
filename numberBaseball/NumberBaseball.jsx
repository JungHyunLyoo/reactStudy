import React, {Component} from 'react';

function getNumbers() {

}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = () => {

    };

    onChangeInput = () => {

    };

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                </form>
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {
                        [
                            {fruit: '사과1', taste: '맛있다1'},
                            {fruit: '사과2', taste: '맛있다2'},
                            {fruit: '사과3', taste: '맛있다3'},
                        ].map((v,i) =>
                                <li key={v.fruit}>{v.fruit} - {v.taste} - {i}</li>/*map 반복의 효율을 위해 key를 항상 적어주자.(i는 넣으면 안됨)*/
                        )
                    }
                </ul>
            </>
        );
    }
}

export default NumberBaseball;