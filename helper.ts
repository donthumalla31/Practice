import { FrameLocator, Locator, expect } from "@playwright/test";
import { getControlByName } from 'playwright-m365-helpers';

// Get Modern Combo Box Control
export const getModernComboBox = async function(frame: FrameLocator, controlName: string): Promise<Locator> {
    const control = getControlByName(frame, controlName).locator('input[role=combobox]');
    return control;
};

// Select Modern Combo Box Options
export const selectModernComboBoxOption = async function(frame: FrameLocator, comboBox: Locator, value: string) {
    await comboBox.waitFor();
    comboBox.click();
    const comboBoxDrop = frame.getByRole('listbox');
    await comboBoxDrop.waitFor();
    const comboBoxSelect = frame.getByRole('option');
    const comboBoxOptions = await comboBoxSelect.allInnerTexts();
    console.log(comboBoxOptions);
    for (const option of comboBoxOptions) {
        if (option === value) {
            await comboBoxSelect.getByText(option, {exact: true}).click();
        }
    }

    return;
}

// Get Classic Combo Box Control
export const getComboBox = async function(frame: FrameLocator, controlName: string): Promise<Locator> {
    const control = getControlByName(frame, controlName).locator('div[role=button]');
    return control;
};

// Select Classic Combo Box Control Options
export const selectClassicComboBoxOption = async function(frame: FrameLocator, comboBox: Locator, value: string, useTextSearch: boolean) {
    await comboBox.waitFor();
    await comboBox.click();
    const comboBoxDrop = frame.getByRole('listbox');
    await comboBoxDrop.waitFor();

    const comboBoxSelect = frame.getByRole('option');
    if (useTextSearch) {
        const comboBoxInput = frame.getByRole('dialog').locator('input');
        await comboBoxInput.fill(value);
        await expect(comboBoxInput).toHaveValue(value);
        await comboBoxSelect.getByText(value).click();
        
    } else {
        await comboBoxDrop.waitFor();
        const comboBoxOptions = await comboBoxSelect.allInnerTexts();
        
        console.log(comboBoxOptions);
        for (const option of comboBoxOptions) {
            if (option === value) {
                await comboBoxSelect.getByText(option).click();
            }
        }
    };
    
    return;
};

// Get Date

export const getModernDatePicker = async function(frame: FrameLocator, controlName: string): Promise<Locator> {
    const control = getControlByName(frame, controlName).locator('div[role=combobox]');
    return control;
}