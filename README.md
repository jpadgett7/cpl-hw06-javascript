# Help Me Owt!

This project contains an HTML file and JavaScript files for a Mewoth-locating app.

Documentation for its behavior can be found publicly here: http://cpl.mwisely.xyz
To verify that the code works properly, compare its behavior against the provided demo, and verify it all in Firefox on a campus Linux machine.

**Note: Follow the design specifications EXACTLY.**
Not doing so will cause the instructors' automated test suite to fail and hurt your grade.

**Note: the following command will work on campus machines.**
**If you use your own machine or editors, you are on your own.**

## Check Style

~~~shell
$ ./jscs.sh *.js
~~~~

This will run the `JSCS` package to check for compliance with the Google JavaScript Style Guide.
The latest version of `JSCS` requires Node version `v0.10.0` or greater, which is already installed on the campus machines.

## Run the Program

In order to run the app, just open the HTML file (`index.html`) in Firefox.
**Do NOT modify the HTML file.**

All of your source modifications will be made to `js/tracker.js`.
Whenever you make changes to `js/tracker.js`, just refresh the web page to see your changes take effect.

**Having the browser developer console open while doing this HW will be helpful.**
All errors encountered by the JavaScript engine as well as all values logged using `console.log` will appear in the developer console.
