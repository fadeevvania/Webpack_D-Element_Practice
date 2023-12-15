export class YandexMap {
    element = null;
    map = null;

    constructor (element) {
        this.element = Array.from(element)[0];
        console.log(this.element.dataset.center.split(','));
        const map = new ymaps.Map('yandexMap', {
            center: this.element.dataset.center.split(','),
            zoom: 15
        });
        const GeoObjects = [];
        GeoObjects[0] = new ymaps.Placemark(this.element.dataset.home.split(','), {}, {
            iconImageHref: './images/svg/homeIcon.svg',
            iconImageSize: [30, 42,],
            iconImageOffset: [-3, -42,]
        });
        GeoObjects[0].events
            .add('mouseenter', (e) => {
                e.get('target').options.set('iconImageHref', './images/svg/homeIconFill.svg');
            })
            .add('mouseleave', function (e) {
                e.get('target').options.set('iconImageHref', './images/svg/homeIcon.svg');
            });

        GeoObjects[1] = new ymaps.Placemark(this.element.dataset.user.split(','), {},
            {
                iconImageHref: './images/svg/UserIcon.svg',
                iconImageSize: [30, 42,],
                iconImageOffset: [-3, -42,]
            });
        GeoObjects[1].events
            .add('mouseenter', (e) => {
                e.get('target').options.set('iconImageHref', './images/svg/UserIconFill.svg');
            })
            .add('mouseleave', function (e) {
                e.get('target').options.set('iconImageHref', './images/svg/UserIcon.svg');
            });
        GeoObjects[2] = new ymaps.Placemark(this.element.dataset.work.split(','), {}, {
            iconImageHref: './images/svg/WorkIcon.svg',
            iconImageSize: [30, 42,],
            iconImageOffset: [-3, -42,]
        });
        GeoObjects[2].events
            .add('mouseenter', (e) => {
                e.get('target').options.set('iconImageHref', './images/svg/WorkIconFill.svg');
            })
            .add('mouseleave', function (e) {
                e.get('target').options.set('iconImageHref', './images/svg/WorkIcon.svg');
            });
        const clusterer = new ymaps.Clusterer();
        clusterer.add(GeoObjects);
        console.log(clusterer);
        map.geoObjects.add(clusterer);
    }
}

export default class YandexAPI {
    static selector = '#yandexMap';

    static url = 'https://api-maps.yandex.ru/2.0/?apikey=e267d5da-1906-4ea1-bb4d-90e361329b5f&load=package.full&lang=ru_RU&onload=initMaps';

    constructor () {
        this.maps = document.querySelectorAll(YandexAPI.selector);
        if (this.maps.length) {
            window.initMaps = this.init.bind(this);
            this.load()
                .then(() => {
                    console.debug('Yandex Maps API готово к использованию');
                })
                .catch(() => {
                    console.debug('Произошла ошибка загрузки Yandex Maps API');
                });
        }
    }

    async load () {
        const script = document.createElement('script');
        script.src = YandexAPI.url;
        document.currentScript.parentNode.insertBefore(
            script,
            document.currentScript
        );
    }

    init () {
        new YandexMap(this.maps);
    }
}
