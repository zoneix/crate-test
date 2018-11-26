# crate-test
Does our Rancher deployment even support git as a build source?? - Not directly!

Step-1: Create repo in Container services and connect it to your GitHub repo
Step-2: Create a successful build in Container services
Step-3: Log into Crate, add Container services as a Registry
Step-4: Use docker-compose.yml file

# sample Docker-compose.yml file

```
version: '2'
services:
  node-app:
    image: containers.xxxx.com/<cecuser>/crate-test:<label>
    stdin_open: true
    tty: true 
    ports:
      - 80:8080
    environment:
      - JABBER_JID=<username>@<domain>
      - JABBER_PASSWORD=<password>
      - DIALOGFLOW_TOKEN=<token>
```
