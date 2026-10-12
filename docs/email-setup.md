# Email setup

The site can email customers when the owner **confirms** or **cancels** their booking. It uses [Nodemailer](https://nodemailer.com/) with any SMTP account.

## What gets sent and when

| Event | Email |
|---|---|
| Customer submits a booking | nothing (the website shows a "not confirmed yet" screen) |
| Owner changes status to **confirmed** | "Your table at Yakimachi is confirmed" |
| Owner changes status to **cancelled** | "Your booking at Yakimachi has been cancelled" |

An email is sent only if the customer entered an address and the status **actually changed**. Customer-supplied text is HTML-escaped inside the email.

## Without any setup
If no SMTP settings exist, nothing is sent. The server prints a line like this and carries on:

```
[mail] SMTP not configured, would have emailed sa***@gmail.com: "Your table at Yakimachi is confirmed"
```

## Using Gmail (good for a demo)
1. Turn on **2-Step Verification** for the Google account.
2. Create an **App Password** at https://myaccount.google.com/apppasswords. It is a 16-character code. Never use your normal password.
3. Add to `server/.env` (no spaces in the code):
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=youraddress@gmail.com
   SMTP_PASS=the16characterapppassword
   ```
4. Restart the backend.
5. Make a booking using your own email, then confirm it in the dashboard. Check spam the first time.

Port `465` uses TLS from the start; `587` (the default) upgrades the connection with STARTTLS.

## For a real restaurant
Use the restaurant's own email or a transactional mail service (for example Brevo, Mailgun, SendGrid or Amazon SES), with a sending address on their own domain. Personal Gmail accounts have sending limits and may be flagged as spam.

## Troubleshooting
| Log line | Meaning |
|---|---|
| `[mail] sent ...` | It worked. If it is not in the inbox, check spam. |
| `[mail] failed ... Invalid login` | Wrong user or app password. Create a new app password. |
| `[mail] failed ... ECONNREFUSED / ETIMEDOUT` | Wrong host or port, or a firewall is blocking it. |
| Nothing logged | The status did not change, or the booking has no email. |

A mail failure never stops the owner's confirm or cancel from working.
