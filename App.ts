
import { test, expect, Page } from '@playwright/test';
//const { test, expect, Page } from '@playwright/test';
import * as OTPAuth from "otpauth";
import { login } from 'playwright-m365-helpers';
import { getAppFrame, getControlByName, getControlPart, getButton, getDropdown, selectDropdownOption, getInput, getLabel, getRadio, selectRadioOption, getScreen, getToggle } from 'playwright-m365-helpers';
let frame;
//Test Wirth***************
let totp = new OTPAuth.TOTP({
  issuer: "Microsoft",
  label: "VicGov:test.wirth@ecodev.vic.gov.au",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: process.env.M365OTPSECRET_ED,
})

//Test Test Lu***************

let totp1 = new OTPAuth.TOTP({
  issuer: "Microsoft",
  label: "VicGov:test.lu@djsir.vic.gov.au",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: process.env.M365OTPSECRET,
})

//Test Test O' Miller ***************

let totp2 = new OTPAuth.TOTP({
  issuer: "Microsoft",
  label: "VicGov:test.o'miller@ecodev.vic.gov.au",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: process.env.M365OTPSECRET_DepSec,
})
// //test('Confirm Environment Variables', async ({ page }) => {
//   //console.log(process.env.M365USERNAME);
//   console.log(process.env.M365PASSWORD);
//   console.log(process.env.M365OTPSECRET);
// })
test.only('test1', async ({ page }) => {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await page.goto('https://apps.powerapps.com/play/e/1f3cfdf6-ca30-e8fc-a51f-a5e7793defcd/a/aa47ef21-5c1e-4045-bc30-0e6a1c86f971?tenantId=722ea0be-3e1c-4b11-ad6f-9401d6856e24');
    // Customized Login Process for DJSIR
    // Initial Login
    
    await page.locator('input[type=email]').waitFor();
    await page.locator('input[type=email]').fill(process.env.M365USERNAME!);
    await page.getByRole("button", { name: "Next" }).click();
    
    // Cenitex Login Page
    const txtUserName = page.locator('input[name=UserName]');
    const txtPassword = page.locator('input[name=Password]');
    await txtUserName.waitFor();

   

    await txtUserName.fill(process.env.M365USERNAME!);
    await txtPassword.fill(process.env.M365PASSWORD!);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForTimeout(5000);
    console.log("Test account Login Sucess");

    //verification code*****************************
    // await page.getByRole('textbox', { name: 'Verification code' }).click();
    // console.log("I am here");
    // await page.getByRole('textbox', { name: 'Verification code' }).fill(totp1.generate());
    // await page.getByRole('button', { name: 'Sign in' }).click();
    //*****************************************
  //  // OTP Auth - Skip OTP if page doesn't request
  //   if (await page.locator('textbox[name=Verification code]').isVisible()) {
  //       let totp = new OTPAuth.TOTP({
  //           issuer: "Microsoft",
  //           label: `VicGov:${process.env.M365USERNAME!}`,
  //           algorithm: "SHA1",
  //           digits: 6,
  //           period: 30,
  //           secret: process.env.M365OTPSECRET!,
  //       });
  //       await page.getByRole('textbox', { name: 'Verification code' }).fill(totp.generate());
  //       await page.getByRole('button', { name: 'Sign in' }).click();
  //   }
    // OTP Auth - Skip OTP if page doesn't request
    // const txtVerificationCode = page.locator('input[name=VerificationCode]');
    // await txtVerificationCode.waitFor({timeout: 2000});
    // if ( await txtVerificationCode.count() > 0 ) {
    //     let totp = new OTPAuth.TOTP({
    //         issuer: "Microsoft",
    //         label: `VicGov:${process.env.M365USERNAME!}`,
    //         algorithm: "SHA1",
    //         digits: 6,
    //         period: 30,
    //         secret: process.env.M365OTPSECRET!,
    //     });
    //     await page.getByRole('textbox', { name: 'Verification code' }).fill(totp.generate());
    //     await page.locator('input[name=SignIn]').click();
    // }
    // const btnYes1 = page.locator('input[value=Yes]');
    // await btnYes1.waitFor();
    // await btnYes1.click();

  // Press the Escape key
  

    const btnYes = page.locator('input[value=Yes]');
    await btnYes.waitFor();
    await btnYes.click();
// Locate the iframe and get its content frame
const iframe = await page.locator('iframe[name="fullscreen-app-host"]');
const frame = await getAppFrame(page); // Access the content inside the iframe
// // Use your original locator inside the iframe to interact with the button
// const locator = frame.locator('(//div[@class="appmagic-button middle center" and @touch-action="pan-x pan-y"])[8]');
// // Wait for the element to be visible and interactable
// await locator.waitFor({ state: 'visible', timeout: 600000 }); // 10 minutes timeout
// // Scroll the element into view if necessary
// await locator.scrollIntoViewIfNeeded();
// // Click the element
// await locator.click();
// // Locate the combobox input field using its aria-label
// const comboboxLocator = frame.locator('input[aria-label="ap_ApplicationType. Required."]');
// // Click on the combobox input field
// await comboboxLocator.click();
// // Wait for the dropdown to be visible (you may need to adjust this depending on the dropdown's behavior)
// await frame.locator('#combobox-canvas-listbox').waitFor({ state: 'visible' });
// // Select the first element in the dropdown (adjust the locator if necessary)
// const textLocator = frame.locator('text="Create and recruit for a new position"');
// // Wait for the element to be visible
// await textLocator.waitFor({ state: 'visible', timeout: 60000 });  // 60 seconds timeout
// await textLocator.click();
  // Create New Request
  const BTN_NEWREQUEST = await frame.locator('div[data-control-name=hs_btn_MainButtonNewReq]').locator('button');
  
  const BTN_FORM_NEXT = await frame.locator('div[data-control-name=fs_btn_Next]').locator('button');
  BTN_NEWREQUEST.waitFor();
  BTN_NEWREQUEST.click();
  // Application Type
  await frame.locator('div[data-control-name=ap_rad_ApplicationType]').waitFor();
  const cmbApplicationType = await frame.locator('div[data-control-name=ap_rad_ApplicationType]').locator('input[role=combobox]');
  cmbApplicationType.click();
  await page.waitForTimeout(500);
  const cmbApplicationTypeSelect = await frame.getByRole('option');
  const cmbApplicationTypeOptions = await cmbApplicationTypeSelect.allInnerTexts();
  console.log(cmbApplicationTypeOptions);
  // Select Application Type
  for (const option of cmbApplicationTypeOptions) {
    if (option === "Create and recruit for a new position") {
      await cmbApplicationTypeSelect.getByText(option).click();
      // await frame.getByRole('option', { name: option}).click();
    }
  }
  await page.waitForTimeout(500);
  expect(BTN_FORM_NEXT.isDisabled());
// Click the element// Locate the input field using its aria-label and click it
const Classification = frame.locator('input[aria-label="p_Classification. Required."]');
await Classification.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the input field to be visible
await Classification.click();
// Select the first element in the dropdown (adjust the locator if necessary)
const textClassification = frame.locator('text="VPS4"');
// Wait for the element to be visible
await textClassification.waitFor({ state: 'visible', timeout: 60000 });  // 60 seconds timeout
await textClassification.click();
// Click the element// Locate the input field using its aria-label and click it
const ActionRequired = frame.locator('input[aria-label="ap_ActionRequired. Required."]');
await ActionRequired.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the input field to be visible
await ActionRequired.click();
// Select the first element in the dropdown (adjust the locator if necessary)
const textActionRequired = frame.locator('text="Advertise the position"');
// Wait for the element to be visible
await textActionRequired.waitFor({ state: 'visible', timeout: 60000 });  // 60 seconds timeout
await textActionRequired.click();
// // Locate the button using the aria-label attribute and click it
// const saveDraftButton = frame.locator('button[aria-label="Save draft"]');
// await saveDraftButton.click();
// await delay(20000);
// //Locate the div using its inner text
// //
// // Find the element using XPath
// Assuming 'page' is your Playwright Page object
// Assuming 'frame' is your Playwright frame object and you want to click the 2nd occurrence of the element
//await frame.locator("//div[@class='appmagic-label-text' and text()='My Requests']").nth(1).click({ force: true });
// Example: Click the "Next" button using one of the locators
const NextButton = frame.locator('button[aria-label="Next"]');
await NextButton.click();
await delay(10000);

// Use aria-label or placeholder to uniquely identify the input field
const NumberofPositions = frame.locator('input[aria-label="p_NumberofPositions. Required."]');
 
// Wait for the combobox to be visible
await NumberofPositions.waitFor({ state: 'visible', timeout: 30000 });
// Click the combobox to open the dropdown
await NumberofPositions.click();
const textNumberofPositions = frame.locator('text="3"');
await textNumberofPositions.waitFor({ state: 'visible', timeout: 30000 });  // 60 seconds timeout
await textNumberofPositions.click();
//Text area
const PositionNumber = frame.locator('//textarea[@id="PAPrefix0ee7fe8d392a5afield-65__control"]');
  await PositionNumber.waitFor({ state: 'visible', timeout: 60000 });
  // Enter text into the textarea inside the iframe
  await PositionNumber.fill('3');
  console.log('Text entered into Position number');
  const PositionTitle = frame.locator('//input[@id="PAPrefix0ee7fe8d392a5afield-66__control"]');
  await PositionTitle.waitFor({ state: 'visible', timeout: 60000 });
  // Enter text into the textarea inside the iframe
  await PositionTitle.fill('Automation test Record-Approvals');
  console.log('Text entered into the textarea inside iframe');
// Click the element// Locate the input field using its aria-label and click it
const Group = frame.locator('//input[@id="PAPrefix0ee7fe8d392a5afield-70__control"]');
await Group.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the input field to be visible
await Group.click();
// Select the first element in the dropdown (adjust the locator if necessary)
const textGroup = frame.locator('text="DGS"');
// Wait for the element to be visible
await textGroup.waitFor({ state: 'visible', timeout: 60000 });  // 60 seconds timeout
await textGroup.click();
//Click the element// Locate the input field using its aria-label and click it
const Branch = frame.locator('//input[@id="PAPrefix0ee7fe8d392a5afield-73__control"]');
const isVisible = await Branch.isVisible();
console.log(`Element is visible: ${isVisible}`);
await Branch.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the input field to be visible
await Branch.click();
// Select the first element in the dropdown (adjust the locator if necessary)
const textBranch = frame.locator('text="Program Centre"');
// Wait for the element to be visible
await textBranch.waitFor({ state: 'visible', timeout: 80000 });  // 60 seconds timeout
await textBranch.click();
const ReportsTo = frame.locator('//input[@id="PAPrefix0ee7fe8d392a5afield-81__control"]');
  await ReportsTo.waitFor({ state: 'visible', timeout: 60000 });
  // Enter text into the textarea inside the iframe
  await ReportsTo.fill('test');
  console.log('Text entered into Reports To');
  // Click the element// Locate the input field using its aria-label and click it
const WorkLocation = frame.locator('//input[@id="PAPrefix0ee7fe8d392a5afield-84__control"]');
//const isVisible = await inputLocator9.isVisible();
console.log(`Element is visible: ${isVisible}`);
await WorkLocation.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the input field to be visible
await WorkLocation.click();
// Select the first element in the dropdown (adjust the locator if necessary)
const textWorkLocation = frame.locator('text="All"');
// Wait for the element to be visible
await textWorkLocation.waitFor({ state: 'visible', timeout: 80000 });  // 60 seconds timeout
await textWorkLocation.click();
const attachmentButtonLocator = frame.locator('[data-control-name="p_btn_AddAttachments"]');
// Wait for the attachment button to be visible
await attachmentButtonLocator.waitFor({ state: 'visible', timeout: 60000 });
// Click the attachment button to open the file input (assuming this triggers the file input to appear)
await attachmentButtonLocator.click();
   // Now, locate the file input element using the correct locator (look for <input type="file">)
const fileInputLocator = frame.locator('input[type="file"][aria-label="Attach file. attachment"]');
// Specify the path to the file
const filePath = 'C:/Users/vidc7kf/playwright-2/testattachment.txt'; // Ensure the file exists at this location
// Upload the file by setting the input files
await fileInputLocator.setInputFiles(filePath);
// Optionally, verify if the file has been selected (you can check the value of the input)
const inputValue = await fileInputLocator.inputValue();
console.log(inputValue);  // Should log the file path if the upload was successful
// Locate the button using the data-control-name attribute
const closeButtonLocator = frame.locator('[data-control-name="_btn_CloseAttachmentModel"] button[aria-label="Close"]');
// Optionally, you can interact with the element
await closeButtonLocator.click();
// Example: Click the "Next" button using one of the locators
const nextButtonLocator = frame.locator('[data-control-name="ps_btn_Next"]');
// Wait for the next button to be visible
await nextButtonLocator.waitFor({ state: 'visible', timeout: 5000 });
// Click the "Next" button
await nextButtonLocator.click();

// PAGE-3******Click the element// Locate the input field using its aria-label and click it
const EmploymentType = frame.locator('//input[@aria-label="ap_EmploymentType. Required."]');
await EmploymentType.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the input field to be visible
await EmploymentType.click();
// Select the first element in the dropdown (adjust the locator if necessary)
const textEmploymentType = frame.locator('text="Ongoing - Full Time"');
// Wait for the element to be visible
await textEmploymentType.waitFor({ state: 'visible', timeout: 60000 });  // 60 seconds timeout
await textEmploymentType.click();
//Text area
const PurposeOfRole = frame.locator('[data-control-name="ap_PurposeofRoleInput"] textarea[aria-label="ap_PurposeOfRole"]');
  await PurposeOfRole.waitFor({ state: 'visible', timeout: 60000 });
  // Enter text into the textarea inside the iframe
  await PurposeOfRole.fill('test');
  console.log('Text entered into PurposeofRoleInput');
  const OutlineSpecialSkillsInput = frame.locator('[data-control-name="ap_OutlineSpecialSkillsInput"] textarea');
  await OutlineSpecialSkillsInput.waitFor({ state: 'visible', timeout: 60000 });
  // Enter text into the textarea inside the iframe
  await OutlineSpecialSkillsInput.fill('test');
  console.log('Text entered into OutlineSpecialSkillsInput');
  //Text area
const OutlinePurposeInput = frame.locator('[data-control-name="ap_OutlinePurposeInput"] textarea');
await OutlinePurposeInput.waitFor({ state: 'visible', timeout: 60000 });
// Enter text into the textarea inside the iframe
await OutlinePurposeInput.fill('test');
console.log('Text entered into OutlinePurposeInput');
const HowWillBeFundedInput = frame.locator('[data-control-name="ap_HowWillBeFundedInput"] textarea');
await HowWillBeFundedInput.waitFor({ state: 'visible', timeout: 60000 });
// Enter text into the textarea inside the iframe
await HowWillBeFundedInput.fill('test');
console.log('Text entered into HowWillBeFundedInput');
// Example: Click the "Next" button using one of the locators
const nextButtonLocatorrs = frame.locator('[data-control-name="rs_btn_Next"] button');
// Wait for the next button to be visible
await nextButtonLocatorrs.waitFor({ state: 'visible', timeout: 5000 });
// Click the "Next" button
await nextButtonLocatorrs.click();
// Page-4**********************
// Click the element// Locate the input field using its aria-label and click it
const AdvertisingDuration = frame.locator('//input[@aria-label="ad_AdvertisingDuration. Required."]');
await AdvertisingDuration.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the input field to be visible
await AdvertisingDuration.click();
// Select the first element in the dropdown (adjust the locator if necessary)
const textAdvertisingDuration = frame.locator('text="10 working days"');
// Wait for the element to be visible
await textAdvertisingDuration.waitFor({ state: 'visible', timeout: 60000 });  // 60 seconds timeout
await textAdvertisingDuration.click();
// Select the first element in the dropdown (adjust the locator if necessary)
const Visibility = frame.locator('//input[@aria-label="ad_Visibility. Required."]');
await Visibility.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the input field to be visible
await Visibility.click();
// Select the first element in the dropdown (adjust the locator if necessary)
const textVisibility = frame.locator('text="JSE, VPS & Other"');
// Wait for the element to be visible
await textVisibility.waitFor({ state: 'visible', timeout: 60000 });  // 60 seconds timeout
await textVisibility.click();
// Select the first element in the dropdown (adjust the locator if necessary)
const AdvertiseWorkLocationInput = frame.locator('[data-control-name="ad_AdvertiseWorkLocationInput"] input[aria-label="ad_AdvertiseWorkLocationAsv2. Required."]').click();
const textAdvertiseWorkLocationInput = frame.locator('text="All"');
// Wait for the element to be visible
await textAdvertiseWorkLocationInput.waitFor({ state: 'visible', timeout: 60000 });  // 60 seconds timeout
console.log('Text entered-All');
await textAdvertiseWorkLocationInput.click();
//##########################################
// Click the element// Locate the input field using its aria-label and click it
const AdvertisingExternalChannels = frame.locator('[role="combobox"][aria-label="ad_AdvertisingExternalChannels. Required."]');
await AdvertisingExternalChannels.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the input field to be visible
await AdvertisingExternalChannels.click();
// Select the first element in the dropdown (adjust the locator if necessary)
const textAdvertisingExternalChannels = frame.locator('text="Other electronic media (please specify)"');
const textLocator15 = frame.locator('text="Regional print media (please specify)"');
// Wait for the element to be visible
await textAdvertisingExternalChannels.waitFor({ state: 'visible', timeout: 60000 });  // 60 seconds timeout
await textAdvertisingExternalChannels.click();
await textLocator15.waitFor({ state: 'visible', timeout: 60000 });  // 60 seconds timeout
await textLocator15.click();

const inputLocator16 = frame.locator('[role="combobox"][aria-label="ad_AdvertisingExternalChannels. Required."]');
await inputLocator16.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the input field to be visible
await inputLocator16.click();

const inputLocator17 = frame.locator('[role="combobox"][aria-label="ad_ApplicantResponse. Required."]');
await inputLocator17.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the input field to be visible
await inputLocator17.click();
// Select the first element in the dropdown (adjust the locator if necessary)
const textLocator17 = frame.locator('text="Cover letter and Resume"');
await textLocator17.waitFor({ state: 'visible', timeout: 60000 });  // 60 seconds timeout
await textLocator17.click();
//Text area
const textareaLocator18 = frame.locator('textarea[aria-label="ad_RationaleForAdJSEAndExternal"][required]');
await textareaLocator18.waitFor({ state: 'visible', timeout: 60000 });
// Enter text into the textarea inside the iframe
await textareaLocator18.fill('test');
await textareaLocator18.click();
console.log('Text entered into RationaleForAdJSEAndExternal');
//Text area
const textareaLocator19 = frame.locator('textarea[aria-label="ad_DraftAdvertisingText"]');
await textareaLocator19.waitFor({ state: 'visible', timeout: 60000 });
// Enter text into the textarea inside the iframe
await textareaLocator19.fill('test');
await textareaLocator19.click();
console.log('Text entered into DraftAdvertisingText');

const Diversityradio = frame.locator('role=radio[name="Yes"]');
await Diversityradio.click();
await delay(10000);

const SpecialMeasure = frame.locator('[role="combobox"][aria-label="ad_SpecialMeasuresType"]');
await SpecialMeasure.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the input field to be visible
await SpecialMeasure.click();
// Select the first element in the dropdown (adjust the locator if necessary)
const SpecialMeasure1 = frame.locator('text="Aboriginal Designated"');
await SpecialMeasure1.waitFor({ state: 'visible', timeout: 60000 });  // 60 seconds timeout
await SpecialMeasure1.click();
console.log('Text Selected into SpecialMeasuresType-Aboriginal Designated');

// Example: Click the "Next" button using one of the locators
const nextButtonLocator4 = frame.locator('[data-control-name="ads_btn_Next"] button');

await nextButtonLocator4.waitFor({ state: 'visible', timeout: 60000 });
await nextButtonLocator4.click();
console.log('clicked on next button to HMNextAction');

await frame.locator('div[data-control-name=appr_ch_HMNextAction]').waitFor(); // Wait for the container to load
const cmbApplicationType1 = await frame.locator('div[data-control-name=appr_ch_HMNextAction]').locator('input[role=combobox]');
await cmbApplicationType1.click(); // Open the dropdown
await page.waitForTimeout(1000); // Wait for options to load
// Locate the dropdown list containing the options
const cmbApplicationTypeSelect1 = await frame.locator('div[role="listbox"]'); // Assuming the options are within a listbox
// Get all the options' text
const cmbApplicationTypeOptions1 = await cmbApplicationTypeSelect1.locator('div[role="option"]').allInnerTexts();
console.log(cmbApplicationTypeOptions1); // Log all the options
// Select Application Type
for (const option of cmbApplicationTypeOptions1) {
   if (option === "Submit for Approval") {
     // Find the option with the exact text and click it
     await cmbApplicationTypeSelect1.locator(`div[role="option"]:has-text("${option}")`).click(); // Click the correct option based on the text
    //  break; // Exit the loop once the correct option is clicked
   }
}
//###############################ED******************
// Wait for the button (People Picker) to be clickable, and click it to open the dropdown/dialog
const peoplePickerButton = frame.locator('div[data-control-name="_con_appr_EDPeoplePicker"] div[role="button"]');
await peoplePickerButton.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the input field to be visible
await peoplePickerButton.click();

  // Locate the input field inside the flyout search container
  const searchInput = frame.locator('div.flyoutSearchNoSelectionWrapper_dyqjvp div.inputContainer_1l626pd input[placeholder="Search Person.."]');
  await searchInput.waitFor({ state: 'visible', timeout: 10000 }); // Wait for the search input to be visible

  // Enter the name "Test" in the search input field
  await searchInput.fill('Test');


  // Find the item with the specific label "Test Blandon (DJSIR)" and click it
  const targetItem = frame.locator('div.itemTemplateContainer_1ird0k6 >> text=Test Wirth (DJSIR)');
  await targetItem.click(); // This clicks the item


  //dep sec

  // Locate the People Picker button and click it to open the dropdown/dialog
  const depSec = frame.locator('div[data-is-focusable="true"][aria-label="deputy secretary"]');
  await depSec.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the button to be visible
  await depSec.click(); // Open the dropdown

  // Locate the input field inside the flyout search container (Search Person.. placeholder)
  const depSecSearch = frame.locator('div.flyoutSearchNoSelectionWrapper_dyqjvp div.inputContainer_1l626pd input[placeholder="Search Person.."]');
  await depSecSearch.waitFor({ state: 'visible', timeout: 10000 }); // Wait for the search input to be visible

  console.log("Submit for Approval Success");
  // Enter the name "Test" in the search input field
  await depSecSearch.fill("Test o' Miller (DJSIR)");
  // Find the item with the specific label "Test Blandon (DJSIR)" and click it
  const targetItem1 = frame.locator("div.itemTemplateContainer_1ird0k6 >> text=Test o' Miller (DJSIR)");
  await targetItem1.click(); // This clicks the item
  
 await delay(10000);
//Submit vfor aApproval
// Locate the "Submit for Approval" button by aria-label
const submitButton = frame.locator('button[aria-label="submit for approval"]');

// Click the button
await submitButton.click();

console.log("Submited for ED and Dep Approvals ");

await delay(5000);


//assertion#####################

// await delay(40000);

// const locators = await frame.locator("//div[contains(@class, 'appmagic-label-text') and text()='My Requests']");
// const visibleLocator = locators.filter({ hasText: 'My Requests' }); // Target first visible one

// // Wait until the element is visible before clicking
// if (await visibleLocator.isVisible()) {
//   await visibleLocator.click();
// }


// await delay(5000);
// // Locate the button by its class
// const button = frame.locator('.appmagic-button');

// // Assert that the button is visible
// await expect(button).toBeVisible();

// // Locate the button's label text
// const buttonLabel = button.locator('.appmagic-button-label');

// // Get the button text
// const textContent = await buttonLabel.textContent();

// // Assert that the text contains a number
// expect(textContent).toMatch(/\d+/);  // Checks if the text contains one or more digits
//***************************************************************************************** */
  // // Wait for the input field to appear inside the dialog (e.g., search box in combobox)
  // const inputInsideDialog = frame.locator('input[aria-label="Search Person.."]');  // Adjust the selector based on the actual field
  // await inputInsideDialog.fill('Test Blandon (DJSIR)');


// // Wait for the suggestions to appear (you might need to adjust the selector)
// const suggestionList = frame.locator('.suggestions-dropdown'); // Adjust to match your suggestions list
// await suggestionList.waitFor({ state: 'visible' });

// // Click on the first suggestion (or find the specific one you want)
// const firstSuggestion = suggestionList.locator('li').first(); // Adjust based on the structure of the list
// await firstSuggestion.click();

// // Optionally, assert that the People Picker input now has the correct value
// await expect(peoplePickerInput).toHaveValue('Test Blandon (DJSIR)');

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Select the People Picker input field (replace with actual selector)
// const peoplePickerInput = await frame.locator('div[data-control-name="_con_appr_EDPeoplePicker"] div[role="button"]');
// await peoplePickerInput.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the input field to be visible
// const items = await frame.locator('li span').allInnerTexts();
// console.log(items); // Check the list of items
// // Type the value you are searching for (e.g., someone's name or email)
// await peoplePickerInput.fill('Test Blandon (DJSIR)');

// await peoplePickerInput.click();

// // Wait for the suggestions to appear (replace with actual suggestion list selector)
// const suggestionList = frame.locator('.Search Person..');
// await suggestionList.waitFor({ state: 'visible' });

// // Select the first suggestion from the list (you can modify this based on your UI)
// const firstSuggestion = suggestionList.locator('li span').first();
// await firstSuggestion.click();

// // Optionally, assert that the People Picker input is filled with the selected value
// await expect(peoplePickerInput).toHaveValue('Test Blandon (DJSIR)');
//***************************8 */
// const peoplePickerButton = frame.locator('div[data-control-name="_con_appr_EDPeoplePicker"] div[role="button"]');
// await peoplePickerButton.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the input field to be visible
// await peoplePickerButton.click();
// const items = await frame.locator('li span').allInnerTexts();
// console.log(items); // Check the list of items
//******************************* */
// Locate the list item that contains the span with the specified text
// const listItem = await frame.locator('li span:has-text(/Test Blandon.*\(DJSIR\)/)');
// // Wait for the list item to be visible
// await listItem.waitFor({ state: 'visible', timeout: 10000 });  // Ensure it's visible
// // Click the list item
// await listItem.click();
// const peoplePickerButtonSelect = await frame.locator('div[role="listbox"]'); // Assuming the options are within a listbox
// // Check if the listbox is actually visible
// const isVisible1 = await peoplePickerButtonSelect.isVisible();
// console.log('Listbox is visible:', isVisible1); // Log visibility status
// if (!isVisible) {
//   console.log('Listbox not visible yet, waiting...');
//   await peoplePickerButtonSelect.waitFor({ state: 'visible', timeout: 10000 }); // Wait for visibility
// }
// await peoplePickerButtonSelect.waitFor({ state: 'visible', timeout: 10000 }); // Wait for the listbox to be visible
// // Get all the options' text

//await delay(60000);

 
//await delay(300000);
});



