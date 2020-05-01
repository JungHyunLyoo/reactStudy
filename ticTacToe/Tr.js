import React, {useEffect, useRef, memo, useMemo} from 'react';
import Td from './Td';

//함수를 기억하는것 = useCallback
//값을 기억하는것 useMemo(memo의 최후 수단) 컴포넌트 자체를 기억해버림
const Tr = memo(({rowData, rowIndex, dispatch}) => {

    const ref = useRef([]);
    useEffect(() => {
        console.log(rowData === ref.current[0], rowIndex === ref.current[1], dispatch === ref.current[2]);
        ref.current = [rowData, rowIndex, dispatch];
    }, [rowData, rowIndex, dispatch]);

    return (
        <tr>
            {
                Array(rowData.length).fill().map((td, i) => (
                    useMemo(()=><Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i}
                                    cellData={rowData[i]}>{''}</Td>,[rowData[i]])

                ))
            }
        </tr>
    )
});

export default Tr;