# installation setup/guide by: Beolpluusor

installation Guide, not fully tested, working on this and fixing all when done properly.  
enjoy this project as I did building.  
if you have anything to ask just email me: arttu.sonne@live.co.uk  
---  
## PROJECT AA installation
[DEV installation](#project_aa_dev_installation)  
[APACHE/LAMP installation](#project_aa_server_installation)  

# what is project-aa  
its a website with full login/register system that uses database.  

# why I made this project  
#### point of this project is to learn full-stack building
- react /  single page application (SPA) website
 - SQL
 - frontend / backend communication
 - javascript
 - modern web solutions
 - web security  
   
- server installation 
 - learn how to install a website and sql database on a lamp/apache server. 

# who am I
My name is Arttu and Im a student at Riveria  
when I started learning coding in Riveria I've had this project in my mind many years ago.  
since my first touch in coding, which was C++, I have allways wanted to get better at coding/full-stack-development.  

But because of things and happenings that is becoming real for me right now.
now I have finally done it!


# project_aa_dev_installation
## requirements:
- Node.js 18 and npm
- MYSQL-server
- GIT
---

## dev installation

### 1. clone the project:
```bash
git clone https://github.com/Beolpluusor/projectaa-v2
```
### 2. create the database from the file:
```bash
projectaa_database.sql
```

### 3. install backend nodes
```bash
cd backend
npm install
```

### 4. run backend with command
```bash
npm start
```
####   if you want dev as automatic restart use
```bash
npm run dev
```

### 5. install frontend
```bash
cd projectaa-v2/frontend
npm install
npm run dev
```

# ALL DONE
#### enjoy the website, feel free to make new stuff in there!



# project_aa_server_installation
# apache/Lamp server installation GUIDE 

>installation isn't yet tested so there might be problems, im on to it when I have done few things.

### 1. setup node:
```bash
 curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
 sudo apt install -y nodejs
```

### 2. clone the project:
```bash
 cd /var/www
 sudo git clone https://github.com/Beolpluusor/projectaa-v2
 sudo chown -R $USER:$USER projectaa-v2
```

### 3. Create MYSQL
```bash
 mysql - u root -p
```
##### CREATE DATABASE projectaa;
 ##### import tables from the dump (projectaa_database.sql)
 
### 4. create backend .env:
```bash
 cd /var/www/projectaa-v2/backend
 nano .env
 and put there:
 JWT_SECRET=supersecret123
 DB_HOST=localhost
 DB_USER=root
 DB_PASSWORD=
 DB_NAME=projectaa
```
#### save and then close...

### 5. install backend nodes:
```bash
 cd /var/www/projectaa-v2/backend
 npm install
```

### 6. start backend as prodcution (PM2)
```bash
 sudo npm install -g pm2
 pm2 start server.js --nameprojectaa-backend
 pm2 save
 pm2 startup
```
#### backend is now running on port 5000
 
### 7. configurate apache reverse-proxy (recommended)

> apache -> node backend
> apache -> react build

 #### get mod_proxy:
 ```bash
   sudo a2enmod proxy
   sudo a2enmod proxy_http
   sudo Systemctl restart apache2
```
 
 #### create virtual host:
 ```bash 
   sudo nano /etc/apache2/sites-available/projectaa.conf
 ```

   #### ***** in the file copy this ******:
  ```bash
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
```

 #### then take it on use:
 ```bash
   sudo a2ensite projectaa.conf
   sudo Systemctl reload apache2
```

### 8. build frontend to production:
```bash
 cd /var/www/projectaa-v2/frontend
 npm install
 npm run build
```

#### create frontend .env:
```bash
   nano .env
```
#### and in there put this:
```bash
   VITE_API_URL=/api
```

#### test on browser: http://yourdomain.com
#### log in
#### check that if token is saved in localStorage
#### test proected routes (players, profile, games)

# All Done!
### you have now:
- apache that serves as react-frontend
- apache proxy that routes through /api -> node backend
- node backend runs on pm2
- MYSQL in LAMP-server
- JWT-protected API works in production

