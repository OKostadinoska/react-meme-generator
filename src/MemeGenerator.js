import { useEffect, useState } from 'react';

let image;

function MemeGenerator() {
  const [imageKey, setImageKey] = useState('buzz');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeImage, setMemeImage] = useState([]);
  const address = `https://api.memegen.link/images/${imageKey}/${topText}/${bottomText}`;

  useEffect(() => {
    void fetch('https://api.memegen.link/templates/')
      .then((response) => response.json())
      .then((data) => {
        const responseMemeImage = data.map((meme) => {
          return meme.id;
        });
        setMemeImage(responseMemeImage);
      });
  }, []);

  function handleDownloadClick() {
    void fetch(address).then((response) => {
      void response.arrayBuffer().then((buffer) => {
        const element = document.createElement('a');
        const file = new Blob([buffer], { type: 'image/jpeg' });
        element.href = URL.createObjectURL(file);
        element.download = 'image.jpg';
        element.click();
      });
    });
  }

  return (
    <section>
      <div>
        <h1>React Meme Generator</h1>
        <input
          value={topText}
          onChange={(event) => {
            setTopText(event.currentTarget.value);
          }}
        />
        <input
          value={bottomText}
          onChange={(event) => {
            setBottomText(event.currentTarget.value);
          }}
        />
        <p>Select your meme here:</p>
        <select
          onChange={(event) => {
            setImageKey(event.currentTarget.value);
          }}
        >
          {memeImage.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
      <div className="picture" css={image}>
        <img src={address} alt=" " />
      </div>

      <div>
        <button onClick={handleDownloadClick}>Download!</button>
      </div>
    </section>
  );
}

export default MemeGenerator;
