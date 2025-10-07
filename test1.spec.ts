
import { test, expect, type Page, type Locator, type FrameLocator } from '@playwright/test';
import { getAppFrame, getButton, getControlByName, getDropdown, selectDropdownOption, getInput, getControlPart, getGalleryItems } from 'playwright-m365-helpers';
import { login } from '../utils/login';
import * as CPTHelper from '../utils/helper';
import {mockUser} from '../mocks/user';



const appUrl: string = `https://apps.powerapps.com/play/e/${process.env.ENVIRONMENTID!}/a/${process.env.APPID!}?tenantId=${process.env.TENANTID}&source=iframe&hidenavbar=true`;
let page: Page;

// Run Tests Sequentially
// This must be done due to OTP requirement. Tests can be run in parallel if no OTP is required.
test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ browser }, testInfo) => {
    page = await browser.newPage({
        recordVideo: {
            dir: testInfo.outputPath('videos'),
        }
    });
    await page.goto(appUrl);
    await login(page, process.env.M365USERNAME as string, process.env.M365PASSWORD! as string, process.env.M365OTPSECRET! as string);
});

// test.beforeEach( async () => {
//   await page.goto(appUrl);
//   await login(page);
// })

test.afterAll(async ({ }, testInfo) => {
    // const videoPath = testInfo.outputPath('test.webm');
    // await Promise.all([
    //     page.video()?.saveAs(videoPath),
    //     page.close()
    // ]);
    page.close();
    // await browserContext.close();
})


// test('Test', async() => {
//     await page.goto(appUrl);
//     console.log(appUrl);
//     test.slow();
//     const frame: FrameLocator = await getAppFrame(page);
    
//     // Get Gallery
//     const menuGallery = getControlByName(frame, 'galNavigationParent_1');
//     await menuGallery.waitFor();
//     await expect(menuGallery).toBeVisible();
//     // Get Gallery Items
//     const menuItems = getGalleryItems(menuGallery);
//     // Get Target Gallery Item
//     const myRequest = menuItems.filter({hasText: "My Requests"})
//     console.log(await myRequest.allInnerTexts());
//     await expect(myRequest).toBeVisible();
//     // Get Item Button
//     const myRequestButton = getButton(myRequest, 'btnNavigation_1');
//     await myRequestButton.click();



//     // Open Request



//     // TODO: Get Nested Gallery
//     // myRequests --> getControlByName --> getGalleryItems --> filter

//     await page.waitForTimeout(10000);
//     const form = menuItems.filter({hasText: "Form"});
    
//     const formGallery = getControlByName(form, 'galNavigationChild_1');
//     const formItems = getGalleryItems(formGallery);

//     const childAdvertiseHelper = page.getByText('Advertise', {exact: true})
//     const advertiseItem = formItems.filter({hasText: 'Advertise', visible: true});
//     console.log(await advertiseItem.allInnerTexts());
//     await expect(advertiseItem).toBeVisible();
//     const advertiseButton = getButton(advertiseItem, 'btnNavigationChild_1');
//     await advertiseButton.click();

// })


