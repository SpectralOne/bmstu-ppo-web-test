## 1 node

```
Server Software:
Server Hostname:        team-gen.com
Server Port:            443
SSL/TLS Protocol:       TLSv1.3,TLS_AES_256_GCM_SHA384,2048,256
Server Temp Key:        X25519 253 bits
TLS Server Name:        team-gen.com

Document Path:          /api/v1/players
Document Length:        494 bytes

Concurrency Level:      10
Time taken for tests:   57.481 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      9900000 bytes
HTML transferred:       4940000 bytes
Requests per second:    173.97 [#/sec] (mean)
Time per request:       57.481 [ms] (mean)
Time per request:       5.748 [ms] (mean, across all concurrent requests)
Transfer rate:          168.19 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        3    7   2.3      6      29
Processing:    42   51   4.0     50     156
Waiting:       42   50   4.0     50     155
Total:         46   57   4.6     57     162

Percentage of the requests served within a certain time (ms)
  50%     57
  66%     58
  75%     60
  80%     60
  90%     63
  95%     65
  98%     68
  99%     69
 100%    162 (longest request)

```

## 3 nodes

```
Server Software:
Server Hostname:        team-gen.com
Server Port:            443
SSL/TLS Protocol:       TLSv1.3,TLS_AES_256_GCM_SHA384,2048,256
Server Temp Key:        X25519 253 bits
TLS Server Name:        team-gen.com

Document Path:          /api/v1/players
Document Length:        494 bytes

Concurrency Level:      10
Time taken for tests:   57.911 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      9900000 bytes
HTML transferred:       4940000 bytes
Requests per second:    172.68 [#/sec] (mean)
Time per request:       57.911 [ms] (mean)
Time per request:       5.791 [ms] (mean, across all concurrent requests)
Transfer rate:          166.95 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        2    7   2.5      6      28
Processing:    43   51   4.3     50     133
Waiting:       43   51   4.3     50     133
Total:         47   58   5.0     57     146

Percentage of the requests served within a certain time (ms)
  50%     57
  66%     59
  75%     60
  80%     61
  90%     63
  95%     65
  98%     69
  99%     72
 100%    146 (longest request)
```