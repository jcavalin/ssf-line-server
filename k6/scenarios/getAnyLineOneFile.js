import http from 'k6/http';
import { sleep, check, fail } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';
import fileConfig from '../../src/config/fileConfig.js';

export const getLineDuration = new Trend('get_any_line_one_file_duration');
export const getLineFailRate = new Rate('get_any_line_one_file_fail_rate');
export const getLineSuccessRate = new Rate('get_any_line_one_file_success_rate');
export const getLineRequests = new Counter('get_any_line_one_file_requests');

export default function () {
    const maxLineIndex = fileConfig.linesPerFile;
    
    const lineIndex = Math.floor((Math.random() * maxLineIndex) + 1);
    const res = http.get(`http://localhost/lines/${lineIndex}`, {tags: { name: 'Get any line one file' }});
    
    getLineDuration.add(res.timings.duration);
    getLineRequests.add(1);
    getLineFailRate.add(res.status != 200);
    getLineSuccessRate.add(res.status == 200);

    if (!check(res, {'max duration': (r) => r.timings.duration < 10000})){
        fail('Max duration 10s');
    }
    
    sleep(1);
}