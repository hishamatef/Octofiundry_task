# Octofiundry_task

## Installation

``` bash
# clone the repo
$ git clone https://github.com/hishamatef/Octofiundry_task.git my-project

# go into app's directory
$ cd my-project/backend

# install app's dependencies
$ composer install

```


1. Install MySQL
2. Create database (this way or another)
``` bash
$ mysql -uroot -p
mysql> create database laravel;
```

3. Update .env file
   Copy file ".env.example", and change its name to ".env"
```
cp .env.example .env
```
   Then in file ".env" complete database configuration:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

### Next step

``` bash
# in your app directory
# generate laravel APP_KEY
$ php artisan key:generate

# generate jwt secret
$ php artisan jwt:secret

# run database migration and seed
$ php artisan migrate:refresh --seed

```

```bash
# go to coreui directory
$ cd ../frontend

# install app's dependencies
$ npm install

```

``` bash
# back to laravel directory
$ cd ../laravel

# start local server
$ php artisan serve

$ cd ../coreui

$ npm run serve
```
Open your browser with address: [localhost:8080](localhost:8080)

If you need change backend adress go to file .env
And change line:
```js
VUE_APP_API_ENDPOINT='http://127.0.0.1:8000/api/'
```

### When you have project open in browser

Click "Login" on sidebar menu and log in with credentials:

* E-mail: _admin@admin.com_
* Password: _123456_

This user has roles: _user_ and _admin_

--- 
