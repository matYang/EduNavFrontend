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
        <div id="searchPanel">
            <div id="search_category">
            </div>
            <div id="search_subCategory">
                <div data-id="category_math" class="active">
                </div>
            </div>
            <div id="filter">
                <div id="locationFilter" class="filterCriteria">
                    <label>开课时间</label>
                    <span data-id="noreq" class="active">不限</span>
                </div>
                <div id="startDateFilter" class="filterCriteria">
                    <label>开课时间</label>
                    <span data-id="noreq" class="active">不限</span>
                    <span data-id="thisMonth">当月</span>
                    <span data-id="nextMonth">下月</span>
                    <span data-id="twoMonthsAfter">下下月</span>
                </div>
                <div id="timeFilter" class="filterCriteria">
                    <label>上课时间</label>
                    <span data-id="noreq" class="active">不限</span>
                    <span data-id="morning">上午</span>
                    <span data-id="afternoon">下午</span>
                    <span data-id="night">晚上</span>
                    <span data-id="morning_weekday">上午</span>
                    <span data-id="afternoon_weekday">下午</span>
                    <span data-id="night_weekday">晚上</span>
                    <span data-id="morning_weekend">上午</span>
                    <span data-id="afternoon_weekend">下午</span>
                    <span data-id="night_weekend">晚上</span>
                </div>
                <div id="classSizeFilter" class="filterCriteria">
                    <label>班级类型</label>
                    <span data-id="noreq" class="active">不限</span>
                    <span data-id="small">小于6人</span>
                    <span data-id="middle">6-30人</span>
                    <span data-id="large">大于30人</span>
                </div>
                <div id="priceFilter" class="filterCriteria">
                    <label>课程费用</label>
                    <span id="noreq" class="active">不限</span>
                    <span data-id="499">~499</span>
                    <span data-id="500-999">500~999</span>
                    <span data-id="1000-1499">1000~1499</span>
                    <span data-id="1500-1999">1500~1999</span>
                    <span data-id="2000">2000以上</span>
                </div>
            </div>
        </div>
        <div id="searchReqs"></div>
        <div id="searchResultSorter">
            <div class="sorter">
                <div id="editorPick"></div>
                <div id="time"></div>
                <div id="price"></div>
            </div>
            <div class="filter">
                当前促销：
                <input type="checkbox" name="cashback" />返现
                <input type="checkbox" name="flashdeal" />限时抢
            </div>
        </div>
        <div id="searchResultDisplayPanel">
        </div>
        <div id="CompareWidgetContainer"></div>
        <div id="mainMap"></div>

    </div>
</script>

<script type="text/template" id="tpl_searchResultEntry" >
    <div class="searchResultEntry">
        <div><img src=""><span>新东方</span></div>
        <div class="col1">
            <p class="title">初二提高英语暑假班</p>
            <p class="desc"><span>适合学员:</span> 英语成绩中等或中等偏下的新初二学员</p>
            <p class="desc"><span>开课时间:</span> 6月25日</p>
            <p class="desc"><span>地址:</span>秦淮区文明路156号南都大厦12层5号</p>
        </div>
        <div class="col2">
            <p class="classHour">共<span>12</span>课时</p>
            <p class="price"><span class="sign">￥</span>1999</p>
            <div class="cashback">50元</div>
        </div>
        <div class="col3">
            <div class="compare">+对比</div>
            <div class="viewDetail">查看更多</div>
        </div>
    </div>
</script>


<script type="text/template" id="tpl_compareWidget" >
    <div class="compareTitle">对比框</div>
    <div id="compareItems">
    </div>
    <input type="button" value="开始对比" id="compare">
</script>

<script type="text/template" id="tpl_compareWidgetEntry" >
    <div class="compareEntry">
        <p class="desc">【新东方】初二提高英语暑假班</p>
        <p class="price"><span class="sign">￥</span>1999</p>
        <div class="remove"></div>
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
                        <dt><span>*</span>输入验证码：</dt>
                        <dd>
                            <input id="registerVeriCode" type="text" class="text">
                            <input type="button" value="获取手机验证码" id="getSms" />
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
    <div id="mypage_main">
        <div id="mypage_sidebar">
            <div class="mypage_sidebar_title">上课书包</div>
            <div class="mypage_sidebar_section" >
                <div class="mypage_sidebar_sectionContent">
                    <div id="mypage_avatar"><img /></div>
                    晚上好，尊敬的会员
                    <div id="mypage_info">
                        <p class="phone"><span></span>18609879900</p>
                        <p class="email"><span></span>djxiaoniud@163.com</p>
                    </div>
                </div>
            </div>
            <div class="mypage_sidebar_section">
                <div class="mypage_sidebar_sectionTitle">订单管理</div>
                <div class="mypage_sidebar_sectionContent">
                    <div class="mypage_sidebar_tab" id="bookingManage">课程订单</div>
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
                    <div class="mypage_sidebar_tab" id="wtf">常用学员信息</div>
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

