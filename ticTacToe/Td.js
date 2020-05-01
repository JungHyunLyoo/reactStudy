import React, {useCallback, useEffect, useRef, memo} from 'react';
import {CLICK_CELL, CHANGE_TURN} from "./TicTacToe";

//memo = 반복문 있을때 유용
const Td = memo(({rowIndex, cellIndex, cellData, dispatch}) => {
    //dispatch를 TicTacToe로부터 이어 이어 이어받아서 사용해야 한다. 불편하다.
    //context api 를 이용하면 이를 개선할 수 있다고 한다.

    //성능 체크
    const ref = useRef([]);
    useEffect(() => {
        console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
        console.log(cellData, ref.current[3]);
        ref.current = [rowIndex, cellIndex, dispatch, cellData];
    }, [rowIndex, cellIndex, dispatch, cellData]);

    //useCallback은 두번째 매개변수가 바뀔 때마다 함수를 갱신한다(바뀌지 않을 땐 캐싱해놓는듯?)
    const onClickTd = useCallback(() => {
        if (cellData) {
            return;
        }
        dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
    }, [cellData]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
});

export default Td;