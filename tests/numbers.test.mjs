import test from "node:test";
import assert from "node:assert/strict";
import { numeric, sortProducts } from "../src/lib/numbers.mjs";
test("parses Bengali digits, thousands and decimal values", () => {
  assert.equal(numeric("১,৮৫০.৫০"), 1850.5);
  assert.equal(numeric("৯৯"), 99);
});
test("sorts numeric Bengali prices without mutating source", () => {
  const source = [{ today: "১৪৮" }, { today: "৯৯" }, { today: "১,৮৫০" }];
  assert.deepEqual(
    sortProducts(source, "asc").map((p) => p.today),
    ["৯৯", "১৪৮", "১,৮৫০"],
  );
  assert.deepEqual(
    sortProducts(source, "desc").map((p) => p.today),
    ["১,৮৫০", "১৪৮", "৯৯"],
  );
  assert.equal(source[0].today, "১৪৮");
});
