Serve local directory in a docker container

```bash
docker run -p 80:80 -v $(pwd):/usr/share/nginx/html nginx
```
