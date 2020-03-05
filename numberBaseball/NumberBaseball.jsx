import React, {Component} from 'react';
import Try from './Try';

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

    fruits = [
        {fruit: '사과1', taste: '맛있다1'},
        {fruit: '사과2', taste: '맛있다2'},
        {fruit: '사과3', taste: '맛있다3'},
    ];

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
                        this.fruits.map((v, i) => {
                                return <Try key={v.fruit + v.taste} value={v} index={i}/>;
                            }
                        )
                    }
                </ul>
            </>
        );
    }
}

export default NumberBaseball;