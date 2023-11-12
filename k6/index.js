import getLine from './scenarios/getLine.js';
import {group,  sleep} from 'k6';

export default () => {
    group('Get line', () => {
        getLine();
    });

    sleep(1);
};