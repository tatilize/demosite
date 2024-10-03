// Oyun ve koyu mod için JavaScript

const alphabet = {
    row1: "QWERTYUIOPĞÜ",
    row2: "ASDFGHJKLŞİ",
    row3: "ZXCVBNMÖÇ"
};
const countries = [
    "TÜRKİYE", "ALMANYA", "FRANSA", "İTALYA", "İSPANYA", "PORTEKİZ", "YUNANİSTAN", "HOLLANDA", 
    "RUSYA", "ÇİN", "JAPONYA", "BREZİLYA", "MEKSİKA", "KANADA", "MISIR", "İSVEÇ", "İSVİÇRE", 
    "NORVEÇ", "İNGİLTERE", "ABD", "HİNDİSTAN", "PAKİSTAN", "ENDONEZYA", "AVUSTRALYA", "GÜNEY KORE", 
    "GÜNEYAFRİKA", "ARJANTİN", "ŞİLİ", "FİNLANDİYA", "DANİMARKA", "BELÇİKA", "AVUSTURYA", 
    "POLONYA", "MACARİSTAN", "İRAN", "IRAK", "SURİYE", "SUUDİARABİSTAN", "FİLİPİNLER", "VİETNAM"
];

let selectedWord = "";
let displayWord = "";
let remainingLives = 5;
let timer = 59;
let countdown;

// Logo'ya tıklama eventi ekliyoruz
document.querySelector('.logo').addEventListener('click', function() {
    // Ana sayfa bileşenlerini tekrar görünür yap
    document.querySelector('h1').innerHTML = 'Sitemiz Bakımda';
    document.querySelector('p').textContent = 'Size daha iyi hizmet verebilmek için sitemizi güncelliyoruz. Vakit geçirmeniz için sizlere minik bir oyun hazırladık. Tatilize etmeye çok az kaldı!';
    document.getElementById('start-game').innerHTML = '<i class="fas fa-gamepad"></i>';
    document.querySelector('.logo1').style.display = 'block';

    // Oyun alanını gizle
    document.getElementById('game-container').style.display = 'none';

    // Mesajı da gizle
    const messageElement = document.getElementById('game-message');
    messageElement.style.display = 'none';

    // Gerekirse herhangi bir diğer elementin görünürlüğünü de eski haline getir
    // Main alanına yukarı hareket sınıfını kaldır
    document.querySelector('main').classList.remove('move-up');
});

document.getElementById('start-game').addEventListener('click', function() {
    // Oyun başladığında içeriği değiştir
    document.querySelector('h1').innerHTML = '<i class="fa-solid fa-earth-americas"></i>';
    document.querySelector('p').textContent = 'Ülkeyi bulabilir misin?';
    document.getElementById('start-game').innerHTML = '<i class="fa-solid fa-plane-departure"></i>';
    document.querySelector('.logo1').style.display = 'none';
    
    // Oyun container'ını göster ve oyunu başlat
    document.getElementById('game-container').style.display = 'block';
    document.querySelector('main').classList.add('move-up');
    
    // Oyun başladığında mesajı gizle
    const messageElement = document.getElementById('game-message');
    messageElement.style.display = 'none';
    
    startGame();
});

function startGame() {
    resetGame();
    selectedWord = countries[Math.floor(Math.random() * countries.length)].toUpperCase();
    displayWord = "_".repeat(selectedWord.length);
    document.getElementById('word').textContent = displayWord;
    document.getElementById('remaining-lives').textContent = remainingLives;
    startCountdown();

    // Klavyeyi oluştur
    createKeyboard();
}

function resetGame() {
    clearInterval(countdown);
    timer = 59;
    remainingLives = 5;
    document.getElementById('timer').textContent = timer;

    // Harfleri tekrar aktif hale getir
    enableAllLetters();
}

function startCountdown() {
    countdown = setInterval(function() {
        timer--;
        document.getElementById('timer').textContent = timer;
        if (timer === 0) {
            clearInterval(countdown);
            endGame("Zaman doldu!", "fail");
        }
    }, 1000);
}

function endGame(message, status) {
    const messageElement = document.getElementById('game-message');
    messageElement.textContent = message;
    messageElement.classList.remove("success", "fail");
    messageElement.classList.add(status);
    messageElement.style.display = "block";

    // Geri sayımı durdur
    clearInterval(countdown);

    // Tüm harf butonlarını inaktif yap
    disableAllLetters();
}

function disableAllLetters() {
    const letterButtons = document.querySelectorAll('.keyboard .row span');
    letterButtons.forEach(button => {
        button.classList.add('disabled');
    });
}

function enableAllLetters() {
    const letterButtons = document.querySelectorAll('.keyboard .row span');
    letterButtons.forEach(button => {
        button.classList.remove('disabled');
    });
}

// Klavye oluşturma
function createKeyboard() {
    const row1 = document.getElementById('row1');
    const row2 = document.getElementById('row2');
    const row3 = document.getElementById('row3');

    row1.innerHTML = createKeyboardRow(alphabet.row1);
    row2.innerHTML = createKeyboardRow(alphabet.row2);
    row3.innerHTML = createKeyboardRow(alphabet.row3);

    document.querySelectorAll('.keyboard-letter').forEach(letter => {
        letter.addEventListener('click', handleLetterClick);
    });
}

function createKeyboardRow(letters) {
    return letters.split('').map(letter => `<span class="keyboard-letter">${letter}</span>`).join('');
}

// Harf tıklama fonksiyonu
function handleLetterClick(event) {
    const letter = event.target.textContent;

    // Eğer buton zaten inaktifse (disabled) tıklanmasın
    if (event.target.classList.contains('disabled')) {
        return;
    }

    // Doğru veya yanlış harf kontrolü
    if (selectedWord.includes(letter)) {
        updateWord(letter);
    } else {
        remainingLives--;
        document.getElementById('remaining-lives').textContent = remainingLives;
        if (remainingLives === 0) {
            endGame("Tekrar Dene!", "fail");
        }
    }

    // Tıklanan harfi inaktif yap ve tıklanmış olduğunu belli et
    event.target.classList.add('disabled');
    event.target.classList.add('clicked'); // Tıklanan buton için sabit hover ekleyelim
}

function updateWord(letter) {
    let newDisplayWord = "";
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            newDisplayWord += letter;
        } else {
            newDisplayWord += displayWord[i];
        }
    }
    displayWord = newDisplayWord;
    document.getElementById('word').textContent = displayWord;

    if (!displayWord.includes("_")) {
        endGame("Doğru!", "success");
    }
}

// Koyu mod
const darkModeBtn = document.getElementById('dark-mode-toggle');
darkModeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// Mobil titreşim
document.querySelectorAll('.game-btn').forEach(button => {
    button.addEventListener('click', () => {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(100);
        }
    });
});
