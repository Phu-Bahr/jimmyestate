# JIMMY ESTATES

Jimmy Estate is a personal CMS app. My end goal was to create an application that would give the user most of the control on the content in their site like other CMS websites but without the additional costs. Currently it's geared towards Real Estate Agents but can be customized for any type of site.

The goal of this project was to learn how to implement a full application. Everything from the front end logic, the CSS displays, and responsiveness to the back end validations, data management, and http requests.

## Table of Contents:

- [**INSTALLATION**](#INSTALLATION)
  - [Cloning](#Cloning)
  - [Setting up Dev Environment](#Setting-up-Dev-Environment)
- [**Google Tools Installation**](#Google-Tools-Installation)
  - [Google Maps](#Google-Maps)
  - [Geocode API Install](#Geocode-API-Install)
  - [Email Rails Mailer with Gmail Install](#Email-Rails-Mailer-with-Gmail-Install)
  - [reCAPTCHA Install](#reCAPTCHA-Install)
  - [Google Analytics](#Google-Analytics)
- [**PRODUCTION**](#PRODUCTION)
  - [Setting up HEROKU](#Setting-up-HEROKU)
- [**Additonal Tech**](#Additonal-Tech)

## Main Technology

React v16.12.0\
Ruby on Rails v5.2.3\
Ruby 2.6.5\
PostgreSQL 11\
Heroku

## Features

Admin signed in:

- Add or edit all images with simple URL links
- Edit all content and titles
- Use a rich text editor for larger content
- Contact forms with reCAPTCHA sent to your email of choice
- Add new Communities/Partners dynamically
- Create Events and Map location associated with them
- Add or edit client testimonials
- Edit your Portfolio with new properties

---

## INSTALLATION

Needed for developer environment:

- Node >= v14.4.0 [Link](https://nodejs.org/en "Node Link")
- *Preferably* Yarn >= v1.22.4 [Link](https://yarnpkg.com "Yarn Link")
- Postgres >= v11 [Link](https://www.postgresql.org/ "Postgres Link")
- Ruby = v2.6.5 [Link](https://www.ruby-lang.org/en/documentation/installation/ "Ruby Link")
- Heroku account
- GitHub account

### **Cloning**

1. In terminal, be in the location you want to clone the project. Desktop, folder, etc, type in the below followed by the name of the app you want, in this case it's *my-real-estate-app*.\
   `git clone http://github.com/Phu-Bahr/jimmyestate.git my-real-estate-app`

2. Once cloned, got into the directory.

3. Back in GitHub, create a repository, name it, choose public or private, and leave the rest of the boxes blank. Create repository.

4. Back in your command line, if you type `git remote -v`, you'll see the app is still connected to the original repo.

5. Type `git remote rm origin` to disconnect it then we want to connect it to your own repo you just created `git remote add origin https://github.com/USERNAME/my-real-estate-app.git`.

6. `git remove -v` again and see if it connected correctly to your repo. If it is, then `git push origin master`.
  
### **Setting up Dev Environment**

1. In terminal (make sure you're in the folder) type `bundle install` to install all the gems in Gemlock file.

2. Make sure you have at least Ruby v2.6.5 defaulted for this.

3. Next, `yarn install` in your terminal. This will install all the dependencies in the package.json file. **For best practices, install future libraries using `yarn add` only and don't use `npm install`.

4. For now open the app in your text Editor. I'm using VSCode. Go to `config/environments/development.rb` file and comment out lines 43 to 50 for now. We're going to comment this back in later.

5. Now go to config/database.yml file. Replace jimmyestates on line 26, 55, 78-80 with the database name of your choice. i.e. `my_real_estate_app`

<p align="center">
   <img src="images/readme%20images/3-database-yml.png">
</p>

6. With this set up we can set up our rails environment now. In you terminal type in `rails db:create`. This will take the database.yml file and create your database in Postgres with it.

<p align="center">
   <img src="images/readme%20images/4-db-create-sample.png" width="500">
</p>

7. We have a database but no tables. Type in `rails db:migrate` to create the tables associated with rails migration file already set up.

<p align="center">
   <img src="images/readme%20images/5-db-migrate-sample.png" width="500">
</p>

8. Now that we have a database and tables, lets fill it with some sample data. Type in `rails db:seed`

9. Last step is to set up a User with admin rights. In your terminal again, type `rails c`. Info to rails console here [Link](https://guides.rubyonrails.org/command_line.html "Rails Intro"). Basically, in rails c you can test out rails app without being in the site. Think of it as entering CURL commands but for rails. We're in here to create a user and add it to the database.

10. Type:

```ruby
User.create!(email: "yourUserName@gmail.com", password: "coding", password_conformation: "coding", admin: true)
``` 
Admin: true is the main part we need. Type `exit` to exit out of rails c.

<p align="center">
   <img src="images/readme%20images/6-rails-c-sample.png">
</p>

11.  Everything is all set up. Time to test it. In your terminal type `rails s` to run the rails server, and in another tab in the terminal type in `./bin/webpack-dev-server`, to run the React side. Open browser to localhost:3000 and you should be set up to go.

---

### **Google Tools Installation**

#### Google Maps

1. For Google Maps to work, you'll need an api key. Get started [here](https://developers.google.com/maps/documentation/javascript/get-api-key "Google API").

2. Once you have your key, you need to make sure to restrict it's access, so other's won't use it maliciously. It won't be hidden in your code so restricting it here is best practice. Read more best practice [here](https://developers.google.com/maps/api-key-best-practices#restrict_apikey "API best practice")

3. In your console.developers.google.com API dashboard, click on *credentials* and then click on *js map key* or the default *JavaScript MAP API key*.

<p align="center">
   <img src="images/readme%20images/7-google-map-api-restriction.png" width="400">
</p>

4. From here under Application restrictions, you want to set it to HTTP referrers (web sites).

5. Under Website restrictions, add `localhost:3000/*` and a heroku name while we're still here. i.e. `my-real-estate-app.heroku.com/*`. When your site is live take off 3000 or change your 3000 path to something else so others can't use your api in their dev environment.

<p align="center">
   <img src="images/readme%20images/8-application-restriction.png" width="500">
</p>

6. Finally, for the API restrictions restrict key, 1 API, and make sure to **SAVE**. 

<p align="center">
   <img src="images/readme%20images/9-google-api-restriction.png" width="500">
</p>

7. Now that we can use the API, go to `App/Javascript/Constants/MapEvent.jsx` file, line 37 is where you input the key. 

<p align="center">
   <img src="images/readme%20images/10-map-api-destination.png" width="500">
</p>

#### Geocode API Install

1. Get your Geocode API [here](https://developers.google.com/maps/documentation/geocoding/start "Geocode API start").

2. Once you have it, restrict it. The restriction will be different from Google MAP API, you want `none` on Application restrictions and API restrictions put 1 api and select Geocode API.

<p align="center">
   <img src="images/readme%20images/11-geocode-restriction.png" width="500">
</p>

3. For this key, you'll be hiding it in your rails app and will not show in GitHub or the public. First, we need to start fresh. In `config` folder, delete `master.key` and `credentials.yml` files. 

<p align="center">
   <img src="images/readme%20images/12-secret-file-location.png" width="300">
</p>

*If you're using VSCode, you might need to `Shift+Cmd+P` then choose `Shell Command: Install "code" command in path` before running EDITOR*

<p align="center">
   <img src="images/readme%20images/13-shell-command.png" width="500">
</p>

4. In your terminal type `EDITOR="code --wait" rails credentials:edit`. replace code with atom or sublime, whatever text editor you're using. 

5. By doing this, you've created a new `master.key` file, and a new `credentials.yml` file that should be open in a new tab for you while it's still running in the terminal. Enter the below code.

> GEO_KEY: GEOCODE-API-KEY-HERE

#### Email Rails Mailer with Gmail Install

1. To use the Contact Me forms, we need to set up Rail's ActionMailer and a Google Account using it's gmail address to email out items. 

2. First create a new Google Account or user current account and reduce its security measures for your app to work.
   - Set up your Gmail to use 2-step verification [here](https://support.google.com/accounts/answer/185839?co=GENIE.Platform%3DDesktop&hl=en "2-step setup").
   - To get an app password, go to your Google account settings, click on `security tab`.
   - Under `Signing into Google`, click on `App passwords`. You'll only see this option if you have 2 step verification on.
   - Select `other (custom name)` under the Select App dropdown, enter the name of your app or something close to it.
   - Click on `Generate` and your new password will appear. Copy this and we need to put it in our `credentials.yml file.

<p align="center">
   <img src="images/readme%20images/14-email-app-password.png">
</p>

1. Back in your terminal type `EDITOR="code --wait" rails credentials:edit` and enter the below data:

> gmail:\
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;admin: emailReceiving@gmail.com\
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user: emailUsedToSendEmails@gmail.com\
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password: thepasswordWeJustSetUp2-Factor

**Email templates are located in App/views/user_mailer if you want to change the look of the emails.*

4. Now we can under the commenting we did earlier in `config/environments/development.rb` from line 43 to 50 as this block now has information it needs to work.

5. Restart Rails s and webpacker to text your email out in one of the contact forms.


```ruby
  # SMTP settings for gmail
  config.action_mailer.smtp_settings = {
    :address              => "smtp.gmail.com",
    :port                 => 587,
    :user_name            => Rails.application.credentials.gmail[:user],
    :password             => Rails.application.credentials.gmail[:password],
    :authentication       => "plain",
    :enable_starttls_auto => true
  }
  # Print deprecation notices to the Rails logger.
```


#### reCAPTCHA Install

1. Click [here](https://developers.google.com/recaptcha/intro "recaptcha intro") to create a reCAPTCHA API.

2. Once we have an API we need to restrict it per domain, go to [admin link](https://www.google.com/recaptcha/admin "admin recaptcha"), click on `settings cog` and add your domains. Mainly localhost:3000 and your heroku one my-real-estate-app.herokuapp.com

<p align="center">
   <img src="images/readme%20images/16-recaptcha-domains.png" >
</p>

3. Keep the first and last boxes checked off.

4. Once you have an api key, go to `app/javascript/Constants/Constants.jsx` and change the variable on line 394 with your recaptcha api key. This won't be hidden, however that's why you restricted it per domain.

```javascript
export const RecaptchaKey = "6LduIvAUAAAAANu_zPUXIWLmjk_L-ZWdJkAFJbx7";
```

#### Google Analytics

*skip to heroku production if you don't want to use this*
1. If you want to use this, it'll track all pages users visit as well as any mouse clicks on your site. Desktop or Mobile. 

2. Without going into all the details, get a tracking ID [here](https://support.google.com/analytics/answer/1008015?hl=en "GA tracking id").

3. Once you have your UA-#########-# ID, go to `app/javascript/packs/index.jsx` file. This is the topmost file when rendering your React App. From here plug in your tracking ID.

```javascript
ReactGA.initialize(
  [
    {
      trackingId: "UA-#########-#"
    }
  ]
  // { debug: true, alwaysSendToDefaultTracker: false }
);
ReactGA.pageview(window.location.pathname + window.location.search);

document.addEventListener("DOMContentLoaded", () => {
  render(<App />, document.body.appendChild(document.createElement("div")));
});
```

4. With all the google tools added:
```bash
git add .
git commit -m "committing auth updates"
git push origin master
```

should look like this: 

<p align="center">
   <img src="images/readme%20images/17-first-commit-push.png" width="500">
</p>

5. Start up the servers rails s and webpacker and test out adding an event on the home page. It should properly display google map and the location of the address you put in.
---

## PRODUCTION

### Setting up HEROKU

1. Make sure you have an Heroku account set up, if not set up [here](https://signup.heroku.com/ "heroku account setup").

2. Create an Heroku app in Heoku, choose an app name (we probably chosen it by now from the set up before ***`my-real-estate-app`**.herokuapp.com*)

<p align="center">
   <img src="images/readme%20images/18-heroku-create-new.png">
</p>

3. Everything else will be done in the command line. Make sure you have [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli "Heroku CLI Link") installed.

4. If you haven't logged into Heroku in your terminal yet type in `heroku login` and enter your credentials first.

5. Then type in below and it should be confirmed it's connected.
```bash
heroku git:remote -a my-real-estate-app 
```
<p align="center">
   <img src="images/readme%20images/19-remote-to-heroku.png">
</p>

6. If we try to push to heroku master now, the compilation will fail because it's missing our master key. 
   - Go to settings in Heroku -> config vars -> reveal vars.
   - Add your rails key as `RAILS_MASTER_KEY` and value is located in `app/config/master.key file`. 

<p align="center">
   <img src="images/readme%20images/20-heroku-config-vars.png">
</p>

7. Next we need to connect Postgres on Heroku. Go to resources -> then search for heroku postgres and click it.

<p align="center">
   <img src="images/readme%20images/21-attaching-postgres-heroku.png">
</p>

8. It'll ask you to confirm your order even though it's free. Make sure it's hobby dev. This will connect to your app automatically.

<p align="center">
   <img src="images/readme%20images/22-postgres-confirm.png">
</p>

9. Once you submit and go back to settings, there will be a new config var for the database.

<p align="center">
   <img src="images/readme%20images/23-postgres-config-var.png">
</p>

10. Now that Heroku is set up, we can finally push our repo, it'll take a few minutes while it compiles and deploys.
```bash
git push heroku master
```
<p align="center">
   <img src="images/readme%20images/24-deploy-confirmation.png">
</p>

*Now, if you go to your site my-real-estate-app.heroku.com, everything should be blank. We haven't migrated our tables for the **production** database or seeded the **production** database either.*

11. Back on Heroku click on More -> then run console.

<p align="center">
   <img src="images/readme%20images/25-heroku-more-menu.png">
</p>

12. We're going to do the same set up as dev environment; `rails db:migrate`, run another command, then `rails db:seed.`

<p align="center">
   <img src="images/readme%20images/26-heroku-run-console.png">
</p>

13. Run another command again, `rails c` to set up user. Type in whatever username and password like you did with the dev environment.

```ruby
User.create!(email: "yourUserName@gmail.com", password: "coding", password_conformation: "coding", admin: true)
``` 
**If you copy and paste into this console, it'll look like it's cut off, but will still work.*

> **Now if you open up the app or go to your heroku link, you'll have your production set up that anybody can see!**

---
**Extra tip, you can connect your deployment method via PRs to your github's master branch.*

1. Go to Heroku 
   - deploy 
   - deployment method
   - Click on GitHub -> find your repo

<p align="center">
   <img src="images/readme%20images/27-auto-deployment.png">
</p>

2. Choose which branch to deploy (usually master)
   - then click on enable automatic deploy

3. Now when you merge a branch to master, heroku will automatically deploy when your new updates from master.
---
## Additonal Tech

For contact information and maps:

- Google Geocode API
- react-google-maps (Google Maps API)
- react-google-invisble-recaptcha (reCAPTCHA)
- react-ga (Google Analytics)
- Rail’s ActionMailer

Admin access (no devise):

- Bcrypt
- Rack-cors

The fun stuff:

- SASS
- Google Analytics
- Bootstrap 4
- Fontawesome
- React-Animations
- React-Animate-on-scroll
- Animate.css
- Draft-js
- React-draft-wysiwyg
- React-particles-js
- Styled-Components
- React-bootstrap-sweetalert
- Moment
- Linea icons
- rd-slider
