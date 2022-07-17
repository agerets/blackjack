# Blackjack

## Install & Run

```sh
git clone https://github.com/agerets/blackjack.git && cd blackjack # clone
cp src/config/.env.example src/config/.env # set `DECK_URL` value after copying 
yarn # install dependencies
yarn test # test the code
yarn start # to build and start project or `yarn start:dev` to run with ts-node
```

## Usage

```sh
GET http://localhost:8080/game/play/?playerName=Player&botName=Bot # while local run
GET https://blackjack-sduv2p3jfq-lz.a.run.app/game/play/?playerName=Player&botName=Bot # when using deployed service
```

## To be done:

- Cover server error handling by integration tests
- Cover card, deck and player entities by unit tests
- Add advanced logger to the app with possibilities to tag and group logs in cloud env
- Make logs connected to requst by generating requestId
- Add sentry or analogue for reporting/tracking errors
- Use secret manager for storing and versioning sensitive env vars
- Add auth layer/middleware
- Add swagger documentation via anotations in the code and setup it's access
- Create differemt environment in the Cloud (dev, qa, uat, prod)
- Setup autotagging depending on commit message (to differ deploys by envs)
- Add database layer to save games' data for the history purposes
- Make documentation and flowcharts of the project
- Send build notifications to Slack or any other channel
- Make extensive `README.md` with task description, examples, etc.