//TEST CASE -2 ED Approvals

test('test2', async ({ page }) => {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await page.goto('https://apps.powerapps.com/play/e/1f3cfdf6-ca30-e8fc-a51f-a5e7793defcd/a/aa47ef21-5c1e-4045-bc30-0e6a1c86f971?tenantId=722ea0be-3e1c-4b11-ad6f-9401d6856e24&hint=7193991a-1c5e-4749-a43b-a0c8c7bc8dd5');
    // Customized Login Process for DJSIR
    // Initial Login
    await page.locator('input[type=email]').waitFor();
    await page.locator('input[type=email]').fill(process.env.M365USERNAME_ED!);
    await page.getByRole("button", { name: "Next" }).click();
    

    // Cenitex Login Page
    const txtUserName = page.locator('input[name=UserName]');
    const txtPassword = page.locator('input[name=Password]');
    await txtUserName.waitFor();
    await txtUserName.fill(process.env.M365USERNAME_ED!);
    await txtPassword.fill(process.env.M365PASSWORD_ED!);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForTimeout(5000);
    console.log("Test Wirth (DJSIR)-ED Login Sucess");

    // //verification code*****************************
    // await page.getByRole('textbox', { name: 'Verification code' }).click();
    // console.log("Verification Success");
    // await page.getByRole('textbox', { name: 'Verification code' }).fill(totp.generate());
    // await page.getByRole('button', { name: 'Sign in' }).click();
    // //*****************************************

     // OTP Auth - Skip OTP if page doesn't request
    // if (await page.locator('textbox[name=Verification code]').isVisible()) {
    //     let totp = new OTPAuth.TOTP({
    //         issuer: "Microsoft",
    //         label: `VicGov:${process.env.M365USERNAME_ED!}`,
    //         algorithm: "SHA1",
    //         digits: 6,
    //         period: 30,
    //         secret: process.env.M365OTPSECRET_ED!,
    //     });
    //     await page.getByRole('textbox', { name: 'Verification code' }).fill(totp.generate());
    //     await page.getByRole('button', { name: 'Sign in' }).click();
    // }
  
    const btnYes = page.locator('input[value=Yes]');
    await btnYes.waitFor();
    await btnYes.click();
// Locate the iframe and get its content frame
const iframe = await page.locator('iframe[name="fullscreen-app-host"]');
const frame = await getAppFrame(page); // Access the content inside the iframe

// Assuming 'page' is your Playwright Page object
// Assuming 'frame' is your Playwright frame object and you want to click the 2nd occurrence of the element
//await frame.locator('//div[@class="appmagic-label-text" and @data-control-part="text" and text()="My Requests"]').click({ force: true });

//await frame.locator('//div[@class="appmagic-label-text" and @data-control-part="text" and text()="My Approvals"]').click({ force: true });

//await frame.locator('.spinnerOverlay_ft4out-o_O-visible_wqf7ed').waitFor({ state: 'hidden', timeout: 60000 }); // Increased timeout to wait for overlay

//const Approval = frame.locator('//div[@class="appmagic-label-text" and @data-control-part="text" and text()="My Approvals"]');
//const Approval = frame.locator('div[data-control-id="53"] button[data-control-part="button"]');
//const Approval = frame.locator('div[data-control-id="53"] button[data-control-part="button"][title="Item 1"]');
//await frame.locator("//div[@class='appmagic-label-text' and text()='My Requests']").nth(1).click({ force: true });
//const Approval = frame.locator('div[data-control-id="53"] button[data-control-part="button"]').nth(1).click({ force: true });
//await Approval.scrollIntoViewIfNeeded();

//const Approval = frame.locator('//div[@class="appmagic-label-text" and @data-control-part="text" and text()="My Approvals"]').nth(2).click({ force: true });
//const Approval = frame.locator('div[data-control-id="53"] button[data-control-part="button"]');
//.nth(3).click({ force: true })
//const Approval = frame.locator('div[data-control-id="53"] button[data-control-part="button"]').nth(2).click({ force: true });


// //const Approval = frame.locator('div.appmagic-label-text[data-control-part="text"] and @data-control-part="text" and text()="My Approvals"]').nth(2);
// const Approval = frame.locator('div.appmagic-label-text[data-control-part="text"]:has-text("My Approvals")').nth(8);
// //const Approval = page.locator('div.appmagic-label-text:has-text("My Approvals")');
// await Approval.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the button to be visible
// await Approval.click(); // Open the dropdown 


const Approval = frame.locator('div[data-control-id="53"] button[data-control-part="button"]').nth(2);
const isDisabled = await Approval.isDisabled();
if (!isDisabled) {
  await Approval.click({ force: true });
} else {
  console.log('Button is disabled.');
}

await Approval.click(); 
//SUBMITTED FOR APPROVAL RECORD
// const overlay = frame.locator('div.appmagic-content-control-name[data-control-name="mas_btn_MyApprovalSelect"]');
// await overlay.waitFor({ state: 'hidden', timeout: 5000 }); // Wait for the overlay to disappear
const SubmittedforApproval = frame.locator('div.appmagic-content-control-name[data-control-name="mas_btn_MyApprovalSelect"]').nth(0);
await SubmittedforApproval.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the button to be visible
await SubmittedforApproval.click(); // Open the dropdown 
 
const EditApproval = frame.locator('button[aria-label="edit approval"]');
await EditApproval.click();
await delay(10000);

const RadioApproval = frame.locator('#PAPrefix0ee7fe8d392a5aradio-49');
//const RadioApproval = page.locator('label:has-text("Approved")').locator('input[type="radio"]');

await RadioApproval.waitFor({ state: 'visible' });
await RadioApproval.click();
await delay(10000);


const SubmitDecision = frame.locator('button[aria-label="submit for approval"]');
await SubmitDecision.waitFor({ state: 'visible' });
await SubmitDecision.click();
console.log('ED Submited-Approved');


//await delay(30000);
});


