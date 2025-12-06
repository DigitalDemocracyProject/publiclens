# Public Lens
A survey system which can be used to conduct public opinion polls. This is a dynamic survey application to handle various types of surveys and analyze data according to the requirements.

# Developer Instructions
## Clone the Repository

1. Navigate to the folder where you'd like to clone in your computer
2. Open cmd or terminal and run the following commands
3. git clone --filter=blob:none --sparse https://github.com/DigitalDemocracyProject/publiclens 
4. cd publiclens
5. Separately add each projects(in subdirectories) one by one: git sparse-checkout add %subdirectory-to-be-cloned%
6. cd %your-subdirectory%
7. Open each project in your preffered IDE

## Create a Database and Collections and Import Init Data
1. Install MongoDB on your local machine
2. Create a database: public_lens
3. Create three collections: demographics, surveys, user_responses
4. Find backup data(JSON files) in the public-lens-service: /src/main/resources/data/init_collections
5. Import data to the created collections using backup files

## Start the Application
1. Run the public-lens-service first
2. Then you can run the public-lens-portal and public-lens-analytics-service by any order
3. Check the running application: http://localhost:4200

## Run on Local
### public-lens-service - Java
1. Install Java/ JDK: preffered version 21
2. Navigate to the project folder: ../publiclens/public-lens-service
3. Open the project with IntelliJ IDEA or any other IDE                           
4. Resolve dependencies and build the project
5. Run on the IDE

### public-lens-analytics-service - Python
1. Install Python: preffered version 3.9.6
2. Navigate to the project folder: ../publiclens/public-lens-analytics-service                        
3. Run the commands below in CMD or terminal:
   - python3 -m venv venv
   - source venv/bin/activate (Mac/ Linux) or venv\Scripts\activate (Windows)
   - pip install -r requirements.txt
   - uvicorn src.main:app --reload --host 0.0.0.0 --port 8000

### public-lens-portal - Angular
1. Install NodeJS: preffered version v23.7.0
2. Navigate to the project folder: ../publiclens/public-lens-analytics-portal
3. Open CMD or terminal and run "npm install"
4. Run the application on CMD or terminal using the command, "ng serve"
5. Access the application with http://localhost:4200 in any browser
