function qs(name) {
  const p = new URLSearchParams(window.location.search);
  return p.get(name);
}

function setPreContent(container, text, hideId) {
  if (!container) return;
  if (window.LaphedusUI?.renderFormattedDocument) {
    window.LaphedusUI.renderFormattedDocument(container, text);
  } else {
    const pre = document.createElement('pre');
    // Use textContent to preserve original text exactly and prevent HTML injection
    pre.textContent = text;
    container.innerHTML = '';
    container.appendChild(pre);
  }
  if (hideId) {
    const def = document.getElementById(hideId);
    if (def) def.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const rawApp = qs('app');
  const app = window.LaphedusUI?.normalizeAppSlug ? window.LaphedusUI.normalizeAppSlug(rawApp) : rawApp;
  const appNameEl = document.getElementById('appName');
  const backEl = document.getElementById('backToApp');
  const isPrivacy = /privacy(\.html)?$/.test(window.location.pathname);
  const isTerms = /terms(\.html)?$/.test(window.location.pathname);
  const isSupport = /support(\.html)?$/.test(window.location.pathname);
  const isDeletion = /account-deletion(\.html)?$/.test(window.location.pathname);
  const contentEl = document.getElementById('policyContent');

  if (appNameEl) {
    appNameEl.textContent = app ? (window.LaphedusUI?.APP_DISPLAY_NAMES?.[app] || app) : 'General';
  }
  if (backEl) {
    backEl.href = app ? `app.html?slug=${encodeURIComponent(app)}` : 'index.html';
  }

  // Terms are rendered separately; privacy, support and deletion remain unchanged.
  if (isTerms) return;

  if (app === 'kayfe' && contentEl) {
    if (isPrivacy) {
      document.title = 'Privacy Policy | Kayfe - Laphedus';
      const kayfePrivacy = `Introduction
Welcome to Kayfe. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your personal data when you use our app and informs you about your privacy rights.

Data We Collect
We may collect, use, store, and transfer different kinds of personal data about you:

    Identity Data: includes username, password, and profile information.
    Contact Data: includes email address.
    Technical Data: includes device information, IP address, login data, and other technology identifiers on the devices you use to access our app.
    Usage Data: includes information about how you use our app.

How We Use Your Data
We use your data for the following purposes:

    To provide and manage your account
    To provide our fortune reading services
    To improve our app and services
    To communicate with you about updates or changes
    To maintain the security of our app

Data Security
We apply appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed without authorization. Access to personal data is limited to employees, agents, contractors, and third parties who need to know it.

Your Rights
Under certain circumstances, you may have rights under data protection laws regarding your personal data:

    Request access to your personal data
    Request correction of your personal data
    Request deletion of your personal data
    Object to processing of your personal data
    Request restriction of processing
    Request transfer of your personal data
    Withdraw your consent

Changes to This Privacy Policy
We may update this privacy policy from time to time. We will notify you of changes by publishing the new privacy policy on this page and updating the "Last Updated" date.

Contact Us
If you have questions about this privacy policy or our privacy practices, please contact us:
Email: laphedusapp@gmail.com`;
      setPreContent(contentEl, kayfePrivacy, 'defaultPrivacy');
      if (appNameEl) appNameEl.textContent = 'Kayfe';
    }

    if (isDeletion) {
      document.title = 'Account Deletion | Kayfe - Laphedus';
      const kayfeDeletion = `This page explains how to delete your account from the Kayfe application.

Follow these steps to delete your account:

    Open the Kayfe app and log in to your account
    Go to your Profile page (tap the profile icon in the bottom right corner)
    Tap on "Settings"
    Scroll down and tap on "Delete Account" at the bottom of the page
    Confirm by selecting "Yes, Delete My Account" in the confirmation dialog

When your account is deleted:

    All your personal data will be removed from our system
    Your profile information will be anonymized
    You will no longer be able to log in to the app
    Your saved fortune history and other content will be deleted

Note:

    Deleting your account is an irreversible action. After deletion, you won't be able to access your data.
    If you just want to stop using the app, you can simply uninstall it from your device instead of deleting your account.

Need help?
If you have any questions or issues with the account deletion process, please email us at laphedusapp@gmail.com.`;
      setPreContent(contentEl, kayfeDeletion, 'defaultDeletion');
      if (appNameEl) appNameEl.textContent = 'Kayfe';
    }
  }

  if (app === 'nowa4' && contentEl) {
    if (isPrivacy) {
      document.title = 'Privacy Policy | Nowa4 - Laphedus';
      const nowa4Privacy = `Overview
This privacy policy explains what data the app collects, how it is used, and the controls you have. The app focuses on image generation features and token-based usage.

Information We Collect

    To provide and improve our services, we collect the following types of information:
    
    Information You Provide Directly:
    - Account Information: When you sign in with Google, we receive your name, email address, and profile picture. We use this to create and manage your account, and we store this information securely using Supabase Authentication. Your unique user ID (Supabase Auth UID) is used to associate your data with your account.
    - Prompt History: The text prompts you enter for image generation are saved to your account to provide you with a history of your creations. This data is stored in our Supabase database and is only accessible by you.
    
    Information We Collect Automatically:
    - Usage and Transaction Data: We track your token balance and transaction history to manage your use of the image generation service. This is stored in our Supabase database, linked to your user ID.
    - Local Data: For a faster and smoother experience, we store some data on your device, including your token balance, history sync flags (in secure storage), and a cached version of your prompt history (history_cache.json).
    - Diagnostics and Analytics (Optional): If you opt-in, we collect anonymous crash reports and usage analytics to help us identify and fix bugs, and to understand how our app is used. This data is aggregated and does not personally identify you.

How We Use Your Information

    We use the information we collect for the following purposes:
    - To Provide and Maintain the Service: We use your account information, prompts, and token data to operate the core functionalities of the app, such as generating images and managing your account.
    - To Personalize Your Experience: Your prompt history allows you to revisit and reuse your past creations.
    - To Improve Our App: By analyzing optional, anonymous usage data and crash reports, we can identify areas for improvement and enhance the stability and performance of the app.
    - For Security and Transparency: Token transaction logs provide a clear and transparent history of your usage. We implement security measures like Row Level Security in our database to protect your data.

Data Sharing and Third Parties

    We do not sell your personal data. We only share your information with the following third-party services to provide and improve our app. We encourage you to review their privacy policies.
    
    Supabase:
    We use Supabase for our backend, including database storage and authentication. All your account data, prompt history, and token information are stored here. https://supabase.com/privacy
    
    Google Sign-In:
    We use Google Sign-In for account authentication. Google handles your login credentials. https://policies.google.com/privacy
    
    Image Generation API:
    We use a third-party API to generate images from your prompts. Your prompts are sent to this service for processing.
    
    In-App Purchases:
    All in-app purchases are processed securely by the Google Play Store. We do not handle or store your payment information. https://play.google.com/about/play-terms/

Your Rights and Controls

    You have control over your personal data. The app provides the following options in the Settings screen:
    
    Access and Export Your Data:
    You can view your prompt history within the app and export it, along with your token transaction logs, as a JSON file.
    
    Correct Your Data:
    You can update your basic profile information through your Google account.
    
    Delete Your Data:
    - Clear Prompt History: You can delete your entire prompt history from our servers at any time.
    - Delete Account: You can permanently delete your account. This action will erase all your data from our servers, including your account information, prompt history, and token balance. This action is irreversible and we cannot recover your data once it is deleted.

Data Security and Retention

    We implement technical safeguards such as Row Level Security in our database to protect account data. When you delete your account, it is deactivated immediately and personal data is permanently removed within 30 days, while backup systems may retain encrypted snapshots for up to 90 days for technical recovery before automatic expiry.

Children's Privacy

    Nowa4 is not directed to children under the age of 13. We do not knowingly collect personal data from children under 13.

Changes to This Privacy Policy

    We may update this privacy policy from time to time. Changes will be published on this page.

Contact Us

    If you have questions about this privacy policy or data requests:
    Developer: Laphedus
    Email: laphedusapp@gmail.com`;
      setPreContent(contentEl, nowa4Privacy, 'defaultPrivacy');
      if (appNameEl) appNameEl.textContent = 'Nowa4';
    }
    if (isDeletion) {
      document.title = 'Account Deletion | Nowa4 - Laphedus';
      const nowa4Deletion = `⚠️
Important Warning
Account deletion is permanent and irreversible. All your data will be permanently lost.

What Gets Deleted

    When you delete your Nowa4 account, the following data will be permanently removed from our servers:
    • Account Information: Your name, email address, and profile picture associated with your Google account
    • Prompt History: All text prompts you've entered for image generation
    • Generated Images: All images created through the app (if stored on our servers)
    • Token Balance: Your current credit balance and transaction history
    • App Settings: Your preferences and customizations within the app
    • Usage Data: Your app usage patterns and analytics data (if opted-in)

Before You Delete

    Export Your Data: Before deleting your account, you can export your prompt history and transaction logs as a JSON file through the app's Settings screen.
    Use Remaining Credits: Any unused credits in your account will be lost. Make sure to use them before deletion.
    Save Your Images: Download any generated images you want to keep to your device's gallery.
    Consider Alternatives: Instead of full account deletion, you can clear your prompt history while keeping your account active.

How to Delete Your Account

    Method 1: Through the App
    
        Open the Nowa4 app on your device
        Go to Settings (gear icon)
        Click on the Account section and open the page.
        Find the "Delete Account" button.
        Read the warning carefully
        Confirm your decision by typing "DELETE" when prompted
        Your account will be scheduled for deletion within 30 days
    
    
    Method 2: Email Request
    
        Send an email to laphedusapp@gmail.com
        Use the subject line: "Account Deletion Request"
        Include your registered email address in the message
        We will process your request within 48 hours
        You will receive a confirmation email once deletion is complete
    
Deletion Timeline

    Immediate: Your account will be deactivated and you won't be able to sign in
    Within 30 days: All your personal data will be permanently deleted from our servers
    Anonymized data: Some anonymized usage statistics may be retained for app improvement purposes, but these cannot be linked back to you
    Backup systems: Data may persist in backup systems for up to 90 days for technical reasons, but will not be accessible or used

After Deletion

    No Recovery: Once deleted, your account and data cannot be recovered
    New Account: You can create a new account anytime, but it will start fresh with no previous data
    In-App Purchases: Previous purchases cannot be restored to a new account
    Google Account: Your Google account remains unaffected - only your Nowa4 app data is deleted`;
      setPreContent(contentEl, nowa4Deletion, 'defaultDeletion');
      if (appNameEl) appNameEl.textContent = 'Nowa4';
    }
  }

  if (app === 'dinamik-ada' && contentEl) {
    if (isPrivacy) {
      document.title = 'Privacy Policy | Dynamic Pill';
      const dynamicPillPrivacy = `Dynamic Pill Privacy Policy
Last updated: 21.05.2026

Dynamic Pill is a helper app that places a capsule-like interface at the top of Android devices and shows features such as media, notifications, connection status, battery, lock state, gestures, and selected quick controls. This policy explains which data the app may process on-device, which data stays local, and in which limited cases third-party payment and analytics infrastructure may be contacted.

1. Information That May Be Processed

The app may process the following categories of information on your device so its features can work:

- accessibility service status, overlay permission status, and notification access status
- media session details such as playback state, app package, media title, and album artwork
- on-device states such as battery, charging, Bluetooth, Wi-Fi, hotspot, airplane mode, and sound mode
- lock screen and device unlock state information
- language, theme, appearance, calibration, gesture, module, and premium preferences selected by the user
- when notification-based features are enabled, selected notification fields such as package name, title, text, and time
- app names, package names, and icons of installed apps for gestures, shortcuts, and notification filters
- limited technical information required for premium purchase, restore, and entitlement verification flows
- analytics events focused on product measurement such as app opens, screen views, onboarding progress, permission completion, and purchase flow events

This data is used to update the capsule interface, show selected events correctly, preserve user settings, determine premium status, and understand app usage at an aggregated analytics level.

2. Data Not Collected or Targeted

- the app does not require a user account
- it does not create advertising profiles
- it does not share data with third-party ad networks
- it does not keep location history
- it does not collect contact lists, photo galleries, or messaging databases
- camera permission is not used to take photos or videos; flashlight control is only for the device torch hardware
- accessibility data is not used for advertising or marketing
- it is not designed to record typed text or transfer message contents to external servers
- notification text, message contents, and installed app lists are not sent to analytics for profiling

3. How Data Is Used

- to show and position the top capsule interface
- to distinguish media, notification, timer, voice recording, connection, and battery events
- to visualize selected notifications or time-based states in the capsule
- to run user-selected apps and actions for gestures and shortcuts
- to manage helper system controls such as volume, brightness, and flashlight
- to keep settings and premium access status on the device
- to perform purchase, restore, and entitlement checks
- to measure which screens and steps are used so the app experience can be improved

4. Where Data Is Stored

App settings, modules, filters, and most status information are mainly stored on the device. Data such as notification title/text, app list, and icons is processed locally while the feature runs and is not stored under a separate cloud account by default.

When premium purchase or restore is used, third-party infrastructure such as Google Play Billing and RevenueCat may process limited technical data required for the purchase flow. The app also uses Firebase Analytics to process limited technical identifiers and event data for app opens, screen views, onboarding, permission completion, and purchase events. Notification text, typed content, contact lists, and installed app lists are not sent to analytics.

5. Permissions and Reasons

- Accessibility permission: used to keep the capsule stable above other apps, react to certain window and foreground changes, and enable selected gestures or helper system actions.
- Display over other apps permission: required so the capsule interface can appear above other apps.
- Notification access: used when notification-based modules such as media controls, selected notification display, timer, and voice recording are enabled. This access may be needed to interpret the relevant notification package name, title, or text on the device.
- Bluetooth and connection-related permissions: may be required for features that show Bluetooth connection events.
- Modify system settings permission: used to manage system controls such as brightness from Dynamic Pill. It is not required for basic use.
- Camera / torch hardware access: may be required to turn the flashlight on/off or adjust its level from the capsule. This access is not used to take photos or videos.
- Battery optimization setting: not required, but may be suggested on some devices so the app can work more reliably in the background.
- Purchase and premium infrastructure: when premium purchase, restore, or premium status refresh is used, the app may contact RevenueCat and the related in-app purchase infrastructure to verify purchases and entitlements.

6. Sharing With Third Parties

The app does not sell, rent, or share user data with third parties for advertising purposes.

However, the app may use Google Play Billing, RevenueCat, Firebase Analytics, or similar service providers for premium purchases, entitlement checks, and app usage measurement. These services may process limited technical data required for those flows.

Data is not shared except for legal obligations, court orders, or official authority requests. In such cases, only the necessary information is provided.

7. Data Security

The app prioritizes keeping processed preference and status data on the device whenever possible. Permissions are requested only for relevant features, and each module can be enabled or disabled by the user. Data transferred to third-party services is expected to be encrypted in transit. However, no software, storage, or transmission method can guarantee one hundred percent security.

8. Account Deletion and Data Deletion

Dynamic Pill does not currently require a user account. For this reason, there is no classic in-app account deletion screen.

- to delete local data, you can uninstall the app from your device or clear the app data
- premium purchase records may be retained by the relevant store or subscription infrastructure
- analytics event records may be processed by Firebase Analytics according to its service operation
- for data deletion or privacy requests, you can write to laphedusapp@gmail.com

9. Children's Privacy

The app is not designed as a service directed specifically to children. It does not knowingly aim to collect personal data from children.

10. Changes

This privacy policy may be updated from time to time. Important changes may be announced through in-app information, release notes, or the current link.

11. Contact

For privacy or data deletion requests:

- Brand: LaphedusApp
- Developer: Laphedus
- Email: laphedusapp@gmail.com`;
      setPreContent(contentEl, dynamicPillPrivacy, 'defaultPrivacy');
      if (appNameEl) appNameEl.textContent = 'Dynamic Pill';
    }

    if (isDeletion) {
      document.title = 'Data Deletion | Dynamic Pill - Laphedus';
      const dynamicPillDeletion = `Dynamic Pill - Data Deletion
Last updated: 11 November 2026
Developer: Laphedus (laphedusapp@gmail.com)

Dynamic Pill does not require a user account and does not store your notification text, typed content, or installed app lists in a developer cloud database.

1. Deleting Local App Data
- Open Android Settings > Apps > Dynamic Pill > Storage & cache > Clear storage (or Clear data), or uninstall the app to remove all local capsule settings, module preferences, and filters.

2. Third-Party Billing & Analytics Records
- Purchase records and active entitlements handled via Google Play Billing and RevenueCat are managed by those providers under their retention practices; uninstalling the app does not cancel a store subscription or erase Google Play billing history.
- Limited product analytics events processed by Firebase Analytics follow Google/Firebase retention rules.

3. Support & Privacy Requests
- For privacy or data deletion assistance, email laphedusapp@gmail.com.`;
      setPreContent(contentEl, dynamicPillDeletion, 'defaultDeletion');
      if (appNameEl) appNameEl.textContent = 'Dynamic Pill';
    }
  }

  if (app === 'stamper' && contentEl) {
    if (isPrivacy) {
      document.title = 'Privacy Policy | Stamper';
      const stamperPrivacy = `Stamper Privacy Policy
Last updated: 20.04.2026

Stamper - My Stamp Album is a local-first Android app that lets users create personal digital stamps from their photos and organize them in albums. This policy explains which data the app processes, how that data is used, and in which cases limited technical information may be shared with third-party services.

1. Information That May Be Processed

Depending on how you use the app, the following categories of information may be processed on your device:

- photos taken with the camera or selected from the gallery
- stamp metadata such as stamp title, note, album assignment, creation time, and selected style preferences
- album information created by the user
- backup files created locally and archive files selected during restore
- limited technical information required for premium purchase, restore, and entitlement verification flows
- location-related tags or metadata if the optional location feature is enabled

2. How Data Is Used

This information is used to:

- edit and save a photo in stamp format
- organize stamps in albums
- store notes, titles, and other local metadata
- create and restore backups
- determine whether the user has access to premium features

3. Where Data Is Stored

Stamper stores content mainly on the device.

- stamp images are kept in the app's local storage area
- album and stamp metadata is stored in local files on the device
- backups may be written to local folders selected by the user or created by the app

You do not need to create a mandatory account to use the app.

4. Purchases and Premium Features

Stamper may use third-party infrastructure such as Google Play Billing and RevenueCat to manage premium features. These services may process limited technical data required for purchase flows, purchase restoration, and premium entitlement verification.

This may include technical data such as:

- purchase status
- transaction or product identifiers
- app and device context information required for entitlement verification

Stamper does not directly collect or store payment card information. Payments are handled through the relevant store and payment infrastructure.

5. Permissions and Reasons

- Camera permission: used to create a stamp by taking a new photo
- Photo or media access: used to select images from the gallery, export content, or handle file operations
- Location permission: may be used to add location-based metadata only if the related feature is enabled

Permissions are requested only when the related feature is used.

6. Data Sharing

Stamper does not send the user's photo and album content to the developer's own servers in the default usage flow.

Personal data is not sold or rented for advertising purposes.

However, in cases such as premium purchase or restore, Google Play Billing, RevenueCat, or similar service providers may process required technical data. Limited data sharing may also be required due to legal obligations.

7. Backups and User-Controlled Sharing

When the user creates, exports, or shares a backup file, that action is initiated by the user. The user is responsible for how exported files are later stored or shared.

8. Data Retention and Deletion

Local data may remain on your device until you delete it or uninstall the app.

- you can delete stamps and albums inside the app
- you can remove local data by uninstalling the app or clearing app data
- purchase records may be retained by the relevant store or subscription provider according to their own policies

9. Children's Privacy

Stamper is not designed as a service directed specifically to children. It does not knowingly aim to collect personal data from children.

10. Security

The app is designed with a local-first structure and aims to keep data on the device whenever possible. However, no storage or transmission method can guarantee one hundred percent security.

11. Changes

This privacy policy may be updated from time to time. The current version is published on this page.

12. Contact

For privacy or data requests:

- Brand: LaphedusApp
- Developer: Laphedus
- Email: laphedusapp@gmail.com`;
      setPreContent(contentEl, stamperPrivacy, 'defaultPrivacy');
      if (appNameEl) appNameEl.textContent = 'Stamper';
    }

    if (isDeletion) {
      document.title = 'Data Deletion | Stamper - Laphedus';
      const stamperDeletion = `Stamper - Data Deletion
Last updated: 11 November 2026
Developer: Laphedus (laphedusapp@gmail.com)

Stamper does not require a user account and keeps your photos, stamps, and albums locally on your device.

1. Deleting Local Stamps, Albums & App Data
- You can delete individual stamps and albums directly inside the app.
- To remove all local Stamper data, uninstall the app or clear its storage in Android Settings > Apps > Stamper > Storage & cache > Clear storage.
- Any backup files you manually exported to external folders or shared elsewhere must be deleted separately from those locations.

2. Purchase Records
- Store purchase and entitlement records handled by Google Play Billing and RevenueCat remain subject to those providers' policies.

3. Contact
- For privacy or data deletion assistance, email laphedusapp@gmail.com.`;
      setPreContent(contentEl, stamperDeletion, 'defaultDeletion');
      if (appNameEl) appNameEl.textContent = 'Stamper';
    }
  }

  if (app === 'expensly' && contentEl) {
    if (isPrivacy) {
      document.title = 'Privacy Policy | Expensly - Laphedus';
      const expenslyPrivacy = `Privacy Policy - Expensly
Last updated: 11 November 2026
Developer: Laphedus (laphedusapp@gmail.com)

Thank you for using Expensly (Expense Tracker). Your privacy matters to us. This privacy policy explains what information may be processed on your device or through third-party SDKs when you use Expensly, and how that data is controlled.

1. Overview & Local-First Architecture
Expensly is a local-first personal finance, budget, and savings tracker. You do not need to create a user account, and your expense, income, account, budget, goal, and recurring schedule records are stored locally on your device rather than uploaded to a Laphedus cloud server.

2. Information We Collect or Process
- Financial Records You Enter: Expense and income transactions, categories, accounts, transfer records, monthly and category budgets, savings goals, recurring plans, optional notes, and optional receipt or item images you select from your device gallery.
- App Settings & Preferences: Selected display language (across 8 supported languages), theme, currency/formatting preferences, local notification schedules, and home screen widget summary values stored locally on your device.
- Advertising Data (Free Tier): On the free ad-funded tier, Google Mobile Ads (AdMob) may process technical data such as the Google Advertising ID, IP address / approximate location, device and app information, diagnostics, and ad interaction signals according to Google's privacy policy. Ad loading is disabled when Expensly Premium is active.
- In-App Purchases & Entitlement Data: Expensly offers an optional one-time non-consumable purchase (Expensly Premium) and purchase restoration processed through Google Play Billing and RevenueCat. When initializing purchase status, upgrading, or restoring purchases, RevenueCat and Google Play process an anonymous App User ID, product/entitlement identifiers, purchase tokens or receipts, purchase timestamps, and limited device/app version context required to verify and restore your Premium access. Laphedus does not receive or store full payment card credentials.

3. How Data Is Used
- Provide core expense, income, account, budget, recurring payment, and savings-goal tracking and analytics on your device
- Keep Android home screen widgets updated with your daily and monthly summaries and quick-add shortcuts
- Schedule strictly on-device local notifications for daily summaries, weekly summaries, budget alerts, savings target progress, and upcoming recurring payments (without remote push notification servers)
- Create manual JSON backups, restore backups, and export CSV reports when initiated by you
- Serve ads on the free tier via Google Mobile Ads
- Process optional Expensly Premium purchases, verify entitlement status, prevent fraud, and support Restore Purchases via Google Play Billing and RevenueCat

4. Device Permissions & Optional Access
- Notifications (POST_NOTIFICATIONS on Android 13+): Optional permission used only for on-device reminder scheduling.
- Gallery / Photo Access: Requested only if you choose to attach an image from your gallery to a transaction. Selected image references stay local on your device and are not uploaded to Laphedus servers.
- Document / File Access (Storage Access Framework / Share Sheet): Accessed only when you manually export or import a JSON backup or CSV file. You control where exported files are saved or shared.

5. Third-Party Services & Data Sharing
We do not sell your personal financial records or upload them for data brokering. Limited technical data may be processed by the following third-party providers to deliver ads and in-app purchase verification:
- Google Mobile Ads (AdMob): Used in the free tier for banner and interstitial advertisements. Privacy Policy: https://policies.google.com/privacy
- Google Play Billing: Processes optional one-time Premium payments under Google Play terms. Privacy Policy: https://policies.google.com/privacy
- RevenueCat: Manages purchase validation, anonymous App User ID entitlement mapping, and Restore Purchases functionality. Privacy Policy: https://www.revenuecat.com/privacy
- Legal Requirements: Information may be disclosed if strictly required to comply with applicable law, valid court orders, or official requests.

6. Data Retention & Deletion Controls
- Local Data: Financial records, preferences, and widget state remain on your device until you clear/reset data inside the app, clear Expensly storage in Android Settings, or uninstall the app.
- Exported Backups & CSVs: JSON backup and CSV files saved to your device storage or shared to third-party storage remain under your control and must be deleted manually from those locations.
- Ad Personalization & ID Controls: You can reset or delete your Android Advertising ID or adjust ad personalization settings in Android Settings > Privacy > Ads.
- Purchase Records: Google Play and RevenueCat retain purchase receipts and entitlement records per their operational and legal obligations so you can restore non-consumable purchases. Uninstalling the app removes local records but does not erase store transaction history.

7. Data Security
Keeping financial records locally minimizes remote exposure. Third-party SDK communications use encrypted transport (HTTPS/TLS). Please protect your device with a screen lock and keep exported backup files secure, as no storage method is 100% immune to device loss or unauthorized device access.

8. Children's Privacy
Expensly is not directed to children under the age of 13 (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect personal information from children.

9. Changes to This Privacy Policy
We may update this privacy policy from time to time. Updated versions are published on this page with a revised "Last updated" date.

10. Contact Us
If you have questions about this privacy policy or data requests, please contact:
Developer: Laphedus
Email: laphedusapp@gmail.com`;
      setPreContent(contentEl, expenslyPrivacy, 'defaultPrivacy');
      if (appNameEl) appNameEl.textContent = 'Expensly';
    }

    if (isSupport) {
      document.title = 'Support | Expensly - Laphedus';
      const expenslySupport = `Expensly - Customer Care & Support
Last updated: 11 November 2026
Developer: Laphedus (laphedusapp@gmail.com)

Thank you for using Expensly. Here is quick guidance on common features and how to reach support.

1. Common Help Topics
- Language Selection: Switch between 8 supported languages (English, Turkish, German, Spanish, French, Indonesian, Italian, Portuguese) in Settings.
- Backups & CSV Export: Use Settings > Data and backup to export or import a JSON backup, or export transactions and recurring plans as CSV. Store your backup files safely before changing devices.
- Restoring Expensly Premium: Make sure you are signed into Android with the same Google Play account used for your purchase, then tap Restore Purchases on the Premium screen.
- Home Screen Widgets: Add the daily or monthly Expensly summary widget from your Android launcher and open the app if widget data needs a manual refresh.
- Local Notifications: Enable notification permission in Android Settings > Apps > Expensly if daily/weekly summaries, budget alerts, or recurring payment reminders do not appear.

2. Direct Contact
Email laphedusapp@gmail.com with:
- Your Expensly app version
- Android version and device model
- Screenshots or steps to reproduce the issue
- Purchase order ID (for Premium purchase questions; never send full card details)`;
      setPreContent(contentEl, expenslySupport, 'defaultSupport');
      if (appNameEl) appNameEl.textContent = 'Expensly';
    }

    if (isDeletion) {
      document.title = 'Data Deletion | Expensly - Laphedus';
      const expenslyDeletion = `Expensly - Data Deletion
Last updated: 11 November 2026
Developer: Laphedus (laphedusapp@gmail.com)

Expensly operates without user accounts or developer-hosted cloud databases. Your financial records stay on your device.

1. Deleting All Local Financial Data
- In the App: Use the reset/clear data controls in Settings to remove stored financial entries, budgets, and settings.
- Via Android Settings: Go to Android Settings > Apps > Expensly > Storage & cache > Clear storage (or Clear data), or uninstall Expensly.

2. Deleting Exported Backups & Attached Files
- Any JSON backup or CSV export file you created, as well as original photos in your device gallery, remain wherever you saved them and must be deleted manually from those folders.

3. Advertising & Purchase Records
- You can reset your Advertising ID in Android Settings > Privacy > Ads.
- Google Play Billing and RevenueCat retain purchase/entitlement history required to verify and restore your one-time Expensly Premium license under their respective policies.

4. Contact
- For privacy or data deletion assistance, contact laphedusapp@gmail.com.`;
      setPreContent(contentEl, expenslyDeletion, 'defaultDeletion');
      if (appNameEl) appNameEl.textContent = 'Expensly';
    }
  }

  if (app === 'taptap' && contentEl) {
    if (isPrivacy) {
      document.title = 'Privacy Policy | TapTap - Laphedus';
      const taptapPrivacy = `Privacy Policy - TapTap - Score
Last updated: 11 November 2026
Developer: Laphedus (laphedusapp@gmail.com)

Thank you for using TapTap - Score. This page summarizes how data is handled in TapTap in line with its Terms of Use.

1. Score Tracking & User-Entered Content
- TapTap is built as a lightweight score-tracking tool. You enter and manage match or game scores directly on your device.
- No account registration is required under current app policies.

2. Sharing Scores & Respecting Others
- When you choose to share scores or participant names using your device's sharing options, that sharing is initiated by you. Please ensure you have permission before sharing information about other people.

3. Data Retention & Deletion
- Score entries stored locally on your device remain until you clear them in the app, clear app storage in Android Settings, or uninstall TapTap.

4. Children's Privacy & Contact
- TapTap is not designed to knowingly collect personal data from children under 13.
- For privacy, support, or data questions, email laphedusapp@gmail.com (please identify TapTap and its version, and never send passwords or payment details).`;
      setPreContent(contentEl, taptapPrivacy, 'defaultPrivacy');
      if (appNameEl) appNameEl.textContent = 'TapTap - Score';
    }

    if (isSupport) {
      document.title = 'Support | TapTap - Laphedus';
      const taptapSupport = `TapTap - Score Support
Last updated: 11 November 2026
Developer: Laphedus (laphedusapp@gmail.com)

For bug reports, score-tracking questions, or feedback about TapTap - Score, please email laphedusapp@gmail.com and include:
- The TapTap app version
- Your device model and OS version
- A brief description of what happened`;
      setPreContent(contentEl, taptapSupport, 'defaultSupport');
      if (appNameEl) appNameEl.textContent = 'TapTap - Score';
    }

    if (isDeletion) {
      document.title = 'Data Deletion | TapTap - Laphedus';
      const taptapDeletion = `TapTap - Score Data Deletion
Last updated: 11 November 2026
Developer: Laphedus (laphedusapp@gmail.com)

TapTap - Score does not operate a developer account system under its current policies. To remove locally saved scores and app preferences, clear the app's storage in device Settings or uninstall TapTap. For additional questions, contact laphedusapp@gmail.com.`;
      setPreContent(contentEl, taptapDeletion, 'defaultDeletion');
      if (appNameEl) appNameEl.textContent = 'TapTap - Score';
    }
  }

  if (app === 'breathe-calm' && contentEl) {
    if (appNameEl) appNameEl.textContent = 'Breathe & Calm';

    if (isPrivacy) {
      document.title = 'Privacy Policy | Breathe & Calm - Laphedus';
      const breathePrivacy = `Breathe & Calm Privacy Policy
Last Updated: September 19, 2026
Developer: Laphedus (laphedusapp@gmail.com)

Your Privacy is Sacred.
In Breathe & Calm, your mental well-being, personal reflections, and stress logs belong solely to you. The app is built on strict "offline-first" principles: no personal data ever leaves your device.

1. Offline-First & Local-Only Storage
Your journal reflections, stress logs, breathing exercise history, and app preferences are stored exclusively on your device using Apple SwiftData. They are never transmitted to remote servers, external cloud databases, or third-party storage.

2. Zero Analytics, No Ads & No Tracking
There are no third-party ad networks (such as Google AdMob or Meta Audience Network), user profiling frameworks, or hidden analytics trackers in this app. Under Apple's App Tracking Transparency (ATT) guidelines, we never track you across apps or websites.

3. Biometric Hardware Security (Face ID / Touch ID)
When the App Lock feature is enabled, biometric verification occurs entirely within Apple's Secure Enclave hardware on your device. The developer (Laphedus) has zero access to your biometric samples, facial scans, fingerprints, or device passcode.

4. Local Notifications & On-Device Scheduling
Mindfulness pauses and gentle check-in reminders are scheduled locally by your device's operating system (iOS UserNotifications). No push tokens, device IDs, or remote messaging servers are utilized.

5. In-App Subscriptions & Billing Privacy
Pro memberships and purchases are processed directly through Apple StoreKit. Your payment details and credit card credentials remain safely managed by Apple. The developer has zero access to your financial information.

6. Data Portability & Total Deletion (KVKK / GDPR)
You are the sole custodian of your data. You can export all entries at any time as a clean, human-readable JSON backup from Settings, or erase all history permanently and irreversibly with a single tap in Settings > Delete All Data.

7. Children's Privacy & Direct Contact
This app does not knowingly collect personal information from children under 13. If you have questions about this privacy policy or our local-first practices, contact the developer directly:
Developer: Laphedus
Email: laphedusapp@gmail.com`;
      setPreContent(contentEl, breathePrivacy, 'defaultPrivacy');
    }

    if (isSupport) {
      document.title = 'Support | Breathe & Calm - Laphedus';
      const breatheSupport = `Breathe & Calm Customer Care & Support

Thank you for using Breathe & Calm. We are committed to providing a calm, reliable, and respectful experience.

Common Inquiries & Assistance:
- Breathwork Guidance: How to customize tempo, vibration, and audio chimes in the Breathe tab.
- Data Backup & Export: How to export your journal as JSON via Settings > Data Management.
- Face ID / Biometric Lock: How to enable hardware biometric lock for your reflections.
- Subscriptions & Restores: Manage or restore Pro features directly via Apple ID Subscriptions.

Direct Contact:
For bug reports, feature requests, or technical support, contact the developer directly:
Developer: Laphedus
Email: laphedusapp@gmail.com

Please include your iOS version and iPhone model when reporting technical issues.`;
      setPreContent(contentEl, breatheSupport, 'defaultSupport');
    }

    if (isDeletion) {
      document.title = 'Data Deletion | Breathe & Calm - Laphedus';
      const breatheDeletion = `Breathe & Calm - Data Deletion & Privacy Sovereignty

Breathe & Calm operates on an offline-first architecture. We do not operate remote user accounts, cloud databases, or remote tracking servers.

Because your data is never uploaded to our servers, you have total, instant control over deletion directly on your device:

How to Erase All Data Instantly:
1. Open Breathe & Calm on your iPhone or iPad.
2. Tap the Settings icon (top right).
3. Scroll to the "Data Management & Privacy" section.
4. Tap "Delete All History & Data".
5. Confirm by tapping "Delete Everything".
All journal reflections, breath counters, and mood logs will be immediately and irreversibly purged from local device storage.

Alternatively, uninstalling the application from iOS will automatically purge all local SwiftData sandbox stores from your device.

Need Additional Verification?
If you have any questions regarding data privacy or erasure, please contact:
Email: laphedusapp@gmail.com`;
      setPreContent(contentEl, breatheDeletion, 'defaultDeletion');
    }
  }
});
