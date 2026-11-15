import assert from "node:assert/strict";
import { test } from "node:test";
import { greet } from "./index.js";

test("greet returns a hello message", () => {
  assert.equal(greet(), "hello from anode");
});

test("greet accepts a custom name", () => {
  assert.equal(greet("world"), "hello from world");
});
