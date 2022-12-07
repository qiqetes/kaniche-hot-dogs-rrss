import { useEffect, useState } from "react";
import "./App.css";
import p5Types from "p5";
import Sketch from "react-p5";
import html2canvas from "html2canvas";

function App() {
  const [text, setText] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const [brightness, setBrightness] = useState(1);
  const [canvas, setCanvas] = useState(null);
  const [rotated, setRotated] = useState(true);

  const setup = (p5: p5Types, refElem: Element) => {
    const WIDTH = 1080;
    setCanvas(p5.createCanvas(WIDTH, WIDTH).parent(refElem));
  };

  const draw = (p5: p5Types) => {
    p5.clear();
    const width = 1080;
    !img && p5.background("red");
    p5.fill("black");
    p5.translate(width / 2, width / 2);
    p5.rotate(p5.radians(rotated ? 45 : -45));
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(100);
    p5.textLeading(150);
    canvas.drawingContext.font = "150px ABCSocialCondensed-Regular";
    canvas.drawingContext.lineWidth = 2;
    canvas.drawingContext.letterSpacing = "0px";
    canvas.drawingContext.wordSpacing = "-5px";

    p5.text(text, 0, 0);
    p5.text(text, 0, 0);
  };

  useEffect(() => {
    if (canvas) {
      console.log(canvas.drawingContext);

      // @ts-ignore
      canvas.drawingContext.font = "30px Monospace";
    }
  }, [canvas?.drawingContext.font, canvas]);

  return (
    <div className="App">
      <label htmlFor="texto">Texto de la publicación:</label>
      <textarea
        id="text"
        name="name"
        onChange={(e) => {
          setText(e.target.value.toUpperCase());
        }}
      />
      <button onClick={() => setRotated(!rotated)}>Rotar</button>
      <label htmlFor="img">Imagen de la publicación:</label>
      <input
        type="file"
        id="img"
        name="img"
        accept="image/*"
        onChange={(e) => {
          setImg(e.target.files[0] || null);
        }}
      />
      {img && (
        <>
          <label htmlFor="brightness">Brillo de la imágen</label>
          <input
            type="range"
            name="brightness"
            max={2}
            min={0.5}
            step={0.05}
            defaultValue={1}
            onChange={(e) => setBrightness(Number(e.target.value))}
          />
        </>
      )}

      <div className="post" id="post">
        {img && (
          <img
            src={URL.createObjectURL(img)}
            alt="Imagen de la publicación"
            width="200"
            style={{ filter: `brightness(${brightness})` }}
          />
        )}

        <Sketch setup={setup} draw={draw} />
      </div>
      <button
        onClick={() => {
          html2canvas(document.getElementById("post")).then((canvas) => {
            document.body.appendChild(canvas);
          });
        }}
      >
        SCREENSHOT
      </button>
    </div>
  );
}

export default App;
