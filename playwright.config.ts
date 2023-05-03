import type { PlaywrightTestConfig } from '@playwright/test'
import type { SerenityOptions } from '@serenity-js/playwright-test'

const config: PlaywrightTestConfig<SerenityOptions> = {
    use: {
        // headless: false,
        // viewport: { width: 1280, height: 720 },
        // ignoreHTTPSErrors: true,
         video: 'retain-on-failure',
       },
// ...
}

export default config