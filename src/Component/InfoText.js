import * as d3 from 'd3';
import App from '../App';

export default function InfoText() {
  const { width, height } = App;
  const infoText = () => {
    let textContainer = d3
      .select('svg')
      .append('svg')
      .attr('width', width)
      .attr('height', height).attr('fill', 'white');
    textContainer
      .append('text')
      .attr('x', 920)
      .attr('y', 350)
      .text('Legend')
      .style('font-size', '1.5em');
  };
  return { infoText };
}
