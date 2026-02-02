

###########################################################################
📦 Project AA v2 – Asennusohjeet
Tämä ohje kertoo, kuinka Project AA v2 ‑sovellus asennetaan ja käynnistetään paikallisesti Windows‑ympäristössä XAMPP:in ja Node.js:n avulla.

🔧 1. Vaatimukset
Varmista, että seuraavat ovat asennettuna:
- Node.js (v18+ suositeltu)
https://nodejs.org
- XAMPP (Apache + MySQL)
https://www.apachefriends.org
- Git
https://git-scm.com
###########################################################################

📥 2. Projektin lataus
Avaa komentorivi ja suorita:
git clone https://github.com/Beolpluusor/projectaa-v2
cd projectaa-v2


Projektissa on kaksi pääosaa:
/frontend
/backend

###########################################################################
🗄️ 3. MySQL-tietokannan asennus (XAMPP)
- Käynnistä XAMPP Control Panel
- Käynnistä Apache ja MySQL
- Avaa phpMyAdmin:
http://localhost/phpmyadmin
- Luo uusi tietokanta:
projectaa


- Tuo projektin mukana tuleva SQL‑tiedosto:
backend/database/projectaa_structure.sql


Tämä luo kaikki taulut ja rakenteet.

###########################################################################
⚙️ 4. Backendin asennus
Siirry backend‑kansioon:
cd backend


Asenna riippuvuudet:
npm install


Luo backendin .env‑tiedosto:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=projectaa
PORT=3001


Käynnistä backend:
node server.js


Backend toimii nyt osoitteessa:
http://localhost:3001

###########################################################################
🚀 6. Sovelluksen käyttö
- Avaa selain ja siirry osoitteeseen:
http://localhost:5173


- Rekisteröi uusi käyttäjä
- Kirjaudu sisään
- Pelaa Reaction Game tai Snake
- Tulokset tallentuvat tietokantaan
- Voit tarkastella profiilia, Hall of Famea ja käyttäjälistaa
- 
###########################################################################
🛠️ 7. Projektin rakenne
projectaa-v2/
│
├── backend/        # Node.js + Express + MySQL API
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── database/
│
└── frontend/       # React + Vite + Mantine UI
    ├── src/
    ├── pages/
    ├── components/
    └── assets/
###########################################################################



========================================================
 Project AA v2 – Asennusohjeet XAMPP- ja LAMP-palvelimille
========================================================

Tämä tiedosto sisältää täydelliset ohjeet Project AA v2 -sovelluksen
asentamiseen sekä Windowsin XAMPP-ympäristöön että Linuxin LAMP-palvelimelle.

Projekti koostuu kahdesta osasta:

  1) FRONTEND  (React + Vite + Mantine)
  2) BACKEND   (Node.js + Express + MySQL)

Frontend toimii Apache-palvelimen kautta.
Backend toimii Node.js-palveluna (portti 3001).
Apache toimii reverse proxyna backendille.

--------------------------------------------------------
 1. VAATIMUKSET
--------------------------------------------------------

- Node.js 18+
- MySQL / MariaDB
- Apache 2.4+
- Git
- XAMPP (Windows) TAI LAMP (Linux)
- mod_proxy ja mod_proxy_http Apache-moduulit

--------------------------------------------------------
 2. PROJEKTIN LATAUS
--------------------------------------------------------

git clone https://github.com/Beolpluusor/projectaa-v2
cd projectaa-v2

Projektissa on kaksi kansiota:

  /frontend
  /backend

--------------------------------------------------------
 3. TIETOKANNAN ASENNUS (XAMPP & LAMP)
--------------------------------------------------------

1. Avaa phpMyAdmin:
   http://localhost/phpmyadmin

2. Luo tietokanta:

   projectaa

3. Tuo SQL-rakenne:

   backend/database/projectaa_structure.sql

--------------------------------------------------------
 4. BACKENDIN ASENNUS (Node.js)
--------------------------------------------------------

cd backend
npm install

Luo .env-tiedosto:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=projectaa
PORT=3001

Käynnistä backend:

node server.js

Backend toimii osoitteessa:
http://localhost:3001

--------------------------------------------------------
 5. FRONTENDIN ASENNUS
--------------------------------------------------------

cd frontend
npm install

Luo .env:

VITE_API_URL=http://yourdomain.com/api

Buildaa tuotantoversio:

npm run build

Tämä luo kansion:
frontend/dist

--------------------------------------------------------
 6. FRONTENDIN ASENNUS APACHEEN
--------------------------------------------------------

XAMPP (Windows):
  Kopioi dist/ → C:\xampp\htdocs\projectaa\

LAMP (Linux):
  Kopioi dist/ → /var/www/html/projectaa/

--------------------------------------------------------
 7. APACHE REVERSE PROXY BACKENDILLE
--------------------------------------------------------

XAMPP (Windows):
  Muokkaa:
    C:\xampp\apache\conf\extra\httpd-vhosts.conf

LAMP (Linux):
  Muokkaa:
    /etc/apache2/sites-available/000-default.conf

Lisää:

<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot "/var/www/html/projectaa"

    ProxyPreserveHost On
    ProxyPass /api http://localhost:3001
    ProxyPassReverse /api http://localhost:3001
</VirtualHost>

--------------------------------------------------------
 8. APACHE-MODUULIEN AKTIVOINTI
--------------------------------------------------------

XAMPP (Windows):
  Varmista että nämä rivit EIVÄT ole kommentoituina:

    LoadModule proxy_module modules/mod_proxy.so
    LoadModule proxy_http_module modules/mod_proxy_http.so

LAMP (Linux):

sudo a2enmod proxy
sudo a2enmod proxy_http
sudo systemctl restart apache2

--------------------------------------------------------
 9. TESTAUS
--------------------------------------------------------

Avaa selain:

Frontend:
  http://yourdomain.com

Backend (proxyn kautta):
  http://yourdomain.com/api/login
  http://yourdomain.com/api/profile/5

--------------------------------------------------------
 10. VALMIS!
--------------------------------------------------------

Project AA v2 toimii nyt tuotantovalmiina Apache-palvelimella:

- Frontend → Apache palvelee staattiset tiedostot
- Backend → Node.js pyörii portissa 3001
- Apache → välittää API-kutsut Node-palvelimelle

========================================================




