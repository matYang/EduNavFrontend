<script type="text/template" id="tpl_topBar-loggedIn">
    <div class="topBar">
        <div class="topBar-inner clearfix">
            <h1 id="logo" class="topBar-logo">
                <a></a>
            </h1>
            <ul class="topBar-navigation">
                <li id="navigate_search" class="button navigate_search">分类检索</li>
                <li id="navigate_compare" class="button navigate_compare">学校对比</li>
            </ul>
            <div class="user_info">
                晚上好，尊敬的会员 <a id="logout" href="#">[退出]</a>
                <a id="topbar-mypage" href="#">上课书包</a>
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
            <div class="login_reg">
                <div class="hd">
                    <a id="login_toggle" class="login" href="#">登录</a>
                    <span></span>
                    <a id="signup_button" class="reg" href="#">注册</a>
                </div>
                <div id="topbar_loginbox" class="bd">
                    <ul>
                        <li>
                            <input id="login_username" type="text" class="text" placeholder="请输入手机号">
                            <p id="credentialWrong" class="wrong">输入有误，请重新输入</p>
                        </li>
                        <li>
                            <input id="login_password" type="password" class="text" placeholder="请输入密码">
                        </li>
                        <li class="clearfix">
                            <div class="checkbox checked">记住我</div>
                            <a id="forget_password" class="forget_password" href="#">忘记密码？</a>
                        </li>
                        <li><input id="login_button" class="btn_topnav_login" type="button" value="登 录"></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/template" id="tpl_banner">
    <div id="visual_container">
        <ul class="slidee">
            <li style="display: none;"><a href="#"><img src="style/images/banner.jpg" alt="" height="320"></a></li>
            <li style="display: none;"><a href="#"><img src="style/images/banner.jpg" alt="" height="320"></a></li>
            <li style="display: block"><a href="#"><img src="style/images/banner.jpg" alt="" height="320"></a></li>
            <li style="display: none;"><a href="#"><img src="style/images/banner.jpg" alt="" height="320"></a></li>
            <li style="display: none;"><a href="#"><img src="style/images/banner.jpg" alt="" height="320"></a></li>
        </ul>
    </div>
</script>

<script type="text/template" id="tpl_front">
<div id="content" class="content" style="margin-bottom:0">
        <div id="lv1Button" class="tab2">
        </div>
        <div class="category">
            <div id ="lv2Categories"></div>
            <table class="language blank2" width="100%" cellpadding="0" cellspacing="0">
                <tbody><tr>
                    <td><img src="style/images/s10.png"></td>
                    <td><img src="style/images/s9.png"></td>
                    <td><img src="style/images/s8.png"></td>
                    <td><img src="style/images/s7.png"></td>
                    <td><img src="style/images/s6.png"></td>
                </tr>
                <tr class="last">
                    <td><img src="style/images/s5.png"></td>
                    <td><img src="style/images/s4.png"></td>
                    <td><img src="style/images/s3.png"></td>
                    <td><img src="style/images/s2.png"></td>
                    <td class="last"><img src="style/images/s1.png"></td>
                </tr>
            </tbody></table>
        </div>
    </div>
</script>

<script type="text/template" id="tpl_search">
    <!--筛选框-->
    <div id="searchPanel" class="filter">
        <ul id="search_category"  class="tab">
        </ul>
        
        <div id="filterPanel" class="filter_content">
            <div id="search_subCategory" class="filterCriteria">
            </div>
            <div id="search_district" class="filterCriteria">
                <label>上课地点：</label>
                <span data-id="noreq" class="active">不限</span>
            </div>
            <div id="filter_startTime" class="filterCriteria">
                <label>开课时间：</label>
                <span data-id="noreq" class="active">不限</span>
                <span data-id="thisMonth">当月</span>
                <span data-id="nextMonth">下月</span>
                <span data-id="twoMonthsAfter">下下月</span>
            </div>
            <div id="filter_classTime" class="filterCriteria">
                <label>上课时间：</label>
                <span data-id="noreq" class="active">不限</span>
                <span data-id="morning">上午</span>
                <span data-id="afternoon">下午</span>
                <span data-id="night">晚上</span>
                <span data-id="morning_weekday">平日上午</span>
                <span data-id="afternoon_weekday">平日下午</span>
                <span data-id="night_weekday">平日晚上</span>
                <span data-id="morning_weekend">周末上午</span>
                <span data-id="afternoon_weekend">周末下午</span>
                <span data-id="night_weekend">周末晚上</span>
            </div>
            <div id="filter_classMode" class="filterCriteria">
                <label>班级类型：</label>
                <span data-id="noreq" class="active">不限</span>
                <span data-id="0-5">小于6人</span>
                <span data-id="6-29">6-30人</span>
                <span data-id="30-">大于30人</span>
            </div>
            <div id="filter_price" class="filterCriteria">
                <label>课程费用：</label>
                <span data-id="noreq" class="active">不限</span>
                <span data-id="0-2499">2500元以下</span>
                <span data-id="2500-4999">2500元~4999元</span>
                <span data-id="5000-7499">5000元~7499元</span>
                <span data-id="7500-9999">7500元~9999元</span>
                <span data-id="10000-">10000元以上</span>
            </div>
        </div>
    </div>
    
    <!--筛选结果-->
    
    <div id="searchReqs" class="blank1 hidden">
        <span><span id="resultNum"></span>个课程满足以下条件</span>
    </div>
    
    <div class="search_result clearfix blank">
        
        <!--左栏开始-->
        <div class="fleft w_730">
            <div id="searchResultSorter" class="clearfix">
                <ul class="sorter">
                    <li id="editorPick" class="active">爱上课推荐</li>
                    <li class="line"></li>
                    <li id="time">时间</li>
                    <li class="line"></li>
                    <li id="price">价格</li>
                </ul>
                <div class="fright">
                    当前促销：<input type="checkbox" name="cashback" /><label>返现</label>
                    <!-- <input type="checkbox" name="flashdeal" /><label>限时抢</label> -->

                </div>
            </div><!--searchResultSorter end-->
            <div id="searchResultDisplayPanel">
            </div>
            <div id="courseSearchResultNavigator" class="page blank1 clearfix">

            </div>
        </div>
        
        <!--右栏开始-->
        <div id="searchWidgets" class="fright w_250">
            <div id="CompareWidgetContainer">
            </div>
            <div id="mainMap" class="blank1">
            </div>
        </div>
    </div><!--search_result end-->
