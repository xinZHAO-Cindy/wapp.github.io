//----Camera API
$(document).ready(function () {
  var video = document.querySelector('#video');

  // Put variables in global scope to make them available to the browser console.
  var constraints = window.constraints = {
    audio: false,
    video: true
    // video: { facingMode: { exact: "environment" } }
  };

  function handleSuccess(stream) {
    var videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints:', constraints);
    console.log('Using video device: ' + videoTracks[0].label);
    stream.oninactive = function () {
      console.log('Stream inactive');
    };
    window.stream = stream; // make variable available to browser console
    video.srcObject = stream;
  }

  navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess);
});

//----GPS API
var map;
var infowindow;
var here;
// var results_pois = JSON.parse('[{"geometry":{"location":{"lat":60.2054911,"lng":24.655899999999974},"viewport":{"south":60.0499087,"west":24.499656500000015,"north":60.3636105,"east":24.8505715}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png","id":"71675bb33b7c9dd3ce185f1fcb84cfe97a8c7127","name":"Espoo","place_id":"ChIJ4Us9pPryjUYRn1MzXbSQuPA","reference":"CmRbAAAAHGkQE_7-NzRtwDLuCTo6r_YZicnCrO58XpCQboTP4T53Zgg1ZbXGmkmTF3Ii-HuyFQpo-jMpdnxOZYiCZ6KzDIHLAzGrYARZJ2AvPo2lOg-8g2ddnj8HCgZ1qMaIXUKKEhALwQtBbX5xTaFLdjZ6t14iGhTx1kwTl-AHazS8K31cdAa4TRq_Tw","scope":"GOOGLE","types":["locality","political"],"vicinity":"Espoo","html_attributions":[],"angle":-83.50405221107631,"facing":176.32033057022966},{"geometry":{"location":{"lat":60.1842013,"lng":24.81381239999996},"viewport":{"south":60.1830992197085,"west":24.813076919708465,"north":60.1857971802915,"east":24.81577488029143}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"f218778226ec43f375b1cb82aa21f736db9ee3ee","name":"MariaRu Hieronta Innopoli 2","place_id":"ChIJHU4zQpX1jUYR6SeBj1skvxg","reference":"CmRRAAAA6PtbQwE9PmtRTUkbwHIwfR98c67e4BhyosZ-KA7aSidWUwqNsQzZ3o-r-glykHgz0cxLDuNHMxKm3AThUF9rOQf4wIdCHVC7FSMOPpsiR_V2zXOoyK-QNQ8id8XbRXXrEhBjrI_IYgI5wvVU_2cuUpsFGhSlMr75tYIPqRdxWqpNQTgVIn6IcA","scope":"GOOGLE","types":["health","point_of_interest","establishment"],"vicinity":"Teknikvägen 14, Esbo","html_attributions":[],"angle":-154.0470426604347,"facing":-113.13667898041194},{"geometry":{"location":{"lat":60.18443610000001,"lng":24.815228299999944},"viewport":{"south":60.18311541970849,"west":24.813949619708524,"north":60.1858133802915,"east":24.816647580291487}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"6d0d35d9a7e5aad32b747a77019990302ec9a1c5","name":"Barona","place_id":"ChIJcXWr4pT1jUYReFlkWAk8dPk","reference":"CmRSAAAACLz0m6lZFXEnry0m2DiTN5mG2BEwlf_ZgZo005HnCqNl2CkVHndIMHWqhIEzCunUQCIf2XQ6OzLr1x8Jds3OKnoziChJH5DQ5PNL0LgLdo9K9NqBV6_pgK86VSKyo8j_EhCppdJDh0iuxzvm7u3TvJI_GhTa_jnTG4t_G4Phb96oBdPXaW-ybw","scope":"GOOGLE","types":["point_of_interest","establishment"],"vicinity":"Teknikvägen 12, Esbo","html_attributions":[],"angle":-177.8243321047306,"facing":-89.35938953611605},{"geometry":{"location":{"lat":60.1874255,"lng":24.815065199999935},"viewport":{"south":60.18591011970849,"west":24.81364921970851,"north":60.1886080802915,"east":24.816347180291473}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"f031b7f092db3cc465f3a4bed1685138a1df782b","name":"Aalto Start-Up Center","place_id":"ChIJPcJl-EYKkkYRrB44DamrMhw","rating":4.8,"reference":"CmRRAAAA7UlEYg7ve86RDukelma0r0EKEwJt3qDabWWy5NKAt5QZbRDj-awhWmYNjEz20BJqZIvZWhE3ZRw_vFcnw5PfNm-4yN1Rl9nqDgNggNG_204r-MtIh_ddSj4NvA3HkyiHEhAsZhSavGAGOfplty8tk-_qGhRWq6jAnEmMfTpo3AFKj5Y3xZ7b1g","scope":"GOOGLE","types":["university","point_of_interest","establishment"],"vicinity":"Maarintie 6, Espoo","html_attributions":[],"angle":-72.01906942547004,"facing":164.83534778462337},{"geometry":{"location":{"lat":60.1857121,"lng":24.813990200000035},"viewport":{"south":60.18436311970849,"west":24.81264121970844,"north":60.18706108029151,"east":24.815339180291517}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/school-71.png","id":"74fcb81543c742c8895a9fce842451f60a1bd245","name":"Hawkware Training Oy","opening_hours":{"open_now":false,"weekday_text":[]},"place_id":"ChIJ82f4Yr_1jUYRvM8nrf8v1Z8","reference":"CmRSAAAAzRDICSQ1lZdrDp_5CwkWNxZrIJ42Cl3H-voNH0YmriqbPcTS4aFTL2SNBOcOsNp8V4aJU1OjmMdyVfMcogKeQDk6204sWZXy4yTVl4GUjtrENkJVeKspP57B80acaJRyEhB7VJoaDTHBftciDpsBPm9yGhTdd5E7Hv_NEq_ngcLY5StN8ShxvQ","scope":"GOOGLE","types":["school","point_of_interest","establishment"],"vicinity":"Metsänneidonkuja 6, Espoo","html_attributions":[],"angle":-140.3115241303131,"facing":-126.87219751053357},{"geometry":{"location":{"lat":60.18560230000001,"lng":24.81184429999996},"viewport":{"south":60.1845387697085,"west":24.810167169708507,"north":60.18723673029151,"east":24.81286513029147}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"b753db5b3fec69f4a426b97806463fa9e3dacf2d","name":"SAS Institute Oy","place_id":"ChIJHU4zQpX1jUYRmEbcpd9KpRU","rating":5,"reference":"CmRRAAAAl2z4OLc1A21XbBeAkHt2Y8MKVAF2bAPKfAPwEmNyZNe5n4BUIkmpA_wxCm7eyv0YUiAvPrjOZ8twemadDbIRfjC0-PrCOMeNtzmGaXzONCiP6MclN6AT7NJ8qQMV38J8EhCm4TlUmF9YlpgP47SrDVHoGhTXJAgFlxPZx0zvUViX1sI6HNFMYw","scope":"GOOGLE","types":["point_of_interest","establishment"],"vicinity":"Teknikvägen 14, Esbo","html_attributions":[],"angle":-116.39952713908838,"facing":-150.7841945017583},{"geometry":{"location":{"lat":60.1844607,"lng":24.81284210000001},"viewport":{"south":60.18342016970849,"west":24.812043050000057,"north":60.1861181302915,"east":24.81523924999999}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"a07dcd49277479fc842f2b468a888ab56acef6fe","name":"Tapiolan Autopesu","opening_hours":{"open_now":true,"weekday_text":[]},"place_id":"ChIJ8dKqL5j1jUYR7phTE2ldHfQ","rating":3.8,"reference":"CmRSAAAALLeAzbY6Xk0Eo0MXsVJjJ31oVVYyr6fg97DP-9OZ0UAWM5B_s2qZDc-zL6U1yXBMET2SO_1L1OVgbISbLxLl_W8W-bBj0aP0LXROLxH_7eJQAtyZrD9DR1eicygy5eecEhDkBEzUPh9mOtSQwxmmcvqvGhSw8eGJBz5CHHQPwHNEcoLCy7g3zg","scope":"GOOGLE","types":["car_wash","point_of_interest","establishment"],"vicinity":"Teknikvägen 12, Esbo","html_attributions":[],"angle":-139.0426419406994,"facing":-128.14107970014726},{"geometry":{"location":{"lat":60.18567580000001,"lng":24.81206420000001},"viewport":{"south":60.1844872697085,"west":24.81115991970853,"north":60.1871852302915,"east":24.813857880291494}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"1a484ff6bb34e7475f8befb35ad3c5dda10cec4f","name":"HiQ Finland Oy","place_id":"ChIJKb-9c8D1jUYRx4CKf7DYpZ0","rating":4.6,"reference":"CmRSAAAAa7zVGi10SE_RCeKSRoDhCCV19NUcwFPuxf5M02XOxWx98y6idxDPlspChDrEdmc_ANvobY3rAr_BQq9o-B16bWe9GL0aP-XftGjavkLjxlMBXyGxoNguv8LRoXkgfrT7EhBMj1OzRcd61OBv9q-5mDA-GhTifkIs_x6wfPmq9Hus08a2LoGDIA","scope":"GOOGLE","types":["point_of_interest","establishment"],"vicinity":"Innopoli 2, Tekniikantie 14, Espoo","html_attributions":[],"angle":-116.89795143134064,"facing":-150.28577020950604},{"geometry":{"location":{"lat":60.18443610000001,"lng":24.815228299999944},"viewport":{"south":60.18311541970849,"west":24.813949619708524,"north":60.1858133802915,"east":24.816647580291487}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"030c197829d43364b6f6d327e64a3a42c6859f14","name":"Headstart Oy","place_id":"ChIJrzYr45T1jUYR8TyzFiDQHBE","rating":5,"reference":"CmRRAAAAe3lH5W1FA_7FPAV2E_il50VAl_Id8UKvcEH1MYD-7kQVEDc4jYhRVbmQh--sDbE4POgx28pIfYNaiinAXkKgRnmf5hh04QGK8Ls2ad1NHFQg6dq38xVemzORss7BQa8GEhBG126uQqGQiWW0rq0EA0gKGhQcOKGDNvEf1xZk3ah2xcxmyD1TnA","scope":"GOOGLE","types":["point_of_interest","establishment"],"vicinity":"Teknikvägen 12","html_attributions":[],"angle":-177.8243321047306,"facing":-89.35938953611605},{"geometry":{"location":{"lat":60.18558269999999,"lng":24.812162299999954},"viewport":{"south":60.1844163197085,"west":24.811244569708492,"north":60.1871142802915,"east":24.81394253029157}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"488e01ad988f5abc9500688deacdded39d5b750f","name":"Trainers\' House Oyj","opening_hours":{"open_now":false,"weekday_text":[]},"place_id":"ChIJQ30hZ6f1jUYR8axA0lkRm7I","rating":3.7,"reference":"CmRSAAAARW4eoSZCcOxxiK3xkBkJ6HzZlAuvMDtRqecpaIvgzgA9LkYnjOeBSIMrOhUb_Dm8pHZVneTilZWoAwC2qBsfJ4y5DaIdVOVYvepN66Von28SlVJKnrJkiIDB-iicDRIiEhC9JdxMEi4ssYmw0Wvs6_paGhQyWCNF-TrKYIthoaQ7Ax-NYFM80w","scope":"GOOGLE","types":["point_of_interest","establishment"],"vicinity":"Teknikvägen 14","html_attributions":[],"angle":-118.91027713259444,"facing":-148.27344450825223},{"geometry":{"location":{"lat":60.185351,"lng":24.812266000000022},"viewport":{"south":60.18422131970848,"west":24.811432619708512,"north":60.1869192802915,"east":24.814130580291476}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"f558a3e4f2a7de9a75f3342d123b8e619bc37165","name":"Documill Oy","place_id":"ChIJHU4zQpX1jUYRwVtTMLzcj-M","reference":"CmRSAAAAUBVv8Npel6usvALusGh3vkz9I6zDOkzguxROQJyP4mkf0pzSwM5oP7JG3FNtJXFUcBpTSANsK0XGpYOu1XHNPI3Pypacnu7OEv7sDbJf03VorY_LolkLrw3UFn87qp3_EhAZG_oewvUFotZQnaRPOS_iGhSq_c0AtFAa8TycWwEDh38nL3oYoA","scope":"GOOGLE","types":["point_of_interest","establishment"],"vicinity":"Teknikvägen 14, Esbo","html_attributions":[],"angle":-122.87515495148106,"facing":-144.3085666893656},{"geometry":{"location":{"lat":60.185759,"lng":24.81243010000003},"viewport":{"south":60.18451286970849,"west":24.811366169708435,"north":60.18721083029151,"east":24.814064130291513}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"e8d9d4562c403d33bda9ef279fdc61e2d6acebb3","name":"Visit Espoo","opening_hours":{"open_now":false,"weekday_text":[]},"place_id":"ChIJgXbIjZf1jUYRSbXZ9zwXl_w","rating":3,"reference":"CmRSAAAAlbJVagdkaCcgWRJkiRxCgFRy3DeQYoUvs3qvB_BFyUKBUQmDftpDioQFxILZVsDC9CIE4zrnKyrPi3f5gmiJRyDpSooeXt_lVKfAWO15uMnp-1XXX97dgepiK4twBNp2EhCX9j7IiGIaLIWGKYVqA2DqGhQmWa4mNG9BsT3E9lSGlir2GB83kA","scope":"GOOGLE","types":["point_of_interest","establishment"],"vicinity":"Innopoli 2, Tekniikantie 14, Espoo","html_attributions":[],"angle":-118.4797245981042,"facing":-148.70399704274246},{"geometry":{"location":{"lat":60.1857438,"lng":24.81198829999994},"viewport":{"south":60.1843948197085,"west":24.81063931970857,"north":60.18709278029151,"east":24.813337280291535}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"b6db320310551b5fe9e9d5886afb327b67799a36","name":"Wector Systems Oy","place_id":"ChIJA9Ix9ykPkkYRRIBceu4Abuw","reference":"CmRSAAAA7ZV4JSuQ_JxKh1vH_Sc_Muq0XgPZq1DOh6QcqSGu8WNQEOhie1j68LFhNxSe13C6gokgrEs-NAAMEJUi_5hEcz8-4crp0T6Fqwdwy4qyYy7mrO_XfQf3kSx_oPQWRkK6EhB1I7wbUb48HtDtd8YsB0PIGhR9dtRrenVTIaFseg9yx8AGCGZSmg","scope":"GOOGLE","types":["point_of_interest","establishment"],"vicinity":"Tekniikantie 14, Espoo","html_attributions":[],"angle":-115.4308073211365,"facing":-151.75291431971016},{"geometry":{"location":{"lat":60.18752549999999,"lng":24.80997000000002},"viewport":{"south":60.18618331970848,"west":24.8087195697085,"north":60.1888812802915,"east":24.811417530291465}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"de6bc4cb10abd29008baaea16a1c5f0110d15253","name":"Eroni","place_id":"ChIJKb-9c8D1jUYRVcc7tDtptLM","reference":"CmRSAAAAlt6Ig2E9LfT_J8UHromgS5e1_xK34U6rsvQdC0gWPpaaXRRQFnLXcoKPB3-Boq8Hip7KwT2NMnDO_iG-hAsDiTToy9DtgnrbLGpC3ZoU-TA5xLYkj-tBxlW6H0t6_gfHEhBUwm82r83yC3AmILapNvmJGhQ4AB6SzbbtZSo3LCxdGSKl769qWQ","scope":"GOOGLE","types":["point_of_interest","establishment"],"vicinity":"Vaisalantie 2, Espoo","html_attributions":[],"angle":-87.9869117411815,"facing":-179.19680989966514},{"geometry":{"location":{"lat":60.1856129,"lng":24.811962300000005},"viewport":{"south":60.18426391970848,"west":24.810613319708523,"north":60.1869618802915,"east":24.813311280291487}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"e86ed418b1dad18676f723c3cfce7c53ea08d638","name":"DataCenter Finland Oy","opening_hours":{"open_now":false,"weekday_text":[]},"place_id":"ChIJ60s8mjz0jUYRwnWsAu4PGbY","rating":5,"reference":"CmRSAAAAb0stUm9_DkukrIdZZ7Cr8LDcCrOvq8Xg9MuDmXe9B8OYZvI6J_FUf8yMuwD-v4BTGMUK-xRF5n2WyotC-IZMoC6NFjJOijuJra_7BjXXFOvT41WtPolpNzjNujp7RgEyEhD76SCKOYS0L6YoCbtnFuJWGhTXud2FtqxNKw3gSQwHOzPAjdnMYg","scope":"GOOGLE","types":["point_of_interest","establishment"],"vicinity":"Tekniikantie 14, Espoo","html_attributions":[],"angle":-117.04902180629544,"facing":-150.1346998345512},{"geometry":{"location":{"lat":60.18550579999999,"lng":24.813989499999934},"viewport":{"south":60.18412881970849,"west":24.81256976970849,"north":60.1868267802915,"east":24.815267730291453}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"532cf6738773fae28d0c7a1c2884d0e7c7cc2442","name":"Tech Levi Oy","opening_hours":{"open_now":false,"weekday_text":[]},"place_id":"ChIJJc74QJX1jUYR7BVc5uV5rfA","reference":"CmRSAAAA24gF6_rajBI5b8g1i5YLnwA2KlsV_1sMpMt7NeIp4Mv0K84_OLBxxLg13pQQEe2Gq1zYQSWDs2GpwxuHs08-NGe0ZDAKBj7wC1rkX0MSc_ZpTy75c_PGSYzyT8NLvp1mEhC_glrgQeUj2yttwmCCKJNlGhTntZzHJ1Nf1u0dPaC0i3vblK8Z_Q","scope":"GOOGLE","types":["point_of_interest","establishment"],"vicinity":"Teknikvägen 21, Esbo","html_attributions":[],"angle":-143.6188505553878,"facing":-123.56487108545889},{"geometry":{"location":{"lat":60.18443610000001,"lng":24.815228299999944},"viewport":{"south":60.18311541970849,"west":24.813949619708524,"north":60.1858133802915,"east":24.816647580291487}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"4ef4df7352be935216fc52404e33e143e0538bd7","name":"Libella Oy","place_id":"ChIJb02FcL_1jUYRcImtw0aGIhk","reference":"CmRRAAAAwwJCbpx9pCuFTRTxtUI1-AQXbbjgCl3pWFPMgTwexT9SbgK_s9wnTsOR9O0vob8s_MmtONF4YpB271lxxXTuXWhI9tRmLmeLATZzmdKvQfBk0SVoO_2oDnmPstWYZxE_EhBbStytybL3DyelAIOPpmy-GhSgkDMmEkReCU_i3heeVpNPAxPVEw","scope":"GOOGLE","types":["point_of_interest","establishment"],"vicinity":"Teknikvägen 12, Esbo","html_attributions":[],"angle":-177.8243321047306,"facing":-89.35938953611605},{"geometry":{"location":{"lat":60.1838994,"lng":24.8143996},"viewport":{"south":60.18277191970849,"west":24.81365201970857,"north":60.1854698802915,"east":24.816349980291534}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"9c9e3e55420dfb4002c9e90ecb10d3376b6c2603","name":"Idean Enterprises Oy","place_id":"ChIJrzYr45T1jUYRT_WEoOGZbVw","reference":"CmRRAAAArc23-6l2RjW4RzV8ZyCrD34cHkyJgzjOLtQPf-zQx06WT1OXMJzPMA-RnAdn3AtQtZte1czSPSyu7wDMSO1CauILbDd8mN4R3-HVZorwZ6TnrYxNvErCS9Z5lm3x_j2ZEhDYSC0PrI0ICdInb9EDiaX1GhSbSc9umIyJdmKHkpTB-paNP0TGmw","scope":"GOOGLE","types":["point_of_interest","establishment"],"vicinity":"Teknikvägen 12, Esbo","html_attributions":[],"angle":-164.72274037248607,"facing":-102.46098126836057},{"geometry":{"location":{"lat":60.1879284,"lng":24.809842900000035},"viewport":{"south":60.18658671970849,"west":24.808599619708502,"north":60.1892846802915,"east":24.811297580291466}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png","id":"eb5151cb1d31b4e9a2282a63245ed173f88e3975","name":"Samsung Electronics Nordic Aktiebolag Suomen sivuliike","place_id":"ChIJKb-9c8D1jUYRkt6Xw6Ntbo4","rating":5,"reference":"CmRSAAAA1SG45A8hVl5oLp8PmVNvMTOtXFWaAPeoUlIbn7ek1MACYRT7c5Be7uV9uwki0L7vZ8EbKtlJ_3NryoXvYk5zmFrwZYi-pWn0RyqX3u9j6Yx1iKZA4cbdZJ8LqjCAoAcmEhCU4ic-RyErFj1AikE3gy_MGhQnr0lon5njJD6KsQrNLLwgynAAMQ","scope":"GOOGLE","types":["electronics_store","store","point_of_interest","establishment"],"vicinity":"Vaisalantie 4, Espoo","html_attributions":[],"angle":-83.85578442282633,"facing":176.67206278197966},{"geometry":{"location":{"lat":60.1871312,"lng":24.814885799999956},"viewport":{"south":60.1815833,"west":24.798878400000035,"north":60.19267809999999,"east":24.83089319999999}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png","id":"e63c710fee7687fa8f68bbc037553bf9fa96314f","name":"Maari","place_id":"ChIJW0HEter1jUYRg1L52XgA2uY","reference":"CmRbAAAAMGoEH3W5R-6CLB93aPMscDDZD9rY3J-msz1UeTluL6agREsmwBUcVH2DALwe1wUR3FJBK4EwuyxeFHKLaUsGsp-6gp1HAf0wdEuG8VPyn4mEESGiEBbIpAd_bRDLQrU0EhABRalJm78INFvV-ZMsrwYNGhRD4NCSw063fZ7qvOicwsPLNQUDqw","scope":"GOOGLE","types":["neighborhood","political"],"vicinity":"Espoo","html_attributions":[],"angle":-114.42583436934925,"facing":-152.75788727149745}]');
var results_pois;
var heading_max = 0; var heading_min =0;

