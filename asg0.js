// asg0.js
let canvas;
let ctx;

// Main function
function main() {
  // Retrieve <canvas> element
  canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }

  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');
  
  // Set up event listeners
  document.getElementById('drawButton').addEventListener('click', handleDrawEvent);
  document.getElementById('operationButton').addEventListener('click', handleDrawOperationEvent);
  
  // Initial draw
  handleDrawEvent();
}

// Function to handle drawing vectors
function handleDrawEvent() {
  // Clear the canvas
  clearCanvas();
  
  // Get values from input fields
  const v1x = parseFloat(document.getElementById('v1x').value);
  const v1y = parseFloat(document.getElementById('v1y').value);
  const v2x = parseFloat(document.getElementById('v2x').value);
  const v2y = parseFloat(document.getElementById('v2y').value);
  
  // Create vectors
  const v1 = new Vector3([v1x, v1y, 0]);
  const v2 = new Vector3([v2x, v2y, 0]);
  
  // Draw vectors
  drawVector(v1, "red");
  drawVector(v2, "blue");
}

// Function to handle vector operations
function handleDrawOperationEvent() {
  // First draw the original vectors
  handleDrawEvent();
  
  // Get values from input fields
  const v1x = parseFloat(document.getElementById('v1x').value);
  const v1y = parseFloat(document.getElementById('v1y').value);
  const v2x = parseFloat(document.getElementById('v2x').value);
  const v2y = parseFloat(document.getElementById('v2y').value);
  const operation = document.getElementById('operation').value;
  const scalar = parseFloat(document.getElementById('scalar').value);
  
  // Create vectors
  const v1 = new Vector3([v1x, v1y, 0]);
  const v2 = new Vector3([v2x, v2y, 0]);
  
  // Perform the selected operation
  switch(operation) {
    case 'add':
      const resultAdd = new Vector3([0, 0, 0]);
      resultAdd.set(v1); // Make a copy of v1
      resultAdd.add(v2); // Add v2 to it
      drawVector(resultAdd, "green");
      break;
      
    case 'sub':
      const resultSub = new Vector3([0, 0, 0]);
      resultSub.set(v1); // Make a copy of v1
      resultSub.sub(v2); // Subtract v2 from it
      drawVector(resultSub, "green");
      break;
      
    case 'mul':
      const resultMul1 = new Vector3([0, 0, 0]);
      const resultMul2 = new Vector3([0, 0, 0]);
      resultMul1.set(v1); // Make a copy of v1
      resultMul2.set(v2); // Make a copy of v2
      resultMul1.mul(scalar); // Multiply it by scalar
      resultMul2.mul(scalar); // Multiply it by scalar
      drawVector(resultMul1, "green");
      drawVector(resultMul2, "green");
      break;
      
    case 'div':
      const resultDiv1 = new Vector3([0, 0, 0]);
      const resultDiv2 = new Vector3([0, 0, 0]);
      resultDiv1.set(v1); // Make a copy of v1
      resultDiv2.set(v2); // Make a copy of v2
      resultDiv1.div(scalar); // Divide it by scalar
      resultDiv2.div(scalar); // Divide it by scalar
      drawVector(resultDiv1, "green");
      drawVector(resultDiv2, "green");
      break;
      
    case 'magnitude':
      const mag1 = v1.magnitude();
      const mag2 = v2.magnitude();
      console.log(`Magnitude of v1: ${mag1}`);
      console.log(`Magnitude of v2: ${mag2}`);
      break;
      
    case 'normalize':
      const normV1 = new Vector3([0, 0, 0]);
      const normV2 = new Vector3([0, 0, 0]);
      normV1.set(v1); // Make a copy of v1
      normV2.set(v2); // Make a copy of v2
      normV1.normalize(); // Normalize it
      normV2.normalize(); // Normalize it
      drawVector(normV1, "green");
      drawVector(normV2, "green");
      break;
      
    case 'angle':
      const angle = angleBetween(v1, v2);
      console.log(`Angle between v1 and v2: ${angle.toFixed(2)} radians or ${(angle * 180 / Math.PI).toFixed(2)} degrees`);
      break;
      
    case 'area':
      const area = areaTriangle(v1, v2);
      console.log(`Area of triangle formed by v1 and v2: ${area.toFixed(2)} square units`);
      break;
  }
}

// Function to clear the canvas
function clearCanvas() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to draw a vector
function drawVector(v, color) {
  const scale = 20; // Scale to make vectors visible
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + v.elements[0] * scale, centerY - v.elements[1] * scale);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Function to calculate angle between two vectors
function angleBetween(v1, v2) {
  const dotProduct = Vector3.dot(v1, v2);
  const mag1 = v1.magnitude();
  const mag2 = v2.magnitude();
  
  // Ensure we don't get NaN due to floating point errors
  let cosTheta = dotProduct / (mag1 * mag2);
  if (cosTheta > 1) cosTheta = 1;
  if (cosTheta < -1) cosTheta = -1;
  
  return Math.acos(cosTheta);
}

// Function to calculate area of triangle formed by two vectors
function areaTriangle(v1, v2) {
  const crossProduct = Vector3.cross(v1, v2);
  return crossProduct.magnitude() / 2; // Area of triangle is half the area of parallelogram
}