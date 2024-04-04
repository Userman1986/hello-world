Objective:
Develop a mobile chat application using React Native to offer users a chat interface with features for sharing images and location.

The 5 Ws:

Who: Users of the mobile chat app, such as friends, family, or course peers, with the codebase accessible to other developers collaborating on the project.
What: Creation of a native chat app using React Native, alongside comprehensive documentation.
When: Users can utilize the chat app whenever they wish to communicate with each other.
Where: The app will be compatible with Android and iOS devices, leveraging Expo for development and Google Firestore for chat message storage.
Why: Given the widespread use of mobile chat apps globally, mastering chat app development is a valuable skill, demonstrating proficiency in React Native development.
User Stories:

New users aim to swiftly join chat rooms to engage with friends and family.
Users seek to exchange messages with acquaintances to share updates.
Users desire to share images with friends to depict their current activities.
Users wish to share their location to indicate their whereabouts.
Users aim to access messages offline for review at any time.
Users with visual impairments require compatibility with screen readers for seamless interaction.
Key Features:

User customization options for name and chat screen background color before joining.
Display of conversation history with input field and submit button.
Additional features for sending images and location data.
Storage of data both online and offline.
Technical Requirements:

Development in React Native using Expo.
Adherence to provided screen design for styling.
Storage of chat conversations in Google Firestore Database.
User authentication via Google Firebase authentication.
Local storage of chat conversations.
Image selection and sending from device library.
Capture and sending of images from device camera.
Storage of images in Firebase Cloud Storage.
Access and sending of user location data.
Utilization of Gifted Chat library for chat interface.
Inclusion of comments in the codebase.
Step By Step Guide:

Clone the repository: git clone https://github.com/michaelleoniuk/ChatApp
Install dependencies, including React Native, Expo, Firebase Storage, Firebase, React Navigation, react-native-gifted-chat, expo-image-picker, expo-location, and expo-async-storage.
Configure Firebase:
Sign in at Google Firebase.
Create a project (disable Google Analytics).
Set up Firestore Database and adjust rules.
Register the app in Firebase.
Install Firebase in the chat-app folder using npm install firebase.
Initialize Firebase by integrating the provided configuration into App.js.
Download Android Studio or use Expo Go App for testing.
Run npx expo start in the terminal.