function pos() {
  if (navigator.geolocation) {
    var p = navigator.geolocation.getCurrentPosition(initMap);
  }
}

function initMap(p) {

  here = { lat: p.coords.latitude, lng: p.coords.longitude };
  console.log(here);

  map = new google.maps.Map(document.getElementById('map'), {
    center: here,
    zoom: 13
  });

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: here,
    radius: 500
  }, callback);
  console.log('done');
}

function callback(results, status) {
  console.log(results);
  if (status === google.maps.places.PlacesServiceStatus.OK) {
  // if(true){
    for (var i = 0; i < results.length; i++) {      
      var poi = results[i].geometry.location;
      var dx = poi.lng() - here.lng;
      var dy = poi.lat() - here.lat;
      var distance = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2)) * 111111;
      var angle = Math.atan2(dx, dy) * 180 / Math.PI;
      results[i].angle = angle;

      createMarker(results[i]);
      results[i].distance = distance;
    }
    results_pois = results;
    for (var i = results_pois.length - 1; i >= 0; i--) {
      $('#visual').append('<div class="poi" id="'+results_pois[i].id+'" style="margin-bottom:'+(results_pois[i].distance/10)+'%">'+
                            '<div class="circle">'+
                            '</div>'+
                            '<span class="tooltip_name hide">'+results_pois[i].name+
                            '</span>'+
                          '</div>');
    }
  }
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function () {
    console.log(place.name, place.angle);
  });
}


