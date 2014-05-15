<script type="text/template" id="tpl_main">
    <div class="mainPage">
        <!--主页搜索区域 start-->
        <div class="mainPage-searchBanner">
            <div class="mainPage-searchBanner-inner">
                <div class="mainPage-searchBanner-searchBox form clearfix">
                    <div class="from"><label></label><input id="searchLocationInput_from" class="text" type="text" value="出发地"></div>
                    <div class="date"><label></label><input id="searchDateInput_depart" class="text" type="text" value=""></div>
                    <div class="zh"></div>
                    <div class="to"><label></label><input id="searchLocationInput_to" class="text" type="text" value="目的地"></div>    
                    <div class="date"><label></label><input id="searchDateInput_return" class="text" type="text" value=""></div>
                </div>
            </div>
        </div>
        <!--主页搜索区域 end-->
        
        <!--主页中间区域 start-->
        <div class="mainPage-middle clearfix">
            <!--主页中间显示搜索结果区域（左侧）-->
            <div class="mainPage-searchResult-container">
                <div class="mainPage-searchResult-title">
                    搜索结果：“<span id='originText'></span>” 到 “<span id='destText'></span>”往返共找到 <b class="F_red"><span id='numberText'></span></b> 条信息
                </div>
                <div id="searchResultDisplayPanel"></div>
            </div>
            <!--主页中间右侧-->
            <div class="mainPage-middle-right">
                <div class="mainPage-filter">
                    <dl class="item1">
                        <dt>线路类型<span class="arrow"></span></dt>
                        <dd id="searchTypeContainer"><span data-id="oneway" class="active">单程</span><span data-id="roundtrip">往返</span></dd>
                    </dl>
                    <dl class="item2">
                        <dt>发布者身份<span class="arrow"></span></dt>
                        <dd id="typeSelections"><span class="active" data-id='all'>全部</span><span data-id='driver'>司机</span><span data-id='passenger'>乘客</span></dd>
                    </dl>
                    <div class="collapse">收起</div>
                </div>
                <div id = "mainMap" class="mainPage-map" width="269px" height="344px">
                </div>
            </div>
        </div>
        <!--主页中间区域 end-->
    </div>
</script>