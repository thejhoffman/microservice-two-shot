# Wardrobify

Team:

* James Hoffman - Which microservice? - Hats
* Micheline Doughlin - Which microservice? - Shoes

## Design

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

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
