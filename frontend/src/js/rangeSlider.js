import noUiSlider from 'nouislider';

export default class rangeSlider {
    constructor (rangeSlider, params = { range: [0, 100,], start: [0, 100,] }) {
        this.rangeParams = {
            min: params.range[0],
            max: params.range[1]
        };
        this.valueStart = params.start;
        this.sliderElement = rangeSlider;
        if (this.sliderElement) {
            noUiSlider.create(this.sliderElement, {
                start: this.valueStart,
                connect: true,
                range: this.rangeParams,
                step: 1,
                tooltips: [
                    {
                        to: function (value) {
                            return `от ${value} $`;
                        }
                    },
                    {
                        to: function (value) {
                            return `до ${value} $`;
                        }
                    },]
            });
        }
    }
}
