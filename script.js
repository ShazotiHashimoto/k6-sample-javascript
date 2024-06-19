import http from "k6/http";
import { check, sleep } from 'k6';

export const options = {
    scenarios: {
      sample_scenario_name: {
        executor: 'ramping-vus',
        startVUs: 0,
        stages: [
          { duration: '10s', target: 2 },
          { duration: '10s', target: 2 },
          { duration: '10s', target: 0 },
        ]
      }
    }
  };

export default function () {
    const res = http.get('https://httpbin.test.k6.io/');
    check(res, { 
        'status was 200': (r) => r.status == 200 
    });
    sleep(1);
}