</script>

<script type="text/template" id="tpl_searchResultEntry" >
    <div class="searchResultEntry clearfix">
        <div class="pic"><img src="<%= logoUrl %>" width="100" height="100"/><span><%= instName%></span></div>
        <div class="col1">
            <p class="title"><a class="F_green" href="#"><%= courseName %></a></p>
            <p class="desc"><span>适合学员:</span> <%= suitableStudent %></p>
            <p class="desc"><span>开课时间:</span> <%= startDate %></p>
            <p class="desc"><span>地<s></s>址:</span> <%= location %></p>
        </div>
        <div class="col2">
            <p class="classHour">共<b class="F_orange"><%=courseHourNum %></b>课时</p>
            <p class="price"><span class="sign">￥</span><%= price %></p>
            <% if (cashback) { %>
                <a class="cashback">
                    <em><%= cashback %>元</em>
                    <div class="tip">
                        <div class="arrow"></div>
                        <div class="tip_content">
                            用“消费券”预订此课程，每人每课程返还<%= cashback %>元现金！入学后7个工作日可至您的账户里提现。
                        </div>
                    </div>
                </a>
            <% } %>  
            </div>
        <div class="col3">
            <div class="compare" id="compare_<%= courseId %>"><input class="btn_g add" type="button" value="+对比"/></div>
            <div class="viewDetail" id="viewAll_<%= courseId %>"><a class="F_green" href="#">查看更多</a></div>
        </div>
    </div>
</script>


<script type="text/template" id="tpl_compareWidget" >
    <div class="compareTitle">对比框</div>
    <div id="compareItems">
    </div>
    <div class="btns">
        <input type="button" value="开始对比" id="compare">
    </div>
</script>

<script type="text/template" id="tpl_compareWidgetEntry" >
    <div class="compareEntry" id="compareEntry_courseId_<%= courseId %>">
        <p class="desc"><span>【<%= instName %>】</span><a href="#"><%= courseName %></a></p>
        <p class="price"><span class="sign">￥</span><%= price %></p>
        <div class="remove"></div>
    </div>
</script>

<script type="text/template" id="tpl_registration" >
        <div class="sign_up">
            <div class="sign_up_inner">
                <div class="sign_up_title">
                    <h2 class="fleft">用户注册</h2>
                    <div class="fright"> <span class="active"><b>1</b>填写信息</span> <span class=""><b>2</b>完成验证</span> </div>
                </div>
                <div class="account">
                    <dl class="clearfix" id="cellContainer">
                        <dt><span>*</span>手机：</dt>
                        <dd>
                            <input id="registerCellInput" type="text" class="text" value="" placeholder="请输入手机号(请不要输入特殊符号或者字母)">
                        </dd>
                    </dl>
                    <dl class="clearfix" id="passContainer">
                        <dt><span>*</span>密码：</dt>
                        <dd>
                            <input id="registerPasswordInput" type="password" class="text" value="" placeholder="请输入密码">
                        </dd>
                    </dl>
                    <dl class="clearfix" id="confirmContainer">
                        <dt><span>*</span>确认密码：</dt>
                        <dd>
                            <input id="registerPasswordConfirmInput" type="password" class="text" value="" placeholder="请再次输入密码">
                        </dd>
                    </dl>
                    <dl class="clearfix" id="invitationCodeContainer">
                        <dt>邀请码：</dt>
                        <dd>
                            <input id="invitationCodeInput" type="text" class="text" value="" placeholder="由朋友邀请注册的用户会获得额外的优惠">
                        </dd>
                    </dl>
                    <dl class="clearfix" id="authContainer">
                        <dt><span>*</span>输入验证码：</dt>
                        <dd>
                            <input id="registerVeriCode" type="text" class="text" placeholder="获取手机验证码">
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
                <div class="fright"> <span class="active"><b>1</b>填写信息</span> <span class="active"><b>2</b>注册完成</span> </div>
            </div>
            <div class="sign_up_success">
                <div>恭喜，您已经成功的注册了爱上课！</div>
                <p><b id="countdown" class="F_orange">5</b>秒后将跳转至您的个人主页</p>
            </div>
            <!--account end--> 
        </div>
    </div>
</script>

<script type="text/template" id="tpl_mypage_base">
    <div id="mypage_main" class="clearfix">
        <div id="mypage_sidebar">
            <div class="mypage_sidebar_title">上课书包</div>
            <div class="mypage_sidebar_section p1" >
                <div class="mypage_sidebar_sectionContent">
                    <div id="mypage_avatar">
                        <!--<img src="images/user_pic.jpg" width="150" height="150"/>-->
                        <p>晚上好，尊敬的会员</p>
                    </div>
                    <div id="mypage_info">
                        <p class="phone"><span></span><%= phone %></p>
                        <% if (email) { %><p class="email"><span></span><%= email %></p> <% } %>
                    </div>
                </div>
            </div>
            <div class="mypage_sidebar_section p2">
                <div class="mypage_sidebar_sectionTitle">订单管理</div>
                <div class="mypage_sidebar_sectionContent">
                    <div class="mypage_sidebar_tab" id="bookingManage">课程订单</div>
                </div>
            </div>
            <div class="mypage_sidebar_section p3">
                <div class="mypage_sidebar_sectionTitle">账户管理</div>
                <div class="mypage_sidebar_sectionContent">

                <!--    <div class="mypage_sidebar_tab" id="cashAccount">现金账户</div> -->
                    <div class="mypage_sidebar_tab" id="couponAccount">消费券</div>
                    <div class="mypage_sidebar_tab" id="creditAccount">积分</div> 
                </div>
            </div>
            <div class="mypage_sidebar_section p4">
                <div class="mypage_sidebar_sectionTitle">个人设置</div>
                <div class="mypage_sidebar_sectionContent">
                    <div class="mypage_sidebar_tab" id="editInfo">个人资料</div>
                    <div class="mypage_sidebar_tab" id="editPass">密码修改</div>
                    <div class="mypage_sidebar_tab" id="inviteCode">邀请码</div>

                <!--    <div class="mypage_sidebar_tab" id="wtf">常用学员信息</div> -->
                </div>
            </div>
        </div>
        <div id="mypage_content" class="mypage_min_height" style="border:none;">
        </div>
    </div>

