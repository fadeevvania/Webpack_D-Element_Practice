import './styles/global.pcss';
import './styles/range-slider.pcss';
import './styles/slider.pcss';
import './styles/yamap.pcss';
import './styles/fonts.pcss';
import './styles/palette.pcss';
import rangeSlider from "./js/rangeSlider";
import Slider from "./js/slider";
import YandexAPI from './js/map';

const rangeSliderComponent = document.getElementById('rangeSlider');
const sliderRange = new rangeSlider(rangeSliderComponent, { range: [0, 100,], start: [0, 100,] });



const sliderContainer = document.querySelector('.slider__content');
// eslint-disable-next-line no-unused-vars
const defaultSl = new Slider(sliderContainer);

const map = new YandexAPI();
