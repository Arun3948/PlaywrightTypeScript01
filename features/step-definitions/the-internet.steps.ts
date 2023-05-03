// import { Given, Then, When } from '@cucumber/cucumber';
// import { Actor, actorInTheSpotlight } from '@serenity-js/core';
// import { Navigate } from '@serenity-js/web';

// import { Authenticate, VerifyAuthentication,MakeMyTripPage } from '../../test/authentication';
// import { PickExample } from '../../test/examples';
// import { By, Click, Enter, PageElement } from '@serenity-js/web';
// import {Page} from 'playwright';


// /**
//  * Below step definitions use Cucumber Expressions
//  * see: https://cucumber.io/docs/cucumber/cucumber-expressions/
//  *
//  * {actor} and {pronoun} are custom expressions defined under support/parameters.ts
//  */
// Given('{actor} starts with the {string} example', async (actor: Actor, exampleName: string) =>
//     actor.attemptsTo(
//         Navigate.to('/'),
//         PickExample.called(exampleName),
//     )
// );

// When('{pronoun} log(s) in using {string} and {string}', async (actor: Actor, username: string, password: string) =>
//     actor.attemptsTo(
//         Authenticate.using(username, password),
//     )
// );

// /**
//  * If you need to use a RegExp instead of Cucumber Expressions like {actor} and {pronoun}
//  * you can use actorCalled(name) and actorInTheSpotlight() instead
//  *
//  *  see: https://serenity-js.org/modules/core/function/index.html#static-function-actorCalled
//  *  see: https://serenity-js.org/modules/core/function/index.html#static-function-actorInTheSpotlight
//  */
// Then(/.* should see that authentication has (succeeded|failed)/, async (expectedOutcome: string) =>
//     actorInTheSpotlight().attemptsTo(
//         VerifyAuthentication[expectedOutcome](),
//     )
// );

// // Given('I am in webiste', () =>
// //     Navigate.to('https://www.makemytrip.com/'),
// // );

// // When('clicked on search button',() =>{
// //     Click.on(LoginForm.SearchButton())
// // })

// //This is the working one 
// // const LoginForm = {
// //     SearchButton: () =>
// //         PageElement.located(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[2]/p/a')).describedAs('Search')
// // }

// Given('{Agent} starts with a example', async (actor: Actor) =>
//     actor.attemptsTo(
//         Navigate.to('https://www.makemytrip.com/')
//     )
// );

// // When('{Agent} clicked on search button', async (actor: Actor) =>
// //     actor.attemptsTo(
// //         Click.on(LoginForm.SearchButton())
// //     )
// // );

// // When('clicked on search button',()=>{
// //     Click.on(LoginForm.SearchButton())
// // })
// //This is the working one 






import { Given, Then, When } from '@cucumber/cucumber';
import { Actor, actorInTheSpotlight, serenity } from '@serenity-js/core';
import { Navigate } from '@serenity-js/web';

//import { Authenticate, VerifyAuthentication, MakeMyTripPage } from '../../test/authentication';
import {   MakeMyTripPage } from '../../test/authentication';
//import { PickExample } from '../../test/examples';
import { By, Click, Enter, PageElement, Page } from '@serenity-js/web';
//import {Page} from 'playwright';
import * as playwright from 'playwright';
import { actorCalled, Log } from '@serenity-js/core'
import { Serenity } from '@serenity-js/core';
import { expect } from '@playwright/test';

const makeMyTripPage = new MakeMyTripPage();


Given('{Agent} starts with a example', async (actor: Actor) => {
    //actor.attemptsTo(
    //  Navigate.to('https://www.makemytrip.com/')
    await global.page.goto('https://www.makemytrip.com/')
    //)
    console.log("i am here 1");
}
)


When('{Agent} clicked on search button', async (actor: Actor) => {
    //    actor.attemptsTo(
    //    await Click.on(makeMyTripPage.getSearchButton())
    // )
    //  Click.on(makeMyTripPage.getSearchButton()),
    console.log("i am here 2")
    //actor.attemptsTo( 
    await makeMyTripPage.getSearchButton().click()
    //await Click.on(makeMyTripPage.getSearchButton()),
    //)
    console.log("i am here 3")
    // console.log("Video ********"+await global.page.video().path());
    // let videoPath = await global.page.video().path();


    //videoPath = "../../." +videoPath;
    //console.log("Video ********"+videoPath);
    //  await actorCalled('Agent').attemptsTo(
    //   Log.the('<video width="520" height="440" controls><source src="'+videoPath+'" type="video/webm">This is the failure video</video>')
    // )
}
)

When('{Agent} clicks on search button', async (actor: Actor) => {
    await makeMyTripPage.getSearchButtonForFail().click()
   // await expect(makeMyTripPage.getSearchButtonForFail().textContent()).not.toContainText("some text")
}
)

