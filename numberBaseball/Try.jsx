import React, {Component} from 'react';

class Try extends Component {
    render() {
        const {tryInfo} = this.props;//'비구조화 할당' 이라고 부름. hook와 비슷
        return (
            <li>
                <div>
                    {tryInfo.tryInfo.try}
                </div>
                <div>
                    {tryInfo.tryInfo.result}
                </div>
            </li>
        )
    }
}

export default Try;