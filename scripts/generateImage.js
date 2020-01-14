/**
 * @param {number} count
 */
function generateVulnerabilityFrames(count) {
  const image = document.getElementById('image');

  for (let i = 0; i < count; i++) {
    const frame = document.createElement('div');
    frame.className = 'frame vulnerability frame';

    image.appendChild(frame);
  }
}

/**
 * @param {number} count
 * @param {number} startingFrame
 */
function generateAttackFrames(count, startingFrame) {
  const image = document.getElementById('image');

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

function generateBorders(totalLength) {
  const image = document.getElementById('image');
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
    
    borderClasses.forEach((borderClass) => {
      const border = document.createElement('div');
      border.className = `border ${borderClass}`;
      border.style.gridColumn = `${startingColumn} / ${startingColumn + 1}`;

      image.appendChild(border);
    })
  }
}
