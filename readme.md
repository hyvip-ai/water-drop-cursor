# water-drop-cursor

This is package to provide a fascinating mouse cursor to make your project more attractive, its easy to use and compatible with React.js, Next.js and anything you imagine

## Installation

```bash

npm i water-drop-cursor
```

---

## Usage

1. React.js and Next.js projects :

   - Install the package using the above command
   - Add the following script in `index.html` in react and `_app.jsx` in your next project.

   ```js
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenMax.min.js" defer></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.3/jquery.min.js" defer></script>
   ```

   - Add the css file in your `app.jsx` in react.js and `_app.jsx` in next.js, using the following

   ```js
   import 'water-drop-cursor/style.css';
   ```

   - Import the `init` function in `App.jsx` in react and `_app.jsx` in next, using the following

   ```js
   import { init } from 'water-drop-cursor';
   ```

   - Use the init function in `app.jsx` in react and `_app.jsx` in next, using the following

   ```js
   useEffect(() => {
     init();
   }, []);
   ```

2. For Vanilla JavaScript projects :

   - Open the github for this particular project
   - Copy the animation.js file and create it in a file with same name in your project directory and pase the code
   - Copy the style.css file and create it in a file with same name in your project directory and paste the code
   - Finally add this script at the end of your body

   ```js
       <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenMax.min.js" defer></script>

       <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.3/jquery.min.js" defer></script>

       <script type="module" defer>
        import waterCursor from "./animation.js"
        waterCursor.init()
       </script>
   ```