</script>

<script type="text/template" id="tpl_mypage_dashboard">
    <div id="walletSummary">
        <div class="summaryItem1"><span class="F_orange"><%= balance %></span>元现金</div>
        <div class="line"></div>
        <div class="summaryItem2"><span class="F_orange"><%= coupon %></span>元消费券</div>
        <div class="line"></div>
        <div class="summaryItem3"><span class="F_orange"><%= credit %></span>积分</div>
    </div>
    <div class="title blank1" style="border:1px solid #ccc;"><b>未入学订单</b></div>
    <div id="bookingSummary" style="border:1px solid #ccc; border-top:none;">
        <h2>未入学订单</h2>
    </div>
</script>

<script type="text/template" id="tpl_mypage_bookingList">
    <div id="bookingSummary">
    </div><!--bookingSummary end-->
</script>

<script type="text/template" id="tpl_booking_entry">
    <div class="bookingEntry" id="booking_reference_<%= reference %>">
        <div class="bookingEntryTime">
            <div class="date"><%= course.startDate %></div>
            <div class="dayOfWeek"><%= course.studyDays %> <%= course.studyDaysNote %></div>
        </div>
        <div class="bookingEntryDetail">
            <h3><a class="F_green" href="#">【<%= course.instName %>】<%= course.courseName %></a></h3>
            <p class="address"><b>地址：</b><%= course.location %></p>
        </div>
        <div class="bookingEntryPrice">
            <span class="sign">￥</span><%= price %>
        </div>
        <div class="bookingEntryState">
        <% if (status === EnumConfig.BookingStatus.awaiting) { %>
            <span class="sign pending">
        <% } else if (status === EnumConfig.BookingStatus.cancelled || status === EnumConfig.BookingStatus.quit || status === EnumConfig.BookingStatus.failed) { %>
            <span class="sign cancelled">
        <% } else { %>            
            <span class="sign confirmed">
        <% } %>            
            <%= EnumConfig.BookingStatusText[status] %></span>
        </div>
    </div>
</script>

<script type="text/template" id="tpl_mypage_bookingDetail">

    <div id="mypage_content" class="mypage_min_height">
        <div class="title">我的爱上课 &gt; 订单管理 &gt; <span class="F_green">课程订单</span> </div>
        <div id="bookingDetail">
            <div class="row0 clearfix">
                <div class="fleft">
                    <p><label>订单号：1436991417</label> <span>(2014年5月23日预定)</span></p>
                    <p><label>状<s></s>态：<b class="F_green">等待确认</b></label> <span>(2014年5月27日预定)</span></p>
                </div>
                <p class="fright price"><label>总金额：</label><span class="sign">￥</span>1999</p>
            </div>
            <div class="row1">
                <div id="process">
                    <% if ( status === 3 ) { %>
                        <p>订单已取消</p>
                    <% } else if (status === 5 ) { %>
                        <p>订单已结束</p>
                    <% } else { %>
                        <% if ( status >= 0) { %>
                            <div class="node fore ready">
                        <% } else { %>
                            <div class="node fore wait">
                        <% } %>
                            <p>提交订单</p>
                        </div>
                        <% if ( status > 0) { %>
                            <div class="proce ready">
                        <% } else { %>
                            <div class="proce doing">
                        <% } %>
                            <p>&nbsp;</p>
                        </div>
                        <% if ( status >= 1) { %>
                            <div class="node ready">
                        <% } else { %>
                            <div class="node wait">
                        <% } %>
                            <p>机构确认</p>
                        </div>
                        <% if ( status > 1) { %>
                            <div class="proce ready">
                        <% } else if (status === 1) { %>
                            <div class="proce doing">
                        <% } else { %>
                            <div class="proce wait">
                        <% } %>
                            <p>&nbsp;</p>
                        </div>
                        <% if ( status >= 3) { %>
                            <div class="node ready">
                        <% } else { %>
                            <div class="node wait">
                        <% } %>
                            <p>已经报到</p>
                        </div>
                        <% if ( status > 3) { %>
                            <div class="proce ready">
                        <% } else if (status === 3) { %>
                            <div class="proce doing">
                        <% } else { %>
                            <div class="proce wait">
                        <% } %>
                            <p>&nbsp;</p>
                        </div>
                        <% if ( status >= 4) { %>
                            <div class="node ready">
                        <% } else { %>
                            <div class="node wait">
                        <% } %>
                            <p>已经入学</p>
                        </div>
                    <% } %>
                </div>
 <!--               <div class="explain">
                    <p class="active"><span>2014-6-13</span> <span>11:02</span> <span>您的订单正在和新东方教育确认</span></p>
                    <p><span>2014-6-12</span> <span>12:02</span> <span>您的订单已经提交</span></p>
                </div>-->
            </div>
            <div class="row2">
                <h3><%= course.courseName %></h3>
                <p><label>教育机构：</label><span><%= course.instName %></span></p>
                <p><label>上课地址：</label><span><%= course.location %></span></p>
                <p><label>咨询电话：</label><span><%= course.phone %></span></p>
            </div>
            <div class="row3">
                <h3>入学信息</h3>
                <div class="clearfix">
                    <div class="fleft">
                        <p><label>开课时间:</label> <%= course.startDate %> - <%= course.finishDate %></p>
                        <p><label>班级类型:</label> <%= course.classModel %></p>
                        <p><label>联系方式:</label> <%= phone %></p>
                        <p><label>入学人姓名:</label> <%= name %></p>
                    </div>
                    <div class="fleft">
                        <p><label>上课时间1:</label> <%= course.startTime1 %> - <%= course.finishTime1 %></p>
                        <p><label>上课时间2:</label> <%= course.startTime2 %> - <%= course.finishTime2 %></p>
                        <p><label>预定人数:</label>1人</p>
                        <p><label>邮箱:</label><%= email %></p>
                    </div>
                </div>
            </div>
            <div class="row4">
                <h3>支付信息</h3>
                <p><label>支付方式:</label> 学校前台支付</p>
            </div>
        </div><!--bookingDetail end-->
        <div id="printBooking" class="print"><a href="#">订单打印</a></div>
        <div class="btns">
            <!-- <input type="button" class="btn_G" value="修改订单" id="editBooking"> -->
            <input type="button" class="btn_W" value="取消订单" id="cancelBooking">
        </div><!--btns end-->
    </div>
