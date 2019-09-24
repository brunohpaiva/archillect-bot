import fetchLatestArchillectId from "./fetchLatestArchillectId";

it("fetchLatestArchillectId returns a number greater than 0", async () => {
  const latestArchillectId = await fetchLatestArchillectId();
  expect(latestArchillectId).toBeDefined();
  expect(latestArchillectId).toBeGreaterThan(0);
});
