import getAnyLine from './scenarios/getAnyLine.js';
import getAnyLineOneFile from './scenarios/getAnyLineOneFile.js';
import getFirstLine from './scenarios/getFirstLine.js';
import getLastLine from './scenarios/getLastLine.js';
import {group,  sleep} from 'k6';

export default () => {
    group('Get any line', getAnyLine);
    group('Get any line one file', getAnyLineOneFile);
    group('Get first line', getFirstLine);
    group('Get last line', getLastLine);

    sleep(1);
};