</script>

<script type="text/template" id="tpl_newBooking">
    <div class="courseBrief">
        <div class="row1 clearfix">
            <div class="fleft"><img src="images/pic.jpg" width="90" height="71"/></div>
            <div class="fright">
                <div class="title">六级考前词汇串讲班</div>
                <div class="desc ">适合学员： 即将参加六级考试的学生。</div>
            </div>
        </div>
        <div class="row2">
            <div class="section"><label>班级类型：</label> <span><%= course.classSize %>人</span></div>
            <div class="section"><label>开课时间：</label> <span><%= course.startDate %> - <%= course.finishDate %> <%= course.studyDays%> <%= course.studyDaysNote %>
            </span></div>
            <div class="section"><label>上课时间：</label> <span><%= course.startTime1 %> - <%= course.finishTime1 %>, <%= course.startTime2 %> - <%= course.finishTime2 %></span></div>
            <div class="section"><label>上课地址：</label> <span><%= course.location %></span></div>
        </div>
        <div class="row3">
            若该教学机构在您取消与本机构的课程订单后，给予您更多诱惑，您将获得100元反金券。
        </div>
        <div class="row4">
            <div class="title">需要帮助?</div>
            <div class="link">查看常见问题</div>
            <div class="link">在线客服</div>
            <div class="link">客服电话</div>
        </div>
    </div>
    <form id="bookingDetail" class="newBooking">
        <div class="header">填写订单信息</div>
        <div class="title">
            <h3>六级考前词汇串讲班</h3>
            <div class="fright ">Wow, Congratulations!</div>
        </div>
        <div class="row1">
            <div class="field">
                <label>报名人数</label>
               <!-- <select name="enrollNum">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select> -->
               1 人
            </div>
            <div class="field">
                <label>有效日期</label>
                <%= scheduledTime %> <span>（<%= scheduledTime %>前须到教学机构进行报名，否则优惠价格将自动失效）</span>
            </div>
            <div class="field">
                <label>课程费用</label>
                <b class="price">￥<%= course.price %></b>/位 <span>（预定免费，入学后学校前台付款）</span>
            </div>
            <% if (!app.sessionManager.hasSession()) { %>
            <div class="field clearfix">
                <% if (course.cashback) { %>
                    <div class="fleft cashback"><%= course.cashback %>元</div>
                <% } %>
            </div>
                <div class="fleft login_reg1" id="booking_loginnote"><a class="link F_green">登录</a> 或 <a class="link F_green">注册</a>后可使用优惠券，入学后获得<%= course.cashback %>元现金返还</div>
                <div id="booking_loginbox" class="loginbox">
                    <div class="loginbox_inner">
                        <div>
                            <label>用户名</label> <input class="text" type="text" id="booking_loginUsername"/>
                            <label>密码</label> <input class="text" type="password" id="booking_loginPassword"/>
                        </div>
                        <div class="btns">
                            <input type="button" value="登录" id="booking_login" />
                            <a class="button" id="booking_forgotPassword">忘记密码?</a>
                            <a class="button" id="booking_forgotPassword">还不是会员?</a>
                        </div>
                        <!-- <div class="close">关闭</div> -->
                    </div>
                </div>
            <% } %>
        </div>
        <div class="title"><h3>入学信息</h3></div>
        <div class="row2">
            <div class="field">
                <label><span class="req">*</span>入学人姓名</label>
                <input class="text" type="text" id="booking_applicantName"/>
                <span id="booking_applicantName_info" class="action"><span class="form_tip"><span class="form_tip_top">请填写实际入学人姓名</span><span class="form_tip_bottom"></span></span></span>
            </div>
            <div class="field">
                <label><span class="req">*</span>联系手机</label>
                <input class="text" type="text" id="booking_cellphone"/>
                <span id="booking_cellphone_info" class="action"><span class="form_tip"><span class="form_tip_top">(用于接收确认信息)</span><span class="form_tip_bottom"></span></span></span>
            </div>
            <div class="field">
                <label>E-mail </label>
                <input class="text" type="text" id="booking_email"/>
                <span id="booking_email_info" class="action"><span class="form_tip"><span class="form_tip_top">(可选)</span><span class="form_tip_bottom"></span></span></span>
            </div>
            <div class="field">
                <label><span class="req">*</span>预约报名日期</label>
                <input class="text" type="text" id="booking_date"/>
                <span id="booking_date_info" class="desc">(若此预约日期前未报名入学，您的特惠名额将受让给其他学员)</span>
            </div>
        </div>
        <div class="row3">
            <input type="button" class="btn_O_long" value="完成预定" id="initBooking" />
            <span id="bookingDesc" class="desc">(不收预订费)</span>
        </div>
    </form>
</script>

<script type="text/template" id="tpl_booking_submitted">
    <div class=""><img /></div>
    <div id="booking_submitted">
        <div class="row1">
            <div class="title">
                订单已提交
            </div>
            <div class="detail">
                我们会在30分钟内通知您预订结果 <input type="button" id="viewBooking" value="查看订单" />
            </div>
            <div id="printBooking">打印订单</div>
        </div>
        <div class="row2">
            <p><label>订单号: </label><%= reference %></p>
            <p><label>课程名称: </label><%= course.courseName %></p>
            <p><label>教育机构: </label><%= course.instName %></p>
            <p><label>上课地址: </label><%= course.phone %></p>
            <p><label>咨询电话: </label<%= course.location %></p>
            <p><label>开课时间: </label><%= course.startDate %>-<%= course.finishDate %></p>
            <p><label>班级类型: </label><%= course.classModel %></p>
            <p><label>预约报道: </label><%= scheduledTime %> <span>（过时您的特价订单将失效）</span></p>
            <p><label>费用总计: </label> ￥<b class="price"><%= price %></b> <span>（到校付款）</span></p>
            <p class="extra">* 到达学校后，请您凭入学人的有效证件办理入学</p>
        </div>
        <div class="row3 clearfix">
            <p class="bonus">积分奖励，成功入学后，您将获得<%= price %>积分，结账后7个工作日内计入您的上课书包</p>
            <span id="viewMore" class="viewMore">查看其他课程>></span>
        </div>
    </div>