test.only('CabCharge Form Submission', async () => {
    // Setup Form Inputs for Test
    const FORM_INPUTS = {
        // Form
        NewRequest: {
            Input: "Create New e-Ticket Request",
            ControlName: "btnNewETicketButton"
        },
        Classification: {
            Input: "VPS5",
            ControlName: "fs_ch_Classification"
        },
        ActionRequired: {
            Input: "Advertise the position",
            ControlName: "ap_rad_ActionRequired"
        },
        Tenure: {
            Input: 6,
            ControlName: ""
        },
        ExecutiveDirector: {
            Input: "Test Blandon (DJSIR)",
            ControlName: ""
        },
        DeputySecretary: "Test O'Miller (DJSIR)",
        // Position
        NumberPositions: 2,
        PositionNumber: {
            Input: "99999999",
            ControlName: ""
        },
        PositionTitle: {
            Input: "Playwright Test",
            ControlName: ""
        },
        StartDate: {
            Input: "",
            ControlName: ""
        },
        EndDate: {
            Input: "",
            ControlName: ""
        },
        Group: {
            Input: "Corporate Services",
            ControlName: "p_GroupInput"
        },
        Branch: {
            Input: "Information Technology and Workplace Services",
            ControlName: "p_BranchInput"
        },
        Unit: {
            Input: "Regional Specialists",
            ControlName: "p_UnitInput"
        },
        Team: {
            Input: "",
            ControlName: ""
        },
        AuthorisedOfficer: {
            Input: "",
            ControlName: ""
        },
        ReportsTo: {
            Input: "James X Vo (DJSIR)",
            ControlName: ""
        },
        WorkLocation: {
            Input: "All",
            ControlName: ""
        },
        PositionSameChargeCode: {
            Input: "AC123",
            ControlName: ""
        },
        ChargeCode: {
            Input: "AC123",
            ControlName: ""
        },
        WorkstationAvailable: {
            Input: "",
            ControlName: ""
        },
        // TODO: Request
        // TODO: Advertise
        // TODO: Approval
        // TODO: Interview
        // TODO: Checks
        // TODO: Candidate
        // TODO: Endorsement
    };


    await page.goto(appUrl);
    test.slow();
    const frame: FrameLocator = await getAppFrame(page);

    // Create New Request
    const btnNewRequest = getButton(frame, 'btnNewETicketButton');
    // const btnFormNext = getButton(frame, 'fs_btn_Next');
    await btnNewRequest.waitFor();
    btnNewRequest.click();

    // Cab Charge Submission
    const NewRequest = await CPTHelper.getModernComboBox(frame, FORM_INPUTS.NewRequest.ControlName);
    await CPTHelper.selectModernComboBoxOption(frame, NewRequest, FORM_INPUTS.NewRequest.Input);
    await expect(NewRequest).toHaveValue(FORM_INPUTS.NewRequest.Input);

    expect(btnFormNext.isDisabled());
    // Classification
    
    const cmbClassification = await CPTHelper.getModernComboBox(frame, FORM_INPUTS.Classification.ControlName);
    await CPTHelper.selectModernComboBoxOption(frame, cmbClassification, FORM_INPUTS.Classification.Input);
    await expect(cmbClassification).toHaveValue(FORM_INPUTS.Classification.Input);

    expect(btnFormNext.isDisabled());

    // Action Required
    const cmbActionRequired = await CPTHelper.getModernComboBox(frame, FORM_INPUTS.ActionRequired.ControlName);
    await CPTHelper.selectModernComboBoxOption(frame, cmbActionRequired, FORM_INPUTS.ActionRequired.Input);

    expect(btnFormNext.isEnabled());
    btnFormNext.click();

    // Position Screen

    const drpHiringManager = await CPTHelper.getComboBox(frame, 'p_HiringManagerNameInput');
    await CPTHelper.selectClassicComboBoxOption(frame, drpHiringManager, 'Test Lu (DJSIR)', true);
    // CPTHelper.getModernComboBox(frame, 'p_HiringManagerNameInput');
    // await drpHiringManager.fill('Santiago Blandon');
    // await CPTHelper.selectModernComboBoxOption(frame, drpHiringManager, 'Santiago Blandon (DJSIR)');

    const cmbNumberOfPositions = await CPTHelper.getModernComboBox(frame, 'p_NumberofPositionsInput');
    await CPTHelper.selectModernComboBoxOption(frame, cmbNumberOfPositions, '1');

    const txtPositionNumber = getInput(frame, 'p_PositionNumberInput', true);
    await txtPositionNumber.fill('99999999');

    const cmbGroup = await CPTHelper.getModernComboBox(frame, FORM_INPUTS.Group.ControlName);
    await CPTHelper.selectModernComboBoxOption(frame, cmbGroup, FORM_INPUTS.Group.Input);
    

    const cmbBranch = await CPTHelper.getModernComboBox(frame, FORM_INPUTS.Branch.ControlName);
    await CPTHelper.selectModernComboBoxOption(frame, cmbBranch, FORM_INPUTS.Branch.Input);

    const cmbUnit = await CPTHelper.getModernComboBox(frame, FORM_INPUTS.Unit.ControlName);
    await CPTHelper.selectModernComboBoxOption(frame, cmbUnit, FORM_INPUTS.Unit.Input);

    // const menuGallery = getControlByName(frame, 'galNavigationChild_1');
    // const menuItems = getGalleryItems(menuGallery);
    // console.log(menuItems.allInnerTexts());

    await page.waitForTimeout(10000);
})

test.skip('Control Tests', async () => {
    const FORM_INPUTS = {
        TextClassic: {
            Input: "Hello", 
            ControlName: "txtMain_ClassicMain"
        },
        DropdownClassic: {
            Input: "Hello", 
            ControlName: "drpMain_ClassicMain"
        },
        ComboboxClassic: {
            Input: "Hello", 
            ControlName: "cmbMain_ClassicMain"
        },
        DatePickerClassic: {
            Input: "Hello", 
            ControlName: "dteMain_ClassicMain"
        },
        CheckboxClassic: {
            Input: "Hello", 
            ControlName: "chkMain_ClassicMain"
        },
        RadioButtonClassic: {
            Input: "Hello", 
            ControlName: "radMain_ClassicMain"
        },
        ToggleClassic: {
            Input: "Hello", 
            ControlName: "tglMain_ClassicMain"
        },
        RichTextClassic: {
            Input: "Hello", 
            ControlName: "rtcMain_ClassicMain"
        }
    };

    await page.route('https://graph.microsoft.com/v1.0/me', (route) => {
        route.fulfill({
        status: 200,
        contentType: 'application/json; charset=utf-8',
        headers: {
            'access-control-allow-origin': '*'
        },
        body: JSON.stringify(mockUser)
        })
    });
    
    const frame: FrameLocator = await getAppFrame(page);
    const txtMainClassic = getInput(frame, FORM_INPUTS.TextClassic.ControlName);
    await txtMainClassic.fill(FORM_INPUTS.TextClassic.Input);

    const drpMainClassic = getDropdown(frame, FORM_INPUTS.DropdownClassic.ControlName);

    await selectDropdownOption(frame, drpMainClassic, "2");
    const btnPatch = getButton(frame, "ButtonCanvas1_5");
    btnPatch.click();
    await page.waitForTimeout(10000);
})
