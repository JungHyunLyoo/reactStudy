import React, {memo} from 'react';


const Try = memo(({tryInfo}) => {//'비구조화 할당' 이라고 부름. hook와 비슷
    return (
        <li>
            <div>
                {tryInfo.try}
            </div>
            <div>
                {tryInfo.result}
            </div>
        </li>
    );
});

export default Try;