</script>


<script type="text/template" id="tpl_courseDetail">
    <div class="sitemap">
        <span>初中辅导</span> &gt; <span>英语</span>
    </div>
    <div class="courseDetail blank">
        <div class="banner">
            <div class="row1 clearfix">
                <dl class="col1">
                    <dt><%= courseName %><span><%= instName %></span></dt>
                    <dd>适合学员：<%= suitableStudent %></dd>
                    <dd>
                        <input type="button" id="bookNow" value="立即预定" class="btn_O">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input style="margin-top:10px;" type="button" id="getTrial" value="我要预约试听" class="btn_G">
                        <!-- <span>预约名额有限（仅剩<b class="F_orange">3</b>个名额），快抢吧！</span> -->
                    </dd>
                </dl>
                <div class="col2">
                    <div class="price"><span class="sign">￥</span><%= price %></div>
                    <% if (cashback) { %>
                        <a class="cashback"> <em><%= cashback %>元</em>
                        <div class="tip">
                            <div class="arrow"></div>
                            <div class="tip_content"> 用“消费券”预订此课程，每人每课程返还<%= cashback %>元现金！入学后7个工作日可至您的账户里提现。 </div>
                        </div>
                        </a>
                    <% } %>
                </div>
            </div>
            <div class="row2 clearfix">
                <div class="gallary clearfix">
                    <div class="small_pic">
                        <div class="top">
                            <div class="pic1"><img src="<%= classImgUrls[0] %>" height="106" style="overflow:hidden;" /></div>
                            <div class="pic2"><img src="<%= classImgUrls[1] %>"  height="106" style="overflow:hidden;"/></div>
                        </div>
                        <div class="bottom">
                            <div class="pic3"><img src="<%= classImgUrls[2] %>" height="101" style="overflow:hidden;"/></div>
                            <div class="pic4"><img src="<%= classImgUrls[3] %>" height="101" style="overflow:hidden;"/></div>
                        </div>
                    </div>
                    <div class="big_pic">
                        <img src="<%= classImgUrls[4] %>" height="216" style="overflow:hidden;"/>
                    </div>
                </div>
                <div class="course_map">
                    <div class="addr">地址：<%= location %></div>
                    <div id="courseMap" class="map" width="328" height="183"></div>
                </div>
            </div>
        </div>
        <div class="courseMain blank2">
            <ul id="courseNavigateTab" class="tabButton tab">
                <li id="tab_basic" class="active">基本信息</li>
                <li id="tab_teaching">教学信息</li>
                <li id="tab_etc">教学补充</li>
                <li id="tab_guarantee">教学保障</li>
                <li id="tab_service">特色服务</li>
            </ul>
            <div class="course_content">
                <dl id="content_basic">
                    <dt>基本信息</dt>
                    <dd><label>开课日期: </label><%= startDate %>-<%= finishDate %>；<%= studyDays %> <%= studyDaysNote %></dd>
                    <dd><label>上课时间: </label><%= startTime1 %>-<%= finishTime1 %></dd>
                    <dd><label>上课课时: </label><%= courseHourNum %>课时, 每课时<%= courseHourLength %>小时</dd>
                    <dd><label>班级类型: </label><%= classSize %>人</dd>
                    <dd><label>开班要求: </label><%= openCourseRequirement%></dd>
                    <dd><label>报名日期: </label>至6月5日为止; 晚于此日期, 您将不再享有此特惠价格</dd>
                    <dd><label>机构全称: </label><%= wholeName %></dd>
                    <dd><label>机构荣誉: </label><%= partnerQualification %></dd>
                    <dd><label>机构概况: </label><%= partnerIntro %></dd>
                    <dd class="teacher clearfix">
                        <label>老师介绍: </label>
                        <div class="clearfix blank">
                            <% if (teacherNames) { %>
                                <% for (var i =0; i < teacherNames.length; i++) { %>
                                    <div class="teacherInfo">
                                        <img class="teacherPhoto" src="<%= teacherImgUrls[i] %>" width="120" height="120"/>
                                        <div class="name"><%= teacherNames[i] %></div>
                                        <p class=""><%= teacherIntros[i] %></p>
                                    </div>
                                <% } %>
                            <% } %>
                        </div>
                    </dd>
                </dl>
                <dl id="content_teaching">
                    <dt>教学信息</dt>
                    <dd><label>先修知识: </label><%= prerequest %></dd>
                    <dd><label>教学目标: </label><%= goal %></dd>
                    
                    <dd><label>教材介绍: </label><%= teachingMaterialIntro %></dd>
                    <dd><label>教材费用: </label><%= teachingMaterialFee %></dd>
                    <dd><label>课程介绍: </label><%= courseIntro %></dd>
                    <dd class="course_syllabus">
                         <label>课程提纲: </label>
                         <div>
                             <%= outline %>
                         </div>
                    </dd>
                </dl>
                <dl id="content_etc">
                    <dt>教学补充</dt>
                    <dd><label>课件下载: </label><%= downloadMaterials %></dd>
                    <dd><label>题库支持: </label><%= questionBank %></dd>
                    <dd><label>讲练结合: </label><%= teachingAndExercise %></dd>
                    <dd><label>阶段测评: </label><%= quiz %></dd>
                    <dd><label>课后答疑: </label><%= questionSession %></dd>
                    <dd><label>课后作业: </label><%= assignments %></dd>
                    <dd><label>作业批改: </label><%= marking %></dd>
                </dl>
                <dl id="content_guarantee">
                    <dt>教学保障</dt>
                    <dd><label>签约保过: </label><%= passAgreement %></dd>
                    <dd><label>高分奖励: </label><%= highScoreReward %></dd>
                </dl>
                <dl id="content_service">
                    <dt>特色服务</dt>
                    <dd><label>结业证书: </label><%= certification %></dd>
                    <dd><label>课后互动: </label><%= extracurricular %></dd>
                    <dd><label>赠送服务: </label><%= bonusService %></dd>
                </dl>
            </div>
        </div>
    </div>
</script>

