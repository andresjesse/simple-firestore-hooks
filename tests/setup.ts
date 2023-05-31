require("dotenv").config({ path: `.env.test` });

import { jest } from "@jest/globals";
import fetch from "cross-fetch";
global.fetch = fetch;

if (process.env.DISABLE_CONSOLE_OUTPUT) {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
}
