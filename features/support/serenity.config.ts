import { AfterAll, After, BeforeAll, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { ConsoleReporter } from '@serenity-js/console-reporter';
import { ArtifactArchiver, configure, Duration } from '@serenity-js/core';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';
import { Photographer, TakePhotosOfInteractions /* TakePhotosOfFailures */ } from '@serenity-js/web';
import * as playwright from 'playwright';
import { actorCalled, Log } from '@serenity-js/core'

import { Actors } from '../../test';

const timeouts = {
    cucumber: {
        step: Duration.ofSeconds(30),                       // how long to wait for a Cucumber step to complete
    },
    playwright: {
        defaultNavigationTimeout: Duration.ofSeconds(10),   // how long to wait for a page to load
        defaultTimeout: Duration.ofSeconds(5),    // how long to wait for an element to show up
    },
    serenity: {
        cueTimeout: Duration.ofSeconds(5),    // how long to wait for Serenity/JS to complete any post-test activities, like saving screenshots and reports
    }
}

let browser: playwright.Browser;
let page;
let context;
const { chromium } = require('playwright');

// Configure default Cucumber step timeout
setDefaultTimeout(timeouts.cucumber.step.inMilliseconds());

BeforeAll(async () => {
    // Launch the browser once before all the tests
    // Serenity/JS will take care of managing Playwright browser context and browser tabs.
    browser = await playwright.chromium.launch({
        headless: false,
    })

    // Configure Serenity/JS
    configure({

        // Configure Serenity/JS actors to use Playwright browser
        actors: new Actors(browser, {
           // baseURL: 'https://the-internet.herokuapp.com/',
           // defaultNavigationTimeout: timeouts.playwright.defaultNavigationTimeout.inMilliseconds(),
           // defaultTimeout: timeouts.playwright.defaultTimeout.inMilliseconds(),
        }),

        // Configure Serenity/JS reporting services
        crew: [
            ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
            new SerenityBDDReporter(),
            ConsoleReporter.forDarkTerminals(),
            //Photographer.whoWill(TakePhotosOfInteractions),         // capture screenshots of all the interactions; slower but more comprehensive
            // Photographer.whoWill(TakePhotosOfFailures),             // capture screenshots of failed interactions; much faster
        ],

        cueTimeout: timeouts.serenity.cueTimeout,
    });
});
Before(async () => {
    context = await browser.newContext({
        recordVideo: {
            dir: "./target/recordings",
        }
    });

    global.page = await context.newPage();
})

After(async () => {
    // Close the browser after all the tests are finished
    if (browser) {
        context.close()
    }
    let videoPath = await global.page.video().path();
    videoPath = "../../../" + videoPath.replace("./", "")
    await actorCalled('Agent').attemptsTo(
        Log.the('<video width="520" height="440" controls><source src="' + videoPath + '" type="video/webm">This is the failure video</video>')
    )
})

AfterAll(async () => {
    if (browser) {
        await browser.close();

    }
})

