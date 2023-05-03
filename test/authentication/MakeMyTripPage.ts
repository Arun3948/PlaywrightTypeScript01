import {Page} from 'playwright';
//import { test, expect,Page } from '@playwright/test';

export class MakeMyTripPage{

   // private page:Page;

    // constructor(page:Page){
    //     this.page = page;
    // }

    async navigate(){
        await global.page.goto('https://www.makemytrip.com/');
    }

    public  getSearchButton(){
        console.log("********************TRY")
      //  const searchButton = await this.page.getByText('Search');
     return  global.page.getByText('Search', { exact: true });
    }

    public  getSearchButtonForFail(){
      console.log("********************TRY")
    //  const searchButton = await this.page.getByText('Search');
   return  global.page.getByText('Searc', { exact: true });
  }

    public async getCalendarIcon(){
      console.log("********************TRY")
    //  const searchButton = await this.page.getByText('Search');
    return await global.page.getByPlaceholder('Search');
  }
}