<script type="text/template" id="tpl_compareView">
    <div id="compareView" class="compare">
        <div class="title clearfix" id="basic_collapse">
            <span class="up">基本信息</span>
            <a class="F_green" href="#">[收起]</a>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" id="basic_content">
            <tr id="courseName" class="course_name">
                <th width="64px">课程名称</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>" width="195">
                        <h2 class="F_green"><%= course.courseName %></h2>
                        <div class="btn blank1"><input class="btn_O" type="button" value="立即预订"/></div>
                        <div class="set"><a class="pre" href="#">向前</a><a class="delete" href="#">删除</a><a class="next" href="#">向后</a></div>
                    </td>
                <% }); %>
            </tr>
            <tr id="suitableStudent" >
                <th width="64px">适合学员</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>" width="195"><%= course.suitableStudent %></td>
                <% }); %>
            </tr>
            <tr id="instName">
                <th>机构名称</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.instName %></td>
                <% }); %>
            </tr>
            <tr id="price">
                <th>课程价格</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>">
                    <div class="price">￥<%= course.price %></div>
                    <a class="cashback"><em><%= course.cashback %>元</em></a>
                    </td>
                <% }); %>
            </tr>
            <tr id="logoUrl">
                <th>品牌展示</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><img src="<%= course.logoUrl %>"/></td>
                <% }); %>
            </tr>
            <tr id="startDate">
                <th>开课日期</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.startDate %>-<%= course.finishDate %></td>
                <% }); %>
            </tr>
            <tr id="startTime1">
                <th>上课时间</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.startTime1 %>-<%= course.finishTime1 %> <%= course.studyDays %><%= course.studyDaysNote %></td>
                <% }); %>
            </tr>
            <tr id="courseHourNum">
                <th>上课课时</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.courseHourNum %>课时，每课时<%= course.courseHourLength %>小时</td>
                <% }); %>
            </tr>
            <tr id="address">
                <th>学校地址</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.location %></td>
                <% }); %>
            </tr>
            <tr id="classSize">
                <th>班级类型</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.classSize %>人</td>
                <% }); %>
            </tr>
            <tr id="openCourseRequirement">
                <th>开班要求</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>">至少<%= course.openCourseRequirement %>人开班</td>
                <% }); %>
            </tr>
            <tr id="scheduledTime">
                <th>报名日期</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>">至<%= course.scheduledTime %>止，晚于此日期，您将不再享有此优惠价格</td>
                <% }); %>
            </tr>
            <tr id="wholeName">
                <th>机构全称</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.wholeName %></td>
                <% }); %>
            </tr>
            <tr id="distinction">
                <th>机构荣誉</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.distinction %></td>
                <% }); %>
            </tr>
            <tr id="partnerIntro">
                <th>机构概况</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>">
                    <% if (course.partnerIntro && course.partnerIntro.length>30) { %>
                        <%= course.partnerIntro.strstring(0,24) %>...
                        <a class="F_green" href="#">[展开]</a></td>
                        <>
                    <% } else {%>
                        <%= course.partnerIntro %>
                    <% } %>
                <% }); %>
            </tr>
            <tr id="teacherInfo">
                <th>老师介绍</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>">
                        <% if (course.tearcherName) { %>
                            <% for ( var i; i < course.teacherName.length; i++ ) { %>
                                <p><b class="F_green">course.teacherName[i]</b> course.teacherIntro[i]</p>
                            <% } %>
                        <% } %>
                    </td>
                <% }); %>
            </tr>
        </table>
        
        <div class="title clearfix" style="border-top:none;" id="teaching_collapse">
            <span class="up">教学信息</span>
            <a class="F_green" href="#">[收起]</a>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" id="teaching_content">
            <tr id="courseIntro">
                <th>课程介绍</th>
                <% _.each(courses, function(course) { %>
                    <td width="195" class="courseId_<%= course.courseId %>"><%= course.courseIntro %></td>
                <% }); %>
            </tr>
            <tr id="goal">
                <th>教学目标</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>">
                        <%= course.goal %>
                    </td>
                <% }); %>
            </tr>
            <tr id="prerequest">
                <th>先修知识</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.prerequest %></td>
                <% }); %>
            </tr>
            <!-- <tr id="teachingMethods">
                <th>上课形式</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.teachingMethods %></td>
                <% }); %>
            </tr> -->
            <tr id="teachingMaterialIntro">
                <th>教材介绍</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.teachingMaterialIntro %></td>
                <% }); %>
            </tr>
            <tr id="teachingMaterialCost">
                <th>教材费用</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.teachingMaterialCost %></td>
                <% }); %>
            </tr id="teachingContent">
            <tr>
                <th>课程提纲</th>
                <% _.each(courses, function(course) { %>
                    <td>
                        <%= course.outline %>
                    </td>
                <% }); %>
            </tr>
        </table>

        <div class="title clearfix" style="border-top:none;" id="more_collapse">
            <span class="up">教学补充</span>
            <a class="F_green" href="#">[收起]</a>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" id="more_content">
            <tr id="hasDownloadMaterials">
                <th>课件下载</th>
                <% _.each(courses, function(course) { %>
                    <td width="195" class="courseId_<%= course.courseId %>"><%= course.hasDownloadMaterials %></td>
                <% }); %>
            </tr>
            <tr id="questionBankIntro">
                <th>题库支持</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.questionBankIntro %></td>
                <% }); %>
            </tr>
            <tr>
                <th>班主任导学</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.classTeacher %></td>
                <% }); %>
            </tr>
            <tr>
                <th>讲练结合</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.teachingAndExercise %></td>
                <% }); %>
            </tr>
            <tr id="quiz">
                <th>阶段测评</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.quiz %></td>
                <% }); %>
            </tr>
            <tr>
                <th>课后答疑</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.questionSession %></td>
                <% }); %>
            </tr>
            <tr id="provideAssignments">
                <th>课后作业</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.provideAssignments %></td>
                <% }); %>
            </tr>
            <tr id="provideMarking">
                <th>作业批改</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.provideMarking %></td>
                <% }); %>
            </tr>
        </table>
        
        <div class="title clearfix" style="border-top:none;" id="guarantee_collapse">
            <span class="up">教学保障</span>
            <a class="F_green" href="#">[收起]</a>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" id="guarantee_content">
            <tr id="passAgreement">
                <th>签约保过</th>
                <% _.each(courses, function(course) { %>
                    <td width="195" class="courseId_<%= course.courseId %>"><%= course.passAgreement %></td>
                <% }); %>
            </tr>
            <tr id="highScoreReward">
                <th>高分奖励</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.highScoreReward %></td>
                <% }); %>
            </tr>
        </table>
        
        <div class="title clearfix" style="border-top:none;" id="special_collapse">
            <span class="up">特色服务</span>
            <a class="F_green" href="#">[收起]</a>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" id="special_content">
            <tr id="certification">
                <th>结业证书</th>
                <% _.each(courses, function(course) { %>
                    <td width="195" class="courseId_<%= course.courseId %>"><%= course.certification %></td>
                <% }); %>
            </tr>
            <tr id="extracurricularIntro">
                <th>课后互动</th>
                <% _.each(courses, function(course) { %>
                    <td width="195" class="courseId_<%= course.courseId %>"><%= course.extracurricularIntro %></td>
                <% }); %>
            </tr>
            <tr id="service">
                <th>赠送服务</th>
                <% _.each(courses, function(course) { %>
                    <td width="195" class="courseId_<%= course.courseId %>"><%= course.bonusService %></td>
                <% }); %>
            </tr>
        </table>
        
    </div>
