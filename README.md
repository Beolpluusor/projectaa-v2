<div>
   <h1>made by: <bold>Beolpluusor</bold></h1>
   <p>
      installation Guide, not fully tested, working on this and fixing all when done properly.
      enjoy this project as I did building. if you have anything to ask just email me: arttu.sonne@live.co.uk 
   </p>
</div>

<h1>PROJECT AA installation</h1>

<div>
   <h3>requirements:</h3>
   <ul>
      <li>
         Node.js 18 and npm
      </li>
      <li>
         MYSQL-server
      </li>
      <li>
         GIT
      </li>
   </ul>
</div>

<h1>---dev installation</h1>
<div>
   <h3>1.</h3>
      <p>
         clone the project:
         git clone https://github.com/Beolpluusor/projectaa-v2
      </p>
   
   <h2>2.</h2>
      <h2>create the database from the file:</h2>
      <p>
         projectaa_database.sql
      </p>

3.
   install backend nodes
    cd backend
    npm install
 
4.
 run backend with command
  npm start
  if you want dev as automatic restart use
  npm run dev

6. install frontend
   cd projectaa-v2/frontend
   npm install
   npm run dev
</div>

!*** --- lamp/apache installation --- ***!
installation isn't yet tested so there might be problems, im on to it when I have done few things.
1.
  setup node:
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt install -y nodejs
2. 
  clone the project:
  cd /var/www
  sudo git clone https://github.com/Beolpluusor/projectaa-v2
  sudo chown -R $USER:$USER projectaa-v2
3.
  Create MYSQL
  mysql - u root -p
  CREATE DATABASE projectaa;
  import tables from the dump (projectaa_database.sql)
4.
  create backend .env:
  cd /var/www/projectaa-v2/backend
  nano .env
  and put there:
  JWT_SECRET=supersecret123
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=
  DB_NAME=projectaa
  ,after those save and then close...
  
5. 
  install backend nodes:
  cd /var/www/projectaa-v2/backend
  npm install

6. start backend as prodcution (PM2)
   sudo npm install -g pm2
   pm2 start server.js --nameprojectaa-backend
   pm2 save
   pm2 startup
     backend is now running on port 5000
   
7. configurate pache reverse-proxy (recommended)
     apache -> node backend
     apache -> react build
   get mod_proxy:
     sudo a2enmod proxy
     sudo a2enmod proxy_http
     sudo Systemctl restart apache2
   
   create virtual host:
     sudo nano /etc/apache2/sites-available/projectaa.conf
   
      ***** inside put this ******:
   
     <VirtualHost *:80>
        ServerName yourdomain.com

        # Frontend build
        DocumentRoot /var/www/projectaa-v2/frontend/dist
        <Directory /var/www/projectaa-v2/frontend/dist>
            AllowOverride All
            Require all granted
        </Directory>
    
        # Backend proxy
        ProxyPass /api http://localhost:5000/
        ProxyPassReverse /api http://localhost:5000/
    </VirtualHost>

    then take it on use:
     sudo a2ensite projectaa.conf
     sudo Systemctl reload apache2

  
8. build frontend to production
   cd /var/www/projectaa-v2/frontend
   npm install
   npm run build

   create frontend .env:
     nano .env
   and in there put this:
     VITE_API_URL=/api

then test on browser: http://yourdomain.com
log in
check that if token is saved in localStorage
test proected routes (players, profile, games)

All Done!
you have now:
- apache that serves as react-frontend
- apache proxy that routes through /api -> node backend
- node backend runs on pm2
- MYSQL in LAMP-server
- JWT-protected API works in production
