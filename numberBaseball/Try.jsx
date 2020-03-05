import React, {Component} from 'react';

class Try extends Component {
    render() {
        return (
            <li key={this.props.value.fruit}>{this.props.value.fruit} - {this.props.value.taste} - {this.props.index}</li>
            /*map 반복의 효율을 위해 key를 항상` 적어주자.(i는 넣으면 안됨)*/
        )
    }
}

export default Try;