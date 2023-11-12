import http from 'k6/http';
import { sleep, check, fail } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

export const getLineDuration = new Trend('get_line_duration');
export const getLineFailRate = new Rate('get_line_fail_rate');
export const getLineSuccessRate = new Rate('get_line_success_rate');
export const getLineRequests = new Rate('get_line_requests');

export default function () {
    const lineIndex = Math.floor((Math.random() * 148514) + 1);
    const res = http.get(`http://localhost/lines/${lineIndex}`);
    
    getLineDuration.add(res.timings.duration);
    getLineRequests.add(1);
    getLineFailRate.add(res.status != 200);
    getLineSuccessRate.add(res.status == 200);

    const durationMsg = `Max duration ${1000/1000}s`;
    if (!check(res, {'max duration': (r) => r.timings.duration < 1000})){
        fail(durationMsg);
    }
    
    sleep(1);

}