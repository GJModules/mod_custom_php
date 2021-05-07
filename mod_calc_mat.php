<?php
    /**
     * @package     Joomla.Site
     * @subpackage  mod_custom
     *
     * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
     * @license     GNU General Public License version 2 or later; see LICENSE.txt
     */


    /**
     * @var stdClass                 $module          Объект модуля
     * @var Joomla\Registry\Registry $params          Настройки модуля
     * @var string                   $moduleclass_sfx Суффикс CSS-класса модуля
     */

    use GNZ11\Core\Js;
    use Joomla\CMS\Filesystem\Folder;

    defined('_JEXEC') or die;
    require_once dirname(__FILE__) . '/helper.php';

    $__v = '?'.md5( $params->get('__v' , '0.0.1') ) ;

    try
    {
        JLoader::registerNamespace('GNZ11' , JPATH_LIBRARIES . '/GNZ11' , $reset = false , $prepend = false , $type = 'psr4');
        $GNZ11_js = Js::instance();
    } catch ( Exception $e )
    {
        if( !Folder::exists($this->patchGnz11) && $this->app->isClient('administrator') )
        {
            $this->app->enqueueMessage('Должна быть установлена библиотека GNZ11' , 'error');
        }#END IF
    }
    Js::addJproLoad(\Joomla\CMS\Uri\Uri::root().'modules/mod_calc_mat/assets/js/calcMat.js'.$__v ,   false ,   false );
    Js::addJproLoad(\Joomla\CMS\Uri\Uri::root().'modules/mod_calc_mat/assets/css/calcMat.css'.$__v ,   false ,   false );


    try
    {
        // Code that may throw an Exception or Error.
        $cacheParams = new stdClass;
        $cacheParams->cachemode = 'static'/*'id'*/ ;
        $cacheParams->class = 'ModCalcMatHelper';
        $cacheParams->method = 'ModuleInit';
        $cacheParams->methodparams = $params;
        $cacheParams->modeparams = array('id' => 'int' /*, 'module_type' => $module_type*/);
        $params->set('filters' , []);
        echo JModuleHelper::moduleCache($module , $params , $cacheParams);

//         throw new \Exception('Code Exception '.__FILE__.':'.__LINE__) ;
    }
    catch (\Error $e)
    {
        // Executed only in PHP 5, will not be reached in PHP 7
        echo 'Выброшено исключение: ',  $e->getMessage(), "\n";
        echo'<pre>';print_r( $e );echo'</pre>'.__FILE__.' '.__LINE__;
        die(__FILE__ .' '. __LINE__ );
    }



    if( $params->def('prepare_content' , 1) )
    {
//	JPluginHelper::importPlugin('content');
//	$module->content = JHtml::_('content.prepare', $module->content, '', 'mod_custom.content');
    }

//$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'), ENT_COMPAT, 'UTF-8');

//    require JModuleHelper::getLayoutPath('mod_calc_mat' , $params->get('layout' , 'default'));
