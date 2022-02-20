

![Logo](https://ik.imagekit.io/s3ixzlcmo8v/filesync12_2F4DsqlpaVm_.png?ik-sdk-version=javascript-1.4.3&updatedAt=1645179823107)

##

**File sharing web platform**  -- stores data and can be used to share files with firebase authentication , PDF encryption  and custom express api's 

 # **build using()**  

 * **HTML :** Markdown
 * **CSS :** Styling Markdown 
 * **Javascript :** Plain Javascript in frontend 
 * **EJS :** Templating Engine 
 * **Node JS :** Backend Server which works on V8 engine of Javascript
 * **Express JS :** Backend Framework 
 * **Mongo DB :** Database 
 * **Firebase :** Used for authentication of users



## Run Locally

Clone the project

```bash
  git clone https://github.com/Mr-Internetix/file-sync.git
```

Go to the project directory

```bash
  cd file-sync
```

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm run dev 
```





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`MONGO_CONNECTION_URL = your mongo-db atlas api key` 

`APP_BASE_URL = http://localhost:3000` 
`you-can change it when deployment use your domain name`

`PORT = 8000` `not mandatory but use it for safer side`









## Setting up firebase 

` Its simple just add the json file Downloaded from the firabase platform with  file-name ` **serviceAccountKey.json** `in your root folder of the project i.e next to - server.js file `



## Change configuration in `/public/js/login.js`

```
var firebaseConfig = {
       // add your firebase configuration
    };

```
## Change Host in frontend in order to send files in both files 
`/public/js/index.js` , `/public/js/user.js`

```javascript
const host = "https://localhost:3000"

```


## Database configs

`Just add the Database url in .env file ( I expect that mongo will create the collections automatically if not,
create manually by creating three collections i.e 
` 
* users
* files
* userfiles
# License
MIT License.
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

You can use this project for free without notifying me by forking this project under the following conditions:

* Add a link to my Repository or [my-profile](https://www.github.com/mr-internetix)
* Star the repository 



[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://paypal.me/mrinternetix)



