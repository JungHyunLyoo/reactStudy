import React from 'react';
import ReactDom from 'react-dom';
import {hot} from 'react-hot-loader/root';
import RockScissorsPaper from './RockScissorsPaper';

const Hot = hot(RockScissorsPaper);
ReactDom.render(<Hot/>,document.querySelector('#root'));