<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_custom
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

    /**
     * @var stdClass                 $module          Объект модуля
     * @var Joomla\Registry\Registry $params          Настройки модуля
     * @var string                   $moduleclass_sfx Суффикс CSS-класса модуля
     */

?>


<div class="custom<?php echo $moduleclass_sfx; ?>" <?php if ($params->get('backgroundimage')) : ?> style="background-image:url(<?php echo $params->get('backgroundimage'); ?>)"<?php endif; ?> >
    <div id="raschet">
        <div class="CalculatorHeader">
            <div class="CalHeaderWr"><small class="text-line1" data-sr="enter top and move 50px and wait .25s">Расчет стоимости</small>
                <h1 data-sr="enter top and move 50px and wait 0s">Калькулятор</h1>
                <small class="text-line2" data-sr="enter top and move 150px and wait .5s">Укажите параметры для расчета итоговой стоимости</small></div>
        </div>
        <div class="CalculatorBody">
            <div class="row CalLine1 gk-clearfix">
                <div class="col-md-6">
                    <div class="form-group-left form-group-wr">
                        <div class="form-group-header"><span class="step">Шаг 1.</span> Укажите <span>желаемый объем</span></div>
                        <div class="form-group">
                            <label for="totalvs">Oбъем, м<sup>3</sup></label>
                            <input data-action="only-number"  type="text" id="totalvs" class="form-control totalvs_user_changed" placeholder="0" /></div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group-right form-group-wr">
                        <div class="form-group-header">или <span>габариты</span> поверхности</div>
                        <div class="form-group">
                            <label for="dl">Длина, м</label>
                            <input data-action="only-number" type="text" value="" id="dl" class="form-control" placeholder="0" /></div>
                        <div class="form-group">
                            <label for="sh">Ширина, м</label>
                            <input data-action="only-number" type="text" value="" id="sh" class="form-control" placeholder="0" /></div>
                        <div class="form-group">
                            <label for="vy">Высота, м</label>
                            <input data-action="only-number" type="text" value="" id="vy" class="form-control" placeholder="0" /></div>
                    </div>
                </div>
            </div>
            <div class="CalLine2 gk-clearfix">
                <div class="form-group-header">
                    <span class="step">Шаг 2.</span> Выбрать <span>размер фракции</span>
                </div>

                <?php #  Шаг 2. Выбрать размер фракции ?>
                <div class="row">

                    <div class="col-md-3">
                        <div class="radiocheck razmerfr-1">
                            <input value="material1" name="razmerfr" required="" type="radio" id="razmerfr-1"  class="radio"/>
                            <label for="razmerfr-1">Керамзит <span>0-5</span></label></div>
                    </div>

                    <div class="col-md-3">
                        <div class="radiocheck razmerfr-2">
                            <input value="material2" name="razmerfr" required="" type="radio" id="razmerfr-2" class="radio" />
                            <label for="razmerfr-2">Керамзит <span>5-10</span></label></div>
                    </div>
                    <div class="col-md-3">
                        <div class="radiocheck razmerfr-3">
                            <input value="material3" name="razmerfr" required="" type="radio" id="razmerfr-3" class="radio" />
                            <label for="razmerfr-3">Керамзит <span>10-20</span></label></div>
                    </div>
                    <div class="col-md-3">
                        <div class="radiocheck razmerfr-4">
                            <input value="material4" name="razmerfr" required="" type="radio" id="razmerfr-4" class="radio" />
                            <label for="razmerfr-4">Керамзит <span>20-40</span></label></div>
                    </div>
                </div>
            </div>


            <?php #  Шаг 2. Выбрать размер фракции ?>
            <div class="CalLine3 gk-clearfix">
                <div class="form-group-header"><span class="step">Шаг 3.</span> Выбрать <span>вариант фасовки</span></div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="radiocheck variantfas-1">
                            <input value="typeOfPacking1" name="variantfas" required="" type="radio" id="variantfas-1" class="radio" />
                            <label for="variantfas-1">Навалом</label></div>
                    </div>
                    <div class="col-md-3">
                        <div class="radiocheck variantfas-2">
                            <input value="typeOfPacking2" name="variantfas" required="" type="radio" id="variantfas-2" class="radio" />
                            <label for="variantfas-2">в мешках</label></div>
                    </div>
                    <div class="col-md-3">
                        <div class="radiocheck variantfas-3">
                            <input value="typeOfPacking3" name="variantfas" required="" type="radio" id="variantfas-3" class="radio" />
                            <label for="variantfas-3">в Биг-бэгах</label></div>
                    </div>
                    <div class="col-md-3">&nbsp;</div>
                </div>
            </div>
            <div id="controls" class="CalLine4 CalLineButton gk-clearfix">
                <div class="row">
                    <div class="col-md-6">
                        <div class="CalButton">
                            <button data-action="Calculate" name="Сalculate" type="calculate" id="reset-b" class="calculate-button">Рассчитать</button>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="CalReset">
                            <button data-action="calcReset" name="calreset" type="calreset" id="calc-b" class="calreset-button">Сброс</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="CalculatorBottom">
            <div id="controls" class="CalculatorBottomLine gk-clearfix">
                <div class="row">
                    <div class="col-md-3">
                        <div class="result-i result1"><label for="result-price-cell">Цена за единицу (руб)</label> <input name="result-price-cell" type="text" value="" id="result-price-cell" /></div>
                    </div>
                    <div class="col-md-3">
                        <div class="result-i result2"><label for="cell-number">Потребуется единиц</label> <input name="cell-number" type="text" value="" id="cell-number" /></div>
                    </div>
                    <div class="col-md-6">
                        <div class="result-i result-ttl">
                            <div class="total-cost-label"><label for="total-cost">Итого <span>(руб)</span></label></div>
                            <input name="total-cost" type="text" value="" id="total-cost" /></div>
                    </div>
                </div>
            </div>
            <div class="text-bottom">Расчет является приблизительным и носит исключительно информационный характер. <br />Точную стоимость Вы сможете узнать, обратившись к нашим менеджерам.</div>
        </div>
    </div>
</div>