</script>

<script type="text/templates" id="tpl_mypage_coupons">
    <div class="title">我的爱上课 &gt; 账户管理 &gt; <span class="F_green">消费券</span> </div>                        
    <div class="mypage_content_inner coupons">
        <h3 class="coupons_help_title">如何快速<span>免费获得</span>消费券</h3>
        <div class="coupons_help coupons_help1 clearfix blank">
            <dl class="col1 clearfix">
                <dt>1</dt>
                <dd><h3>邀请新用户</h3></dd>   
                <dd><p>在<a class="F_green" href="#">邀请码页面</a>中将邀请码或邀请链接扩散给好友及陌生人</p></dd>
            </dl>
            <dl class="col2">
                <dt>2</dt>
                <dd><h3>新用户注册</h3></dd>   
                <dd><p>新用户完成注册后，您将免费获得<b class="F_orange">10元</b>消费券；首次预订并成功入学后，您将额外获得<b class="F_orange">20元</b>消费券及<b class="F_orange">10元</b>现金奖励</p></dd>
            </dl>
            <dl class="col3">
                <dt>3</dt>
                <dd><h3>激活消费券</h3></dd>   
                <dd><p>在<a class="F_green" href="#">消费券页面</a>中，找到待激活消费券，输入验证码</p></dd>
            </dl>
        </div>
        <h3 class="coupons_help_title blank1">如何<span>使用</span>消费券</h3>
        <div class="coupons_help coupons_help2 clearfix blank">
            <dl class="col1 clearfix">
                <dt>1</dt>
                <dd><h3>找课程</h3></dd>   
                <dd><p>登录或注册后选择<img src="style/images/return.gif">带有标识的课程</p></dd>

            </dl>
            <dl class="col2">
                <dt>2</dt>
                <dd><h3>填写订单</h3></dd>   
                <dd><p>预订时，选用消费券</p></dd>
            </dl>
            <dl class="col3">
                <dt>3</dt>
                <dd><h3>报道入学</h3></dd>   
                <dd><p>开学后7个工作日左右返现至您的爱上课现金账户</p></dd>
            </dl>
        </div>
        <ul id="couponNavBtn" class="tab1 clearfix blank2">
            <li data-id="claimed" class="active">可用消费券</li>
            <li data-id="unclaimed">待激活消费券</li>
        </ul>
        <div id="coupons_container">
        </div>
    </div>
</script>

<script type="text/template" id="tpl_mypage_unclaimedCouponRow">
    <tr id="coupon_<%= couponId %>">
        <td class="col1"><%= creationTime %></td>
        <td class="col2"><%= amount %></td>
        <td class="col3"><%= origin %></td>
        <td class="col4"><%= expireTime %></td>
        <td class="col5"><input id="coupon_act_<%= couponId %>" class="claim" type="button" value="激活"></td>
    </tr>
</script>

<script type="text/template" id="tpl_mypage_claimedCouponRow">
    <tr id="coupon_<%= couponId %>">
        <td class="col1"><%= couponId %></td>
        <td class="col2"><%= amount %></td>
        <td class="col3"><%= origin %></td>
        <td class="col4"><%= expireTime %><%= expireSoon %></td>
    </tr>
</script>

<script type="text/template" id="tpl_mypage_couponClaimed">
    <table id="claimedTable" class="blank1" width="100%" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <td class="col1">序号</td>
                <td width="25%">券额</td>
                <td width="25%">发放原因</td>
                <td width="25%">有效期</td>
            </tr>
        </thead>
        <tbody id="claimedList">
        </tbody>
    </table>
    <div id="claimedCouponListNavigator" class="page blank1 clearfix">
    </div>
</script>

<script type="text/template" id="tpl_mypage_couponUnclaimed">
    <table id="unclaimedTable" class="blank1" width="100%" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <td class="col1">发放日期</td>
                <td class="col2" width="20%">券额</td>
                <td class="col3" width="20%">发放原因</td>
                <td class="col4" width="20%">有效期</td>
                <td class="col5" width="20%">激活</td>
            </tr>
        </thead>
        <tbody id="unclaimedList">
        </tbody>
    </table>
    <div id="unclaimedCouponListNavigator" class="page blank1 clearfix">
    </div>
</script>

<script type="text/templates" id="tpl_mypage_password">
    <div class="title"><span>我的爱上课</span> > <span>个人设置</span> > <span class=" F_green">修改密码</span></div>
    <div class="mypage_content_inner form_style password">
        <div class="field">
            <label>原密码</label>
            <input class="text" type="password" id="oldPassword">
            <span id="oldPassword_info" class="action"><span class="form_tip"><span class="form_tip_top">请填写原密码</span><span class="form_tip_bottom"></span></span></span>
        </div>                        
        <div class="field">
            <label>新密码</label>
            <input class="text" type="password" id="newPassword">
            <span id="newPassword_info" class="action"><span class="form_tip"><span class="form_tip_top">新密码至少八位</span><span class="form_tip_bottom"></span></span></span>
        </div>                        
        <div class="field">
            <label>确认密码</label>
            <input class="text" type="password" id="confirmPassword">
            <span id="confirmPassword_info" class="action"><span class="form_tip"><span class="form_tip_top">确认新密码</span><span class="form_tip_bottom"></span></span></span>
        </div> 
        <div class="field">
            <label>手机验证</label>
            <input class="text" style="width:80px;" type="text" id="smsAuthCode">
            <input id="getAuthCode" class="btn_g" type="button" value="获取验证码"/>
            <input id="gotAuthCode" class="btn_gray hidden" type="button" value="获取验证码"/>
            <span id="getAuthCodeNote" class="instr hidden">（验证码已发送，2分钟内无法重复发送，请注意查收）</span>
        </div> 
        <div class="btn">
            <input class="btn_O" id="submit_password" type="button" value="保 存">
            <a id="cancelPassword" href="#">取消</a>
        </div> 
    </div>
