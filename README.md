To change the "currentLocation" or false rather location you need to go into android studio, launch the virtual machine and then press the 3 dots (extented tools/settings)
and there you can specifi the location you want to simulate as the current location!
(using Expo-Location)

npm install expo-location.
npm install expo-device

in app.json put in the following:

"plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ]
    ]

We can use this untill we have it upp on a staging site that we can actually access on our cellphones!
That way also test different phone models and if we want to go to iOS test on iPhone to!

Mvh Matte