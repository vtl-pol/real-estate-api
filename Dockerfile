FROM node:13.8

USER node
COPY . /home/node/app
WORKDIR /home/node/app

# CMD yarn install & tail -f README.md
CMD ["/bin/bash", "-c", "yarn install ; yarn start"]
