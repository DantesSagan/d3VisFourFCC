import App from '../App';
import * as d3 from 'd3';

export default function DrawCanvas() {
  const width = 1200;
  const height = 600;
  const drawCanvas = () => {
    d3.select('svg').attr('width', width).attr('height', height);
  };
  return { drawCanvas };
}
