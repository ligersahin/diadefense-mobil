export type DayInfoCardData = {
  id: string;
  title: string;
  variant: 'yellow' | 'red' | 'green';
  contentTitle?: string;
  contentBody?: string;
  recipeId?: string;
  imageKey?: string;
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
  9: {
    cards: [
      {
        id: 'motivation-day-9',
        title: 'Motivasyon',
        variant: 'yellow',
        contentTitle: 'Motivasyon',
        contentBody: 'Her gün düzenli olarak kan şekerinizi ölçüyorsunuz. Cihazın üstünde gördüğünüz değerlerden daha iyi bir motivasyon olabilir mi? Açlık kan şekeri değerleri çok yüksek olan kişilerde bile, daha ilk haftadan itibaren kan şekerinin istikrarlı biçimde düşmeye başlaması doğru yolda olduğunuzun güçlü bir göstergesidir.'
      },
      {
        id: 'menu-day-9',
        title: 'Günün Menüsü',
        variant: 'green',
        contentTitle: 'Sote Edilmiş Karnabahar',
        contentBody: 'Karnabaharı küçük parçalara ayırın.\n\nBuharda hafifçe pişirin.\n\nArdından tereyağında kısa süre sote edin.\n\nKaya tuzu ve karabiber ile tatlandırın.\n\nNot: Karnabahar mümkün olduğunca az pişirilmelidir.',
        recipeId: 'sote-edilmis-karnabahar',
        imageKey: 'sote-edilmis-karnabahar',
      },
      {
        id: 'warning-day-9',
        title: 'Dikkat okuyunuz',
        variant: 'red',
        contentTitle: 'Dikkat okuyunuz',
        contentBody: 'Diyabet ilacı kullanıyorsanız, doktorunuza danışmadan ilacınızı kesmeyin. Diyabet ilaçları ancak doktor denetiminde bırakılmalıdır.'
      }
    ]
  },
  10: {
    cards: [
      {
        id: 'question-day-10',
        title: 'Merak Ettikleriniz',
        variant: 'yellow',
        contentTitle: '“Peynir, yoğurt yiyebiliyorsam süt de içebilirim değil mi?”',
        contentBody: 'Yukarıda da belirttiğim üzere süt yüksek miktarda laktoz içerir. Bu yüzden de anti-diyabet beslenme modelinde süt ve kremadan uzak durmanız gerekiyor. Hele hele diyet sütün şeker oranı daha da yüksektir. Sütün içinden ne kadar çok yağ çıkarırsanız şeker konsantrasyonu da o kadar artar.'
      }
    ]
  },
  11: {
    cards: [
      {
        id: 'question-day-11',
        title: 'Merak Ettikleriniz',
        variant: 'yellow',
        contentTitle: '“Bana tatlandırıcı kullanabileceğim söylenmişti”',
        contentBody: 'Sakın! Şekeri, şekerli yiyecekleri hayatınızdan çıkarıp yerine suni tatlandırıcıları koymak büyük bir hatadır. Neden mi? Çünkü diyetinizden bir zehir çıkarıp yerine başka bir zehir koymuş oluyorsunuz. Suni tatlandırıcıların kansere, erken bunamaya, Alzheimer’a yakalanma riskini önemli oranda artırdığı pek çok bilimsel çalışmayla kanıtlandı. Ancak suni tatlandırıcılarla ilgili pek bilinmeyen bir gerçeğe daha dikkat çekmek istiyorum: Düşünülenin aksine tatlandırıcılar diyabeti derinleştiriyor. Evet, içlerinde belki şeker yok ama bu kimyasal kokteyller aynı şeker gibi kana insülin pompalanmasına neden oluyor. Kitapta bu mekanizmayı anlattım. Zaten vücudun, sağlığın bir bütün olduğu gerçeğinden yola çıkarsak, sizi kanser yapan bir şeyin diyabetinizi iyileştirmesi mümkün mü?'
      },
      {
        id: 'suggestion-day-11',
        title: 'Günün Önerisi',
        variant: 'yellow',
        contentTitle: 'Günün Önerisi: Brokoli',
        contentBody: 'Birçok bilim insanının brokoli üstüne çalışmalar yapması boşuna değil. Araştırmalar brokolinin içindeki bileşenlerin hücresel metabolik faaliyetleri iyileştirdiğini, kandaki lipit değerlerini düşürdüğünü gösteriyor. Hücresel aktivitenin düzene girmesi ise kilo kontrolüne yardımcı oluyor ve Tip 2 diyabetten kansere kadar pek çok kronik hastalığa karşı etkin bir koruma sağlıyor.'
      }
    ]
  },
  12: {
    cards: [
      {
        id: 'suggestion-day-12',
        title: 'Günün Önerisi',
        variant: 'yellow',
        contentTitle: 'Günün Önerisi: Mantar',
        contentBody: 'Glisemik yükü olmayan, yani kan şekerinde dalgalanmalara neden olmayan mantar harika bir besindir. Tabii endüstriyel olarak üretilmiş, tatsız tuzsuz mantarlardan bahsetmiyorum. Bir Ege gezimde, konuk olduğum bir köy evinde tattığım bir mantarın tadı hâlâ damağımdadır. İsminin kuzugöbeği olduğunu öğrendiğim bu nefis mantar bazı yörelerde höbelen olarak da bilinir. Biraz araştırdım Fransız mutfağında çok tercih edilen, kıymetli bir mantarmış. Mantar hassas bir mevzudur, doğada yenen her mantarın zehirli bir benzeri olabileceğini aklınızdan çıkarmayın. Ama ülkemizin dört bir yanında doğada yetişen ve doğal ortamda yetiştirilen lezzetli mantarlar var. Bu konuda bilgili üreticiler bu kıymetli mantarları yurt dışına ihraç ediyor, bir kısmını da iç pazara satıyor. Bunların izini sürerseniz nefis tatlarla tanışacağınızdan emin olabilirsiniz. İşte yerel mantarlarımızdan mini bir derleme:\n\nEge, Akdeniz, bazen de Karadeniz’in kıyı şeridinde yetişen kuzugöbeği.\n\nBatı Karadeniz’in yerlilerinden çörek mantarı. Bazılarınız onu İtalyanca mealiyle yani porcini mantarı olarak biliyor.\n\nKaradeniz yöresinde yetişen ve Karadeniz mutfağında önemli bir yere sahip olan tirmit mantarı.\n\nMersin ve civarında kestane ve çınar ağaçlarının üstünde yetişen biftek mantarı. Adı üstünde tadı biftek gibi.\n\nBolu civarlarına özgü cincile mantarı. Sotesi pek lezzetli olur.'
      },
      {
        id: 'tip-day-12',
        title: 'Püf Noktası',
        variant: 'green',
        contentTitle: 'Püf Noktası',
        contentBody: 'Hadi bu sayfayı mantara ayırmış olalım ve mantarın farklı pişirme tekniklerini de paylaşalım. Kuşbaşı etle birlikte pişirebilirsiniz. Mantarları tereyağında kavurup üstüne yumurta kırıp yiyebilirsiniz. Yoğun ve ayrıcalıklı lezzetleri olan türleri tek başına, zeytinyağı ya da tereyağı gezdirilmiş tavada pişirip yiyin. Doğranmış domates ve biberle sote yapın. Dilerseniz üstlerine bir parça tereyağı ve rendelenmiş kaşar koyup fırına verin. Pek çok mantar türü çorbalara, etli yemeklere çok yakışır. Bazı türleri ince ince doğrayıp pişirmeden çiğ olarak salatalara katabilirsiniz.'
      }
    ]
  },
  13: {
    cards: [
      {
        id: 'recipe-day-13',
        title: 'Günün Tarifi',
        variant: 'green',
        contentTitle: 'Yeşil Biberli Tavuk',
        contentBody: '',
        recipeId: 'yesil-biberli-tavuk',
        imageKey: 'yesil-biberli-tavuk'
      },
      {
        id: 'suggestion-day-13',
        title: 'Günün Önerisi',
        variant: 'yellow',
        contentTitle: 'Günün Önerisi: Yerel Otları Keşfedin',
        contentBody: 'Mutfağınızı sızma zeytinyağı ve limonla çeşnilendirilmiş ot salataları ile zenginleştirmeye ne dersiniz? Cibes, radika, şevket-i bostan, sütlü diken, sarmaşık otu, arapsaçı ve daha niceleri... Her ne kadar Ege kültürüyle özdeşmiş olsalar da, her yörenin şahsına münhasır otları vardır. Bu otlarla hazırlanan nefis salataları ve et yemeklerini yerel pazarlarda keşfedebilir, sofranıza daha fazla çeşitlilik katabilirsiniz.'
      }
    ]
  },
  14: {
    cards: [
      {
        id: 'suggestion-day-14',
        title: 'Günün Önerisi',
        variant: 'yellow',
        contentTitle: 'Günün Önerisi: Beyaz Hindiba',
        contentBody: 'Tadı hafif buruk­tur. Marulu andırır ama maruldan çok daha lezzetlidir. Cevap, beyaz hindiba olacak. Çok bilinmeyen bu bitki nefis bir salata malzemesidir. Yemeklerde de kullanıldığını biliyorum. Ama doğrusu salatası bu kadar lezzetliyken yeni tarifler denemeye hiç gerek duymadım. Kabaca doğrayıp, üstüne mis gibi sızma zeytinyağı ekleyip, bol limon sıkın ve kaya tuzuyla çeşnilendirin. Henüz tatmadıysanız tavsiye ederim. Farkında mısınız? Aklımıza bile gelmeyen, yanından geçip gittiğimiz ne çok sebze var. Sağlıklı bir bağırsak florası için diyetinizdeki bitkisel besinlerin sayısını ve çeşitliliğini artırmanız gerektiğini hatırlatmama gerek var mı?'
      }
    ]
  },
  15: {
    cards: [
      {
        id: 'faq-day-15',
        title: 'Merak Ettikleriniz',
        variant: 'yellow',
        contentTitle: '“Çalışıyorum, bu beslenme modelini nasıl uygulayacağım?”',
        contentBody: 'Ertesi gün yiyeceklerinizi bir gece önceden hazırlayıp hava geçirmez kaplarda işe götürebilirsiniz. Menüde değişiklik yaparak öğünleri başka günlerle değiştirebilirsiniz. Önemli olan sistemin temel kurallarına sadık kalmaktır.'
      },
      {
        id: 'recipe-day-15',
        title: 'Günün Tarifi',
        variant: 'green',
        contentTitle: 'Cevizli Kuru Domates Mezesi',
        recipeId: 'cevizli-kuru-domates-mezesi',
        imageKey: 'cevizli-kuru-domates-mezesi'
      }
    ]
  },
  16: {
    cards: [
      {
        id: 'faq-day-16',
        title: 'Merak Ettikleriniz',
        variant: 'yellow',
        contentTitle: '“Ekmeksiz nasıl doyacağım? Ekmeğe neden bu kadar karşısınız?”',
        contentBody: '“Ben ekmeksiz doymam” diyenlere söyle seslenmek istiyorum: Sizi esas acıktıran ekmektir, börektir, çörektir. Oturup bir ekmek yiyen birinin iki saat sonra yine acıktığını görebilirim. Oysa bol tereyağlı iki yumurta yese aç kalmayacak. Üstelik tip 2 diyabet hastası da olmayacak. Ekmek ve unla yapılan tüm yiyecekler kan şekerinizin fırlamasına neden olur.'
      }
    ]
  },
  17: {
    cards: [
      {
        id: 'restaurant-guide-day-17',
        title: 'Restoran Kılavuzu',
        variant: 'yellow',
        contentTitle: 'Restoran Kılavuzu',
        contentBody: 'Gönül isterdi ki bir restorana gittiğinizde tabağınıza serbest dolaşan tavuk eti gelsin, masamıza gelen her yemek sağlıklı yağlarla hazırlansın, yeşillikler, sebzeler organik olsun... Tabii ki böyle mekânlar var, ama sayıları çok az, fiyatları çok pahalı. “Dışarıda yemek yemeyin, eş dost evine yemeğe çağırdığında gitmeyin” demek son derece gerçek dışı bir yaklaşım. O halde ne yapacağız? Diyabet mücadelenizde de, sağlıklı beslenme savaşınızda da zaman zaman ideal olmayan seçimler yapmak zorunda kalabilirsiniz. Böyle zamanlarda amaç içinde bulunduğunuz şartlar içinde nispeten en iyi tercihi yapmak olmalı. Glisemik indeksi düşük kaliteli protein bir yemek seçin. Et ya da balık gibi... Mümkünse ilk tercihiniz balık olsun. Deniz balığı yoksa seçiminizi tavuk ya da etten yana yapın — döner de yiyebilirsiniz. Mantığı anladınız değil mi? Tabağınızdaki besinin endüstriyel besicilik ya da suni yemlerden mümkün olduğunca uzak olmasına özen gösterin. Bu anlamda en güvenli seçim deniz balığıdır. Balık ya da etinizin nasıl piştiği de son derece önemli. Bu yiyeceklerin tabağınıza en yalın halleriyle gelmesini isteyin. Tabağınızda içinde ne olduğu meçhul soslar, unla yapılmış meyaneler bulunmasını istemezsiniz! Yani, menünün ızgara etler, ızgara balıklar bölümüne odaklanmalısınız. Kızartmalardan uzak durmanız gerektiğini aklınızdan çıkarmayın. Özellikle de restoranlarda! Kızartma yağlarının içine kimyasallar konarak renklerinin kararmasının önlendiği, o yağın günlerce kullanıldığını söylememe gerek var mı? Dikkatinizi çekerim: Kızartmalar yağlı olduğu için değil kanserojen oldukları için uzak durulmalı! Yağdan korkmamanız gerektiğini artık biliyorsunuz. Tabii margarin, moleküler yapısı değişmiş sözde “sağlıklı yağlar” yerine halis tereyağı, sızma zeytinyağı gibi yağlar yiyeceksiniz. Izgara balığın, etin yanına mevsim sebzeleriyle hazırlanmış bir salata sipariş edin. Ama salatanızı sossuz sipariş edin. Zeytinyağı ve taze sıkılmış limon suyunu ayrı sipariş edip salatanızı kendiniz çeşitlendirin. Maalesef birçok restoranda – daha kalburüstü olanlarda bile – hâlâ salatalara çiçek yağı konuyor. Ege restoranlarında en sevdiğim şey salatalarda, mezelerde sızma zeytinyağı kullanmalarıdır. Yemeğinizi sade bir Türk kahvesi ya da şekersiz bir çayla noktalayabilirsiniz. Gördüğünüz üzere dışarıda yemek yediğinizde de kan şekerinizi dengeli seyretmesini sağlayan sağlıklı seçimler yapmak mümkün.'
      }
    ]
  },
  18: {
    cards: [
      {
        id: 'warning-day-18',
        title: 'Dikkat Okuyunuz',
        variant: 'red',
        contentTitle: 'Aman Dikkat',
        contentBody: 'Diyabet ilacı kullanan hastalarda ani kan düşmeleri görülebilir. Hipoglisemi ataklarına karşı yanınızda hep bir kesme şeker bulundurun.'
      }
    ]
  },
  19: {
    cards: [
      {
        id: 'gunun-onerisi-alabas',
        title: 'Günün Önerisi',
        variant: 'green',
        contentTitle: 'Alabaş',
        contentBody: 'Doğanın bize sunduklarını keşfettikçe seçeneklerin ne kadar çeşitli, ne kadar zengin olduğunu fark edeceksiniz. İçi kimyasallarla dolu yiyecekleri terk edip, pazar yerlerindeki tezgahları dolaşın. İşte sizi bekleyen sürprizlerden biri: Alabaş. Ödemiş civarlarında yetişen bu kök bitki büyük bir turpu andırır. Nedense pek tanınmayan bu lezzetin bağımlısı olmanız için bir kere tatmanız yeterli. Hazırlamak için fazla bir çabaya da gerek yok. Kabuğunu soyup dilimleyin. Üstüne sızma zeytinyağı gezdirin, biraz limon sıkın, biraz da kaya tuzu serpin. İşte, glisemik indeksi düşük, C vitamini zengini, güçlü antioksidanlarla dolu bir keşif daha.'
      }
    ]
  },
  20: {
    cards: [
      {
        id: 'recipe-day-20',
        title: 'Günün Tarifi',
        variant: 'green',
        contentTitle: 'Pirinçsiz Biber Dolması',
        recipeId: 'pirincsiz-biber-dolmasi',
        imageKey: 'pirincsiz-biber-dolmasi'
      }
    ]
  },
  21: {
    cards: [
      {
        id: 'recipe-day-21',
        title: 'Günün Tarifi',
        variant: 'green',
        contentTitle: 'Ev Yoğurdu',
        recipeId: 'ev-yogurdu',
        imageKey: 'ev-yogurdu'
      },
      {
        id: 'motivation-day-21',
        title: 'Motivasyon',
        variant: 'yellow',
        contentTitle: 'Motivasyon',
        contentBody: 'Tip 2 diyabet iyileşmez diyenlere inat kan şekeriniz düzenli seyrediyor. Kendinizi çok iyi hissediyorsunuz. Yeni yaşamınızın ilk üç haftasını tamamladınız. Sizi gönülden kutluyorum. Üçüncü haftayla birlikte beslenme modelinizdeki çeşitlilik de genişliyor. Artık probiyotik zengini ev yoğurdu, evde kendiniz yaptığınız kefir, şirden mayasıyla yapılmış peynir çeşitleri serbest.'
      }
    ]
  },
  23: {
    cards: [
      {
        id: 'tip-day-23',
        title: 'Püf Noktası',
        variant: 'yellow',
        contentTitle: 'Kararında Kuru Bakliyat',
        contentBody: 'Glisemik indeksleri nispeten yüksek olduğu için üç hafta boyunca menüde kuru bakliyat olmadığını fark etmişsinizdir. Üç haftanın sonunda artık son derece değerli besin maddeleri ile dolu nohut, kuru fasulye ve mercimek yemeklerini beslenme modelinizin bir parçası yapabilirsiniz. Tabii ki abartmamak kaydıyla! Haftada bir defadan fazla tüketmemeye özen gösterin.'
      },
      {
        id: 'recipe-day-23',
        title: 'Günün Tarifi',
        variant: 'green',
        contentTitle: 'Yoğurtlu Pırasa',
        recipeId: 'yogurtlu-pirasa',
        imageKey: 'yogurtlu-pirasa'
      }
    ]
  },
  24: {
    cards: [
      {
        id: 'recipe-day-24',
        title: 'Günün Tarifi',
        variant: 'green',
        contentTitle: 'Acılı Lahana Çorbası',
        recipeId: 'acili-lahana-corbasi',
        imageKey: 'acili-lahana-corbasi'
      }
    ]
  },
  25: {
    cards: [
      {
        id: 'tip-day-25',
        title: 'Günün Önerisi',
        variant: 'green',
        contentTitle: 'Tarçın',
        contentBody: 'İnsanlık tarihi boyunca yemeklere lezzet, birçok sağlık sorununa şifa olmuş bu değerli baharatın kan şekerini düzenlemek, insülin direncini kırmak gibi pek çok marifeti var. Tarçın güzel kokusunu, içerdiği sinnamaldehit ve öjenol adlı uçucu yağ bileşenlerine borçludur. Bu maddeler aynı zamanda insülinin glikozu metabolize etme yeteneğini de güçlendiriyor. Tarçının diyabetli hastalarda yüksek seyreden trigliserit seviyesini de düşürmekte etkili olduğunu biliyor muydunuz? Alzheimer’a, kansere karşı koruyan, kilo kontrolüne yardımcı olan tarçını anti-diyabet beslenme modelinizin başköşesine yerleştirin.'
      },
      {
        id: 'warning-day-25',
        title: 'Püf Noktası',
        variant: 'yellow',
        contentTitle: 'Püf Noktası',
        contentBody: 'Salatalarınızın şifa gücünü, omega-3 zengini keten tohumu, diyabetle savaşan çörekotu, B vitaminleri açısından zengin bir kaynak olan susamla artırın.'
      }
    ]
  },
  26: {
    cards: [
      {
        id: 'faq-day-26',
        title: 'Merak Ettikleriniz',
        variant: 'green',
        contentTitle: 'Tüm sebzeleri yiyebilir miyim?',
        contentBody: 'Glisemik indeksi yüksek birkaç sebze dışında evet. Patates, mısır, havuç ve bezelye yüksek glisemik indekslidir ve tüketilmemelidir.'
      }
    ]
  },
  28: {
    cards: [
      {
        id: 'faq-day-28',
        title: 'Merak Ettikleriniz',
        variant: 'yellow',
        contentTitle: '“Şekerim yüksek çıktı. Düşük kalorili bir diyete başladım. Bu yeterli değil mi?”',
        contentBody: 'Diyabet düşük kalorili bir beslenme modeli ile iyileşmez! Çünkü şekerinizi kontrol altına almak için düşük kalorili değil düşük glisemik indeksli bir diyet yapmanız gerekiyor. Yani kaloriye takmayın, önemli olan yediğiniz yiyeceklerin vücutta şeker dalgalanmalarına yol açıp açmadığıdır. Bunu da yiyeceklerin glisemik indeksi belirler. Mesela yumurta, et, tavuk, sakatat, peynir, tereyağı yediğinizde hem kendinizi saatlerce tok hissedersiniz hem de kan şekeriniz dengeli seyreder. Neden? Çünkü bu yiyeceklerin glisemik indeksi sıfırdır. Bunların yanına yine düşük glisemik indeksli sebzeler, salatalar eklediğinizde ise kan şekerinizin de, sağlığınızın da kontrolünü elinize almış olursunuz.'
      }
    ]
  },
  29: {
    cards: [
      {
        id: 'faq-day-29',
        title: 'Merak Ettikleriniz',
        variant: 'yellow',
        contentTitle: 'Ne kadar su içmeliyim?',
        contentBody: 'Biri çıkıyor günde 2 litre su için, diyor. Bir başkası 3 litre içseniz daha iyi, diye buyuruyor. Bu kafa karıştırıcı sağlık önerilerine son noktayı kim koyacak biliyor musunuz? Vücudunuz. Size ne kadar su içmeniz gerektiğini uzmanlar değil, ancak vücudunuz söyleyebilir. İdrarınız su renginde olduğunda doğru miktarı yakaladınız demektir. Benim bu konuda tek bir tavsiyem var: Tüketiminizi güne bölerek azar azar içmeye gayret edin.'
      },
      {
        id: 'warning-day-29',
        title: 'Dikkat Okuyunuz',
        variant: 'red',
        contentTitle: 'Aman Dikkat',
        contentBody: 'Diyabet ilacı kullanan hastalarda ani kan düşmeleri görülebilir. Hipoglisemi ataklarına karşı yanınızda hep bir kesme şeker bulundurun.'
      }
    ]
  },
  31: {
    cards: [
      {
        id: 'recipe-day-31',
        title: 'Günün Tarifi',
        variant: 'green',
        contentTitle: 'Yoğurtlu Pancar Salatası',
        recipeId: 'yogurtlu-pancar-salatasi',
        imageKey: 'yogurtlu-pancar-salatasi'
      },
      {
        id: 'suggestion-day-31',
        title: 'Günün Önerisi',
        variant: 'yellow',
        contentTitle: 'Sağlıklı Yağlar',
        contentBody: 'Sağlıklı yağlar sizi tok tutar ve kan şekerinin dengeli seyretmesini sağlar. Düşük yağlı diyet diyabeti derinleştirebilir. Sızma zeytinyağı, tereyağı, kuyruk yağı, et, yağlı balıklar ve kuruyemişler anti-diyabet modelin temelidir. Yağlar birlikte tüketilen besinlerin glisemik etkisini düşürür.'
      }
    ]
  },
  32: {
    cards: [
      {
        id: 'faq-day-32',
        title: 'Merak Ettikleriniz',
        variant: 'yellow',
        contentTitle: 'Gerçekten sadece beslenmemi düzenleyerek iyileşebilir miyim?',
        contentBody: '• Gluten ve basit karbonhidratları çıkardığınızda kısa sürede kendinizi daha iyi hissedersiniz.\n• Kan şekeri dengelenmeye başlar.\n• Tip 2 diyabet doğru beslenme ve hareketle ciddi şekilde iyileşebilir.\n• İlaçlar tek başına çözüm değildir, yaşam tarzı değişimi şarttır.'
      }
    ]
  },
};
