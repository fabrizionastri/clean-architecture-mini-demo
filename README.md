# Objectives

The objectives of this project is to explore, test and illustrate different ways of implementating Clean Architecture using Type Script and TDD (test driven development), while avoiding to use classes (which tend to require extra boiler plate and consume more ressources).

Specifically, we will:

- compare two different approaches for creating gateways and adapters : interfaces and functions of functions
- compare two different database implementations : in memory and json server
- test each approach with each database implementation (4 combinations in total)

The two approaches for gateways & adapters are:

- Approach 1: gateways are interfaces, and adapters are implementations of these
- Approach 2: gateways are functions of functions, and take adapters as arguments (gateway 3 is a minor syntaxic variation of adapter 3, so not included in all tests)

The mock data used for tests is provided in the `/mock/` folder:

- in memory: `inMemoryDb.ts`
- json server: `jsonServerDb.json`

## Usage

- Install dependencies with: `pnpm install` (pnpm is recommended, but npm or yarn should also work)
- Install json-server with: `pnpm install -g json-server` (if you don't have it already)
- Reset the json-server database with: `pnpm db-resetDb`
- Launch the json-server with: `pnpm db`
- Check that the json-server is running by going to: `http://localhost:3057/`
- Run the tests with: `pnpm test`
