interface ConfirmMailTemplateParams {
	name?: string;
	magicLink: string;
}

type ConfirmMailTemplate = (data: ConfirmMailTemplateParams) => string;

export const confirmMailTemplate: ConfirmMailTemplate = (data) => `<!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">

<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your Magic Login Link - Debugsy</title>
        <style type="text/css">
                body {
                        margin: 0;
                        padding: 0;
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                }

                table {
                        border-spacing: 0;
                }

                td {
                        padding: 0;
                }

                img {
                        border: 0;
                        -ms-interpolation-mode: bicubic;
                        display: block;
                }

                /* Custom Debugsy Theme Colors */
                .bg-primary {
                        background-color: #0f172a;
                }

                /* Dark blue */
                .bg-secondary {
                        background-color: #1e293b;
                }

                /* Slightly lighter dark blue */
                .text-primary {
                        color: #e2e8f0;
                }

                /* Light gray */
                .text-accent {
                        color: #818cf8;
                }

                /* Indigo 400 */
                .text-highlight {
                        color: #6366f1;
                }

                /* Indigo 500 */
                .btn-bg {
                        background-color: #4f46e5;
                }

                /* Indigo 600 */
                .btn-text {
                        color: #ffffff;
                }

                /* Font */
                body,
                p,
                a,
                li,
                td {
                        font-family: 'Inter', sans-serif;
                }

                /* Fallback to sans-serif */
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

                /* Responsive Styles */
                @media screen and (max-width: 600px) {
                        .full-width-image {
                                width: 100% !important;
                                height: auto !important;
                        }

                        .col {
                                width: 100% !important;
                                display: block !important;
                        }

                        .pad-sm {
                                padding-left: 15px !important;
                                padding-right: 15px !important;
                        }

                        .text-center-sm {
                                text-align: center !important;
                        }

                        .font-sm-lg {
                                font-size: 24px !important;
                                line-height: 28px !important;
                        }
                }
        </style>
</head>

<body class="bg-primary"
        style="background-color: #0f172a; margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: 'Inter', sans-serif;">
        <center style="width: 100%; background-color: #0f172a;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="bg-primary"
                        style="background-color: #0f172a; margin: 0 auto;">
                        <tr>
                                <td align="center" valign="top" class="bg-primary" style="padding: 20px 0;">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"
                                                style="width: 100%; max-width: 600px; background-color: #1e293b; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);"
                                                class="bg-secondary">
                                                <tr>
                                                        <td align="center" style="padding: 20px;">
                                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                        <tr>
                                                                                <td align="center">
                                                                                        <a href="https://debugsy.vercel.app" target="_blank"
                                                                                                style="text-decoration: none; color: #e2e8f0;">
                                                                                                <h1
                                                                                                        style="margin: 0; font-size: 28px; line-height: 32px; font-weight: 700; color: #e2e8f0;">
                                                                                                        <span style="color: #6366f1;">Debugsy</span>
                                                                                                </h1>
                                                                                        </a>
                                                                                </td>
                                                                        </tr>
                                                                </table>
                                                        </td>
                                                </tr>

                                                <!-- Content Section -->
                                                <tr>
                                                        <td class="pad-sm" style="padding: 30px 40px; background-color: #1e293b; color: #e2e8f0;">
                                                                <h2 class="text-accent font-sm-lg"
                                                                        style="margin-top: 0; margin-bottom: 20px; font-size: 28px; line-height: 32px; font-weight: 600; color: #818cf8;">
                                                                        Hello ${data.name || 'User'},
                                                                </h2>
                                                                <p style="margin-bottom: 15px; font-size: 16px; line-height: 24px;">
                                                                        You recently requested a magic link to securely sign in to your Debugsy account.
                                                                </p>
                                                                <p style="margin-bottom: 15px; font-size: 16px; line-height: 24px;">
                                                                        To log in instantly, simply click the button below:
                                                                </p>

                                                                <!-- Call to Action Button for Magic Link -->
                                                                <table border="0" cellpadding="0" cellspacing="0" style="margin: 25px auto;">
                                                                        <tr>
                                                                                <td align="center" class="btn-bg"
                                                                                        style="border-radius: 6px; background-color: #4f46e5;">
                                                                                        <a href="${data.magicLink}" target="_blank"
                                                                                                style="font-size: 16px; font-weight: 600; line-height: 1.5; text-decoration: none; padding: 12px 25px; display: inline-block; border-radius: 6px; color: #ffffff; background-color: #4f46e5;">
                                                                                                Log in to Debugsy
                                                                                        </a>
                                                                                </td>
                                                                        </tr>
                                                                </table>

                                                                <p style="margin-top: 20px; font-size: 14px; line-height: 22px; color: #cbd5e1;">
                                                                        For your security, this link is **single-use** and will expire in a short period.
                                                                        Please do not share this email.
                                                                </p>
                                                                <p style="margin-top: 10px; font-size: 14px; line-height: 22px; color: #cbd5e1;">
                                                                        If you did not request this magic link, please ignore this email. Your account
                                                                        remains secure.
                                                                </p>
                                                        </td>
                                                </tr>

                                                <!-- Footer Section -->
                                                <tr>
                                                        <td align="center"
                                                                style="padding: 20px 40px; background-color: #1e293b; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                                                                <p style="margin: 0; font-size: 12px; line-height: 18px; color: #64748b;">
                                                                        &copy; 2024 Debugsy. All rights reserved.
                                                                </p>
                                                                <p style="margin: 5px 0 0; font-size: 12px; line-height: 18px; color: #64748b;">
                                                                        <a href="https://debugsy.vercel.app/privacy" target="_blank"
                                                                                style="color: #64748b; text-decoration: underline;">Privacy Policy</a> |
                                                                        <a href="https://debugsy.vercel.app/terms" target="_blank"
                                                                                style="color: #64748b; text-decoration: underline;">Terms of Service</a>
                                                                </p>
                                                        </td>
                                                </tr>
                                        </table>
                                </td>
                        </tr>
                </table>
        </center>
</body>

</html>
`;
