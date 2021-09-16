import * as d3 from 'd3';
import App from '../App';

export default function InfoText() {
  const { width, height } = App;
  const infoText = () => {
    let textContainer = d3
      .select('svg')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    textContainer
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -350)
      .attr('y', 150)
      .text('Timer Minutes');

    textContainer
      .append('text')
      .attr('x', width)
      .attr('y', height )
      .attr('id', 'title')
      .text('Drivers who alleged drug from 90 to now')
      .style('font-size', '1.5em');

    textContainer
      .append('text')
      .attr('x', 1050)
      .attr('y', 150)
      .text('Legend')
      .style('font-size', '1.5em');
  };
  return { infoText };
}
