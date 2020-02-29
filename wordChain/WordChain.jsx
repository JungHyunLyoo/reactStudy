const React = require('react');
const { useState, useRef } = React;

const WordChain = () => {

    const [word, setWord] = useState('유정현');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (word[word.length-1] === value[0]) {
            setWord(value);
            setValue('');
            setResult('딩동댕');
            inputRef.current.focus();
        } else {
            setValue('');
            setResult('꽝');
            inputRef.current.focus();
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <label htmlFor={"wordInput"}>글자를 입력하세요.</label>
                <input className="class" id={"wordInput"} ref={inputRef} value={value} onChange={onChangeInput}></input>
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    );
}

module.exports = WordChain;