function filterPOIs(direction) {
  var fov = 90;
  // $('#infoContainer').clear();
  $('#infoContainer').empty();
  for (var i = results_pois.length - 1; i >= 0; i--) {
    var a = direction - results_pois[i].angle;
    results_pois[i].facing = (a + 180) % 360 - 180;
    // if (a > -fov / 2 & a < fov / 2) {
    //   $('#infoContainer').append('<tr><td>' + pois[i].name + '</td>' + '<td>' + pois[i].angle + '</td><td>' + a + '</td><td>' + pois[i].types + '</td></tr>');
    // }
  }
}


function visualization(){
  for (var i = results_pois.length - 1; i >= 0; i--) {
    $('#'+results_pois[i].id).css('left', (50-results_pois[i].facing)+'%').on('click', function(e) {
      $(e).find('.circle').toggleClass('hide');
    });

    $('#'+results_pois[i].id+' .circle').css('zoom', (2-results_pois[i].distance/500))
                                        .css('opacity', (1-results_pois[i].distance/500/2))
                                        .on('click', function(e) {
                                          $(e.target).siblings('.tooltip_name').toggleClass('hide');
                                        });
    // $('#'+results_pois[i].id).css('margin', (50-results_pois[i].facing)+'%');
    // $('#'+results_pois[i].id).css('transform', 'translateX('+(45-results_pois[i].facing)+'vw)');
    // TODO: try without jQuery
    // TODO: benchmark
  }
}

