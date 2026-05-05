function qs(name) {
  const p = new URLSearchParams(window.location.search);
  return p.get(name);
}

function setPreContent(container, text, hideId) {
  if (!container) return;
  const pre = document.createElement('pre');
  // Use textContent to preserve original text exactly and prevent HTML injection
  pre.textContent = text;
  container.innerHTML = '';
  container.appendChild(pre);
  if (hideId) {
    const def = document.getElementById(hideId);
    if (def) def.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const app = qs('app');
  const appNameEl = document.getElementById('appName');
  const backEl = document.getElementById('backToApp');
  const isPrivacy = /privacy\.html$/.test(window.location.pathname);
  const isTerms = /terms\.html$/.test(window.location.pathname);
  const isSupport = /support\.html$/.test(window.location.pathname);
  const isDeletion = /account-deletion\.html$/.test(window.location.pathname);
  const contentEl = document.getElementById('policyContent');

  if (appNameEl) appNameEl.textContent = app ? app : 'General';
  if (backEl) {
    backEl.href = app ? `app.html?slug=${encodeURIComponent(app)}` : 'index.html';
  }

  if (app === 'kayfe' && contentEl) {
    if (isPrivacy) {
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
    We use Supabase for our backend, including database storage and authentication. All your account data, prompt history, and token information are stored here. Supabase Privacy Policy.
    
    Google Sign-In:
    We use Google Sign-In for account authentication. Google handles your login credentials. Google Privacy Policy.
    
    Image Generation API:
    We use a third-party API to generate images from your prompts. Your prompts are sent to this service for processing.
    
    In-App Purchases:
    All in-app purchases are processed securely by the Google Play Store. We do not handle or store your payment information. Google Play Terms of Service.

Your Rights and Controls

    You have control over your personal data. The app provides the following options in the Settings screen:
    
    Access and Export Your Data:
    You can view your prompt history within the app and export it, along with your token transaction logs, as a JSON file.
    
    Correct Your Data:
    You can update your basic profile information through your Google account.
    
    Delete Your Data:
    - Clear Prompt History: You can delete your entire prompt history from our servers at any time.
    - Delete Account: You can permanently delete your account. This action will erase all your data from our servers, including your account information, prompt history, and token balance. This action is irreversible and we cannot recover your data once it is deleted.`;
      setPreContent(contentEl, nowa4Privacy, 'defaultPrivacy');
      if (appNameEl) appNameEl.textContent = 'Nowa4';
    }
    if (isDeletion) {
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
        Find "Delete Account"button.
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
Last updated: 04.08.2026

Dynamic Pill is a helper app that places a capsule-like interface at the top of Android devices and shows features such as media, notifications, connection status, battery, lock state, gestures, and selected quick controls. This policy explains which data the app may process on-device, which data stays local, and in which limited cases third-party payment infrastructure may be contacted.

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

This data is used to update the capsule interface, show selected events correctly, preserve user settings, and determine premium status.

2. Data Not Collected or Targeted

- the app does not require a user account
- it does not create advertising profiles
- it does not share data with third-party ad networks
- it does not keep location history
- it does not collect contact lists, photo galleries, or messaging databases
- camera permission is not used to take photos or videos; flashlight control is only for the device torch hardware
- accessibility data is not used for advertising, analytics, or marketing
- it is not designed to record typed text or transfer message contents to external servers

3. How Data Is Used

- to show and position the top capsule interface
- to distinguish media, notification, timer, voice recording, connection, and battery events
- to visualize selected notifications or time-based states in the capsule
- to run user-selected apps and actions for gestures and shortcuts
- to manage helper system controls such as volume, brightness, and flashlight
- to keep settings and premium access status on the device
- to perform purchase, restore, and entitlement checks

4. Where Data Is Stored

App settings, modules, filters, and most status information are mainly stored on the device. Data such as notification title/text, app list, and icons is processed locally while the feature runs and is not stored under a separate cloud account by default.

When premium purchase or restore is used, third-party infrastructure such as Google Play Billing and RevenueCat may process limited technical data required for the purchase flow. If analytics, remote crash reporting, account sync, or cloud backup is added in the future, this policy will be updated.

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

However, the app may use Google Play Billing, RevenueCat, or similar providers for premium purchases and entitlement checks. These services may process limited technical data required for the purchase flow.

Data is not shared except for legal obligations, court orders, or official authority requests. In such cases, only the necessary information is provided.

7. Data Security

The app prioritizes keeping processed preference and status data on the device whenever possible. Permissions are requested only for relevant features, and each module can be enabled or disabled by the user. However, no software, storage, or transmission method can guarantee one hundred percent security.

8. Account Deletion and Data Deletion

Dynamic Pill does not currently require a user account. For this reason, there is no classic in-app account deletion screen.

- to delete local data, you can uninstall the app from your device or clear the app data
- premium purchase records may be retained by the relevant store or subscription infrastructure
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

    if (isTerms) {
      document.title = 'Terms of Use | Dynamic Pill';
      const dynamicPillTerms = `Dynamic Pill Terms of Use
Last updated: 04.08.2026

By downloading, installing, or using this app, you are deemed to accept the following terms.

1. Scope of the Service

Dynamic Pill is a helper app designed to show media, selected notifications, connection events, battery status, gestures, and certain helper system controls in a top capsule interface on Android devices.

The app may behave differently depending on device model, Android version, manufacturer interface, and permission status.

2. Permissions and System Behavior

If permissions such as accessibility, display over other apps, notification access, Bluetooth, or modify system settings are not granted, some modules may work in a limited way or may not work at all.

Notification-based modules may interpret selected notification fields on the device. Features related to gestures and app selection may list installed apps locally. When premium, purchase, or restore features are used, the app may communicate with the relevant payment and subscription infrastructure.

3. Acceptable Use

You must:

- not bypass the device's system security
- not misuse the app
- not use system gestures, shortcuts, quick settings, or similar controls in an unauthorized or harmful way
- not infringe third-party rights
- not use the app for unlawful purposes

4. Compatibility and Warranty Limit

- the same appearance is not guaranteed on all devices
- full compatibility with all manufacturer interfaces is not guaranteed
- background behavior is not guaranteed to be the same on every device
- lock screen, cutout, media, notification, and torch behavior may vary by device
- changes may occur due to system updates

5. Interruptions and Changes

The developer may change app features, remove some modules, add new modules, or optimize the app differently for certain devices.

6. Limitation of Liability

- uninterrupted operation is not guaranteed
- error-free operation is not guaranteed
- absolute fitness for a particular purpose is not guaranteed

To the extent permitted by law, the developer is not responsible for indirect damage, data loss, or unexpected system behavior that may occur on the user's device.

7. Intellectual Property

The app's design, brand, text, and related content belong to the developer or relevant rights holders. They may not be copied, distributed, or used commercially unless explicitly permitted.

8. Third-Party Components

The app may use third-party components such as Flutter, Android system APIs, Google Play Billing, RevenueCat, and other open-source libraries. These components may be subject to their own licenses, privacy policies, and terms of use.

9. Account and Payment Features

The app does not require a mandatory user account. However, it may support payment flows such as premium features, purchases, restores, or subscription status checks.

During these flows:

- pricing and purchase conditions are subject to the relevant store infrastructure
- premium access may be technically verified through third-party subscription services
- purchase features may not be available in the same way on every device or in every country
- the user is responsible for checking current prices and conditions in the store before purchasing

10. Account and Data Deletion

Because the app does not require a mandatory user account, there is no classic account closure flow. The user may uninstall the app, clear app data, or request data deletion through laphedusapp@gmail.com.

11. Termination of Use

The user may uninstall or stop using the app at any time. The developer also reserves the right to terminate or change certain app features.

12. Changes

These terms of use may be updated from time to time. The current text may be shared through the in-app screen, website, or store listing.

13. Contact

For questions about these terms:

- Brand: LaphedusApp
- Developer: Laphedus
- Email: laphedusapp@gmail.com`;
      setPreContent(contentEl, dynamicPillTerms, 'defaultTerms');
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
  }

  if (app === 'expensly' && contentEl) {
    if (isPrivacy) {
      const expenslyPrivacy = `Privacy Policy - Expensly
Last updated: 2026-05-05

Thank you for using Expense Tracker. Your privacy matters to us. This privacy policy explains how information may be processed when you use the application.

Information We Collect
The app may process the following categories of information to provide its features:

    User Provided Data: expense records, category information, budget plans, recurring expense plans, and any optional notes or images you attach.
    App Settings and Preferences: notification preferences, widget-related display data, language, theme, and similar settings stored locally on your device.
    Limited Technical Data: some technical information may be processed by your device or third-party SDKs to support app functionality, ad delivery, or abuse prevention.

Use of Data
We use this information for the following purposes:

    To provide the core functionality of the app
    To keep home screen widgets updated with relevant summaries and quick actions
    To schedule on-device notifications for daily summaries, weekly summaries, budget alerts, savings target warnings, and upcoming recurring payments
    To improve stability, protect security, and reduce technical issues
    To support an ad-funded experience

Data Storage
Expense Tracker primarily stores the data you enter locally on your device. Expense records, budget settings, recurring plans, notification preferences, and widget summaries remain on your device unless you choose to delete them.

Widgets and Notifications
The app may provide home screen widgets and local notifications. Widgets use app data stored on your device to show items such as daily or monthly net summaries and quick add shortcuts. Notifications are scheduled on-device for daily summaries, weekly summaries, budget threshold alerts, savings target status, and upcoming recurring payments. This feature does not rely on remote push notification infrastructure.

Data Sharing
We do not sell your personal information. However, limited data may be processed or shared in the following situations:

    Advertising Services: the app may use third-party ad services such as Google Mobile Ads. These services may process limited technical data, such as advertising identifiers, device information, or interaction signals, according to their own policies.
    Legal Requirements: when required to comply with legal obligations, respond to lawful requests, or enforce applicable laws.

Data Security
We take reasonable technical and organizational measures to help protect your data. However, no method of transmission or electronic storage can be guaranteed to be completely secure.

Children's Privacy
Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.

Changes to This Privacy Policy
We may update this privacy policy from time to time. Changes will be posted on this page. If a change is material, we may also provide additional notice inside the app or through relevant publishing channels.

Contact Us
If you have any questions or concerns about this privacy policy, please contact us using the information below:
Developer: Laphedus
Email: laphedusapp@gmail.com`;
      setPreContent(contentEl, expenslyPrivacy, 'defaultPrivacy');
      if (appNameEl) appNameEl.textContent = 'Expensly';
    }
  }
});
