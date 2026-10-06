import { request } from 'node:http';

const url = process.argv[2];
const req = request(url, { method: 'GET', timeout: 10000 }, (res) => {
  let data = '';
  res.on('data', (chunk) => (data += chunk));
  res.on('end', () => {
    console.error(`status=${res.statusCode}`);
    console.error(`body=${data.length} bytes`);
    process.exit(0);
  });
});
req.on('error', (err) => {
  console.error('request error:', err.message);
  process.exit(1);
});
req.on('timeout', () => {
  console.error('timeout');
  process.exit(2);
});
req.end();