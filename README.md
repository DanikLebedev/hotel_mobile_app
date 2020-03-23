# Hotel mobile app
This application fully clones functionality of the [web version on React](https://github.com/DanikLebedev/hotel_app_client)
## Usage
1. I used expo to create this application, so you need to install [Expo](https://docs.expo.io/versions/latest/) on your mobile device.
2. Log in on official site.
3. After that, clone [API](https://github.com/DanikLebedev/Hotel_App_server) and this repository.
4. Before start, you need to launch API, so use 3.  ```cd <your folder>/Hotel_App_server ``` and ``` npm run server```.
5. And launch our mobile application  ```cd <your folder>/hotel_mobile_app ``` and ```expo start```.
6. Open expo on your device and scan QR , which display on development web page

## Preview

#### Navigation: I used [createMaterialBottomTabNavigator](https://reactnavigation.org/docs/material-bottom-tab-navigator/)
![Navigation](navigation.gif)


#### Room's list
![Rooms list](bookRoom.gif)

#### Create order
![Order form](bookForm.gif)
