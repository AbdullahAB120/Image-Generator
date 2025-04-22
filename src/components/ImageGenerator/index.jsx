import { useState, useRef } from 'react';
import './style.css';
import defaultImage from '../../assets/img/Image.png';

function ImageGenerator() {
	const [imageURL, setImageURL] = useState("/");
	const [isLoading, setIsLoading] = useState(false);
	const [isImgLoaded, setIsImgLoaded] = useState(false);
	const inputRef = useRef(null);

	const handleImageGenerator = () => {
		const prompt = inputRef.current.value.trim();
		if (!prompt) return alert("Please enter a prompt");

		setIsLoading(true);

		// Extended random elements
		const styles = [
			"cyberpunk", "oil painting", "digital art", "pixel art", "anime", "steampunk", "watercolor", "photorealistic",
			"concept art", "surrealism", "futuristic", "fantasy art", "vaporwave", "gothic", "line art", "sketch"
		];

		const lightings = [
			"dramatic lighting", "natural light", "studio lighting", "neon lights", "moonlight", "sunset glow",
			"harsh shadows", "soft lighting", "volumetric lighting", "backlighting"
		];

		const cameras = [
			"DSLR", "GoPro", "film camera", "wide-angle lens", "macro lens", "telephoto lens", "polaroid camera",
			"drone shot", "cinematic camera"
		];

		const palettes = [
			"vibrant colors", "pastel tones", "monochrome", "warm colors", "cool tones", "earth tones",
			"high contrast", "colorful gradients", "duotone"
		];

		const moods = [
			"dark fantasy", "sci-fi horror", "ethereal", "dreamlike", "cinematic", "romantic", "mystical", "epic"
		];

		const artists = [
			"by H.R. Giger", "in the style of Moebius", "inspired by Studio Ghibli",
			"by Greg Rutkowski", "in the style of Picasso", "by Beeple", "like van Gogh"
		];

		const adjectives = [
			"beautiful", "epic", "mysterious", "dark", "dreamy", "whimsical", "realistic", "abstract"
		];

		const randomStyle = styles[Math.floor(Math.random() * styles.length)];
		const randomLighting = lightings[Math.floor(Math.random() * lightings.length)];
		const randomCamera = cameras[Math.floor(Math.random() * cameras.length)];
		const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];
		const randomMood = moods[Math.floor(Math.random() * moods.length)];
		const randomArtist = artists[Math.floor(Math.random() * artists.length)];
		const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
		const randomNumber = Math.floor(Math.random() * 1000000000);

		const parts = [prompt, `${randomAdjective}`, randomMood, randomStyle, randomLighting, randomPalette, randomArtist, `shot with ${randomCamera}`, randomNumber];

		const filteredParts = parts.filter(Boolean);
		const modifiedPrompt = filteredParts.join(', ');
		const encodedPrompt = modifiedPrompt.split(' ').join('+');
		const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

		const img = new Image();
		img.src = imageUrl;
		img.onload = () => {
			setImageURL(imageUrl);
			setIsLoading(false);
			setIsImgLoaded(true);
		};
		img.onerror = () => {
			alert("Failed to load image");
			setIsLoading(false);
			setIsImgLoaded(true);
		};

		inputRef.current.value = "";
	};

	return (
		<div className="image-generator">
			<h1> AI Image <span> Generator </span> </h1>
			<div className="image">
				<img key={imageURL} src={imageURL === "/" ? defaultImage : imageURL} className={imageURL !== "/" && isImgLoaded ? "loaded" : ""} alt="Generated" />
			</div>
			<div className="generate">
				<input ref={inputRef} type="text" placeholder="Describe what you want to see" disabled={isLoading} />
				<button onClick={handleImageGenerator} disabled={isLoading}> {isLoading ? "Generating..." : "Generate"} </button>
			</div>
		</div>
	);
}

export default ImageGenerator;