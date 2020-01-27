import { toSvgDataURL } from 'html-to-image';

/**
 * @returns HTMLElement
 */
const $ = document.querySelector.bind(document);

/**
 * @param {number} count
 */
function generateVulnerabilityFrames(count) {
  const image = $('#image');

  for (let i = 0; i < count; i++) {
    const frame = document.createElement('div');
    frame.className = 'frame vulnerability-frame';

    image.appendChild(frame);
  }
}

/**
 * @param {number} count
 * @param {number} startingFrame
 */
function generateAttackFrames(count, startingFrame) {
  const image = $('#image');

  const startingColumn = startingFrame + 1;
  let currentColumn = startingColumn;

  for (let i = 0; i < count; i++) {
    const attackFrame = document.createElement('div');
    attackFrame.className = 'frame active-frame';
    attackFrame.style.gridColumn = `${currentColumn} / ${currentColumn + 1}`;
    currentColumn++;

    image.appendChild(attackFrame);
  }
}

/**
 * @param {number} totalLength
 */
function generateBorders(totalLength) {
  const image = $('#image');
  const borderCount = Math.floor(totalLength / 5);
  const borderClasses = [
    'first-border',
    'second-border',
    'third-border',
    'fourth-border',
    'fifth-border'
  ];

  // Starting at 1 here because we multiply by 5 to get the starting column
  for (let i = 1; i <= borderCount; i++) {
    // First column we want to have a border at is 7. This is the sixth frame
    // We start at the sixth frame because this has a left border
    const startingColumn = i * 5 + 2;

    borderClasses.forEach(borderClass => {
      const border = document.createElement('div');
      border.className = `border ${borderClass}`;
      border.style.gridColumn = `${startingColumn} / ${startingColumn + 1}`;

      image.appendChild(border);
    });
  }
}

function generateStart() {
  const image = $('#image');

  const start = document.createElement('div');
  start.className = 'start';

  image.appendChild(start);
}

function clearImage() {
  const image = $('#image');
  var cNode = image.cloneNode(false);
  image.parentNode.replaceChild(cNode, image);
}

export async function createImage() {
  const imageSource = $('#image');
  const prevColor = imageSource.style.backgroundColor;

  const generatedImageLocation = $('#generated-image');

  imageSource.style.backgroundColor = 'transparent';

  const imageData = await toSvgDataURL(imageSource);
  imageSource.style.backgroundColor = prevColor;
  const image = new Image();
  image.src = imageData;
  generatedImageLocation.appendChild(image);
}

export function makePicture() {
  const inputs = new FormData($('#inputs'));

  clearImage();
  generateStart();

  const startup = parseInt(inputs.get('startup').toString());
  const active = parseInt(inputs.get('active').toString());
  const recovery = parseInt(inputs.get('recovery').toString());

  const totalFrames = startup + active + recovery;
  document.documentElement.style.setProperty('--total-frames', (totalFrames + 1).toString());

  generateVulnerabilityFrames(totalFrames);
  generateBorders(totalFrames);
  generateAttackFrames(active, startup + 1);
}
