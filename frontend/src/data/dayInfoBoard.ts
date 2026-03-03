export type DayInfoCardData = {
  id: string;
  title: string;
  variant: 'yellow' | 'red';
  contentTitle?: string;
  contentBody?: string;
};

export const DAY_INFO_BOARD: Record<number, { cards: DayInfoCardData[] }> = {
  2: {
    cards: [
      {
        id: 'suggestion',
        title: 'Günün Önerisi',
        variant: 'yellow',
        contentTitle: 'Günün Önerisi',
        contentBody: 'Palamut omega-3 yönünden zengin güçlü bir protein kaynağıdır. Mevsiminde tüketin, fazlasını dondurarak sezon dışında kullanabilirsiniz.',
      },
      {
        id: 'attention',
        title: 'Dikkat okuyunuz',
        variant: 'red',
        contentTitle: 'Dikkat okuyunuz',
        contentBody: 'Diyabet ilacı kullanıyorsanız doktorunuza danışmadan ilacınızı kesmeyin. Diyabet ilaçları mutlaka doktor denetiminde düzenlenmelidir.',
      },
    ],
  },
  3: {
    cards: [
      {
        id: 'merak-ettikleriniz',
        title: 'Merak Ettikleriniz',
        variant: 'yellow',
        contentTitle: 'Neden listede peynir, yoğurt yok?',
        contentBody:
          'Sağlıklı bir beslenme modelinde probiyotiklerin olmazsa olmaz olduğunu her zaman dile getiriyorum. Probiyotikler diyabetle savaşta da son derece önemli bir role sahiptir. Ancak faydalı bakteriler açısından değerli kaynaklar olan yoğurt, peynir ve kefir 91 Günlük Anti-Diyabet Beslenme Modeli\'nin ilk üç haftasında yer almıyor. Çünkü her ikisi de az miktarda olsa süt ve süt ürünlerinde bulunan bir şeker olan laktoz içerir. Laktoz intoleransı toplumumuzda son derece yaygındır ve kan şekerini yükselten sebep olabilir.\n\nPeki, mutfak kültürümüzün bu değerli besin kaynaklarını hiç mi yemeyeceğiz? Tabii ki hayır. Vücuttaki insülin metabolizmasının düzene girmesi için bu besinler üç hafta boyunca yasaklılar listesindedir. Sonrasında her gün listede kefir, peynir ve yoğurt gibi şifalı yiyeceklerin yer aldığını göreceksiniz. İlk üç hafta boyunca değerli probiyotik kaynakları olarak sadece ev turşusu ve ev yapımı sirkeden faydalanmanızı öneriyorum. Bu arada, süt yüksek miktarda laktoz içerdiği için hiç kimseye tavsiye etmiyorum. İnsanoğlunun ihtiyacı olan tek süt, anne sütüdür.',
      },
    ],
  },
  4: {
    cards: [
      {
        id: 'suggestion-info',
        title: 'Günün Önerisi',
        variant: 'yellow',
        contentTitle: 'Günün Önerisi',
        contentBody:
          'Sağlıklı ve dinç bir yaşam sürmek istiyorsanız tüm etli yemeklerinizi kemikli etle pişirin, hatta hem lezzetinden hem şifasından faydalanmak için dondurucunuzda her zaman kemik suyu bulundurun. Gelelim, yemek ve çorbalarda kullanabileceğiniz tarife. İlikli kemikleri büyük bir tencereye koyun ve su ekleyerek harlı ateşte, üstü açık olarak kaynamaya bırakın. Kaynamaya başladığında üstüne koyu renkli yoğun bir köpük çıkar. Bu köpüğü bir kaşıkla suyun üstünden alıp atın. Kaynayan suya kabuğu soyulmuş 1 bütün soğan, 5-6 adet tane karabiber, birkaç sap maydanoz, dereotu ve bir parça kaya tuzu ilave edin. Dilerseniz yarım havuç, pırasa yaprağı, kök kereviz, kereviz sapı, taze kekik ve biberiye de ekleyebilirsiniz. Kapağını kapatıp kısık ateşte en az 3-4 saat kaynatın. Süzgeçten süzdüğünüz et suyunu çorbalarda, yemeklerde kullanabilir ya da olduğu gibi içebilirsiniz. Aynı gün kullanmayacağınız et suyunu küçük kaplara döküp dondurucuya kaldırın.\n\nBir not: İçlerindeki kimyasallar, katkı maddeleri ve aroma artırıcılarla yemeklere lezzet değil zehir katan et ve tavuk suyu bulyonları mutfağınıza sakın sokmayın.',
      },
    ],
  },
  5: {
    cards: [
      {
        id: 'tip',
        title: 'Püf Noktası',
        variant: 'yellow',
        contentTitle: 'Püf Noktası',
        contentBody:
          'Egzersiz, insülin direncini azaltmada ve metabolik dengeyi sağlamada beslenme kadar etkilidir. Kas dokusu aktif çalıştığında kandaki glikozu daha verimli kullanır ve kan şekeri dalgalanmaları azalır. Haftada en az 3–4 gün, 30–45 dakika tempolu yürüyüş önerilir. Düzenli egzersiz metabolik sürecin en güçlü destekçilerinden biridir.',
      },
      {
        id: 'warning',
        title: 'Dikkat okuyunuz',
        variant: 'red',
        contentTitle: 'Dikkat okuyunuz',
        contentBody:
          'İlaç kullanan veya insülin tedavisi gören kişilerde beslenme düzeni değiştiğinde kan şekeri beklenenden daha hızlı düşebilir. Egzersiz öncesi ve sonrasında kan şekeri ölçümü yapılmalıdır. Ani terleme, titreme, baş dönmesi ve çarpıntı hipoglisemi belirtileri olabilir. Yanınızda hızlı emilen bir karbonhidrat kaynağı bulundurmanız önerilir.',
      },
    ],
  },
  6: {
    cards: [
      {
        id: 'merak-alkol',
        title: 'Merak Ettikleriniz',
        variant: 'yellow',
        contentTitle: 'Ara sıra içki içebilir miyim?',
        contentBody:
          'Tüm alkollü içecekler insülin metabolizmasını olumsuz etkileyebilir ve kan şekerini bozabilir. İçeceğin şekerinden çok alkolün vücutta tetiklediği mekanizmalar önemlidir. Bu beslenme modelinde alkol önerilmez; \'faydası var\' denilen iddialara güvenme.',
      },
    ],
  },
  7: {
    cards: [
      {
        id: 'suggestion-avokado',
        title: 'Günün Önerisi',
        variant: 'yellow',
        contentTitle: 'Günün Önerisi',
        contentBody: 'AVOKADO: Omega-3 ve sağlıklı yağlar açısından zengin avokado, kan şekerini dengelemeye yardımcı olur. Mevsim salatasına ekleyebilir veya soğuk püre olarak tüketebilirsiniz.',
      },
    ],
  },
};
