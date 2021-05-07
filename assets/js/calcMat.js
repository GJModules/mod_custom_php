/*******************************************************************************************************************
 *     ╔═══╗ ╔══╗ ╔═══╗ ╔════╗ ╔═══╗ ╔══╗        ╔══╗  ╔═══╗ ╔╗╔╗ ╔═══╗ ╔╗   ╔══╗ ╔═══╗ ╔╗  ╔╗ ╔═══╗ ╔╗ ╔╗ ╔════╗
 *     ║╔══╝ ║╔╗║ ║╔═╗║ ╚═╗╔═╝ ║╔══╝ ║╔═╝        ║╔╗╚╗ ║╔══╝ ║║║║ ║╔══╝ ║║   ║╔╗║ ║╔═╗║ ║║  ║║ ║╔══╝ ║╚═╝║ ╚═╗╔═╝
 *     ║║╔═╗ ║╚╝║ ║╚═╝║   ║║   ║╚══╗ ║╚═╗        ║║╚╗║ ║╚══╗ ║║║║ ║╚══╗ ║║   ║║║║ ║╚═╝║ ║╚╗╔╝║ ║╚══╗ ║╔╗ ║   ║║
 *     ║║╚╗║ ║╔╗║ ║╔╗╔╝   ║║   ║╔══╝ ╚═╗║        ║║─║║ ║╔══╝ ║╚╝║ ║╔══╝ ║║   ║║║║ ║╔══╝ ║╔╗╔╗║ ║╔══╝ ║║╚╗║   ║║
 *     ║╚═╝║ ║║║║ ║║║║    ║║   ║╚══╗ ╔═╝║        ║╚═╝║ ║╚══╗ ╚╗╔╝ ║╚══╗ ║╚═╗ ║╚╝║ ║║    ║║╚╝║║ ║╚══╗ ║║ ║║   ║║
 *     ╚═══╝ ╚╝╚╝ ╚╝╚╝    ╚╝   ╚═══╝ ╚══╝        ╚═══╝ ╚═══╝  ╚╝  ╚═══╝ ╚══╝ ╚══╝ ╚╝    ╚╝  ╚╝ ╚═══╝ ╚╝ ╚╝   ╚╝
 *------------------------------------------------------------------------------------------------------------------
 * @author Gartes | sad.net79@gmail.com | Skype : agroparknew | Telegram : @gartes
 * @date 28.04.2021 18:45
 * @copyright  Copyright (C) 2005 - 2021 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 ******************************************************************************************************************/
