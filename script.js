// $$$$$$$\   $$$\     $$$$$$$\        $$$$$$$$\ $$\           $$\         $$\                                   $$\ $$\
// $$  __$$\ $$ $$\    $$  __$$\       $$  _____|$$ |          $$ |        $$ |                                  \__|$$ |
// $$ |  $$ |\$$$\ |   $$ |  $$ |      $$ |      $$ | $$$$$$\  $$ |  $$\ $$$$$$\    $$$$$$\   $$$$$$\  $$$$$$$\  $$\ $$ |  $$\
// $$$$$$$\ |$$\$$\$$\ $$$$$$$  |      $$$$$\    $$ |$$  __$$\ $$ | $$  |\_$$  _|  $$  __$$\ $$  __$$\ $$  __$$\ $$ |$$ | $$  |
// $$  __$$\ $$ \$$ __|$$  __$$<       $$  __|   $$ |$$$$$$$$ |$$$$$$  /   $$ |    $$ |  \__|$$ /  $$ |$$ |  $$ |$$ |$$$$$$  /
// $$ |  $$ |$$ |\$$\  $$ |  $$ |      $$ |      $$ |$$   ____|$$  _$$<    $$ |$$\ $$ |      $$ |  $$ |$$ |  $$ |$$ |$$  _$$<
// $$$$$$$  | $$$$ $$\ $$ |  $$ |      $$$$$$$$\ $$ |\$$$$$$$\ $$ | \$$\   \$$$$  |$$ |      \$$$$$$  |$$ |  $$ |$$ |$$ | \$$\
// \_______/  \____\__|\__|  \__|      \________|\__| \_______|\__|  \__|   \____/ \__|       \______/ \__|  \__|\__|\__|  \__|

const { Console } = require("console");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n");
console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");

rl.question(
  "\n Klasör isimlerinin yazılmasını istediğiniz sürücü yolunu girin: ",
  function (surucu) {
    fs.access(surucu, fs.constants.R_OK, function (error) {
      if (error) {
        console.error(
          "Girdiğiniz sürücü yolu geçersiz veya mevcut değil. Lütfen tekrar deneyin. CTRL+D Yapıp Programdan Çıkmalısınız."
        );
        return 0;
      }

      fs.readdir(surucu, { withFileTypes: true }, function (error, files) {
        if (error) {
          console.error(error.message);
          console.error(" CTRL+D Yapıp Programdan Çıkmalısınız.");
          return;
        }

        let games = files
          .filter((file) => file.isFile() && file.name.endsWith(".pkg"))
          .map((file) => file.name);

        if (games.length === 0) {
          console.error(
            "Taranan sürücüde oyun bulunamadı. CTRL+D Yapıp Programdan Çıkmalısınız."
          );
          return;
        }

        let groupedGames = groupAndNumberGames(games);

        let metin = groupedGames
          .map(
            (group, index) =>
              `${index + 1}- ${group.name} / ${surucu.replace(
                /[:/]/g,
                ""
              )} (B&R Elektronik)`
          )
          .join("\n");

        let dosya =
          "C:\\Users\\OEM\\Desktop\\" +
          surucu.replace(/[:/]/g, " ") +
          "Oyunları.txt";

        fs.writeFile(dosya, metin, function (error) {
          if (error) {
            console.error(error.message);
            console.log("CTRL+D Yapıp Programdan Çıkmalısınız.");
            return;
          }
          console.warn("Dosya Başarıyla Oluşturuldu oluşturdu.");
          console.log("\n");
          console.log(
            "Her 6 satırda bir ayrılan paragraf öbeklerini yapayzekaya atıp prompt olarak da: "
          );
          console.log(
            "--Bu oyunların internette resmini oyananış videosunu bul ve tablo oluştur anchor text ile linkleri tabloya göm tabloya bakıldığında oyun hakkında bilgi edinebilinsin kısaca oyunuda açıkla depolama alanınıda belirt bu tabloda"
          );
        });

        rl.close();
      });
    });
  }
);

function groupAndNumberGames(games) {
  let groupedGames = [];

  games.forEach((game) => {
    let groupName = getGroupName(game);
    let existingGroup = groupedGames.find((group) => group.name === groupName);

    if (existingGroup) {
      existingGroup.count++;
    } else {
      groupedGames.push({ name: groupName, count: 1 });
    }
  });

  groupedGames.forEach((group) => {
    if (group.count > 1) {
      group.name += `_${group.count}`;
    }
    delete group.count;
  });

  return groupedGames;
}

function getGroupName(game) {
  let parts = game.split(".");
  parts.pop(); // Remove file extension
  return parts.join(".");
}
