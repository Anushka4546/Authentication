# Microsoft Teams Clone
Hosted App: https://stormy-sands-91578.herokuapp.com/
Demo Video:
This is a Real Time Video Chat Web Application with User Authentication that I build using the SCRUM framework of Agile Software Methodology. I created this project as a part of the Microsoft Engage 2021 mentorship program.
# Features 📝
*	Group Video Call of Four Individuals
*	Chat Application accessed during the Call
*	User Authentication using passport
*	Invite Link to share with people
*	Audio & Video Toggles
* Register and Login page

# Tech Stack 💻

**Client: Ejs**
*	Video Call: Socket.io, peerjs
*	Chat Feature : socket.io
*	User Authentication :passport with local strategy
* Database: MongoDB for storing user data and password
*	Styling : bootstrap, css, icons from font awesome

**Server: Node.js, Express.js**
**Deployment: Heroku**

# Dependencies:
* bcryptja
* bootswatch
* connect-flash
* ejs
* express
* express-ejs-layouts
* express-sessions
* mongoose
* passport
* passport-local
* peer
* peerjs
* socket.io
* uuid

# Run Locally
For running the application locally, all you need are 3 simple steps!
*	Node and npm Installation
*	Cloning repository
*	Configure MongoDB
*	Run!

1. Node Installation
* Node and npm installation on Windows

Just go on official Node.js website and download the installer. Also, be sure to have git available in your PATH, npm might need it (You can find git here).
If the installation was successful, you should be able to run the following command.
```
$ node --version
v8.11.3

$ npm --version
6.1.0
```

If you need to update npm, you can do it by running following command 
```
$ npm install npm -g
```

2. Cloning the Repository
$ git clone https://github.com/Anushka4546/authentication/

3. Configure MongoDB
 Open "config/keys.js" and add your MongoDB URI, local or Atlas
 
4. Run!
Finally, Run the following commands!

```
$ npm install
// to install all the dependencies
$ npm start
```

That's it. Go to http://localhost:5000/ to begin right away!

# Demo
As you open the link to the app or run it locally, you'll come across a front page. To begin, click on the Register button.
![register](./images/register)

If you're visiting the page for the first time, or want to create a new account, add your email id and choose a random password atleast 8 characters long. Also add the password again to confirm, and then click on register. If you already have an account, click on the Already have an account link (login).

After this, you will be redirected to the LogIn page. Fill in your email id with which you created an account and your password.

After logging in, you reach the dashboard. To create a new room click on the New Meeting button and you'll be redirected to the new room.
To invite over other friends in this room, send them the room code. You can get the room code from the url bar itself. It is the part of the link right after http://localhost:5000/. See the picture below!

For joining a room, enter the room code(as explained above) and click join button. 

When you enter the video call, you'll see your teams video along with yours on the screen. Make sure that more than four people dont join because the room will be filled. On the bottom, you might see some buttons.

**Audo/Video Toggle:** You can stop sharing your audio or video and start sharing them again as you like using these buttons.

**Invite link:** If you haven't invited your friends yet click on the invite icons button and then the copy button to copy the link to the call on your clipboard. Now you can send it to your friends and ask them to simply login the app and go to the link and they'll be joining your call soon.

On the right hand side, you can see the chatbox. Go ahead and type in the messages you wanna send to your team. Then click on the plus button on the right.

**Log Out:** For loggint out click on the logout button on the top right corner of the dashboard.

# FAQ
**How many of my friends can join?**

A total of 4 people including you can join the call.

**How to invite my friends or team on the call?**

 You can copy the link using the invite button

**How to get the room code for the call?**

It is the part of the link after / in the URL of the call. For instance, if the link of the room is https://stormy-sands-91578.herokuapp.com/339f1d63-82c5-4976-b0c1-5172b4637c8a then the Room Code will be 339f1d63-82c5-4976-b0c1-5172b4637c8a

# Troubleshooting
Not able to enter the video call : If you are unable to enter the video call page and the security settings on the URL Bar shows Not Secure, try to close all the other tabs and then enter the room.
Hope you enjoy using the application.
Cheers!!