//------Compass API
document.addEventListener("DOMContentLoaded", function (event) {
  count = 0;

  if ('ondeviceorientationabsolute' in window) {
    // document.getElementById("supported").innerHTML = true;
    window.addEventListener('deviceorientationabsolute', function (eventData) {
      var heading = 0;
      if (eventData.absolute === true && eventData.alpha !== null) {
        heading = compassHeading(eventData.alpha, eventData.beta, eventData.gamma);
        // if (heading > heading_max || heading < heading_min) {
        if(true){
          heading_max = heading + 5;
          heading_min = heading - 5;
          
          // Call the function to use the data on the page.
          filterPOIs(heading);
        }
        //Do visualization updates here
        visualization()
      }
      deviceOrientationHandler(heading);
    })
  }
  else if ('ondeviceorientation' in window) {
    // document.getElementById("supported").innerHTML = false;
  }

  function compassHeading(alpha, beta, gamma) {

    // Convert degrees to radians
    var alphaRad = alpha * (Math.PI / 180);
    var betaRad = beta * (Math.PI / 180);
    var gammaRad = gamma * (Math.PI / 180);

    // Calculate equation components
    var cA = Math.cos(alphaRad);
    var sA = Math.sin(alphaRad);
    var cB = Math.cos(betaRad);
    var sB = Math.sin(betaRad);
    var cG = Math.cos(gammaRad);
    var sG = Math.sin(gammaRad);

    // Calculate A, B, C rotation components
    var rA = - cA * sG - sA * sB * cG;
    var rB = - sA * sG + cA * sB * cG;
    var rC = - cB * cG;

    // Calculate compass heading
    var compassHeading = Math.atan(rA / rB);

    // Convert from half unit circle to whole unit circle
    if (rB < 0) {
      compassHeading += Math.PI;
    } else if (rA < 0) {
      compassHeading += 2 * Math.PI;
    }

    // Convert radians to degrees
    compassHeading *= 180 / Math.PI;

    return compassHeading;

  }

  function deviceOrientationHandler(res, alpha) {
    document.getElementById("heading").innerHTML = Math.ceil(res);

  }
});

