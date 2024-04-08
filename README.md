# Metronix Frontend Documentation

Introduction:

Metronix frontend is built with React.js and Tailwindcss with rest api. This is frontend and the backend is ready and
that is built with node, express, mongoose schema validation and use mongodb for database.

For new Components we useing the the default UI Tailwindcss Components
https://tailwindui.com/components

# ++TODO++ Tech and Packages we use in this project: ++TODO++

## Development Workflow

Create your own branch off the main branch:

1. git checkout -b <your_branch_name>
   Make your changes and commit them:

2. git add .
   git commit -m "Your commit message here"
   Test your changes thoroughly to ensure they work as expected.
   Push your branch to the remote repository:

3. git push origin <your_branch_name>
   Create a pull request:
   Go to the repository on GitHub.
   Switch to your branch.
   Click on "New pull request".
   Review your changes and write a description for your pull request.
   Click on "Create pull request".

## Getting Started & Installation:

For getting started with the template you have to follow the below procedure.

Pull the latest code form the main branch and

Step 1 : Configure your env.local file:

Within the project directory you'll find a .env.example file just rename it as .env.local and paste your api url in REACT_APP_API_BASE_URL=your-api-url.

Step 2 : Running the project:

⦁ First npm install --force for install all packages latest version.
⦁ then npm start for running in development mode

If you want to test your production build in local environment then run the below commands.
⦁ npm build then npm start

# ++ TODO++ Folder Structure & Customization: ++TODO++

⦁ To customize tailwindcss configuration go to -> tailwind.config.js file .

⦁ /public: To change your project title, favicon go to public folder index.html file.

⦁ /src/assets: This folder contain tailwind post css and custom css(you can write custom css in in file) also img folder for all using image  
 and myTheme for all windmill tailwindcss component design.

⦁ /src/components: This folder contain all the template related ui components .

⦁ /src/layout: This folder contain layout section for all pages and related components.

⦁ /src/contexts: This folder contain all necessary context for this template . Like Mobile-Sidebar, Dark Theme and User-Login.

⦁ /src/hooks: This folder contain all custom hooks for data fetching, data filtering, drawer toggling, and all product, category, coupon and  
 staff submit and edit functionality.

⦁ /src/pages: Here you find all pages that we use in this project.

⦁ /src/route: This Folder contain all route in index file and sidebar for all sidebar navigation route.

⦁ /src/services: This folder contain all data fetching function with Axios interface. AdminServices for all admin related data fetching
functionality, CategoryService for category related, CouponServices for coupon related, OrderServices for order related, ProductServices for product related, UserServices for all customers related and httpService is for Common api endpoint with Axios interface.

⦁ /src/utils : This folder contain chartData, and toast function for notification.

Configuration & Deployment:
