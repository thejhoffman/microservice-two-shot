# Wardrobify

Team:

* James Hoffman - Which microservice? - Hats
* Micheline Doughlin - Which microservice? - Shoes

## Design

## Shoes microservice

1. Models
- I made a show model that captured the main properties of the shoes
- Bin VO model captured the polling results from Wardrobe
2. Polling
- Configured polling to access bin from Wardrobe
3. RESTful API:
- I set up all the HTTP request to handle GET, POST, PUT, DELEET
4. Frontend
- I create react components to display
    - List of Shoes
    - A delete button :)

## Hats microservice
Completed by James Hoffman

### `/hats/api`
#### hats_project/settings.py
Added that hats_rest app the list of installed apps

#### hat_project/urls.py
Added the base `api` path to urls of the project for rest app

#### hat_rest/admin.py
Included admin views for all models for easier troubleshooting

#### hat_rest/models.py
Defined two models: `Hat`, `LocationVO`

`Hat` model is defined by the structure of a hat that was outlined in Learn:
* Fabric
* Style Name
* Color
* Picture URL

All of the fields are CharFields mainly for simplicity. I would have liked to implement other models for color and/or fabric with a unique CharField and a a foreign key connecting back to the Hat model. However, I did not go forward with that, as I felt a the time constraint of project factored into my decision to stick with a simpler model.

`LocationVO` is a value object that links outside the microservice to the wardrobe service

#### hat_rest/urls.py
The paths for the restful API mapped to the view functions

#### hat_rest/views.py
Contains the encoders and two functions for handling different API requests

Encoders:
* `LocationVOEncoder` - for encoding of locations, mainly used by the other two encoders
* `HatListEncoder` - for encoding the details of a individual hat
* `HatDetailEncoder` - for encoding the entire list of hats

Functions:
* api_hat
    * handles requests via `/api/hats/`
    * `GET` (list of all hats)
    * `POST` (adding new hat)
* api_hats
    * handles requests via `/api/hat/<hat_id>`
    * `GET` (detail of a hat)
    * `POST` (updating a hat)
    * `DELETE` (deleting a hat)

### `/hats/poll`

#### poller.py
Implemented logic for polling data from Wardrobe microservice in loading into LocationVO model

### `/ghi/app/src`

#### HatList.js
Displays all of the hats in a card format with style name, image, and location. Includes a button to view details of a hat

#### HatDetail.js
Shows details of an individual hat. Include a button to delete the hat

Data displayed for hat:
* style name
* image
* fabric
* color

Data displayed for location hat is linked to:
* closet name
* section number
* shelf number

#### HatForm.js
A form to handle the submission of adding a new hat
