import { h, Component } from 'preact';
import { customStore } from '@store/customStore';
import { view } from 'z-preact-easy-state';

const aiLibUrls: string[] = ['https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js', 'https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js'];

const URL = 'https://teachablemachine.withgoogle.com/models/9IIlOOK6/';
let model, webcam, labelContainer, maxPredictions;
const modelURL = URL + 'model.json';
const metadataURL = URL + 'metadata.json';

class AIPage extends Component {
  componentDidMount() {
    if (document.getElementById('scriptImage') === null) {
      var scriptTF = document.createElement('script');
      var scriptImage = document.createElement('script');
      scriptImage.id = 'scriptImage';
      scriptTF.src = aiLibUrls[0];
      scriptImage.src = aiLibUrls[1];
      document.head.appendChild(scriptTF);
      scriptTF.onload = () => document.head.appendChild(scriptImage);
      scriptImage.onload = () => (customStore.AI.aiLibsReady = true);
    }
  }

  async startAI() {
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)

    //@ts-ignore
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    //@ts-ignore
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById('webcam-container').appendChild(webcam.canvas);
    labelContainer = document.getElementById('label-container');
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement('div'));
    }
  }

  render() {
    return (
      <section>
        <h2>AI</h2>
        <div>Teachable Machine Image Model</div>
        <div id="webcam-container"></div>
        <div id="label-container"></div>
        <div>{customStore.AI.aiLibsReady === true ? 'AI Libs are ready' : 'AI Libs are not ready'}</div>
        <button disabled={customStore.AI.aiLibsReady === true ? false : true} onClick={this.startAI}>
          Start
        </button>
        <div style="font-size:xx-large;">{customStore.AI.probabilityHuman * 100 === 100 ? 'Hi Human!' : 'hmm...'}</div>
      </section>
    );
  }
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction = prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
    customStore.AI.probabilityHuman = prediction[0].probability.toFixed(2);
    customStore.AI.probabilityNonHuman = prediction[1].probability.toFixed(2);
  }
}

export default view(AIPage);
