Chrome Extension: Multi-Tool Suite

Overview

This Chrome Extension provides multiple productivity tools in one package, including:

Ad Blocker with Custom Filters: Block unwanted ads and create custom filtering rules.

Productivity Tracker: Track time spent on websites and visualize insights.

Smart Note-Taking Tool: Save notes specific to a webpage or globally.

Tab Manager: Automatically group tabs by category and save/restore sessions.

Features

1. Ad Blocker with Custom Filters

✅ Enable/Disable the ad blocker.

✅ Custom filtering: Add domains to block specific ads.

✅ View total blocked ads count.

2. Productivity Tracker

✅ Tracks time spent on each website.

✅ Displays data in a table and graphical format.

✅ Allows setting/resetting daily limits.

3. Smart Note-Taking Tool

✅ Save local notes (specific to the current webpage).

✅ Save global notes (accessible across all pages).

✅ Edit and remove notes easily.

4. Tab Manager

✅ Automatically groups open tabs into categories (e.g., Social Media, Work, News).

✅ Save and restore tab sessions.

Installation

1️⃣ Clone or Download the Repository

 git clone https://github.com/eswarpb/multi-features-chrome-extension.git
 cd multi-tool-chrome-extension

2️⃣ Install Dependencies

npm install

3️⃣ Build the Extension

npm run build

4️⃣ Load the Extension into Chrome

Open Chrome and navigate to chrome://extensions/

Enable Developer Mode (top-right corner).

Click Load Unpacked.

Select the build/ folder.

Usage Guide

📌 Using the Multi-Tool Dashboard

Once installed, click on the extension icon to open the popup. You will see buttons for each tool:

🛡️ Ad Blocker

📊 Productivity Tracker

📝 Smart Notes

🗂 Tab Manager

Click on any button to activate and use the corresponding tool.

🚀 Ad Blocker

Toggle the switch to enable or disable ad blocking.

Add custom domains to block specific ads.

View the number of ads blocked.

📊 Productivity Tracker

The tracker automatically records time spent on websites.

View data in a graph or table format.

Set daily limits and get alerts when exceeded.

📝 Smart Notes

Save notes specific to a webpage (local notes).

Save global notes accessible across all pages.

Edit or delete notes as needed.

🗂 Tab Manager

Automatically categorizes open tabs (e.g., Social Media, Work, Entertainment).

Save tab sessions for later use.

Restore saved sessions with one click.

Permissions

This extension requires the following permissions:

storage – To save user settings, notes, and ad-blocking rules.

tabs – To access open tabs for the Tab Manager.

scripting – To modify webpage content for ad-blocking.

host_permissions – To allow filtering across all websites.

