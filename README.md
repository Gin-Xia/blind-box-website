<<<<<<< HEAD
# Blind Box Customization Website - 3D Model Showcase

This project is a blind box customization website built with [Next.js](https://nextjs.org/) and [Three.js](https://threejs.org/). Users can upload images, and we will create corresponding 3D models to display on the website. The site includes dynamic scrolling animations, 3D model rendering, and a clean navigation layout.

## Features

- **Dynamic Scrolling Animations**: Implemented using [GSAP](https://greensock.com/gsap/) and [ScrollTrigger](https://greensock.com/scrolltrigger/).
- **3D Model Showcase**: Built with Three.js and GLTFLoader to load and render 3D models.
- **Responsive Design**: Adapted for various screen sizes and devices.
- **Navigation Bar**: Includes links for the homepage, products, and contact page.

## Project Structure

```plaintext
Project Root/
├── public/                  # Public assets
│   ├── homepagebanner.png   # Homepage background image 1
│   ├── homepagebanner2.png  # Homepage background image 2
│   ├── lambo.glb            # 3D model file
├── components/              # React components
│   ├── Product3DWithText.js # 3D model component with text
│   ├── Product3DWithTimeline.js # Scroll-triggered 3D model component
├── pages/                   # Next.js pages
│   ├── index.js             # Homepage
├── package.json             # Project dependencies
├── next.config.js           # Next.js configuration
├── README.md                # Project documentation
```

## Tech Stack

- **Framework**: Next.js
- **Animations**: GSAP (ScrollTrigger)
- **3D Rendering**: Three.js
- **Model Loading**: GLTFLoader
- **Styling**: Tailwind CSS

## Installation and Usage

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/3D-Model-Site.git
cd 3D-Model-Site
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open your browser and visit `http://localhost:3000`.

## To-Do Features

- [ ] Image upload functionality for users
- [ ] Backend logic for 3D model generation
- [ ] Improved product showcase layout
- [ ] Multi-language support


## License

This project is open-sourced under the [MIT License](https://opensource.org/licenses/MIT).
