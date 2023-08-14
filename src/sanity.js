import { createClient } from "@sanity/client";
export const client = createClient({
  projectId: "4b6ds5nd",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: true, // set to `false` to bypass the edge cache
});
