export const testYaml = `
# This flow recreates the example test from the Playwright docs https://playwright.dev/docs/writing-tests#the-example-test
- description: homepage has Playwright in title and get started link linking to the intro page
- goTo: "https://playwright.dev/"
- expectTitle: Playwright
- expectAttribute:
    name: href
    value: /docs/intro
    locator:
      role: link
      name: Get started
- clickOn:
    locator:
      role: link
      name: Get started
- expectUrl: .*intro
`;
