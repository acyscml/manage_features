# Manage Features

## Frontend
  UI engine (Ember)

## manage_features
  API backend (Rails)

# Application

## Running

Into manage_features directory :

`$ rails s`

Into Frontend directory :

`$ ember server --proxy http://localhost:3000`

Open browser and navigate to :

`localhost:4200/features`

## Running Tests

### Frontend

navigate to : `localhost:4200/tests`

### Backend

go to folder `manage_features` and run :

`$ rspec spec`


