# Sastry Angara Career Website

Live site: `https://sastryangara.github.io`

## Purpose

The Resume Library is the official source for recruiters and hiring teams to download the latest approved version of each profile. Recruiters should use these files rather than older copies stored in email or local folders.

## Repository structure

```text
index.html
styles.css
script.js
resumes/
  Sastry-Angara-Program-Manager.pdf
  Sastry-Angara-Technical-Project-Manager.pdf
  Sastry-Angara-Scrum-Master.pdf
  Sastry-Angara-Business-Analyst.pdf
  Sastry-Angara-Data-BI-Reporting.pdf
  Sastry-Angara-Service-Delivery.pdf
```

## Initial setup

1. Create a folder named `resumes` in the GitHub repository.
2. Upload each approved PDF using the exact filename shown above.
3. Commit the files.
4. GitHub Pages will automatically update.

Do not publish a card until its corresponding PDF has been uploaded. A missing file will produce a 404 error.

## Replacing a resume with a newer version

1. Prepare the updated PDF.
2. Give it the same filename as the existing PDF.
3. Open the `resumes` folder in GitHub.
4. Replace the old file.
5. Commit the change.

Because the website link does not change, recruiters always receive the latest file.

## Adding a new profile category

1. Upload the new PDF into the `resumes` folder.
2. Open `script.js`.
3. Find the `resumeProfiles` list.
4. Copy an existing profile object.
5. Update `title`, `description`, `file`, and `updated`.
6. Commit the change.

Example:

```javascript
{
  title: "Data Governance",
  description: "Data governance, data quality, metadata, controls, stewardship, and regulatory reporting.",
  file: "resumes/Sastry-Angara-Data-Governance.pdf",
  updated: "Updated July 2026"
}
```

## Public access

This is a public GitHub Pages website. Every uploaded resume can be accessed by anyone with its URL.

Use recruiter-safe PDF versions. Do not include full home address, immigration document numbers, personal references, confidential client information, or sensitive personal identifiers.

## Recommended recruiter instruction

> Please download the latest role-aligned version of my resume from the Resume Library at https://sastryangara.github.io/#resumes rather than using an older saved copy.

## Updating the website

Edit files directly in GitHub and commit the changes. GitHub Pages automatically redeploys the site.