/* global jQuery , Joomla   */
window.calcMat = function () {
    var $ = jQuery;
    var self = this;
    // Домен сайта
    var host = Joomla.getOptions( 'GNZ11' ).Ajax.siteUrl;
    // Медиа версия
    var __v = '';

    this.__type = false;
    this.__plugin = false;
    this.__name = false;
    this._params = {
        __v : null ,    // version str
        _v  : null ,     // md5
        onMessage : true ,
    };
    // Параметры Ajax по умолчанию
    this.AjaxDefaultData = {
        template : null ,
        group    : null ,
        plugin   : null ,
        module   : 'calcMat' ,
        method   : null ,
        option   : 'com_ajax' ,
        format   : 'json' ,
        task     : null ,
    };
    // Default object parameters
    this.ParamsDefaultData = {
        // Медиа версия
        __v : '1.0.0' ,
        // Режим разработки 
        development_on : false ,
    }

    /**
     * Общее количество объем, м3
     * @type {number|boolean}
     */
    this.totalV = false;
    this.formSelectors = {
        metricBlock : '#raschet div.CalLine1', // Шаг 1. Укажите желаемый объем или габариты поверхности
        materialBlock : '#raschet div.CalLine2', // блок Шаг 2. Выбрать размер фракции
        typeOfPackingBlock : '#raschet div.CalLine3', // блок Шаг 3. Выбрать вариант фасовки

        material : 'input[name=razmerfr]:checked' , // Input Radio -- Выбрать размер фракции
        typeOfPacking : 'input[name=variantfas]:checked' , // Input Radio -- Выбрать размер фракции
        length : '#dl' , // Input Text -- Длина, м
        width : '#sh' , // Input Text -- Ширина, м
        height : '#vy' , // Input Text -- Высота, м
        totalV : '#totalvs' , // Input Text -- Объем, м3 объем

        priceCell : '#result-price-cell' , // Input Text результаты  Цена за единицу (руб)
        totalCount : '#cell-number' , // Input Text результаты количество  Потребуется единиц
        totalCost : '#total-cost' , // Input Text результаты Итого (руб)
    }
    this.calcMatDataParams = { //



        material1 : {  // Керамзит 0-5
            // Россыпь, м3 /  Навалом / F = 1
            typeOfPacking1 : function () {
                self.calcMatDataParams.CalcProcess(  [2800 , 2600 , 2300 , 2200 , 2150]    )
            } ,
            // 50 л / в мешках / F = 20
            typeOfPacking2 : function () {
                self.calcMatDataParams.CalcProcess(  [200 , 150 , 140 , 130 , 125] , 20  )
            } ,
            // МКР / в Биг-бэгах  / F = 1
            typeOfPacking3 : function () {
                self.calcMatDataParams.CalcProcess(  [3000 , 2900 , 2750 , 2600 , 2500]  )
            } ,

        } ,
        material2 : {// Керамзит 5-10
            // Россыпь, м3 /  Навалом / F = 1
            typeOfPacking1 : function () {
                self.calcMatDataParams.CalcProcess(  [2800 , 2600 , 2300 , 2200 , 2150]    )
            } ,
            // 50 л / в мешках / F = 20
            typeOfPacking2 : function () {
                self.calcMatDataParams.CalcProcess(  [200 , 150 , 140 , 130 , 125] , 20  )
            } ,
            // МКР / в Биг-бэгах  / F = 1
            typeOfPacking3 : function () {
                self.calcMatDataParams.CalcProcess(  [3000 , 2900 , 2750 , 2600 , 2500]  )
            } ,
        } ,
        material3 : {// Керамзит 10-20
            // Россыпь, м3 /  Навалом / F = 1
            typeOfPacking1 : function () {
                self.calcMatDataParams.CalcProcess(  [1600 , 1500 , 1400 , 1350 , 1300] )
            } ,
            // 50 л / в мешках / F = 20
            typeOfPacking2 : function () {
                self.calcMatDataParams.CalcProcess(  [120 , 100 , 90 , 80 , 77.5] , 20  )
            } ,
            // МКР / в Биг-бэгах  / F = 1
            typeOfPacking3 : function () {
                self.calcMatDataParams.CalcProcess(  [2500 , 2000 , 1900 , 1700 , 1600]   )
            } ,
        } ,
        material4 : {// Керамзит 20-40
            // Россыпь, м3 /  Навалом / F = 1
            typeOfPacking1 : function () {
                self.calcMatDataParams.CalcProcess(  [1600 , 1500 , 1400 , 1350 , 1300]   )
            } ,
            // 50 л / в мешках / F = 20
            typeOfPacking2 : function () {
                self.calcMatDataParams.CalcProcess(  [120 , 100 , 90 , 80 , 77.5] , 20  )
            } ,
            // МКР / в Биг-бэгах  / F = 1
            typeOfPacking3 : function () {
                self.calcMatDataParams.CalcProcess(  [2500 , 2000 , 1900 , 1700 , 1600]   )
            } ,
        } ,
        /**
         *
         * @param F - фактор - мешки * 20 - остальное * 1
         * @param priceArr массив с ценами
         * @constructor
         */
        CalcProcess : function (  priceArr , F  ) {
            if ( typeof F === "undefined") F = 1 ;
            var count = Math.ceil(self.totalV * F );
            var priceRange = self.calcMatDataParams.getRange( count );


            document.querySelector( self.formSelectors.priceCell ).value = priceArr[priceRange] ;
            document.querySelector( self.formSelectors.totalCount ).value = count ;
            document.querySelector( self.formSelectors.totalCost ).value = count * priceArr[priceRange] ;

        },
        getRange : function ( count ) {
            if ( count <= 20 )
            {
                return 0;
            }
            if ( count >= 21 && count <= 100 )
            {
                return 1;
            }
            if ( count >= 101 && count <= 400 )
            {
                return 2;
            }
            if ( count >= 401 && count <= 999 )
            {
                return 3;
            }
            return 4;
        },


    }


    /**
     * Start Init
     * @constructor
     */
    this.Init = function () {
        this._params = Joomla.getOptions( 'calcMat' , this.ParamsDefaultData );
        __v = self._params.development_on ? '' : '?v=' + self._params.__v;
        // Параметры Ajax Default
        this.setAjaxDefaultData();
        // Добавить слушателей событий
        this.addEvtListener();

        console.log( this._params )
        console.log( this.AjaxDefaultData );
    }
    /**
     * Добавить слушателей событий
     */
    this.addEvtListener = function () {
        /**
         * ex.Tag : <button data-evt-action="call-me-back" type="button" >Заказать звонок</button>
         */
        document.addEventListener( 'click' , function ( evt ) {
            switch ( evt.target.dataset.action )
            {
                case 'Calculate' :
                    self.getCalculate( evt )
                    // CollBack method
                    break;

                case 'calcReset' :
                    self.resetForm( evt )
                    // CollBack method
                    break;

                default :
                    return;
            }
        } , { passive : true } );

        var T = false ;
        /**
         * Запретить ввод всего кроме чисел/запятая|точка
         */
        document.addEventListener( 'keyup' , function ( evt ) {

            switch ( evt.target.dataset.action )
            {
                case 'only-number' :
                    var val = evt.target.value
                    var Reg = new RegExp('[^\\d,.]' , 'g')
                    setTimeout(function (){
                        T = false ;
                    },10000 );
                    console.log('calcMat:->T >>> ' , T );

                    if ( val.match(Reg)  && !T ){
                        T = true ;
                        self.Message.alert('Только цифры и точка или запятая!')
                    }


                    evt.target.value = val.replace( Reg , '' );

                    console.log('calcMat:->evt.target >>> ' , evt.target.value );
                    break;
                default :
                    return;
            }
        } , { passive : true });
    };
    /**
     * Событие нажатие на кнопку - сбросить форму
     * @param evt
     */
    this.resetForm = function (evt){
        var material = document.querySelector( self.formSelectors.material );
        var typeOfPacking = document.querySelector( self.formSelectors.typeOfPacking ) ;
        if ( material )material.checked = false ;
        if (  typeOfPacking ) typeOfPacking.checked = false ;
        document.querySelector( self.formSelectors.length ).value = '';
        document.querySelector( self.formSelectors.width ).value = '';
        document.querySelector( self.formSelectors.height ).value = '';
        document.querySelector( self.formSelectors.totalV ).value = '';
        // Итоговые результаты
        document.querySelector( self.formSelectors.priceCell ).value = '' ;
        document.querySelector( self.formSelectors.totalCount ).value = '' ;
        document.querySelector( self.formSelectors.totalCost ).value = '' ;
    };
    /**
     * Событие нажатие на кнопку рассчитать
     * @param evt
     */
    this.getCalculate = function ( evt ) {
        var Err = false ;
        var length = +document.querySelector( self.formSelectors.length ).value.replace( ',' , '.' );
        var width = +document.querySelector( self.formSelectors.width ).value.replace( ',' , '.' );
        var height = +document.querySelector( self.formSelectors.height ).value.replace( ',' , '.' );
        self.totalV = +document.querySelector( self.formSelectors.totalV ).value.replace( ',' , '.' );

        if ( !self.totalV )
        {
            if ( !length || !width || !height ){
                self.ErrorHandler.totalV();
                Err = true;
            }

            self.totalV = ( length * width * height );
            if ( self.totalV ){
                document.querySelector( self.formSelectors.totalV ).value = self.totalV.toFixed(2) ;
            }
        }
        var materialEl = document.querySelector( self.formSelectors.material );
        if ( !materialEl ){
            self.ErrorHandler.material();
            Err = true;
        }


        var typeOfPackingEl = document.querySelector( self.formSelectors.typeOfPacking )
        if ( !typeOfPackingEl ){
            self.ErrorHandler.typeOfPacking();
            Err = true;
        }
        if ( !Err ){
            var material = materialEl.value;
            var typeOfPacking = typeOfPackingEl.value;
            /**
             * Передаем для вычисления результата
             */
            var res = self.calcMatDataParams[material][typeOfPacking]()
        }

    }
    /**
     * Обработка ошибок в полях
     * @type {{material: Window.ErrorHandler.material, typeOfPacking: Window.ErrorHandler.typeOfPacking}}
     */
    this.ErrorHandler = {
        totalV : function () {
            self.Message.alert('Необходимо указать желаемый объем или полностью заполнить габариты поверхности');
            document.querySelector( self.formSelectors.metricBlock ).classList.add("error");
            setTimeout( self.ErrorHandler._errStatusOff , 3000 );
        },
        material : function (){
            self.Message.alert('Необходимо выбрать размер фракции');
            document.querySelector( self.formSelectors.materialBlock ).classList.add("error");
            setTimeout( self.ErrorHandler._errStatusOff , 3000 );
        },
        typeOfPacking : function (){
            self.Message.alert('Необходимо выбрать вариант фасовки');
            document.querySelector( self.formSelectors.typeOfPackingBlock ).classList.add("error")
            setTimeout( self.ErrorHandler._errStatusOff , 3000 );
        },
        /**
         * Снять статус ошибки с блоков
         * @private
         */
        _errStatusOff : function (){
            var errEl = document.querySelectorAll(".error");
            [].forEach.call( errEl , function(el) {
                el.classList.remove("error");
            });
        }
    }

    /**
     * TODO add To Template JS Class Core
     * @type {{param: {layout: string, type: string, timeout: number}, alert: Window.Message.alert, On: boolean}}
     */
    this.Message = {
        On : self._params.onMessage ,
        param : {
            type: 'info',            // Тип сообщений - alert, success, warning, error, info/information
            layout:'bottomRight' ,   // Позиция вывода top, topLeft, topCenter, topRight, center, centerLeft, centerRight, bottom, bottomLeft, bottomCenter, bottomRight
            timeout : 10000 ,       // Время отображения
        },
        alert : function ( text ){
            if ( !self.Message.On ) return ;
            self.__loadModul.Noty(self.Message.param).then(function(Noty){
                Noty.options.text = text ;
                Noty.show();
            })
        }
    }

    /**
     * Отправить запрос
     * @param Data - отправляемые данные
     * Должен содержать Data.task = 'taskName';
     * @returns {Promise}
     * @constructor
     */
    this.AjaxPost = function ( Data ) {
        var data = $.extend( true , this.AjaxDefaultData , Data );
        return new Promise( function ( resolve , reject ) {
            self.getModul( "Ajax" ).then( function ( Ajax ) {
                // Не обрабатывать сообщения
                Ajax.ReturnRespond = true;
                // Отправить запрос
                Ajax.send( data , self._params.__name ).then( function ( r ) {
                    resolve( r );
                } , function ( err ) {
                    console.error( err );
                    reject( err );
                } )
            } );
        } );
    };
    /**
     * Параметры Ajax Default
     */
    this.setAjaxDefaultData = function () {
        this.AjaxDefaultData.group = this._params.__type;
        this.AjaxDefaultData.plugin = this._params.__name;
        this.AjaxDefaultData.module = this._params.__module;
        this._params.__name = this._params.__name || this._params.__module;
    }
    this.Init();
};

window.calcMat.prototype = new GNZ11();
new window.calcMat();
