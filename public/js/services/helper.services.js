angular.module('helper.service', []).factory('helperServices', helperServices);

function helperServices($location) {
    var service = { IsBusy: false, absUrl: $location.$$absUrl };
    service.url = $location.$$protocol + '://' + $location.$$host;
    if ($location.$$port) {
        // service.url = service.url + ':' + $location.$$port;
        service.url = service.url + ':' + $location.$$port + '/wajibpajak';
    }

    // '    http://localhost:5000';

    service.groupBy = (list, keyGetter) => {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    };
    service.getParam = () => {
        id = $location.$$absUrl.split('/');
        return id[id.length - 1];
    }
    service.romanize = (num) => {
        if (isNaN(num))
            return NaN;
        var digits = String(+num).split(""),
            key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }
    service.roles = { id: 1, role: 'Admin' };
    service.sex = ['Pria', 'Wanita'];
    service.marker = ['Blue', 'Green', 'Orange', 'Pink', 'Purple', 'Red', 'Yellow'];
    service.distrik = ['Jayapura Utara', 'Jayapura Selatan', 'Abepura', 'Muara Tami', 'Heram'];
    service.detaildistrik = [
        {"id":9471010,"id_kota":"9471","nama":"Muara Tami", "kelurahan":[{"id":9471010001,"id_kecamatan":"9471010","nama":"Koya Barat"},{"id":9471010002,"id_kecamatan":"9471010","nama":"Holtekam"},{"id":9471010003,"id_kecamatan":"9471010","nama":"Skow Yambe"},{"id":9471010004,"id_kecamatan":"9471010","nama":"Koya Timur"},{"id":9471010005,"id_kecamatan":"9471010","nama":"Skow Mabo"},{"id":9471010006,"id_kecamatan":"9471010","nama":"Skow Sae"},{"id":9471010007,"id_kecamatan":"9471010","nama":"Koya Tengah"},{"id":9471010008,"id_kecamatan":"9471010","nama":"Kampung Mosso"}]},
        {"id":9471020,"id_kota":"9471","nama":"Abepura", "kelurahan":[{"id":9471020004,"id_kecamatan":"9471020","nama":"Asano"},{"id":9471020005,"id_kecamatan":"9471020","nama":"Nafri"},{"id":9471020006,"id_kecamatan":"9471020","nama":"Engros"},{"id":9471020008,"id_kecamatan":"9471020","nama":"Awiyo"},{"id":9471020009,"id_kecamatan":"9471020","nama":"Koya Koso"},{"id":9471020010,"id_kecamatan":"9471020","nama":"Yobe"},{"id":9471020011,"id_kecamatan":"9471020","nama":"Abe Pantai"},{"id":9471020012,"id_kecamatan":"9471020","nama":"Kota Baru"},{"id":9471020014,"id_kecamatan":"9471020","nama":"Wai Mhorock"},{"id":9471020015,"id_kecamatan":"9471020","nama":"Wahno"}]},
        {"id":9471021,"id_kota":"9471","nama":"Heram", "kelurahan":[{"id":9471021001,"id_kecamatan":"9471021","nama":"Yoka"},{"id":9471021002,"id_kecamatan":"9471021","nama":"Kampung Waena"},{"id":9471021003,"id_kecamatan":"9471021","nama":"Hedam"},{"id":9471021005,"id_kecamatan":"9471021","nama":"Waena"},{"id":9471021006,"id_kecamatan":"9471021","nama":"Yabansai"}]},
        {"id":9471030,"id_kota":"9471","nama":"Jayapura Selatan", "kelurahan":[{"id":9471030002,"id_kecamatan":"9471030","nama":"Entrop"},{"id":9471030003,"id_kecamatan":"9471030","nama":"Tobati"},{"id":9471030004,"id_kecamatan":"9471030","nama":"Hamadi"},{"id":9471030005,"id_kecamatan":"9471030","nama":"Ardipura"},{"id":9471030006,"id_kecamatan":"9471030","nama":"Numbai"},{"id":9471030007,"id_kecamatan":"9471030","nama":"Argapura"},{"id":9471030008,"id_kecamatan":"9471030","nama":"Tahima Soroma"}]},
        {"id":9471040,"id_kota":"9471","nama":"Jayapura Utara", "kelurahan":[{"id":9471040001,"id_kecamatan":"9471040","nama":"Gurabesi"},{"id":9471040002,"id_kecamatan":"9471040","nama":"Bayangkara"},{"id":9471040003,"id_kecamatan":"9471040","nama":"Mandala"},{"id":9471040004,"id_kecamatan":"9471040","nama":"Trikora"},{"id":9471040005,"id_kecamatan":"9471040","nama":"Angkasapura"},{"id":9471040007,"id_kecamatan":"9471040","nama":"Tanjung Ria"},{"id":9471040008,"id_kecamatan":"9471040","nama":"Kampung Kayobatu"}]}];
    return service;
}