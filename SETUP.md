# Domain, Newsletter, and Author Email Setup

This guide is for connecting the GitHub Pages site to `jajacobsauthor.com`, connecting the newsletter form to Mailchimp, and setting up a professional author email address.

## 1. GitHub Pages custom domain

The repository now includes a root `CNAME` file containing:

```txt
jajacobsauthor.com
```

After this is committed and pushed to `main`, finish setup in GitHub:

1. Open the repo: `taz232323/echo-of-the-veil`.
2. Go to Settings > Pages.
3. Under Custom domain, enter `jajacobsauthor.com`.
4. Save.
5. After GitHub provisions the certificate, enable Enforce HTTPS.

Add these DNS records wherever the domain's nameservers are managed.

### Apex/root domain

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A | @ | 185.199.108.153 | Default |
| A | @ | 185.199.109.153 | Default |
| A | @ | 185.199.110.153 | Default |
| A | @ | 185.199.111.153 | Default |

Optional IPv6 records:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| AAAA | @ | 2606:50c0:8000::153 | Default |
| AAAA | @ | 2606:50c0:8001::153 | Default |
| AAAA | @ | 2606:50c0:8002::153 | Default |
| AAAA | @ | 2606:50c0:8003::153 | Default |

### www subdomain

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| CNAME | www | taz232323.github.io | Default |

Do not point `www` to `taz232323.github.io/echo-of-the-veil`; DNS records only take hostnames, not paths.

Helpful checks after DNS propagation:

```sh
dig jajacobsauthor.com +noall +answer -t A
dig www.jajacobsauthor.com +noall +answer -t CNAME
```

## 2. Mailchimp audience and signup form

The site newsletter forms now have Mailchimp-ready `action` placeholders in:

- `index.html`
- `about.html`
- `contact.html`

The current placeholder is:

```html
action="https://YOUR-ACCOUNT.usXX.list-manage.com/subscribe/post?u=YOUR_U_VALUE&amp;id=YOUR_AUDIENCE_ID"
```

Replace that same placeholder in all three files with the real Mailchimp form action URL.

Steps in Mailchimp:

1. Create or log into the Mailchimp account.
2. Go to Audience and create an audience for J. A. Jacobs if one does not exist.
3. Go to Forms > Other forms > Form builder.
4. Select the correct audience.
5. Copy the hosted signup form URL, open it in a browser, then view page source.
6. Search the source for `form action`.
7. Copy the URL from the form action. It should look similar to:

```html
https://example.us12.list-manage.com/subscribe/post?u=abc123&amp;id=def456
```

8. Paste that URL into each newsletter form's `action` attribute.
9. Commit and push the changes.
10. Test the live site with a real email address.
11. Confirm the address appears in the Mailchimp audience after the confirmation flow.

The JavaScript in `script.js` converts the Mailchimp `subscribe/post` URL to Mailchimp's `subscribe/post-json` endpoint so the static GitHub Pages site can submit without a backend server.

## 3. Professional author email

Recommended address:

```txt
hello@jajacobsauthor.com
```

Use `jennifer@jajacobsauthor.com` if the client wants the email to feel more personal.

### Option A: Zoho Mail, free tier preferred

1. Go to Zoho Mail and choose the free/custom domain email option if it is available for the account.
2. Add `jajacobsauthor.com` as the domain.
3. Verify domain ownership using the TXT or CNAME record Zoho gives you.
4. Create the mailbox, for example `hello@jajacobsauthor.com`.
5. Add Zoho MX records at the DNS provider. For Zoho's US data center, these are typically:

| Type | Host | Value | Priority |
| --- | --- | --- | --- |
| MX | @ | mx.zoho.com | 10 |
| MX | @ | mx2.zoho.com | 20 |
| MX | @ | mx3.zoho.com | 50 |

Use the exact MX values Zoho shows in the admin console if they differ.

6. Add Zoho SPF as one TXT record at the root:

```txt
v=spf1 include:zohomail.com ~all
```

7. In Zoho Admin Console, generate and add the DKIM TXT record.
8. Add a basic DMARC TXT record:

| Type | Host | Value |
| --- | --- | --- |
| TXT | _dmarc | v=DMARC1; p=none; rua=mailto:hello@jajacobsauthor.com |

9. Send a test email from the new mailbox to Gmail and reply back to confirm both sending and receiving.

### Option B: Google Workspace

Google Workspace is paid, but it is the simplest Gmail-style admin experience.

1. Sign up for Google Workspace.
2. Add `jajacobsauthor.com`.
3. Verify domain ownership with the TXT record Google provides.
4. Create the mailbox, for example `hello@jajacobsauthor.com`.
5. Remove any old/conflicting MX records.
6. Add Google's current MX record:

| Type | Host | Value | Priority |
| --- | --- | --- | --- |
| MX | @ | smtp.google.com | 1 |

7. In Google Admin, activate Gmail for the domain.
8. Add SPF/DKIM/DMARC from the Google Admin setup prompts.
9. Test sending and receiving.

Use either Zoho or Google Workspace, not both. Only one email provider should control the domain's MX records.

## 4. Use the author email in Mailchimp

After `hello@jajacobsauthor.com` or `jennifer@jajacobsauthor.com` is receiving email:

1. In Mailchimp, open Account & billing > Domains.
2. Verify the author email/domain by receiving and clicking the verification email.
3. Start domain authentication for `jajacobsauthor.com`.
4. Use Mailchimp's automated Entri setup if the DNS provider is supported, or manually add the DNS records Mailchimp gives you.
5. Manual Mailchimp authentication usually gives 2 CNAME records for DKIM and 1 TXT record for DMARC. Copy the exact host and value Mailchimp shows.
6. Wait for Mailchimp to mark the domain authenticated.
7. Go to Audience > Audience settings.
8. Update the default From name to `J. A. Jacobs`.
9. Update the default From email to the new author email address.
10. Update any existing campaign drafts manually, because audience default changes usually only affect newly created campaigns.

## 5. Final verification checklist

- `https://jajacobsauthor.com` loads the site.
- `https://www.jajacobsauthor.com` redirects to the same site.
- GitHub Pages shows Enforce HTTPS enabled.
- The newsletter form accepts a real email and the subscriber appears in Mailchimp.
- The author mailbox can send and receive email.
- Mailchimp shows the domain as verified/authenticated.
- New Mailchimp campaigns send from `J. A. Jacobs <hello@jajacobsauthor.com>` or the chosen author address.
