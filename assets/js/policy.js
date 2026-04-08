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

  if (appNameEl) appNameEl.textContent = app ? app : 'Genel';
  if (backEl) {
    backEl.href = app ? `app.html?slug=${encodeURIComponent(app)}` : 'index.html';
  }

  if (app === 'kayfe' && contentEl) {
    if (isPrivacy) {
      const kayfePrivacy = `Giriş
Kayfe'ye hoş geldiniz. Gizliliğinize saygı duyuyor ve kişisel verilerinizi korumayı taahhüt ediyoruz. Bu gizlilik politikası, uygulamamızı kullandığınızda kişisel verilerinize nasıl baktığımız ve gizlilik haklarınız hakkında sizi bilgilendirecektir.

Topladığımız Veriler
Sizinle ilgili farklı türde kişisel verileri toplayabilir, kullanabilir, saklayabilir ve aktarabiliriz:

    Kimlik Verileri: kullanıcı adı, şifre ve profil bilgilerini içerir.
    İletişim Verileri: e-posta adresini içerir.
    Teknik Veriler: cihaz bilgileri, IP adresi, giriş verileri ve uygulamamıza erişmek için kullandığınız cihazlardaki diğer teknoloji tanımlayıcılarını içerir.
    Kullanım Verileri: uygulamamızı nasıl kullandığınıza dair bilgileri içerir.

Verilerinizi Nasıl Kullanıyoruz
Verilerinizi şu amaçlarla kullanıyoruz:

    Hesabınızı sağlamak ve yönetmek
    Fal hizmetlerimizi sunmak
    Uygulamamızı ve hizmetlerimizi geliştirmek
    Güncellemeler veya değişiklikler hakkında sizinle iletişim kurmak
    Uygulamamızın güvenliğini sağlamak

Veri Güvenliği
Kişisel verilerinizin kazara kaybolmasını, kullanılmasını veya yetkisiz bir şekilde erişilmesini önlemek için uygun güvenlik önlemlerini uyguladık. Kişisel verilerinize erişimi, bilmesi gereken çalışanlar, acenteler, yükleniciler ve diğer üçüncü taraflarla sınırlıyoruz.

Haklarınız
Belirli koşullar altında, veri koruma yasaları kapsamında kişisel verilerinizle ilgili haklarınız vardır:

    Kişisel verilerinize erişim talep etme
    Kişisel verilerinizin düzeltilmesini talep etme
    Kişisel verilerinizin silinmesini talep etme
    Kişisel verilerinizin işlenmesine itiraz etme
    Kişisel verilerinizin işlenmesinin kısıtlanmasını talep etme
    Kişisel verilerinizin aktarılmasını talep etme
    Onayınızı geri çekme hakkı

Bu Gizlilik Politikasındaki Değişiklikler
Gizlilik politikamızı zaman zaman güncelleyebiliriz. Herhangi bir değişikliği, yeni gizlilik politikasını bu sayfada yayınlayarak ve "Son Güncelleme" tarihini güncelleyerek size bildireceğiz.

Bize Ulaşın
Bu gizlilik politikası veya gizlilik uygulamalarımız hakkında herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin:
 E-posta: laphedusapp@gmail.com`;
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
If you have any questions or issues with the account deletion process, please email us at laphedusapp@gmail.com.

Kayfe Uygulaması Hesap Silme Talimatları

Bu sayfa, Kayfe uygulamasında hesabınızı nasıl sileceğinizi açıklamaktadır.

Hesabınızı silmek için aşağıdaki adımları izleyin:

    Kayfe uygulamasını açın ve hesabınıza giriş yapın
    Profil sayfasına gidin (sağ alt köşedeki profil simgesine tıklayın)
    "Ayarlar" seçeneğine tıklayın
    Sayfanın alt kısmında bulunan "Hesabı Sil" butonuna tıklayın
    Onay iletişim kutusunda "Evet, Hesabımı Sil" seçeneğini onaylayın

Hesabınız silindiğinde:

    Tüm kişisel verileriniz sistemden kaldırılacaktır
    Profil bilgileriniz anonimleştirilecektir
    Uygulamaya tekrar giriş yapamayacaksınız
    Kayıtlı fal geçmişiniz ve diğer içerikleriniz silinecektir

Not:

    Hesabınızı silmek geri alınamaz bir işlemdir. Hesabınızı sildikten sonra verilerinize erişemezsiniz.
    Eğer sadece uygulamayı kullanmayı bırakmak istiyorsanız, hesabınızı silmek yerine uygulamayı cihazınızdan kaldırabilirsiniz.

Yardıma mı ihtiyacınız var?
Hesap silme işlemiyle ilgili herhangi bir sorunuz veya sorununuz varsa, lütfen laphedusapp@gmail.com adresine e-posta gönderin.`;
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
      document.title = 'Gizlilik Politikasi | Dynamic Pill';
      const dynamicPillPrivacy = `Dynamic Pill Gizlilik Politikasi
Son guncelleme: 04.08.2026

Dynamic Pill, Android cihazlarda ekranin ust kismina kapsul benzeri bir arayuz yerlestiren ve medya, bildirim, baglanti, pil, kilit durumu, jestler ve secili hizli kontroller gibi ozellikleri gosteren yardimci bir uygulamadir. Bu politika, uygulamanin gercek calisma bicimine gore hangi verileri cihaz icinde isleyebildigini, hangi verilerin yerelde kaldigini ve hangi sinirli durumlarda ucuncu taraf odeme altyapilariyla iletisim kuruldugunu aciklar.

1. Islenebilen Bilgiler

- erisilebilirlik servis durumu, overlay izni durumu ve bildirim erisimi durumu
- medya oturumu bilgileri, oynatma durumu, uygulama paketi, medya basligi ve album kapagi gibi medya metaverileri
- pil, sarj, Bluetooth, Wi-Fi, hotspot, ucak modu ve ses modu gibi cihaz ici durumlar
- kilit ekrani ve cihaz kilidinin acilmasi ile ilgili durum bilgileri
- kullanicinin sectigi dil, tema, gorunum, kalibrasyon, jest, moduller ve premium tercihleri
- bildirim tabanli ozellikler acikken secili bildirimlerden paket adi, baslik, metin ve zaman bilgisi gibi alanlar
- jestler, kisayollar ve bildirim filtreleri icin cihazdaki yuklu uygulamalarin adlari, paket adlari ve ikonlari
- premium satin alma, geri yukleme ve entitlement dogrulama akislarinda gerekli sinirli teknik bilgiler

2. Toplanmayan veya Hedeflenmeyen Veriler

- zorunlu kullanici hesabi olusturmaz
- reklam profili olusturmaz
- ucuncu taraf reklam aglariyla veri paylasmaz
- konum gecmisi tutmaz
- kisi listesi, fotograf galerisi veya mesajlasma veritabani toplamaz
- kamera iznini fotograf veya video cekmek icin kullanmaz; fener kontrolu yalnizca cihazin torch donanimi icindir
- erisilebilirlik verilerini reklam, analiz veya pazarlama amaciyla kullanmaz
- yazilan metinleri kaydetmeyi veya mesaj iceriklerini harici sunuculara aktarmayi hedeflemez

3. Veriler Nasil Kullanilir

- ekran ustu kapsul arayuzunu gostermek ve konumlandirmak
- medya, bildirim, zamanlayici, ses kaydi, baglanti ve pil olaylarini ayirt etmek
- secili bildirimleri veya zaman bazli durumlari kapsulde gorsellestirmek
- jestler ve kisayollar icin kullanicinin sectigi uygulama ve eylemleri calistirmak
- ses, parlaklik ve fener gibi yardimci sistem kontrollerini yonetmek
- ayarlari ve premium erisim durumunu cihaz uzerinde korumak
- satin alma, geri yukleme ve entitlement kontrolunu yurutmek

4. Veriler Nerede Saklanir

Uygulama ayarlari, moduller, filtreler ve cogu durum bilgisi agirlikli olarak cihaz uzerinde saklanir. Bildirim basligi/metni, uygulama listesi ve ikonlar gibi veriler ozellik calisirken yerelde islenir; varsayilan akista uygulama tarafindan ayri bir bulut hesabi altinda saklanmaz.

Premium satin alma veya geri yukleme kullanildiginda Google Play Billing ve RevenueCat gibi ucuncu taraf altyapilar, satin alma akisinin calismasi icin gerekli sinirli teknik verileri isleyebilir.

5. Izinler ve Gerekceleri

- Erisilebilirlik izni: kapsulun diger uygulamalarin uzerinde stabil kalmasi, bazi pencere ve foreground degisimlerine tepki vermesi, secili jest veya yardimci sistem eylemlerinin calismasi icin kullanilir.
- Ustte goster izni: kapsul arayuzunun diger uygulamalarin uzerinde gorunebilmesi icin gereklidir.
- Bildirim erisimi: medya kontrolu, secili bildirim gosterimi, zamanlayici ve ses kaydi gibi bildirim tabanli moduller acikken kullanilir.
- Bluetooth ve baglanti ile ilgili izinler: Bluetooth baglanti olaylarini gosteren ozellikler icin gerekli olabilir.
- Sistem ayarlarini degistirme izni: parlaklik gibi sistem kontrollerinin Dynamic Pill icinden yonetilebilmesi icin kullanilir.
- Kamera / torch donanimi erisimi: feneri kapsul uzerinden acip kapatmak veya guc seviyesini ayarlamak icin gerekebilir. Bu erisim fotograf ya da video cekimi amaciyla kullanilmaz.

6. Ucuncu Taraflarla Paylasim

Uygulama, kullanici verilerini satmaz, kiralamaz veya reklam amaciyla paylasmaz. Premium satin alma ve entitlement kontrolu icin Google Play Billing, RevenueCat veya benzeri hizmet saglayicilar kullanilabilir.

7. Veri Silme ve Iletisim

Yerel verileri silmek icin uygulamayi cihazdan kaldirabilir veya uygulama verilerini temizleyebilirsin. Veri silme veya gizlilik talepleri icin: laphedusapp@gmail.com`;
      setPreContent(contentEl, dynamicPillPrivacy, 'defaultPrivacy');
      if (appNameEl) appNameEl.textContent = 'Dynamic Pill';
    }

    if (isTerms) {
      document.title = 'Kullanim Kosullari | Dynamic Pill';
      const dynamicPillTerms = `Dynamic Pill Kullanim Kosullari
Son guncelleme: 04.08.2026

Bu uygulamayi indirerek, kurarak veya kullanarak asagidaki kosullari kabul etmis sayilirsiniz.

1. Hizmetin Kapsami

Dynamic Pill, Android cihazlarda medya, secili bildirimler, baglanti olaylari, pil durumu, jestler ve belirli yardimci sistem kontrollerini ust kapsul arayuzunde gostermek icin tasarlanmis yardimci bir uygulamadir.

2. Izinler ve Sistem Davranisi

Erisilebilirlik, ustte goster, bildirim erisimi, Bluetooth veya sistem ayarlarini degistirme gibi izinler verilmezse bazi moduller kisitli calisabilir veya hic calismayabilir.

Bildirim tabanli moduller, secili bildirim alanlarini cihaz icinde yorumlayabilir. Jestler ve uygulama secimiyle ilgili ozellikler, cihazdaki yuklu uygulamalari yerelde listeleyebilir. Premium, satin alma veya geri yukleme gibi ozellikler kullanildiginda uygulama, ilgili odeme ve abonelik altyapisiyla iletisim kurabilir.

3. Uygun Kullanim

- cihazin sistem guvenligini asmamak
- uygulamayi kotuye kullanmamak
- sistem jestleri, kisayollar, hizli ayarlar ve benzeri kontrolleri yetkisiz veya zarar verici sekilde kullanmamak
- ucuncu taraf haklarini ihlal etmemek
- uygulamayi yasalara aykiri amaclarla kullanmamak

4. Uyumluluk ve Garanti Siniri

- tum cihazlarda ayni gorunum garanti edilmez
- tum uretici arayuzleriyle tam uyum garanti edilmez
- arka plan davranisinin her cihazda ayni olacagi garanti edilmez
- kilit ekrani, cutout, medya, bildirim ve torch davranisi cihaz bazinda farkli olabilir
- sistem guncellemelerinden kaynakli degisiklikler olabilir

5. Ucuncu Taraf Bilesenler ve Odeme

Uygulama, Flutter, Android sistem API'leri, Google Play Billing, RevenueCat ve diger acik kaynak kutuphaneler gibi ucuncu taraf bilesenler kullanabilir.

Premium ozellikler, satin alma, geri yukleme veya abonelik durumu kontrolu gibi odeme akislarinda fiyatlandirma ve satin alma kosullari ilgili magaza altyapisina tabidir.

6. Veri Silme ve Iletisim

Uygulamada zorunlu kullanici hesabi olmadigindan klasik hesap kapatma akisi yoktur. Kullanici uygulamayi kaldirabilir, uygulama verilerini silebilir veya laphedusapp@gmail.com adresi uzerinden veri silme talebinde bulunabilir.`;
      setPreContent(contentEl, dynamicPillTerms, 'defaultTerms');
      if (appNameEl) appNameEl.textContent = 'Dynamic Pill';
    }
  }

  if (app === 'expensly' && contentEl) {
    if (isPrivacy) {
      const expenslyPrivacy = `Son güncelleme: 2025-04-11

Masraf Kaydedici uygulamasını kullandığınız için teşekkür ederiz. Gizliliğiniz bizim için önemlidir. Bu gizlilik politikası, uygulamayı kullanırken toplanan, kullanılan ve açıklanan bilgilerle ilgili politikalarımızı açıklamaktadır.

Topladığımız Bilgiler
Masraf Kaydedici uygulaması, size hizmet sunmak için aşağıdaki bilgileri toplar:
        
    Kullanıcı Tarafından Sağlanan Veriler: Harcama kayıtları, kategori bilgileri, bütçe planları gibi uygulama içinde girdiğiniz tüm veriler.
    Cihaz Bilgileri: Uygulama çöktüğünde veya hata oluştuğunda, cihazınızın modeli, işletim sistemi sürümü gibi temel bilgiler toplanabilir.
        

Verilerin Kullanımı
Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:
        
    Uygulamanın temel işlevlerini sağlamak
    Uygulamayı iyileştirmek ve geliştirmek
    Teknik sorunları tespit etmek ve çözmek
        

Veri Saklama
Masraf Kaydedici, girdiğiniz tüm verileri öncelikle cihazınızda yerel olarak saklar. Verileriniz, siz silmeyi tercih etmediğiniz sürece cihazınızda kalır.

Veri Paylaşımı
Kişisel verilerinizi üçüncü taraflarla paylaşmıyoruz. Ancak aşağıdaki durumlarda bilgilerinizi paylaşabiliriz:
        
    Yasal Gereklilikler: Yasal bir yükümlülüğe uymak, yasal süreçlere yanıt vermek veya geçerli yasaları uygulamak için gerekli olduğunda.
    Hizmet Sağlayıcılar: Uygulamanın işlevselliğini desteklemek için kullandığımız üçüncü taraf hizmet sağlayıcılarla (örneğin, analiz hizmetleri).
        

Veri Güvenliği
Verilerinizin güvenliğini sağlamak için uygun teknik ve organizasyonel önlemler alıyoruz. Ancak, internet üzerinden hiçbir veri iletiminin veya elektronik depolamanın %100 güvenli olmadığını unutmayın.

Çocukların Gizliliği
Hizmetlerimiz 13 yaşın altındaki çocuklara yönelik değildir. 13 yaşın altındaki çocuklardan bilerek kişisel bilgi toplamıyoruz.

Bu Gizlilik Politikasındaki Değişiklikler
Gizlilik politikamızı zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada yayınlanacaktır. Önemli değişiklikler olması durumunda, uygulama içinde bir bildirim de sağlayabiliriz.

İletişim
Bu gizlilik politikası hakkında sorularınız veya endişeleriniz varsa, lütfen aşağıdaki iletişim bilgilerini kullanarak bize ulaşın:
E-posta: laphedusapp@gmail.com
    
Privacy Policy - Expensly
Last updated: 2025-04-11

Thank you for using the Expense Tracker app. Your privacy is important to us. This privacy policy explains our policies regarding the collection, use, and disclosure of information when you use our application.

Information We Collect
The Expense Tracker app collects the following information to provide you with our service:
        
    User Provided Data: All data you enter within the app, such as expense records, category information, budget plans, etc.
    Device Information: When the app crashes or an error occurs, basic information such as your device model and operating system version may be collected.
        

Use of Data
We use the information we collect for the following purposes:
        
    To provide the core functionality of the app
    To improve and enhance the app
    To identify and fix technical issues
        

Data Storage
Expense Tracker primarily stores all the data you enter locally on your device. Your data remains on your device unless you choose to delete it.

Data Sharing
We do not share your personal information with third parties. However, we may share your information in the following circumstances:
        
    Legal Requirements: When required to comply with a legal obligation, respond to legal processes, or enforce applicable laws.
    Service Providers: With third-party service providers we use to support the app's functionality (e.g., analytics services).
        

Data Security
We take appropriate technical and organizational measures to ensure the security of your data. However, please note that no data transmission over the internet or electronic storage is 100% secure.

Children's Privacy
Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.

Changes to This Privacy Policy
We may update our privacy policy from time to time. Changes will be posted on this page. In case of significant changes, we may also provide a notification within the app.

Contact Us
If you have any questions or concerns about this privacy policy, please contact us using the information below:
Email: laphedusapp@gmail.com`;
      setPreContent(contentEl, expenslyPrivacy, 'defaultPrivacy');
      if (appNameEl) appNameEl.textContent = 'Expensly';
    }
  }
});
