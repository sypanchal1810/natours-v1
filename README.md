# Natours - The Ultimate Adventure Tours

Welcome to Natours! This is a full-stack application that provides ultimate adventure tours to
users. This README file provides detailed documentation on the project, covering various aspects
from technology stack to deployment.

> #### Natours - The Ultimate Adventure Tours, is now deployed and live: [Click Here!](https://natours-v1.onrender.com) 😍🥳🎉

##### \*\* If above link not works then [Click Here!](https://natour-v1.azurewebsites.net/)

> ⚠️ **Note:** Please wait for sometime because it's a free hosting.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Key Features](#key-features)
3. [Prerequisites](#prerequisites)
   - [Login With Google Integration](#login-with-google-integration)
   - [MongoDB creation](#mongodb-creation)
   - [Mailtrap account](#mailtrap-account)
   - [Gmail account setup](#gmail-account-setup)
   - [Firebase account setup](#firebase-account-setup)
   - [Stripe account setup](#stripe-account-setup)
4. [Installation and Usage](#installation-and-usage)

## Technologies Used

The Natours application is built using the following technologies:

- HTML: Markup language for creating web pages.
- CSS: Styling language for designing web pages.
- SCSS: A CSS preprocessor that enhances CSS functionality.
- JavaScript: Programming language for adding interactivity to web pages.
- MongoDB: NoSQL database for storing application data.
- Mongoose: MongoDB object modeling tool for Node.js.
- Express.js: Web application framework for Node.js.
- Node.js: JavaScript runtime environment for server-side development.
- Pug: Template engine for server-side rendering.
- Postman: Collaboration platform for API development and testing.

## Key Features

- REST APIs using Express.js
- Working with data in NoSQL databases, specifically MongoDB, using Mongoose.
- CRUD (Create, Read, Update, Delete) operations with MongoDB and advanced features offered by
  Mongoose.
- Advanced authentication and authorization techniques, including encryption, sanitization and rate
  limiting for enhanced security.
- Server-side website rendering using Pug templates for efficient rendering on the server.
- Credit card payment integration using Stripe for seamless online payments.
- Sending Gmail to the user for account activation, welcome and password reset.
- Responsive design to ensure optimal user experience across different devices.
- Full stack application development

## Prerequisites

Before running the Natours application, make sure you have the following prerequisites:

- #### Login With Google Integration:

1. Go to the [Google Developers Console](https://console.developers.google.com/) and create a new
   project.

2. Go to APIs and Services tab > OAuth consent screen.

   1. Select External and then Create
   2. In Step: 1 - OAuth consent screen, fill up the necessary details like App Name, Developer
      Email etc.

      > ⚠️ **Important:** Don't upload App Logo Now, It needs verification.

   3. In Step: 2 - Scopes, add the following scopes

      1. `.../auth/userinfo.email`
      2. `.../auth/userinfo.profile`

   4. In Step: 3 - Optional
   5. In Step: 4 - Shows Summary. Check all the details once and then click Back To Dashboard.

3. Go to APIs and Services tab > Credentials > Create Credentials > OAuth Client Id.

   1. Application Type - Web Application
   2. Give the name of application as per your choice
   3. Now, Add Authorised JavaScript origins:

      1. If You are working on locahost then add following URL:

         ```
         http://127.0.0.1:5000
         ```

      2. Else you can add your website name like this:
         ```
         https://natours.onrender.com
         ```

   4. Now, Add Authorised redirect URIs:

      1. If You are working on locahost then add following URL:

         ```
         http://127.0.0.1:5000/auth/google/callback
         ```

      2. Else you can add for your website like this:
         ```
         https://natours.onrender.com/auth/google/callback
         ```

   5. Press the "Create" Button.

4. Obtain the client ID and client secret for your application.

5. In your project directory, create a `config.env` file and add the following lines:
   ```
   GOOGLE_OAUTH_CLIENT_ID=your_client_id
   GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret
   ```

> ⚠️ **Important:** Make sure to replace `your_client_id` and `your_client_secret` with the actual
> values obtained from the respective social media platform.

> 🔗 For detailed information on how Google Authentication and OAuth Flow works
> [Read This Article!](https://developer.okta.com/docs/concepts/oauth-openid/#choosing-an-oauth-2-0-flow)

- #### MongoDB creation:

1. Go to the [MongoDB Cloud Services](https://www.mongodb.com/cloud) website and create a new
   account if you haven't already.

2. Once logged in, navigate to the MongoDB Cloud Dashboard and click on "Create a New Cluster" to
   set up a new cluster for your database.

3. Configure your cluster by selecting the cloud provider, region, and cluster tier that best suits
   your needs. You can also customize additional settings like the number of replica sets and shard
   clusters.

4. Once the cluster is created and provisioned, click on "Database Access" in the left sidebar to
   create a new database user.

5. Click on the "Add New Database User" button and provide a username and password for the database
   user. Make sure to save these credentials in a secure location.

6. Next, click on "Network Access" in the left sidebar to configure the network access settings for
   your cluster.

7. Click on the "Add IP Address" button to allow access from your current IP address or add a
   specific IP range. You can also choose to allow access from anywhere (0.0.0.0/0).

8. After configuring the network access, click on "Clusters" in the left sidebar and then click on
   the "Connect" button for your cluster.

9. Choose the "Connect Your Application" option and select the driver and version you're using for
   your application (e.g., Node.js and the latest version).

10. Copy the connection string provided. It should be something like:

    ```
    mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_URL>/<DATABASE_NAME>?retryWrites=true&w=majority
    ```

11. Replace `<USERNAME>` and `<PASSWORD>` with the credentials you created in step 5. Also, replace
    `<CLUSTER_URL>` with the URL provided in the connection string, and `<DATABASE_NAME>` with the
    name you want to give to your database (e.g., "natours").

12. In your project directory, open the `config.env` file and add the following lines:

    ```
    DATABASE=<YOUR_CONNECTION_STRING>
    DATABASE_USERNAME=<USERNAME>
    DATABASE_PASSWORD=<PASSWORD>
    ```

> ⚠️ **Important:** Make sure to replace `<YOUR_CONNECTION_STRING>` with the modified connection
> string from step 11, `<USERNAME>` with the database username, and `<PASSWORD>` with the database
> password you created.

- #### Mailtrap account:

  ##### (\*\* Only for receiving email in development mode)

1. Go to the [Mailtrap Platform](https://mailtrap.io/) and create a new account

2. Create new project for receive the mail in inbox.

3. Get the credentials and in your project directory, open the `config.env` file and add the
   following lines:

   ```
   # MAILTRAP CONFIGURATIONS
    EMAIL_USERNAME=your_email_username
    EMAIL_PASSWORD=your_password
    EMAIL_HOST=sandbox.smtp.mailtrap.io
    EMAIL_PORT=25 or 465 or 587 or 2525 (Add one of them only like this EMAIL_PORT=25)
   ```

> ⚠️ **Important:** Make sure to replace `your_email_username` and `your_password` with the actual
> values obtained from mailtrap platform.

- #### Gmail account setup:

  ##### (\*\* Only for sending email in production mode)

1. Go to the [Google Account](https://myaccount.google.com/) > Security > 2-step verification and
   verify yourself

2. Back to Security in "Signing in to Google" section choose App passwords

3. From the Select app drop down choose Other (Custom name) and put a name e.g. nodemailer

4. A modal dialog will appear with the password. Get that password.

5. In your project directory, open the `config.env` file and add the following lines:

   ```
   # GMAIL CONFIGURATIONS
    GMAIL_USERNAME=your_gmail
    GMAIL_PASSWORD=your_password
   ```

> ⚠️ **Important:** Make sure to replace `your_gmail` and `your_password` with the actual values.

- #### Firebase account setup:

  ##### (\*\* Only for uploading and getting profile photos with URL)

1. Visit the [Firebase website](https://firebase.google.com/) and click on the "Get Started" button.

2. Sign in to your Google account or create a new one if you don't have an account.

3. Once signed in, click on the "Go to Console" button to access the Firebase Console.

4. Click on the "Add project" button to create a new project.

5. Enter a unique project name and optionally customize the project ID. Then, click on the
   "Continue" button.

6. In the following steps, you can choose to enable Google Analytics and other additional Firebase
   features if desired. Otherwise, you can skip them by clicking on the "Continue" button.

7. On the project overview page, click on the gear icon (Settings) next to "Project Overview" and
   select "Project settings" from the dropdown menu.

8. In the project settings page, scroll down to the "Your apps" section and click on the "Web"
   platform icon (</>) to add a new web app to your project.

9. Provide a nickname for your web app and click on the "Register app" button.

10. Firebase will generate a set of configuration details for your web app. Locate the "Firebase SDK
    snippet" section, and select the "Config" radio button.

11. Copy the values of the following configuration variables:

    - `apiKey`: This is the `FIREBASE_API_KEY` value.
    - `authDomain`: This is the `FIREBASE_AUTH_DOMAIN` value.
    - `projectId`: This is the `FIREBASE_PROJECT_ID` value.
    - `storageBucket`: This is the `FIREBASE_STORAGE_BUCKET` value.
    - `messagingSenderId`: This is the `FIREBASE_MESSAGING_SENDER_ID` value.
    - `appId`: This is the `FIREBASE_APP_ID` value.
    - `measurementId`: This is the `FIREBASE_MEASUREMENT_ID` value.

12. Additionally, you can obtain the Firebase Storage bucket URL by navigating to the "Storage"
    section in the Firebase Console. Copy the URL from the "Storage bucket" field, and this will be
    your `FIREBASE_STORAGE_BUCKET_URL`.

13. In your project directory, open the `config.env` file and add the following lines:

    ```
    # FIREBASE CONFIGURATIONS
     FIREBASE_API_KEY=your_apiKey
     FIREBASE_AUTH_DOMAIN=your_authDomain
     FIREBASE_PROJECT_ID=your_projectId
     FIREBASE_STORAGE_BUCKET=your_storageBucket
     FIREBASE_MESSAGING_SENDER_ID=your_messagingSenderId
     FIREBASE_APP_ID=your_appId
     FIREBASE_MESUREMENT_ID=your_measurementId
     FIREBASE_STORAGE_BUCKET_URL=your_storage_bucket_url
    ```

> ⚠️ **Important:** Make sure to replace `your_apiKey`, `your_authDomain`, `your_projectId`,
> `your_storageBucket`, `your_messagingSenderId`, `your_appId`, `your_measurementId`, and
> `your_storage_bucket_url` with the configuration details provided by Firebase.

- #### Stripe account setup:

  ##### (\*\* Only for integrating credit card payments)

1.  **Create a Stripe Account**

    - Go to the [Stripe website](https://stripe.com/) and sign up for an account.
    - Provide the required information and follow the steps to create your account.

2.  **Obtain API Keys**

    - After creating your Stripe account, navigate to the Dashboard.
    - Click on "Developers" in the left sidebar, then select "API keys".
    - You will find two types of keys: Publishable Key and Secret Key.
    - Copy the Publishable Key and Secret Key for use in your web application.

3.  **Configure Webhooks**

    - Webhooks are used to receive notifications from Stripe about events in your account, such as
      successful payments or subscription updates.
    - In the Stripe Dashboard, go to "Developers" and select "Webhooks".
    - Click on "Add endpoint" to configure a new webhook endpoint.
    - Provide the necessary details such as the endpoint URL where Stripe will send the webhook
      events.
    - Copy the Webhook Secret, as it will be used to verify the authenticity of webhook events in
      your web application.

4.  **Integrate Stripe in your Web Application**

    - In your project directory, open the `config.env` file and add the following lines:

              ```
              # STRIPE CONFIGURATIONS
              STRIPE_PUBLISHABLE_KEY=<YOUR_PUBLISHABLE_KEY>
              STRIPE_SECRET_KEY=<YOUR_SECRET_KEY>
              STRIPE_WEBHOOK_SECRET=<YOUR_WEBHOOK_SECRET>
              ```

      > ⚠️ **Important:** Make sure to replace `<YOUR_PUBLISHABLE_KEY>`, `<YOUR_SECRET_KEY>` and
      > `<YOUR_WEBHOOK_SECRET>` with your obtained values.

## Installation and Usage:

### `config.env` final check:

- Your `config.env` must have these following environment variable:

```

##################################################################
# # Basic configurations # #
NODE_ENV=development
PORT=5000

DATABASE=<YOUR_CONNECTION_STRING>
DATABASE_USERNAME=<USERNAME>
DATABASE_PASSWORD=<PASSWORD>

JWT_SECRET_KEY=<YOUR_UNIQUE_SECRET_KEY>
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# DEFAULT PROFILE IMAGE URL
DEFAULT_USER_PROFILE_IMAGE_URL=https://firebasestorage.googleapis.com/v0/b/natours-336d4.appspot.com/o/user_profile_photos%2Fdefault.jpg?alt=media&token=c1024389-5948-4c88-b26b-15b5a12b8680

##################################################################
# # Email configurations # #

EMAIL_FROM=<YOUR_EMAIL>

# MAILTRAP CONFIGURATIONS
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_password
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=25 or 465 or 587 or 2525 (Add one of them only like this EMAIL_PORT=25)

# GMAIL CONFIGURATIONS
GMAIL_USERNAME=your_gmail
GMAIL_PASSWORD=your_password

##################################################################
# # Authentication configurations # #

#GOOGLE OAUTH
GOOGLE_OAUTH_CLIENT_ID=your_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret

##################################################################
# # Booking configurations # #

# STRIPE CONFIGURATIONS
STRIPE_PUBLISHABLE_KEY=<YOUR_PUBLISHABLE_KEY>
STRIPE_SECRET_KEY=<YOUR_SECRET_KEY>
STRIPE_WEBHOOK_SECRET=<YOUR_WEBHOOK_SECRET>

##################################################################
# # Storage configurations # #

# FIREBASE CONFIGURATIONS
FIREBASE_API_KEY=your_apiKey
FIREBASE_AUTH_DOMAIN=your_authDomain
FIREBASE_PROJECT_ID=your_projectId
FIREBASE_STORAGE_BUCKET=your_storageBucket
FIREBASE_MESSAGING_SENDER_ID=your_messagingSenderId
FIREBASE_APP_ID=your_appId
FIREBASE_MESUREMENT_ID=your_measurementId
FIREBASE_STORAGE_BUCKET_URL=your_storage_bucket_url

```

> ⚠️ **Important:** Make sure to replace values with the actual values obtained from the respective
> steps.

1. Clone the repository to your local machine:

   ```
   https://github.com/sypanchal1810/natours-v1.git
   ```

2. Install the necessary packages using following command:

   ```
   npm install
   ```

3. Import the development data in the database using following command:

   ```
   node dev-data/import-dev-data.js --import
   ```

4. Start the application:

   ```
   npm start
   ```

5. Open your web browser and visit `http://127.0.0.1:5000` to access the application.
