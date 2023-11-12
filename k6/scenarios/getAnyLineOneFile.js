import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

export const getLineDuration = new Trend('get_any_line_one_file_duration');
export const getLineFailRate = new Rate('get_any_line_one_file_fail_rate');
export const getLineSuccessRate = new Rate('get_any_line_one_file_success_rate');
export const getLineRequests = new Counter('get_any_line_one_file_requests');

export default function () {
    const maxLineIndex = 100;
    
    const lineIndex = Math.floor((Math.random() * maxLineIndex) + 1);
    const res = http.get(`http://127.0.0.1/lines/${lineIndex}`, {tags: { name: 'Get any line one file' }});
    
    getLineDuration.add(res.timings.duration);
    getLineRequests.add(1);
    getLineFailRate.add(res.status != 200);
    getLineSuccessRate.add(res.status == 200);
    
    sleep(1);
}