# 部署https

listen443, sslOn, sslCerticateKeyCertsLocalhostPrivaKeyPem, sslCertificateCertsLocalhostCertPem,

## 访问http时直接跳转https

listen80DefaultServer, listen[::]80DefaultServer, serverNameTestCom, return302Https://$serverNmae$requestUri,

listen  80 default_server;
listen  [::]:80 default_server;
server_name  test.com;
return  302  https://$server_name$request_uri;
