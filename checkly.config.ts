import { defineConfig } from '@checkly/cli';

/**
 * See https://www.checklyhq.com/docs/cli/project-structure/
 */
const config = defineConfig({
  /* A human friendly name for your project */
  projectName: 'Gcakes e2e',
  /** A logical ID that needs to be unique across your Checkly account,
   * See https://www.checklyhq.com/docs/cli/constructs/ to learn more about logical IDs.
   */
  logicalId: 'gcakes-e2e',
  /* An optional URL to your Git repo */
  repoUrl: 'https://github.com/kayecandy/gcakes-checkly',
  /* Sets default values for Checks */
  checks: {
    /* A default for how often your Check should run in minutes */
    frequency: 1440,
    /* Checkly data centers to run your Checks as monitors */
    locations: ['ap-east-1'],
    /* An optional array of tags to organize your Checks */
    tags: ['gcakes-e2e'],
    /** The Checkly Runtime identifier, determining npm packages and the Node.js version available at runtime.
     * See https://www.checklyhq.com/docs/cli/npm-packages/
     */
    runtimeId: '2022.10',
    /* A glob pattern that matches the Checks inside your repo, see https://www.checklyhq.com/docs/cli/using-check-test-match/ */
    checkMatch: '**/checks/**/*.check.ts',
    browserChecks: {
      /* A glob pattern matches any Playwright .spec.ts files and automagically creates a Browser Check. This way, you
      * can just write native Playwright code. See https://www.checklyhq.com/docs/cli/using-check-test-match/
      * */
      testMatch: '**/tests/**/*.spec.ts',
    },
  },
  cli: {
    /* The default datacenter location to use when running npx checkly test */
    runLocation: 'ap-east-1',
  },
})



export default config
