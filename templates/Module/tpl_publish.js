<script type="text/template" id="tpl_Publish_base">
        <div id = "publish_progress" class="publish publish_step_1">
            <!-- 发布页进度条-->
            <div class="publish_progress">
                <ul>
                     <li class="where">什么地方</li>
                     <li class="when">什么时候</li>
                     <li class="else">还有啥事</li>
                 </ul>
            </div>

            <!-- 发布页的主要内容-->
            <div class="publish_body clearfix">
                <div id = 'publish_requirement' class="publish_info">
                </div>
                
                <!-- 发布页中的地图-->
                <div id = 'publish_map' class="publish_map">
                </div>
                
            </div>
        </div>
</script>


<script type="text/template" id="tpl_Publish_singleSlotAsk">
    <div id='publish_time_<%= id %>' class="publish_time_slots_entry">
        <dl class="clearfix">
            <dt>出发时间</dt>
            <dd>
                <div class="date"><label></label><input type="text" class="text date fleft" name='publish_departDate_<%= id %>'/></div>
                <div id='depart_time_<%= id %>' class="select_item fright">
                    <input type="text" class="text" value="请选择时间"/>
                    <span></span> 
                    <ul class='publish_time_menu' style="display:none">
                        <li value="0">随意</li>                    
                        <li value="1">上午</li>
                        <li value="2">中午</li>
                        <li value="3">下午</li>
                    </ul>                                      
                </div>
            </dd>
        </dl>
        <dl class="clearfix">
            <dt><div name='publish_round_<%= id %>' class="checkbox checked"></div>返程时间</dt>
            <dd>
                <div class="date"><label></label><input type="text" class="text date fleft" name='publish_returnDate_<%= id %>'/></div>
                <div id='return_time_<%= id %>' class="select_item fright">
                    <input type="text" class="text" value="请选择时间"/>
                    <span></span> 
                    <ul class='publish_time_menu' style="display:none">
                        <li value="0">随意</li>
                        <li value="1">上午</li>
                        <li value="2">中午</li>
                        <li value="3">下午</li>
                    </ul>                                      
                 </div>
            </dd>
        </dl>
        <div id='publish_delete_<%= id %>' class="close publish_delete">关闭</div>
    </div>
</script>


<script type="text/template" id="tpl_Publish_step1">
    <div class="publish_info">
        <!-- 发布信息类型：司机/乘客-->
        <dl class="publish_type clearfix">
             <dt>我<b></b>是</dt>
             <dd id='publish_type'>
                 <div id = 'publish_1' class="fleft active"><span class="driver">司机</span></div>
                 <div id = 'publish_0' class="fright"><span class="passenger">乘客</span></div>
             </dd>
        </dl>
        <!-- 出发地 -->
        <dl id='publish_origin' class="publish_origin clearfix">
             <dt>出发地</dt>
             <dd><input id="publish_originInput" type="text" class="fleft text" value="请输入地区"/><input id = 'publish_originAddress' type="text" class="fright text" value="请输入具体地址"/></dd>
        </dl>
        <!-- 目的地 -->
        <dl id='publish_dest' class="publish_dest clearfix">
             <dt>目的地</dt>
             <dd><input id="publish_destInput" type="text" class="fleft text"value="请输入地区"/><input id = 'publish_destAddress' type="text" class="fright text"value="请输入具体地址"/></dd>
        </dl>
        <div class="publish_btn_container clearfix">
             <input id='publish_nextStep' type="button" class="btn_B fright" value="下一步"/>
        </div>
    </div>
</script>


<script type="text/template" id="tpl_Publish_step2">
    <div class="publish_info">
        <!-- 拼车时间 -->
        <div class="publish_time_container">
            <!-- 每组时间的容器 -->
            <div id='publish_time_slots' class="publish_time_slots">
            </div>
            <!-- ”+再添加一组时间“ 按钮 -->
            <div id='publish_time_add' class="publish_time_add">
                <input type="button" class="btn_w_long" value="+再添加一组时间"/>
            </div>
        </div>
        <div class="publish_btn_container clearfix">
            <input id = 'publish_back' type="button" class="btn_W fleft" value="返回修改"/>
            <input id = 'publish_nextStep' type="button" class="btn_B fright" value="下一步"/>
        </div>
    </div>
</script>


<script type="text/template" id="tpl_Publish_step3">

    <div class="publish_info">
        <!-- “座位“-->
        <dl class="publish_seat clearfix">
            <dt>需<b></b>要</dt>
            <dd>
                <div class="enter_data">
                    <input id = 'seats' type="text" class="text"/>
                    <div id="seats_control">
                        <span class="add"></span>
                        <span class="plus_disabled"></span>
                    </div>
                </div>
                <label>个座位</label>
            </dd>
        </dl>
        <dl id="publish_price_container" class="publish_price_container clearfix">                
            <!-- “按人数收费“的复选框以及注意事项放这里-->
            
            <dt>价<b></b>格</dt>
            <dd class="publish_price_condition">
                    <!-- 复选框放这里-->
                    <div id = 'conditionalPriceSwitch' class="publish_price_isConditional checkbox fleft">
                        按人数收费
                    </div>
                    <!-- 注意事项放这里-->
                    <div class="publish_price_notice">注意：这里的人数指的是一起预订时的人数，而不是最终发车时的人数</div>
             </dd>
             
            <dd id = 'publish_singlePrice' class='publish_price_uniformPrice'>
                <input id = 'seats_single' type="text" class="text"/> <label>元/人</label>
            </dd>
            <!-- 按人数收费的输入放这里 -->
            <dd id = 'publish_pricelist_container' class="publish_price_conditionalPrice">
                <!-- 价格列表 -->
                <div id = 'publish_priceList' class="publish_price_list">
                    <div class="publish_price_list_entry">
                        <label>人数：1</label><input id = 'seats_1' type="text" value=""/><label>元/人</label>
                        <div id="publish_entry_close" class="close">关闭</div>
                    </div>
                </div>
                <div class="publish_price_add"><input id="publish_price_add" type="button" class="btn_w_long" value="+再添加一组价格"/></div>
            </dd>
        </dl>
        <!-- ”其他“, 备注-->
        <dl class="publish_note clearfix">
            <dt>备<b></b>注</dt>
            <dd>
                <textarea id='publish_description_input'>点击这里进行补充说明</textarea>
            </dd>
        </dl>
        <div class="publish_btn_container clearfix">
            <input id = 'publish_back' type="button" class="btn_W fleft" value="返回修改"/>
            <input id = 'publish_finish' type="button" class="btn_B fright" value="发布"/>
        </div>
    </div>
</script>