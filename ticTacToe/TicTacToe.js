import React, {useReducer, useCallback} from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'o',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
};

export const SET_WINNER = 'SET_WINNER';
export const CHANGE_TURN = 'CHANGE_TURN';
export const CLICK_CELL = 'CLICK_CELL';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            //state를 직접 바꾸면 안됨!!!
            return {
                ...state,
                winner: action.winner
            };
        case CLICK_CELL:
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];//immer 라이브러리로 가독성 해결 가능
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData
            };
        case CHANGE_TURN:
            return {
                ...state,
                turn: state.turn === 'o' ? 'x' : 'o',
            }
    }
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onClickTable = useCallback(() => {
        //dispatch({type: SET_WINNER, winner: 'o'});
    }, []);

    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch}/>
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    )
};

export default TicTacToe;
