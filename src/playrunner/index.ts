import {
  clickOn,
  expectTitle,
  goTo,
  expectUrl,
  expectAttribute,
  expectText,
  fill,
} from "./commands";

import yaml from "js-yaml";
import { hasOwnProperty } from "./yaml-helpers";
import chalk from "chalk";
import chromium from 'chrome-aws-lambda';
import playwright from 'playwright-core';

export const runFlow = async (yamlString: string) => {
  // Load the flow from yaml into a javascript object using js-yaml
  const data = yaml.load(yamlString);

  // Start the browser and create a new page
  const browser = await playwright.chromium.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath ?? undefined,
    headless: true,
  });

  const page = await browser.newPage();

  const steps = data as object[];

  // Loop through the flow and execute the commands
  for (const step of steps) {
    if (hasOwnProperty(step, "description")) {
      console.log(
        chalk.blue("Running flow") + ": " + chalk.green(step.description)
      );
    } else if (hasOwnProperty(step, "goTo")) {
      await goTo(page, step.goTo);
    } else if (hasOwnProperty(step, "expectTitle")) {
      await expectTitle(page, step.expectTitle);
    } else if (hasOwnProperty(step, "clickOn")) {
      await clickOn(page, step.clickOn);
    } else if (hasOwnProperty(step, "expectUrl")) {
      await expectUrl(page, step.expectUrl);
    } else if (hasOwnProperty(step, "expectAttribute")) {
      await expectAttribute(page, step.expectAttribute);
    } else if (hasOwnProperty(step, "expectText")) {
      await expectText(page, step.expectText);
    } else if (hasOwnProperty(step, "fill")) {
      await fill(page, step.fill);
    } else {
      console.log(chalk.red(`Unknown step: ${step}`));
    }
  }
  await browser.close();
  console.log(chalk.blue("Flow successfully completed"));
};

