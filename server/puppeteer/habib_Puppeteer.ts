import fs from "fs";
import path from "path";
// import sanitize from "sanitize-filename";

import puppeteer from "puppeteer-extra";
// import * as puppeteer from "puppeteer";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

// import habib_Doctors_Model from "../models/habib_Model";
import habib_Model from "../models/habib_Doctors_Model";

const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const waiting_For_First_Selectors = async (page: any) => {
  await page.waitForSelector(".docBoxRight");
  await page.waitForSelector(".docBoxLeft");
  await page.waitForSelector(".docBox span.redColorLink");
};

const get_Habib_Data = async (clinic: any) => {
  // Function to extract data from a page

  await puppeteer
    .launch({
      headless: true,
      // headless: false,
      executablePath:
        // "C:/Program Files/Google/Chrome/Application/chrome.exe",
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      userDataDir:
        //   "C:/Users/Basseloob/AppData/Local/Google/Chrome/User Data/Default",
        "/Users/basseloob/Library/Application Support/Google/Chrome/Profile 1",
      // args: ["--proxy-server=http://162.23.125.34:8080"],
      args: ["--no-sandbox"],
    })
    .then(async (browser) => {
      const page = await browser.newPage();
      // 1)
      await page.goto(clinic);
      // 2) Waiting for the needed Selectors :
      delay(3000);

      // await page.reload();

      await waiting_For_First_Selectors(page);

      let viewDetails_btns = await page.$$(".docBox span.redColorLink");

      interface ResultItem {
        Img: string;
        Name: string;
        Speciality: string;
        Hospital: string;
        DateObj: any[]; // You might want to use a more specific type instead of `any[]`
      }

      let result: ResultItem[] = [];

      for (let i = 0; i < viewDetails_btns.length; i++) {
        const numberOfPhysicians = viewDetails_btns.length;
        console.log("Number of physicians: ", numberOfPhysicians);

        // await page.waitForTimeout(2000);
        delay(2000);

        await page.waitForSelector(".docBox span.redColorLink");
        // await page.waitForSelector(".docBox .docBoxRight span.redColorLink");

        const numberOfNow = i + 1;
        console.log("Number of now: ", numberOfNow);

        // 1) click viewdetails Btn :
        let viewDetails_btns2 = await page.$$(".docBox span.redColorLink");
        viewDetails_btns2[i].click();

        // console.log("result array  : ", result);

        // 2) After click wait for needed docs :
        await page.waitForSelector(".docBoxLeft img[src]");
        await page.waitForSelector(".docBoxRight h3");
        // await page.waitForSelector("div.calenderHours b");
        await page.waitForSelector("div.calenderHours b");
        await page.waitForSelector("p.docMainDetails span");
        await page.waitForSelector("p.docMainDetails span");
        await page.waitForSelector(
          ".cal-month-view .ng-star-inserted .cal-cell-row .cal-day-number"
        );

        try {
          await page.waitForSelector("div.timedate", {
            timeout: 5000,
          });
        } catch (error) {
          console.log("The element didn't appear.");
        }

        const image = await page.$(".docBoxLeft img[src]");
        const name = await page.$(".docBoxRight h3");
        const speciality = await page.$("p.docMainDetails span:nth-child(2)");
        const hospitalName = await page.$("p.docMainDetails span:nth-child(1)");
        const date = await page.$("div.calenderHours b");
        // const times = await page.$$("div.timedate div.timepicker");

        // if (image && name && speciality && hospitalName && date && times) {
        // const imageSource: string = await page.evaluate((el) => el.src, image);
        const imageSource: string = image
          ? await page.evaluate((el) => el.src, image)
          : "";
        // const nameText: string = await page.evaluate(
        //   (el) => el.innerText,
        //   name
        // );
        const nameText: string = name
          ? await page.evaluate((el) => el.innerText, name)
          : "No name";

        console.log("Name of the Doctor : ", nameText);

        // const speciality_Text: string = await page.evaluate(
        //   (el) => el.innerText,
        //   speciality
        // );
        const speciality_Text: string = speciality
          ? await page.evaluate((el) => el.innerText, speciality)
          : "No Speciality";

        // const hospitalName_Text: string = await page.evaluate(
        //   (el) => el.innerText,
        //   hospitalName
        // );
        const hospitalName_Text: string = hospitalName
          ? await page.evaluate((el) => el.innerText, hospitalName)
          : "No hospital";

        // this will get the automatically clicked cal-day-number day btn.
        // 1) Wait for all the days to load.
        // 2) click in each day and get the date of the clicked day... for the next week.
        // 3) push it in an array.

        // await page.waitForTimeout(2000);
        await page.waitForSelector(".cal-day-number"); // Day number.

        let days_Btns = await page.$$(".cal-day-number");

        const daysDate_Arr: any[] = [];

        // This is for clicking on the Date Days to extract the times per each day :
        // Using MongoDB - will update the whole month from 1 to 33 / per week .
        //    plus will show the days on VERCEL for the current week by extracting the
        //    current week from MongoDB.

        for (let i = 28; i < 30; i++) {
          // for (let i = 21; i <= 25; i++) {

          await delay(3000);

          // 1)
          await days_Btns[i].click();
          await page.waitForSelector("div.calenderHours b");
          // await page.waitForTimeout(2000);

          // 2)

          const dayDate_innerText: string = await page.$eval(
            "div.calenderHours b",
            (el) => el.innerText.trim()
          );

          // 3)
          const times_Array: string[] = [];
          // await page.waitForSelector("div.timedate div.timepicker");
          const times = await page.$$("div.timedate div.timepicker");
          for (const divElement of times) {
            const timesText = await page.evaluate(
              // (el: HTMLElement) => el.innerText,
              (el: any) => el.innerText,
              divElement
            );
            times_Array.push(timesText);
          }

          // 4)
          daysDate_Arr.push({ Date: dayDate_innerText, Times: times_Array });
        }

        //////////////////////////////////////Test//////////////////////////////////////
        //////////////////////////////////////Test//////////////////////////////////////
        //////////////////////////////////////Test//////////////////////////////////////

        //////////////////////////////////////Test//////////////////////////////////////
        //////////////////////////////////////Test//////////////////////////////////////
        //////////////////////////////////////Test//////////////////////////////////////

        console.log("daysDate_Arr  : ", daysDate_Arr);

        ////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////

        result.push({
          Img: imageSource,
          Name: nameText,
          Speciality: speciality_Text,
          Hospital: hospitalName_Text,
          // Date: daysDate,
          // Times: times_Array,
          // Times: daysDate,
          DateObj: daysDate_Arr,
        });

        // await page.waitForTimeout(3000); // Wait for 3 seconds
        console.log("Reloading the page...");
        await delay(5000);
        // await page.reload();
        // await page.goto(clinic);
        // await page.evaluate(() => {
        //   location.reload();
        // });

        const search_Button = await page.waitForSelector("button.btn");
        await search_Button?.click();
        console.log("Page is reloaded.");
        // page.waitForSelector("button");
        // await page.goto(clinic);
        // await page.waitForSelector("div button");
        // const button = await page.$("div button");
        // if (button) {
        //   await button.click();
        // } else {
        //   console.log("Button with class 'btn' not found.");
        // }

        // // 5) wait 3 seconds :
        // // await page.waitForTimeout(2000);
        // setTimeout(() => {}, 2000);
        // // 6) Wait for the "button.btn" and click it
        // await page.waitForSelector("button.btn");
        // const button = await page.$("button.btn");
        // if (button) {
        //   // await page.reload();
        //   // await page.waitForTimeout(1500);
        //   await button.click();
        // } else {
        //   console.log("Button with class 'btn' not found.");
        // }

        // if (numberOfNow === numberOfPhysicians) {
        //   await page.close();
        // }
      }

      // console.log("End Result : ", result);
      console.log(JSON.stringify(result, null, 2));

      console.log("Loop is done. The result array is : ");
      // return result;

      // // //   saving the result array :

      // // 1) Read the existing data from the file using fs.readFileSync and parse it as JSON.
      // const existingDataBuffer = fs.readFileSync(resultFilePath);
      // const existingData = JSON.parse(existingDataBuffer.toString());

      // // 2) Combine the existing data with the new data (result array) using the spread operator.
      // const newData = [...existingData, ...result]; // Assuming `result` is an array

      // // 3) Write the combined data back to the file using fs.writeFileSync.
      // fs.writeFileSync(resultFilePath, JSON.stringify(newData, null, 2));

      // saving into mongoDB atlas Directly :
      await habib_Model.create(result);
      // console.log("Saved into the mongoDB......");

      console.log(
        "Remember to save into the mongoDB in habibpuppeteer file ......"
      );

      // Close the browser
      await browser.close();
    })
    .catch((error) => {
      console.error(error);
    });
};

export default get_Habib_Data;
