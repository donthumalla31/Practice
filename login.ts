// Customized Login Process for DJSIR

import { Page, expect } from  "@playwright/test";
import * as OTPAuth from "otpauth";

export const login = async function (page: Page, email: string, password: string, secret: string) {
    // Initial Login
    await page.locator('input[type=email]').waitFor();
    await page.locator('input[type=email]').fill(email);
    await page.getByRole("button", { name: "Next" }).click();
    
    // Cenitex Login Page
    const txtUserName = page.locator('input[name=UserName]');
    const txtPassword = page.locator('input[name=Password]');
    await txtUserName.waitFor();
    await txtUserName.fill(email);
    await txtPassword.fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    const txtVerificationCode = page.locator('input[name=VerificationCode]');
    const btnYes = page.locator('input[value=Yes]');
    await expect(txtVerificationCode.or(btnYes)).toBeVisible();

    // OTP Auth - Skip OTP if page doesn't request
    if ( await txtVerificationCode.count() > 0 ) {
        let totp = new OTPAuth.TOTP({
            issuer: "Microsoft",
            label: `VicGov:${email}`,
            algorithm: "SHA1",
            digits: 6,
            period: 30,
            secret: secret,
        });

        console.log('OTP Required. Generating OTP Code for input...');
        await page.getByRole('textbox', { name: 'Verification code' }).fill(totp.generate());
        await page.locator('input[name=SignIn]').click();
    }

    await btnYes.waitFor();
    await btnYes.click();
}
