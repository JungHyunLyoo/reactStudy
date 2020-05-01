import React, {useCallback} from 'react';
import {CLICK_CELL, CHANGE_TURN} from "./TicTacToe";

const Td = ({rowIndex, cellIndex, cellData, dispatch}) => {
    //dispatch를 TicTacToe로부터 이어 이어 이어받아서 사용해야 한다. 불편하다.
    //context api 를 이용하면 이를 개선할 수 있다고 한다.
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
        dispatch({type: CHANGE_TURN});
    }, []);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
};

export default Td;