</script>

<script type="text/templates" id="tpl_mypage_setting">
    <div class="title"><span>我的爱上课</span> &gt; <span>个人设置</span> &gt; <span class=" F_green">个人资料</span></div>
    <div class="mypage_content_inner">
        <div class="my_info form_style">
            <div class="field">
                <label>姓<s></s>名</label>
                <input class="text" type="text" id="inputName" value="<%= name %>">
                <span class="action" id="inputName_info"><span class="form_tip"><span class="form_tip_top">请填写实际入学人姓名</span><span class="form_tip_bottom"></span></span></span>
            </div>   
            <div class="field">
                <label>手<s></s>机</label>
                <span><%= phone.substr(0,3) %>*****<%= phone.substr(8,3) %></span>
                <span class="instr">（修改手机号，请致电人工客服）</span>
            </div>                        
            <div class="field">
                <label>邮<s></s>箱</label>
                <input class="text" type="text" id="inputEmail">
                
            </div>    
            <div class="btn">
                <input class="btn_O" type="button" id="updateInfo" value="立即更新">
            </div> 
            <div style=" margin-top:50px; margin-left:103px;">
                完善及更新基本信息将便于您选择适合的课程
            </div>    

        </div>                            
    </div>
</script>

<script type="text/templates" id="tpl_mypage_credit">
    <div class="title">我的爱上课 &gt; 账户管理 &gt; <span class="F_green">现金账户</span> </div>
    <div class="total"><img src="style/images/icon_points.jpg">您现在拥有<b id="myCredit" class="F_orange">100</b>点可用积分</div>
    <div class="mypage_content_inner">
        <ul id="creditNavBtn" class="tab1 clearfix">
            <li data-id="table" class="active">积分明细</li>
            <li data-id="store">积分兑换</li>
        </ul>
        <div id="credit_pageContent">
            
        </div>
    </div>
</script>

<script type="text/templates" id="tpl_mypage_creditTable">
    <table id="creditTable" class="blank1" width="100%" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <td class="">序号</td>
                <td class="" width="20%">获得日期</td>
                <td class="" width="20%">订单号</td>
                <td class="" width="20%">积分</td>
                <td class="" width="20%">有效期</td>
            </tr>
        </thead>
        <tbody id="creditEntryContainer">

        </tbody>
        <div id="creditPageNav"></div>
    </table>
</script>

<script type="text/templates" id="tpl_mypage_creditRow">
    <tr class="creditEntry">
        <td><%= creditId %></td>
        <td class=""><%= creationTime %></td>
        <td class=""><%= bookingId %></td>
        <td class=""><%= amount %></td>
        <td class=""><%= expireTime %></td>
    </tr>
</script>

<script type="text/templates" id="tpl_mypage_creditStore">
    <div id="creditStore" class="in_built">
        积分商城施工中哦~~
    </div>
</script>

<script type="text/template" id="tpl_findPassword_1">
    <div class="sign_up">
        <div class="sign_up_inner">
            <div class="sign_up_title">
                <h2 class="fleft">忘记密码</h2>
            </div>
            <div class="get_password">
               <dl class="clearfix" id="cellContainer">
                    <dt><span>*</span>手机：</dt>
                    <dd>
                        <input id="findPassCellInput" type="text" class="text" value="" placeholder="请输入手机号(请不要输入特殊符号或者字母)"><span class="right"></span>
                    </dd>
                </dl> 
                <dl class="clearfix verify" id="authContainer">
                    <dt><span>*</span>手机验证码：</dt>
                    <dd>
                        <input id="authCode" type="text" class="text">
                        <input type="button" value="获取手机验证码" id="getSms">
                        <p id="smsInfo" class="clear" style="font-size:12px; margin-left:5px; color:#666;">点击发送验证短信，2分钟内请勿重复点击，注意查收</p>
                    </dd>
                </dl>
               <dl class="clearfix" id="passContainer">
                    <dt><span>*</span>新密码：</dt>
                    <dd>
                        <input type="password" id="findPassPassInput" class="password" value="" placeholder=""><span class="right"></span>
                    </dd>
                </dl> 
                <dl class="clearfix" id="confirmContainer">
                    <dt><span>*</span>确认新密码：</dt>
                    <dd>
                        <input type="password" id="findPassConfirmInput" class="password">
                    </dd>
                </dl>
                <div class="btn">
                    <input type="button" class="btn_G" id="nextButton" value="下一步">
                </div>                
            </div>
            <!--account end--> 
        </div>
    </div>
</script>

<script type="text/templates" id="tpl_findPassword_2">
    <div class="sign_up">
        <div class="sign_up_inner">
            <div class="sign_up_title">
                <h2 class="fleft">忘记密码</h2>
            </div>
            <div class="get_password">
                <div class="get_password_s">恭喜，您的密码已经重置成功！</div>
            </div>
            <!--get_password end--> 
        </div>
    </div>
</script>

<script type="text/templates" id="tpl_infoModal">
    <div class="pop_content">
        <div id="popMessage">
        </div>
        <div class="btn" style="text-align:center; padding-top:15px;">
            <input id="gotIt" class="btn_O" type="button" value="确认">
        </div>
    </div>
</script>

<script type="text/templates" id="tpl_frontCategoryContainer">
    <div data-parent="<%= lvl1Cat %>" class="<%= catClass %> lv2category c_item blank1 hidden clearfix">
        <div class="fleft">
            <a href="#"><%= categoryName %></a>
            <div class="top_arrow"></div>
        </div>
        <div class="fright">
            <ul class="clearfix">
                <%= catgoryList %>
            </ul>
        </div>
    </div>
</script>