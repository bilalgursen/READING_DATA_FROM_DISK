// $$$$$$$\   $$$\     $$$$$$$\        $$$$$$$$\ $$\           $$\         $$\                                   $$\ $$\
// $$  __$$\ $$ $$\    $$  __$$\       $$  _____|$$ |          $$ |        $$ |                                  \__|$$ |
// $$ |  $$ |\$$$\ |   $$ |  $$ |      $$ |      $$ | $$$$$$\  $$ |  $$\ $$$$$$\    $$$$$$\   $$$$$$\  $$$$$$$\  $$\ $$ |  $$\
// $$$$$$$\ |$$\$$\$$\ $$$$$$$  |      $$$$$\    $$ |$$  __$$\ $$ | $$  |\_$$  _|  $$  __$$\ $$  __$$\ $$  __$$\ $$ |$$ | $$  |
// $$  __$$\ $$ \$$ __|$$  __$$<       $$  __|   $$ |$$$$$$$$ |$$$$$$  /   $$ |    $$ |  \__|$$ /  $$ |$$ |  $$ |$$ |$$$$$$  /
// $$ |  $$ |$$ |\$$\  $$ |  $$ |      $$ |      $$ |$$   ____|$$  _$$<    $$ |$$\ $$ |      $$ |  $$ |$$ |  $$ |$$ |$$  _$$<
// $$$$$$$  | $$$$ $$\ $$ |  $$ |      $$$$$$$$\ $$ |\$$$$$$$\ $$ | \$$\   \$$$$  |$$ |      \$$$$$$  |$$ |  $$ |$$ |$$ | \$$\
// \_______/  \____\__|\__|  \__|      \________|\__| \_______|\__|  \__|   \____/ \__|       \______/ \__|  \__|\__|\__|  \__|

// fs modülünü dahil ediyoruz
const { Console } = require("console");
const fs = require("fs");

// readline modülünü dahil ediyoruz
const readline = require("readline");

// readline modülünün bir arayüzünü oluşturuyoruz
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n");
console.log(
  "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
);
console.log(
  "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
);
console.log(
  "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
);
console.log("\n Merhaba");
console.log(
  "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
);
console.log(
  "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
);
console.log(
  "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
);
console.log("\n Hoşgeldiniz");
console.log(
  "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
);
console.log(
  "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
);
console.log(
  "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
);
console.log("\n Haydi Başlayalım");
console.log(
  "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
);
console.log(
  "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
);
console.log(
  "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
);
// kullanıcıdan sürücü yolunu soruyoruz
rl.question(
  "\n Klasör isimlerinin yazılmasını istediğiniz sürücü yolunu girin: ",
  function (surucu) {
    // sürücü yolunun var olup olmadığını ve okunabilir olup olmadığını kontrol ediyoruz
    fs.access(surucu, fs.constants.R_OK, function (error) {
      // eğer hata varsa, bir hata mesajı yazıyoruz ve programı sonlandırıyoruz
      if (error) {
        console.error(
          "Girdiğiniz sürücü yolu geçersiz veya mevcut değil. Lütfen tekrar deneyin. CTRL+D Yapıp Programdan Çıkmalısınız."
        );
        return 0;
      }

      // sürücüdeki dosya ve klasör isimlerini ve türlerini okuyoruz
      fs.readdir(surucu, { withFileTypes: true }, function (error, files) {
        // eğer hata varsa, bir hata mesajı yazıyoruz ve programı sonlandırıyoruz
        if (error) {
          console.error(error.message);
          console.error(" CTRL+D Yapıp Programdan Çıkmalısınız.");
          return;
        }

        // klasör isimlerini bir diziye atıyoruz
        // .pkg uzantılı dosyaları da dahil ediyoruz
        let klasorler = files
          .filter((file) => file.isFile() && file.name.endsWith(".pkg"))
          .map((file, index) => {
            // her altıncı elemandan sonra bir boşluk ekliyoruz
            if ((index + 1) % 6 === 0) {
              return file.name + "\n\n";
            } else {
              return file.name;
            }
          });

        // eğer klasörler dizisi boşsa, yani .pkg uzantılı dosya bulunamadıysa, bir hata mesajı yazıyoruz ve programı sonlandırıyoruz
        if (klasorler.length === 0) {
          console.error(
            "Taranan sürücüde oyun bulunamadı. CTRL+D Yapıp Programdan Çıkmalısınız."
          );
          return;
        }

        // .pkg uzantılı dosyaların isimlerini dönüştürüyoruz
        klasorler = klasorler.map((name) => {
          return (
            name + " / " + surucu.replace(/[:/]/g, "") + " (B&R Elektronik)"
          );
        });

        // klasör isimlerini bir metin haline getiriyoruz
        let metin = klasorler.join("\n");

        // klasör isimlerini yazacağımız dosyanın adını ve konumunu belirliyoruz
        // dosya adı, kullanıcının girdiği sürücü ve klasör isimleri şeklinde olacak
        let dosya =
          "C:\\Users\\OEM\\Desktop\\" +
          surucu.replace(/[:/]/g, " ") +
          "Oyunları.txt";

        // klasör isimlerini dosyaya yazıyoruz
        fs.writeFile(dosya, metin, function (error) {
          // eğer hata varsa, bir hata mesajı yazıyoruz ve programı sonlandırıyoruz
          if (error) {
            console.error(error.message);
            console.log("CTRL+D Yapıp Programdan Çıkmalısınız.");
            return;
          }
          console.warn("Dosya Başarıyla Oluşturuldu oluşturdu.");
          console.log("\n");
          console.log(
            "Her 6 satırda bir ayrılan paragraf öbeklerini yapayzekaya atıp prompt olarakda: "
          );
          console.log("--Bu oyunların internette resmini oyananış videosunu bul ve tablo oluştur anchor text ile linkleri tabloya göm tabloya bakıldığında oyun hakkında bilgi edinebilinsin kısaca oyunuda açıkla depolama alanınıda belirt bu tabloda")
        });

        // readline arayüzünü kapatıyoruz
        rl.close();
      });
    });
  }
);
