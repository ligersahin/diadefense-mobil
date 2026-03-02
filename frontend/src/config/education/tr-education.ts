import { EducationSection } from '../../types';

export const TR_EDUCATION: EducationSection[] = [
  {
    id: 'warn1',
    type: 'warning',
    title: '⚠️ Hipoglisemi Belirtileri',
    shortDescription: 'Düşük kan şekeri tehlikeli olabilir',
    content: `Hipoglisemi (düşük kan şekeri) ciddi bir durumdur ve acil müdahale gerektirir.

**Belirtiler:**
• Terleme ve titreme
• Kalp çarpıntısı
• Açlık hissi
• Sinirlilik veya kaygı
• Baş dönmesi
• Bulanık görme
• Zayıflık ve yorgunluk
• Baş ağrısı
• Konsantrasyon güçlüğü

**Ne Yapmalısınız?**
1. Kan şekerinizi ölçün
2. 15-20g hızlı şeker alın (portakal suyu, şeker, glikoz tableti)
3. 15 dakika sonra tekrar ölçün
4. Kan şekeri 70 mg/dL'nin altındaysa tekrarlayın
5. Durumunuz kötüleşiyorsa acil servisi arayın

**Önemli:** Araba kullanmayın, yalnız kalmayın!`,
    isCritical: true,
    order: 1
  },
  {
    id: 'warn2',
    type: 'warning',
    title: '⚠️ Ayak Bakımı Kritik Önem Taşır',
    shortDescription: 'Günlük ayak kontrolü yapın',
    content: `Diyabet hastalarında ayak bakımı hayati önem taşır.

**Neden Önemli?**
Diyabet, sinirlere zarar vererek his kaybına neden olabilir. Küçük bir yara bile fark edilmezse enfeksiyona dönüşebilir.

**Günlük Yapılması Gerekenler:**
• Her gün ayaklarınızı kontrol edin
• Kesiği, çatlağı, kızarıklığı, şişliği inceleyin
• Ayaklarınızı her gün ılık suyla yıkayın
• Nemlendiriciye özenle kurulayın
• Tırnakları düz kesin
• Rahat ayakkabılar giyin
• Çıplak ayakla yürümeyin

**Uyarı İşaretleri:**
• Renk değişikliği
• Şişlik
• Isı artışı
• Ağrı veya uyuşma
• İyileşmeyen yaralar

➡️ Bu belirtileri görürseniz hemen doktorunuza başvurun!`,
    isCritical: true,
    order: 2
  },
  {
    id: 'warn3',
    type: 'warning',
    title: '⚠️ İlaç Saatlerine Dikkat',
    shortDescription: 'İlaçları düzenli kullanın',
    content: `İlaç kullanımında düzen hayati önem taşır.

**Önemli Kurallar:**
• İlaçlarınızı her gün aynı saatte alın
• Doktorunuz söylemedikçe dozu değiştirmeyin
• İlaç içmeyi unutursanız ne yapacağınızı öğrenin
• Yan etkiler görürsene doktorunuza haber verin
• Başka ilaç kullanmadan önce doktorunuza danışın

**İnsulin Kullananlar İçin:**
• Doğru doz ve tekniği öğrenin
• Enjeksiyon bölgelerini değiştirin
• Saklamaya özen gösterin (2-8°C)
• Son kullanma tarihini kontrol edin
• Seyahatlerde yedek insulin bulundurun

**Uyarı:** İlaçlarınızı asla kendi başınıza bırakmayın!`,
    isCritical: true,
    order: 3
  },
  {
    id: 'lesson1',
    type: 'lesson',
    title: '📚 Diyabet Nedir?',
    shortDescription: 'Temel bilgiler',
    content: `Diyabet, vücudunuzun kan şekerini (glikoz) düzenleyememesi durumudur.

**Tip 1 Diyabet:**
Pankreas yeterli insulin üretemez. Genellikle çocukluk veya gençlik döneminde başlar. İnsulin tedavisi gereklidir.

**Tip 2 Diyabet:**
Vücut insuline dirençli hale gelir. Genellikle yetişkinlerde görülür. Yaşam tarzı değişiklikleri ve ilaçlarla kontrol edilebilir.

**Belirtiler:**
• Aşırı susama ve idrara çıkma
• Açlık
• Yorgunluk
• Bulanık görme
• Yavaş iyileşen yaralar
• Kilo kaybı (Tip 1)

**Risk Faktörleri:**
• Aile geçmişi
• Fazla kilo
• Hareketsiz yaşam
• Yaş (45 üzeri)
• Yüksek tansiyon

**İyi Haber:** Doğru yönetimle sağlıklı bir yaşam sürebilirsiniz!`,
    isCritical: false,
    order: 4
  },
  {
    id: 'lesson2',
    type: 'lesson',
    title: '📚 Glisemik İndeks (Gİ) Nedir?',
    shortDescription: 'Besinlerin kan şekerine etkisi',
    content: `Glisemik İndeks (Gİ), bir besinin kan şekerinizi ne kadar hızlı yükselttiğini ölçer.

**Gİ Değerleri:**
• Düşük Gİ (0-55): Yavaş sindirilir, kan şekerini kademeli yükseltir
• Orta Gİ (56-69): Orta hızda etki eder
• Yüksek Gİ (70+): Hızla sindirilir, kan şekerini aniden yükseltir

**Düşük Gİ Besinler (Tercih Edin):**
• Yulaf ezmesi
• Kepekli ekmek
• Mercimek, nohut
• Çoğu sebze ve meyve
• Yoğurt
• Fındık, badem

**Yüksek Gİ Besinler (Sınırlayın):**
• Beyaz ekmek
• Beyaz pirinç
• Patates
• Şekerli içecekler
• Hazır gevrekler

**Pratik İpuçları:**
• Protein ve lif ekleyin (Gİ'yi düşürür)
• Porsiyon kontrolü yapın
• Tam tahılları tercih edin
• Sebzelerle kombinasyon yapın`,
    isCritical: false,
    order: 5
  },
  {
    id: 'lesson3',
    type: 'lesson',
    title: '📚 Egzersizin Önemi',
    shortDescription: 'Hareket, ilaçtan daha etkilidir',
    content: `Düzenli egzersiz, diyabet yönetiminin en önemli parçasıdır.

**Faydaları:**
• Kan şekerini düşürür
• İnsülin duyarlılığını artırır
• Kilo kontrolü sağlar
• Kalp sağlığını korur
• Stresi azaltır
• Uyku kalitesini artırır
• Enerji verir

**Önerilen Aktiviteler:**
• **Aerobik:** Yürüyüş, yüzme, bisiklet (haftada 150 dakika)
• **Kuvvet:** Ağırlık çalışması (haftada 2-3 gün)
• **Esneklik:** Yoga, germe (her gün)

**Güvenli Egzersiz İçin:**
• Egzersize başlamadan önce doktorunuza danışın
• Egzersiz öncesi ve sonrası kan şekerinizi ölçün
• Yanınızda hızlı şeker bulundurun
• Bol su için
• Rahat ayakkabılar giyin
• Yavaş başlayın, kademeli artırın

**Kan Şekeri 250 mg/dL üzerindeyse veya kendinizi kötü hissediyorsanız egzersiz yapmayın!**

**Hedef:** Günde 30 dakika, haftanın 5 günü orta şiddette aktivite.`,
    isCritical: false,
    order: 6
  },
  {
    id: 'lesson4',
    type: 'lesson',
    title: '📚 Stres ve Diyabet',
    shortDescription: 'Stres kan şekerini yükseltir',
    content: `Stres, kan şekerinizi doğrudan etkiler.

**Stres Nasıl Etkilir?**
Stresli olduğunuzda vücudunuz kortizol ve adrenalin salgılar. Bu hormonlar kan şekerini yükseltir.

**Stres Belirtileri:**
• Huzursuzluk
• Uyku problemi
• İştah değişiklikleri
• Sinirlilik
• Konsantrasyon güçlüğü
• Baş ağrısı

**Stresle Başa Çıkma:**
• **Derin nefes egzersizleri:** Her gün 10 dakika
• **Meditasyon:** Günde 15-20 dakika
• **Yoga:** Haftada 2-3 kez
• **Düzenli uyku:** Her gece 7-8 saat
• **Hobilerinize zaman ayırın**
• **Sevdiklerinizle vakit geçirin**
• **Doğada zaman geçirin**
• **Müzik dinleyin**

**Profesyonel Yardım:**
Stres kontrolünüzü kaybettiyseniz, bir psikolog veya terapistle görüşmeyi düşünün.

**Hatırlatma:** Zihinsel sağlık, fiziksel sağlık kadar önemlidir!`,
    isCritical: false,
    order: 7
  }
];
