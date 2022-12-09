// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { runFlow } from '../../playrunner';

const testYaml = `
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

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runFlow(testYaml);
  res.status(200).json({ name: 'John Doe' })
}