//TEST CASE -3 DepSec ED Approvals**************************

test('test3', async ({ page }) => {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await page.goto('https://apps.powerapps.com/play/e/1f3cfdf6-ca30-e8fc-a51f-a5e7793defcd/a/aa47ef21-5c1e-4045-bc30-0e6a1c86f971?tenantId=722ea0be-3e1c-4b11-ad6f-9401d6856e24&hint=7193991a-1c5e-4749-a43b-a0c8c7bc8dd5');
    // Customized Login Process for DJSIR
    // Initial Login
    await page.locator('input[type=email]').waitFor();
    await page.locator('input[type=email]').fill(process.env.M365USERNAME_DepSec!);
    await page.getByRole("button", { name: "Next" }).click();
    

    // Cenitex Login Page
    const txtUserName = page.locator('input[name=UserName]');
    const txtPassword = page.locator('input[name=Password]');
    await txtUserName.waitFor();
    await txtUserName.fill(process.env.M365USERNAME_DepSec!);
    await txtPassword.fill(process.env.M365PASSWORD_DepSec!);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForTimeout(5000);
    console.log("Test O' Miller Login Sucess");

 // //verification code*****************************
//  await page.getByRole('textbox', { name: 'Verification code' }).click();
//  console.log("Verification Success");
//  await page.getByRole('textbox', { name: 'Verification code' }).fill(totp2.generate());
//  await page.getByRole('button', { name: 'Sign in' }).click();
 //*****************************************

    const btnYes = page.locator('input[value=Yes]');
    await btnYes.waitFor();
    await btnYes.click();
// Locate the iframe and get its content frame
const iframe = await page.locator('iframe[name="fullscreen-app-host"]');
const frame = await getAppFrame(page); // Access the content inside the iframe

const Approval = frame.locator('div[data-control-id="53"] button[data-control-part="button"]').nth(2);
const isDisabled = await Approval.isDisabled();
if (!isDisabled) {
  await Approval.click({ force: true });
} else {
  console.log('Button is disabled.');
}

await Approval.click(); 
//SUBMITTED FOR APPROVAL RECORD
// const overlay = frame.locator('div.appmagic-content-control-name[data-control-name="mas_btn_MyApprovalSelect"]');
// await overlay.waitFor({ state: 'hidden', timeout: 5000 }); // Wait for the overlay to disappear
const SubmittedforApproval = frame.locator('div.appmagic-content-control-name[data-control-name="mas_btn_MyApprovalSelect"]').nth(0);
await SubmittedforApproval.waitFor({ state: 'visible', timeout: 60000 }); // Wait for the button to be visible
await SubmittedforApproval.click(); // Open the dropdown 
 
const EditApproval = frame.locator('button[aria-label="edit approval"]');
await EditApproval.click();
await delay(10000);

const RadioApproval = frame.locator('#PAPrefix0ee7fe8d392a5aradio-55');
//const RadioApproval = page.locator('label:has-text("Approved")').locator('input[type="radio"]');

await RadioApproval.waitFor({ state: 'visible' });
await RadioApproval.click();
await delay(10000);


const SubmitDecision = frame.locator('button[aria-label="submit for approval"]');
await SubmitDecision.waitFor({ state: 'visible' });
await SubmitDecision.click();
console.log('Dep Sec Submited-Approved');


await delay(5000);
});