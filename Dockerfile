FROM node:16

COPY . ./home/node/app

RUN git config --global url.”https://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:@github.com/".insteadOf “https://github.com/"