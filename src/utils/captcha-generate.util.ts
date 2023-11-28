import { createCanvas, CanvasRenderingContext2D } from "canvas";

const alternateCapitals = (str: string) =>
  [...str]
    .map((char, i) => char[`to${i % 2 ? "Upper" : "Lower"}Case`]())
    .join("");

const randomText = () =>
  alternateCapitals(Math.random().toString(36).substring(2, 8));
const _generateRandomColour = () => {
  return (
    "rgb(" +
    Math.floor(Math.random() * 255) +
    ", " +
    Math.floor(Math.random() * 255) +
    ", " +
    Math.floor(Math.random() * 255) +
    ")"
  );
};
const FONTBASE = 200;
const FONTSIZE = 35;

const relativeFont = (width: number) => {
  const ratio = FONTSIZE / FONTBASE;
  const size = width * ratio;
  return `${size}px serif`;
};

const arbitraryRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const randomRotation = (degrees = 15) =>
  (arbitraryRandom(-degrees, degrees) * Math.PI) / 180;

const configureText = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.font = relativeFont(width);
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  const text = randomText();
  ctx.globalCompositeOperation = "difference";
  ctx.strokeStyle = "white";
  ctx.strokeText(text, width / 2, height / 2);
  return text;
};

const generate = (width: number, height: number) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.rotate(randomRotation());
  const text = configureText(ctx, width, height);

  const colour1 = _generateRandomColour();
  const colour2 = _generateRandomColour();
  const gradient1 = ctx.createLinearGradient(0, 0, width, 0);
  gradient1.addColorStop(0, colour1);
  gradient1.addColorStop(1, colour2);
  ctx.fillStyle = gradient1;

  ctx.fillRect(0, 0, width, height);

  const gradient2 = ctx.createLinearGradient(0, 0, width, 0);
  gradient2.addColorStop(0, colour2);
  gradient2.addColorStop(1, colour1);
  ctx.fillStyle = gradient2;

  return {
    image: canvas.toDataURL(),
    text: text,
  };
};

export default generate;
