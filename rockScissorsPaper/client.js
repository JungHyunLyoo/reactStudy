import React from 'react';
import ReactDom from 'react-dom';
import {hot} from 'react-hot-loader/root';
import RockScissorsPaper from './src/functionStyle/RockScissorsPaper';

const Hot = hot(RockScissorsPaper);
ReactDom.render(<Hot/>,document.querySelector('#root'));