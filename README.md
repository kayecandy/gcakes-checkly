# Checkly integration for GCakes

## Installation and usage
- Run `npm i` to install dependencies

- Running `npx checkly test` will look for `.check.ts` files and `.spec.ts` in `/tests` directories and execute them in a dry run.

- Running `npx check deploy` will deploy your checks to Checkly


## To add tests:
1. Create `<filename>.spec.ts` in `/tests` directory and write your playwright tests
2. Add your test in `checks/group.check.ts`. For example:

```
new BrowserCheck("id-of-test", {
  name: "Name of test",
  code: {
    entrypoint: '../tests/<name-of-test>.spec.ts'
  },
  group: group
})
```

## CLI Commands

Run the core CLI commands with `npx checkly <command>` 

| Command              | Action                                           |
|:---------------------|:-------------------------------------------------|
| `npx checkly test`   | Dry run all the checks in your project           |
| `npx checkly deploy` | Deploy your checks to the Checkly cloud          |
| `npx checkly login`  | Log in to your Checkly account                   |
| `npx checkly --help` | Show help for each command.                      |

[Check the docs for the full CLI reference](https://www.checklyhq.com/docs/cli/command-line-reference/).

## To use local Playwright

> To run Playwright tests locally, install the [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) plugin
> and run tests using the plugin.