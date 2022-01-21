import { useEffect, useState } from 'react';

let image;

function MemeGenerator() {
  const [imageKey, setImageKey] = useState('buzz');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeImage, setMemeImage] = useState([]);

  const address = `https://api.memegen.link/images/${imageKey}/${topText}/${bottomText}`;

  useEffect(() => {
    fetch('https://api.memegen.link/templates/')
      .then((response) => response.json())
      .then((data) => {
        const responseMemeImage = data.map((meme) => {
          return meme.id;
        });
        setMemeImage(responseMemeImage);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

  function handleDownloadClick() {
    void fetch(address).then((response) => {
      response
        .arrayBuffer()
        .then((buffer) => {
          const element = document.createElement('a');
          const file = new Blob([buffer], { type: 'image/jpeg' });
          element.href = URL.createObjectURL(file);
          element.download = 'image.jpg';
          element.click();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  return (
    <section>
      <div className="body">
        <h1>React Meme Generator</h1>
        <label>
          Top text
          <input
            className="topText"
            placeholder="Enter Your Top Text"
            value={topText}
            onChange={(event) => {
              setTopText(event.currentTarget.value);
            }}
          />
        </label>
        <label>
          Bottom text
          <input
            placeholder="Enter Your Bottom Text"
            value={bottomText}
            onChange={(event) => {
              setBottomText(event.currentTarget.value);
            }}
          />
        </label>
        <label>
          Meme template
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
        </label>
      </div>
      <div css={image}>
        <img
          data-test-id="meme-image"
          className="picture"
          src={address}
          alt=" "
        />
      </div>

      <div>
        <button className="button" onClick={handleDownloadClick}>
          Download!
        </button>
      </div>
    </section>
  );
}

export default MemeGenerator;
