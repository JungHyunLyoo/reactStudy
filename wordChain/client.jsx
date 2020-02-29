const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

const WordChain = require('./WordChain');

const Hot = hot(WordChain);

ReactDom.render(<Hot />,document.querySelector('#root'));

