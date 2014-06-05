<script type="text/template" id="tpl_topBar-loggedIn">
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
                    <dt id = "topBar-avatar"> <a href="#"><img class="topBar-profileImage-tag" src="" width="48" height="48"/></a> </dt>
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

<script type="text/template" id="tpl_topBar-notLoggedIn">
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
        <div id="search_category">
            
        </div>
        <div id="search_subCategory">
            <div data-id="category_math" class="active">
            </div>
        </div>
        <div>
        <input id="searchInput_id" class="text" type="text" placeholder="课程id"/>
        <input id="searchInput_schoolName" class="text" type="text" placeholder="学校名"/>
        </div>
        <div>
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

<script type="text/template" id="tpl_registration" >

        <div class="sign_up">
            <div class="sign_up_inner">
                
                <div class="sign_up_title">
                    <h2 class="fleft">用户注册</h2>
                    <div class="fright">
                        <span class="active"><b>1</b>填写信息</span>
                        <span class=""><b>2</b>完成验证</span>
                    </div>
                </div>
                <div class="account">
                    <dl class="clearfix">
                        <dt><span>*</span>手机：</dt>
                        <dd>
                            <input id="registerCellInput" type="text" class="text" value="" placeholder="请输入手机号(请不要输入特殊符号或者字母)">
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt><span>*</span>密码：</dt>
                        <dd>
                            <input id="registerPasswordInput" type="password" class="text" value="" placeholder="请输入密码">
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt><span>*</span>确认密码：</dt>
                        <dd>
                            <input id="registerPasswordConfirmInput" type="password" class="text" value="" placeholder="请再次输入密码">
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt><span>*</span>验证码：</dt>
                        <dd>
                            <input id="registerCaptchaInput" type="text" class="captcha" value="">
                            <img class="captcha" />
                            <span class="button" role="button">看不清，换一张</span>
                        </dd>
                    </dl>
                    <div class="btns">
                        <input id="complete" type="button" class="btn_O_long" value="立即注册">
                    </div>
                </div><!--account end-->
            </div>    
        </div>
</script>

<script type="text/template" id="tpl_registration_finish">
    <div class="sign_up">
        <div class="sign_up_inner">
            
            <div class="sign_up_title">
                <h2 class="fleft">用户注册</h2>
                <div class="fright">
                    <span class=""><b>1</b>填写信息</span>
                    <span class="active"><b>2</b>邮箱验证</span>
                </div>
            </div>
            <div class="email_verification">
                <h3>还差最后一步，您就注册成功了！请立即验证邮件！</h3>
                <p>我们已给您的手机<span class="F_orange" id="emailValue"></span>发送了一封验证短信。</p>
                <p>请输入收到的验证码来完成注册！</p>
                <p>如果长时间没有收到短信，请点<a id="resendSMS">这里</a>重发短信</p>
                <input id="phoneNumber" type="text"/>
                <input id="smsAuthCode" type="text"/>
                <div id="verifyAccount" class="btns">
                    <input type="button" class="btn_O_long" value="完成验证">
                </div>
            </div>
        </div>    
    </div>
</script>

<script type="text/template" id="tpl_mypage_base">
    <div id="mypage_top" >
        <div id="mypage_avatar"><img /></div>
        <div id="mypage_info">
            <p>手机: </p>
            <p>邮箱: </p>
        </div>
    </div>
    <div id="mypage_main">
        <div id="mypage_sidebar">
            <div class="mypage_sidebar_section">
                <div class="mypage_sidebar_sectionTitle">上课书包</div>
                <div class="mypage_sidebar_sectionContent">
                    <div class="mypage_sidebar_tab" id="bookingManage">订单管理</div>
                </div>
            </div>
            <div class="mypage_sidebar_section">
                <div class="mypage_sidebar_sectionTitle">账户管理</div>
                <div class="mypage_sidebar_sectionContent">
                    <div class="mypage_sidebar_tab" id="cashAccount">现金账户</div>
                    <div class="mypage_sidebar_tab" id="couponAccount">消费券</div>
                    <div class="mypage_sidebar_tab" id="creditAccount">积分</div>
                </div>
            </div>
            <div class="mypage_sidebar_section">
                <div class="mypage_sidebar_sectionTitle">个人设置</div>
                <div class="mypage_sidebar_sectionContent">
                    <div class="mypage_sidebar_tab" id="editInfo">个人资料</div>
                    <div class="mypage_sidebar_tab" id="editPass">密码修改</div>
                    <div class="mypage_sidebar_tab" id="wtf">常用学员</div>
                </div>
            </div>
        </div>
        <div id="mypage_content">
        </div>
    </div>

</script>

<script type="text/template" id="tpl_mypage_dashboard">
    <div id="walletSummary">
        <div class="summaryItem">元现金</div>
        <div class="summaryItem">元消费券</div>
        <div class="summaryItem">积分</div>
    </div>
    <span>未入学订单</span>
    <div id="bookingSummary">
    </div>
</script>

<script type="text/template" id="tpl_mypage_booking">
    <span>订单管理</span>
    <div id="bookingSummary">
    </div>
</script>

<script type="text/template" id="tpl_booking_entry">
    <div class="bookingEntry">
        <div class="bookingEntryTime">
            <div class="date">6月29日</div>
            <div class="dayOfWeek">星期日</div>
        </div>
        <div class="bookingEntryDetail">
            <p class="title">【新东方】初二提高英语暑假班</p>
            <p class="address">地址：秦淮区文明路156号南都大厦12层5号</p>
        </div>
        <div class="bookingEntryPrice">
            <span class="sign">￥</span>1999
        </div>
        <div class="bookingEntryState">
            <span class="sign pending"></span>等待确认
        </div>
    </div>
</script>

