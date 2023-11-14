import http from 'k6/http';
import { sleep, group } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

export const getLineDuration = new Trend('get_last_line_duration');
export const getLineFailRate = new Rate('get_last_line_fail_rate');
export const getLineNotFoundRate = new Rate('get_any_line_not_found_rate');
export const getLineSuccessRate = new Rate('get_last_line_success_rate');
export const getLineRequests = new Counter('get_last_line_requests');

export default () => {
    group('Get last line', () => {
        const lineIndex = 100;
        const res = http.get(`http://127.0.0.1/lines/${lineIndex}`, {tags: { name: 'Get last line' }});
        
        getLineDuration.add(res.timings.duration);
        getLineRequests.add(1);
        getLineFailRate.add(res.status != 200);
        getLineNotFoundRate.add(res.status == 413);
        getLineSuccessRate.add(res.status == 200);
        
        sleep(1);
    });
}