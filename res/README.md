# Resources

Creating or updating resources for mobile apps

1. Create a 1024 x 1024 png for the icon
2. Create a 2208 x 2208 png for the splash
3. Upload both files to <http://phonegap.limewebsolutions.nl/>
4. Download the zip file of assets
5. Unzip the assets file
6. Copy the icons dir and the screens dir to the res directory
7. Move icon.png and splash.png so they are in root of res (the zip file has them adjacent to res instead of in the root)

    Directory should be as :

        ./res  
            icon.png  
            splash.png  
            /icons  
            /screens  

8. run `cordova build`

>Note: The current cordova build creates ios resource assets correctly however it builds all the Android resources in the root res dir but does not copy them to the android platform dir. I have added a cordova hook to copy these files during the build process.

# Fav Icon

Use <http://realfavicongenerator.net/>
to generate a new favicon.ico for the project root
