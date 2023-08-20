# Vanilla JavaScript slider

A simple and customizable image slider built using Vanilla JavaScript. This slider allows you to display a collection of images in a dynamic and interactive way on your website.

![Vanilla JS slider](https://nghia.b-cdn.net/images/github/vanilla-slider.png)

## Features

- **Easy Integration:** Quickly integrate the slider into your website without the need for external libraries or frameworks.
- **Customizable:** Easily customize the slider's appearance, animation, and behavior to match your website's design.
- **Responsive:** The slider is responsive by default, ensuring optimal viewing on various devices and screen sizes.
- **Keyboard Navigation:** Users can navigate through slider images using keyboard arrow keys for improved accessibility.
- **Touch Support:** Supports touch gestures, making it user-friendly for touchscreen devices.

## Usage

1. Include the necessary CSS and JavaScript files in the `<head>` section of your HTML file.

```html
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Your HTML content -->
  <script src="script.js"></script>
</body>
```

2. Create a container element to hold the slider.

```html
<div class="slider">
  <div class="slide slide--1">
  </div>
  <div class="slide slide--2">
  </div>
  <div class="slide slide--3">
  </div>
  <!-- Add more slides as needed -->
</div>
```

3. Initialize the slider in your JavaScript file.

```javascript
// Initialize the slider
const InitSlider = function() {
  // Options can be customized here
}
// Start the slider
InitSlider();
```

## Styling

You can style the slider by modifying the `style.css` file to match your website's design.

## Browser Compatibility

This slider is designed to work on modern web browsers including Chrome, Firefox, Safari, and Edge.

## Acknowledgments

This slider was inspired by the need for a lightweight and customizable image slider that doesn't rely on external libraries or frameworks.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize and enhance this slider according to your project's requirements. If you encounter any issues or have suggestions for improvement, please open an issue or pull request on the project's GitHub repository. Your contributions are greatly appreciated!
