import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ["src/**/*.{js, ts}"],
    coverage: {
      reporter: ["text", "json"],
    },
    sequence: {
      shuffle: false,
      concurrent: false,
    }
  }
})