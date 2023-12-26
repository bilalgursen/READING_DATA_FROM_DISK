// $$$$$$$\   $$$\     $$$$$$$\        $$$$$$$$\ $$\           $$\         $$\                                   $$\ $$\
// $$  __$$\ $$ $$\    $$  __$$\       $$  _____|$$ |          $$ |        $$ |                                  \__|$$ |
// $$ |  $$ |\$$$\ |   $$ |  $$ |      $$ |      $$ | $$$$$$\  $$ |  $$\ $$$$$$\    $$$$$$\   $$$$$$\  $$$$$$$\  $$\ $$ |  $$\
// $$$$$$$\ |$$\$$\$$\ $$$$$$$  |      $$$$$\    $$ |$$  __$$\ $$ | $$  |\_$$  _|  $$  __$$\ $$  __$$\ $$  __$$\ $$ |$$ | $$  |
// $$  __$$\ $$ \$$ __|$$  __$$<       $$  __|   $$ |$$$$$$$$ |$$$$$$  /   $$ |    $$ |  \__|$$ /  $$ |$$ |  $$ |$$ |$$$$$$  /
// $$ |  $$ |$$ |\$$\  $$ |  $$ |      $$ |      $$ |$$   ____|$$  _$$<    $$ |$$\ $$ |      $$ |  $$ |$$ |  $$ |$$ |$$  _$$<
// $$$$$$$  | $$$$ $$\ $$ |  $$ |      $$$$$$$$\ $$ |\$$$$$$$\ $$ | \$$\   \$$$$  |$$ |      \$$$$$$  |$$ |  $$ |$$ |$$ | \$$\
// \_______/  \____\__|\__|  \__|      \________|\__| \_______|\__|  \__|   \____/ \__|       \______/ \__|  \__|\__|\__|  \__|
const axios = require("axios");
const fs = require("fs");
const readline = require("readline");
const slugify = require("slugify");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n Klasör isimlerinin yazılmasını istediğiniz sürücü yolunu girin: ");

rl.question("Sürücü yolu: ", async function (surucu) {
  fs.access(surucu, fs.constants.R_OK, async function (error) {
    if (error) {
      console.error("Girdiğiniz sürücü yolu geçersiz veya mevcut değil. Lütfen tekrar deneyin.");
      rl.close();
      return;
    }

    fs.readdir(surucu, { withFileTypes: true }, async function (error, files) {
      if (error) {
        console.error(error.message);
        console.error("Programdan çıkılıyor...");
        rl.close();
        return;
      }

      let games = files
        .filter((file) => file.isFile() && file.name.endsWith(".pkg"))
        .map((file) => file.name);

      if (games.length === 0) {
        console.error("Taranan sürücüde oyun bulunamadı. Programdan çıkılıyor...");
        rl.close();
        return;
      }

      console.log("B&R Elektronik tarafından oluşturulan yapay zekadan istek alınıyor. Lütfen bekleyin...");

      let slugifiedGameNames = games
        .map((game) => slugify(game.replace(".pkg", ""), { lower: true }))
        .join(","); // Oyun isimlerini slug formatına çevir

      // API'ye istek gönderme
      const apiUrl = `https://api.gglvxd.eu.org/v1/chatgpt?q=Merhaba Sen br elektronikde çalışan bir yazılımcı rolündesin bu attığım listeyi ${encodeURIComponent(slugifiedGameNames)}Tablo halinde organize edip oyunların ismi türü ve kısa açıklaması olan markdown kodunu yaz.`;

      try {
        const response = await axios.get(apiUrl);
        console.log("Yapay zeka sonucu oluşturdu. Sonuç dosyaya yazılıyor...");

        // API'nin döndüğü chat verisini al
        const chatResponse = response.data.chat;

        // Sonucu bir dosyaya yaz
        const dosya = "C:\\Users\\OEM\\Desktop\\apiSonucu.txt";
        fs.writeFile(dosya, chatResponse, function (error) {
          if (error) {
            console.error("Dosyaya yazma hatası:", error.message);
          } else {
            console.log(`Sonuç dosyası oluşturuldu: ${dosya} b&r elektronik olarak iyi günler dileriz...`);
          }
        });
      } catch (error) {
        console.error("API isteği sırasında bir hata oluştu:", error.message);
      }

      rl.close();
    });
  });
});

// Kullanıcıya yükleniyor gibi bildirimler
const loadingIndicator = ["   ", ".  ", ".. ", "..."];
let loadingIndex = 0;
const loadingInterval = setInterval(() => {
  process.stdout.write("\r" + loadingIndicator[loadingIndex]);
  loadingIndex = (loadingIndex + 1) % loadingIndicator.length;
}, 10000);

// readline arayüzü kapatıldığında yükleniyor bildirimini temizle
rl.on("close", () => {
  clearInterval(loadingInterval);
});