<script type="text/template" id="tpl_mypage_bookingList">
    <div>上课书包 &gt; 订单管理 </div>
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

<script type="text/template" id="tpl_mypage_bookingDetail">
    <div>上课书包 &gt; 订单管理 &gt; 课程订单 </div>
    <div id="bookingDetail">
        <div class="column0">
            <div class="left">
                <label>
                    订单号：<span>1436991417</span> <span>(2014年5月23日预定)</span>
                </label>
                <label>
                    状态：<span>等待确认</span> <span>(2014年5月27日预定)</span>
                </label>
            </div>
            <div class="right">
                <p class="price">总金额：<span class="sign">￥</span>1999</p>
            </div>
        </div>
        <div class="column1">
            <div class="left">
                <img class="progressbar" src=""/>
                <p><span>2014-6-13</span> <span>11:02</span> <span>您的订单正在和新东方教育确认</span></p>
                <p><span>2014-6-12</span> <span>12:02</span> <span>您的订单已经提交</span></p>
            </div>
            <div class="right">
                <p class="price">总金额：<span class="sign">￥</span>1999</p>
            </div>
        </div>
        <div class="column2">
            <span class="title">
                六级考前词汇串讲班
            </span>
            <label>教育机构：</label>新东方教育
            <label>上课地址：</label>xxx
            <label>咨询电话：</label>010-5837900
        </div>
        <div class="column3">
            <span class="title">入学信息</span>
            <div class="left">
                <label>
                    开课时间: 5月13日-6月13日
                </label>
                <label>
                    班级类型: 小于30人
                </label>
                <label>
                    联系方式: 13567890909
                </label>
                <label>
                    入学人姓名: 王晓伟
                </label>
            </div>
            <div class="right">
                <label>
                    上课时间: 08:00-13:00
                </label>
                <label>
                    预定人数: 1人
                </label>
                <label>
                    邮箱: djxiaoniud@153.com
                </label>
            </div>
        </div>
        <div class="column4">
            <span class="title">支付信息</span>
            <label>
                支付方式: 学校前台支付
            </label>
        </div>
        <div class="column5">
            <input type="button" class="btn_green" value="修改订单" id="editBooking" />
            <input type="button" class="btn_white" value="取消订单" id="cancelBooking" />
            <input type="button" value="订单打印" id="printBooking"/>
        </div>
    </div>
</script>

<script type="text/template" id="tpl_mypage_newBooking">
    <form id="bookingDetail" class="newBooking">
        <div class="header">填写订单信息</div>
        <div class="title">六级考前词汇串讲班</div>
        <div class="right ">Wow, Congratulations!</div>
        <hr />
        <div class="column1">
            <label>
                报名人数:
                <select name="enrollNum">

                </select>
            </label>
        </div>
        <div class="column2">
            <label>
                课程名称：六级考前词汇串讲班
            </label>
            <label>
                教育机构：新东方教育
            </label>
            <label>
                上课地址：xxx
            </label>
            <label>
                咨询电话：010-5837900
            </label>
        </div>
        <div class="column3">
            <span class="title">入学信息</span>
            <div class="left">
                <label>
                    开课时间: 5月13日-6月13日
                </label>
                <label>
                    班级类型: 小于30人
                </label>
                <label>
                    联系方式: 13567890909
                </label>
                <label>
                    入学人姓名: 王晓伟
                </label>
            </div>
            <div class="right">
                <label>
                    上课时间: 08:00-13:00
                </label>
                <label>
                    预定人数: 1人
                </label>
                <label>
                    邮箱: djxiaoniud@153.com
                </label>
            </div>
        </div>
        <div class="column4">
            <span class="title">支付信息</span>
            <label>
                支付方式: 学校前台支付
            </label>
        </div>
        <div class="btns">
            <input type="submit" class="btn_orange" value="提交订单" id="initBooking" />
        </div>
    </form>
</script>



