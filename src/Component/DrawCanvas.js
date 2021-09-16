import App from '../App';
import * as d3 from 'd3';

export default function DrawCanvas() {
  const { width, height } = App;
  const drawCanvas = () => {
    d3.select('svg').attr('width', width).attr('height', height);
  };
  return { drawCanvas };
}
