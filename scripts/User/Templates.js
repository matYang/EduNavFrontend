<script type="text/template" id="tpl_topbar-loggedIn">
	<div class="topBar">
        <div class="topBar-inner clearfix">
            <h1 id="logo" class="topBar-logo">
                <a></a>
            </h1>
            <ul class="topBar-navigation">
                <li id = 'navigate_search' class = 'button navigate_search'>分类检索</li>
                <li id = 'navigate_compare' class = 'button navigate_compare'>学校对比</li>
            </ul>
            <div class="topBar-profileImage">
                <dl id = 'profileDropdown'>
                    <dt id = "topBar-avatar"> <a href="#"><img class="topBar-profileImage-tag" src="<%= imgPath %>" width="48" height="48"/></a> </dt>
                    <dd>
                        <ul>
                            <li id='topBar-myPage'><a href="#">个人主页</a></li>
                            <li id='logout' class="quit"><a href="#">退出</a></li>
                        </ul>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
    <div id='topNoticeBar'></div>
</script>

<script type="text/template" id="tpl_topbar-notLoggedIn">
	<div class="topBar">
        <div class="topBar-inner clearfix">
            <h1 id="logo" class="topBar-logo">
                <a></a>
            </h1>
            <ul class="topBar-navigation">
                <li id = 'navigate_search' class = 'button navigate_search'>分类检索</li>
                <li id = 'navigate_compare' class = 'button navigate_compare'>学校对比</li>
            </ul>
        </div>
    </div>
</script>

<script type="text/template" id="tpl_front">
	<div class="category-lv1">
        <div class="category-lv2"><span>英语</span><img src="" class="category_symbol" /></div>
        <div class="category-lv2"><span>数学</span><img src="" class="category_symbol" /></div>
        <div class="category-lv2"><span>语文</span><img src="" class="category_symbol" /></div>
        <div class="category-lv2"><span>会计</span><img src="" class="category_symbol" /></div>
        <div class="category-lv2"><span>小语种</span><img src="" class="category_symbol" /></div>
        <div class="category-lv2"><span>考研</span><img src="" class="category_symbol" /></div>
    </div>
    <div class="front banner"></div>
    <div id="institutes" class="institutes">
    	<div class="institute"><img src="" class="insitute_logo" alt="学而思教育"></div>
    	<div class="institute"><img src="" class="insitute_logo" alt="新东方"></div>
    	<div class="institute"><img src="" class="insitute_logo" alt="Spark"></div>
    	<div class="institute"><img src="" class="insitute_logo" alt="海天教育"></div>
    	<div class="institute"><img src="" class="insitute_logo" alt="OSC源创会"></div>
    	<div class="institute"><img src="" class="insitute_logo" alt="智康1对1"></div>
    	<div class="institute"><img src="" class="insitute_logo" alt="新航道网校"></div>
    	<div class="institute"><img src="" class="insitute_logo" alt="易考拉雅思"></div>
    	<div class="institute"><img src="" class="insitute_logo" alt="大街教育"></div>
    	<div class="institute"><img src="" class="insitute_logo" alt="超级课堂"></div>
    </div>
</script>

<script type="text/template" id="tpl_search">
    <div class="fleft search">
        <div>
        <input id="searchInput_id" class="text" type="text" placeholder="课程id"/>
        <input id="searchInput_schoolName" class="text" type="text" placeholder="学校名"/>
        </div>
        <div>
        <select id="searchInput_category">
            <option value="" disabled selected>一级分类</option>
        </select>
        <select id="searchInput_subCategory">
            <option value="" disabled selected>二级分类</option>
        </select>
        <select id="searchInput_city">
            <option value="" disabled selected>城市</option>
        </select>
        <select id="searchInput_district">
            <option value="" disabled selected>地区</option>
        </select>
        </div>
        <div id="filter">
            <div id="priceFilter">
                <label>价格范围</label>
                <span id="_1000" class="active">~1000</span>
                <span id="1000_1999">1000~1999</span>
                <span id="2000_4999">2000~4999</span>
                <span id="5000_">5000+</span>
            </div>
            <div id="timeFilter">
                <label>上课时间</label>
                <span id="morning" class="active">上午</span>
                <span id="">下午</span>
                <span id="">晚上</span>
                <span id="">全天</span>
            </div>
        </div>
        <input id="search" class="btn" type="button" value="搜索"/>
        <div id="searchResultDisplayPanel">
        </div>
        <div id="mainMap"></div>
        <div id="CompareWidgetContainer"></div>

    </div>
</script>