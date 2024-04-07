# MedConnect

The project is created using MERN stack as a part of Software development project course for Centennial College.

To run the app run command from the project folder: npm start. It will run both frontend and backend servers.

## Folder structure:
+ client: contains frontend
+ + build: for running in build mode.
+ + node_modules: installed modules for frontend development.
+ + public
+ + src: this folder contains App.js, scripts for frontend, CSS files and views.
+ + package.json: dependencies for frontend.
+ node_modules: installed modules for the project.
+ server: contains backend files.
+ + config: express.js. configuration of express app.
+ + controllers: contains files with CRUD operations for particular collections.
+ + models: contains MongoDB models.
+ + routes: contains routes files.
+ .babelrc: configuration of babel
+ .env: stores some constant variables.
+ package.json: installed dependencies for the project.
+ server.js: configuration of backend app.

## The following dependencies are installed:
### Frontend (React):
+ react: Core React library
+ react-dom: React rendering for web
+ react-router-dom: For routing in React
+ axios: For making HTTP requests
+ bootstrap or material-ui: UI component library (choose one)
+ dotenv: For managing environment variables
+ redux, react-redux, redux-thunk: For state management
### Backend (Node.js + Express):
+ express: Web framework for Node.js
+ mongoose: MongoDB object modeling tool
+ dotenv: For managing environment variables
+ cors: Cross-Origin Resource Sharing middleware
+ jsonwebtoken: For authentication and authorization
+ bcryptjs: For hashing passwords
+ morgan: HTTP request logger middleware
+ body-parser: to handle HTTP POST requests where you need to access data submitted from forms or clients
+ method-override: for working with RESTful APIs
+ compression: for faster responses
+ nodemon: for updating server and page when changes are made
+ concurrently: for running backend and frontend at the same time
+ multer: for handling uploading files
