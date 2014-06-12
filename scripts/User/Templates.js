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
                <a id="" class="login" href="#">登录</a>
                <span></span>
                <a id="signup_button" class="reg" href="#">注册</a>
            </div>
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
    <!--筛选框-->
    <div id="searchPanel" class="filter">
        <ul id="search_category"  class="tab">
        </ul>
        
        <div id="filterPanel" class="filter_content">
            <div id="search_subCategory" class="filterCriteria">
            </div>
            <div id="filter_district" class="filterCriteria">
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
                <span data-id="0-499">~499</span>
                <span data-id="500-999">500~999</span>
                <span data-id="1000-1499">1000~1499</span>
                <span data-id="1500-1999">1500~1999</span>
                <span data-id="2000-">2000以上</span>
            </div>
        </div>
    </div>
    
    <!--筛选结果-->
    <!--
    <div id="searchReqs" class="blank1">
        <span>10个课程中满足</span>
        <a href="#" title="取消">初中辅导</a>
        <a href="#" title="取消">英语</a>
    </div>
    -->
    <div class="search_result clearfix blank">
        
        <!--左栏开始-->
        <div class="fleft w_730">
            <div id="searchResultSorter" class="clearfix">
                <ul class="sorter">
                    <li id="editorPick" class="active">爱上课推荐</li>
                    <li class="line"></li>
                    <li id="time">时间↑</li>
                    <li class="line"></li>
                    <li id="price">价格↑</li>
                </ul>
                <div class="fright">
                    当前促销：<input type="checkbox" name="cashback" /><label>返现</label>
                    <input type="checkbox" name="flashdeal" /><label>限时抢</label>

                </div>
            </div><!--searchResultSorter end-->
            <div id="searchResultDisplayPanel">
            </div>
            <div id="courseSearchResultNavigator" class="page blank1 clearfix">

            </div>
        </div>
        
        <!--右栏开始-->
        <div class="fright w_250">
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
            <p class="desc"><span>开课时间:</span> <%= startTime %></p>
            <p class="desc"><span>地<s></s>址:</span> <%= location %></p>
        </div>
        <div class="col2">
            <p class="classHour">共<b class="F_orange"><%=courseHourNum %></b>课时</p>
            <p class="price"><span class="sign">￥</span><%= price %></p>
            <a class="cashback">
                <em>50元</em>
                    <div class="tip">
                        <div class="arrow"></div>
                        <div class="tip_content">
                            用“消费券”预订此课程，每人每课程返还59元现金！入学后7个工作日可至您的账户里提现。
                        </div>
                    </div>
                </a>
            </div>
        <div class="col3">
            <div class="compare" id="compare_<%= courseId %>"><input class="btn_g" type="button" value="+对比"/></div>
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
    <div class="compareEntry">
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

<script type="text/template" id="tpl_mypage_base">
    <div id="mypage_main">
        <div id="mypage_sidebar">
            <div class="mypage_sidebar_title">上课书包</div>
            <div class="mypage_sidebar_section p1" >
                <div class="mypage_sidebar_sectionContent">
                    <div id="mypage_avatar">
                        <img src="images/user_pic.jpg" width="150" height="150"/>
                        <p>晚上好，尊敬的会员</p>
                    </div>
                    <div id="mypage_info">
                        <p class="phone"><span></span>18609879900</p>
                        <p class="email"><span></span>djxiaoniud@163.com</p>
                    </div>
                </div>
            </div>
            <div class="mypage_sidebar_section p2">
                <div class="mypage_sidebar_sectionTitle">订单管理</div>
                <div class="mypage_sidebar_sectionContent">
                    <div class="mypage_sidebar_tab active" id="bookingManage">课程订单</div>
                </div>
            </div>
            <div class="mypage_sidebar_section p3">
                <div class="mypage_sidebar_sectionTitle">账户管理</div>
                <div class="mypage_sidebar_sectionContent">
                    <div class="mypage_sidebar_tab" id="cashAccount">现金账户</div>
                    <div class="mypage_sidebar_tab" id="couponAccount">消费券</div>
                    <div class="mypage_sidebar_tab" id="creditAccount">积分</div>
                </div>
            </div>
            <div class="mypage_sidebar_section p4">
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
        <div class="summaryItem1"><span class="F_orange">648</span>元现金</div>
        <div class="line"></div>
        <div class="summaryItem2"><span class="F_orange">1417</span>元消费券</div>
        <div class="line"></div>
        <div class="summaryItem3"><span class="F_orange">21189</span>积分</div>
    </div>
    <h2>未入学订单</h2>
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
            <div class="date"><%= course.startTime %></div>
            <div class="dayOfWeek"><%= course.studyDays %> <%= course.studyDaysNote %></div>
        </div>
        <div class="bookingEntryDetail">
            <p class="title"><a class="F_green" href="#">【<%= course.instName %>】<%= course.courseName %></a></p>
            <p class="address"><b>地址：</b><%= course.location %></p>
        </div>
        <div class="bookingEntryPrice">
            <span class="sign">￥</span><%= price %>
        </div>
        <div class="bookingEntryState">
            <span class="sign pending">等待确认</span>
        </div>
    </div>
</script>

<script type="text/template" id="tpl_mypage_bookingDetail">
    <div>上课书包 &gt; 订单管理 &gt; 课程订单 </div>
    <div id="bookingDetail">
        <div class="row0">
            <div class="left">
                <label>
                    订单号：<span>1436991417</span> <span>(2014年5月23日预定)</span>
                </label>
                <label>
                    状态：<span>等待确认</span> <span>(2014年5月27日预定)</span>
                </label>
            </div>
            <div class="right">
                <p class="price">总金额：<span class="sign">￥</span><%= price %></p>
            </div>
        </div>
        <div class="row1">
            <div class="left">
                <img class="progressbar" src=""/>
                <p><span>2014-6-13</span> <span>11:02</span> <span>您的订单正在和新东方教育确认</span></p>
                <p><span>2014-6-12</span> <span>12:02</span> <span>您的订单已经提交</span></p>
            </div>
        </div>
        <div class="row2">
            <span class="title">
                六级考前词汇串讲班
            </span>
            <label>教育机构：</label><%= course.instName %>
            <label>上课地址：</label><%= course.location %>
            <label>咨询电话：</label><%= course.phone %>
        </div>
        <div class="row3">
            <span class="title">入学信息</span>
            <div class="left">
                <label>
                    开课时间: <%= course.startTime %> - <%= course.finishTime %>
                </label>
                <label>
                    班级类型: <%= course.classModel %>
                </label>
                <label>
                    联系方式: <%= phone %>
                </label>
                <label>
                    入学人姓名: <%= name %>
                </label>
            </div>
            <div class="right">
                <label>
                    上课时间: <%= dailyStartTime %> - <%= dailyFinishTime %>
                </label>
                <label>
                    预定人数: 1人
                </label>
                <label>
                    邮箱: <%= email %>
                </label>
            </div>
        </div>
        <div class="row4">
            <span class="title">支付信息</span>
            <label>
                支付方式: 学校前台支付
            </label>
        </div>
        <div class="row5">
            <input type="button" class="btn_green" value="修改订单" id="editBooking" />
            <input type="button" class="btn_white" value="取消订单" id="cancelBooking" />
            <input type="button" value="订单打印" id="printBooking"/>
        </div>
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
            <div class="section"><label>班级类型：</label> <span><%= course.seatsTotal %>人</span></div>
            <div class="section"><label>开课时间：</label> <span><%= course.startTime %> - <%= course.finishTime %></span></div>
            <div class="section"><label>上课时间：</label> <span><%= course.dailyStartTime %> - <%= course.dailyFinishTime %></span></div>
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
                <select name="enrollNum">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                人
            </div>
            <div class="field">
                <label>有效日期</label>
                <%= scheduledTime %> <span>（<%= scheduledTime %>前须到教学机构进行报名，否则优惠价格将自动失效）</span>
            </div>
            <div class="field">
                <label>课程费用</label>
                <b class="price">￥<%= course.price %></b>/位 <span>（预定免费，入学后学校前台付款）</span>
            </div>
            <div class="field clearfix">
                <div class="fleft cashback">50元</div>
                <div class="fleft login_reg1"><a class="link F_green">登录</a> 或 <a class="link F_green">注册</a>后可使用优惠券，入学后获得50元现金返还</div>
            </div>
            <div class="loginbox">
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
                    <div class="close">关闭</div>
                </div>
            </div>
        </div>
        <div class="title"><h3>入学信息</h3></div>
        <div class="row2">
            <div class="field">
                <label><span class="req">*</span>入学人姓名</label>
                <input class="text" type="text" id="booking_applicantName"/>
                <span class="desc">(请填写实际入学人姓名)</span>
            </div>
            <div class="field">
                <label><span class="req">*</span>联系手机</label>
                <input class="text" type="text" id="booking_cellphone"/>
                <span class="desc">(用于接收确认信息)</span>
            </div>
            <div class="field">
                <label>E-mail </label>
                <input class="text" type="text" id="booking_email"/>
                <span class="desc">(可选)</span>
            </div>
            <div class="field">
                <label><span class="req">*</span>预约报名日期</label>
                <input class="text" type="date" id="booking_date"/>
                <span class="desc">(若此预约日期前未报名入学，您的特惠名额将受让给其他学员)</span>
            </div>
        </div>
        <div class="row3">
            <input type="submit" class="btn_O_long" value="完成预定" id="initBooking" />
            <span class="desc">(不收预订费)</span>
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
            <p><label>开课时间: </label><%= course.startTime %>-<%= course.finishTime %></p>
            <p><label>班级类型: </label><%= course.classModel %></p>
            <p><label>预约报道: </label><%= scheduledTime %> <span>（过时您的特价订单将失效）</span></p>
            <p><label>费用总计: </label> ￥<b class="price"><%= price %></b> <span>（到校付款）</span></p>
            <p class="extra">* 到达学校后，请您凭入学人的有效证件办理入学</p>
        </div>
        <div class="row3 clearfix">
            <p class="bonus">积分奖励，成功入学后，您将获得<%= price %>积分，结账后7个工作日内计入您的上课书包</p>
            <span class="viewMore">查看其他课程>></span>
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
                </dl>
                <div class="col2">
                    <div class="price"><span class="sign">￥</span><%= price %></div>
                    <a class="cashback">
                        <em>50元</em>
                        <div class="tip">
                            <div class="arrow"></div>
                            <div class="tip_content">
                                用“消费券”预订此课程，每人每课程返还50元现金！入学后7个工作日可至您的账户里提现。
                            </div>
                        </div>
                      </a>
                 </div>
                 <div class="col3">
                     <input type="button" id="bookNow" value="立即预定" class="btn_O" />
                 </div>
            </div>
            <div class="row2 clearfix">
                <div class="gallary clearfix">
                    <div class="small_pic">
                        <div class="top">
                            <div class="pic1"><img src="style/images/pic1.jpg" width="116" height="106"/></div>
                            <div class="pic2"><img src="style/images/pic2.jpg"  width="156" height="106"/></div>
                        </div>
                        <div class="bottom">
                            <div class="pic3"><img src="style/images/pic3.jpg" width="156" height="101"/></div>
                            <div class="pic4"><img src="style/images/pic4.jpg" width="116" height="101"/></div>
                        </div>
                    </div>
                    <div class="big_pic">
                        <img src="style/images/pic5.jpg" width="306" height="216"/>
                    </div>
                </div>
                <div class="course_map">
                    <div class="addr">地址：<%= location %></div>
                    <div class="map" width="328" height="183"></div>
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
                    <dd><label>开课日期: </label><%= startTime %>-<%= finishTime %>；<%= studyDaysNote %></dd>
                    <dd><label>上课时间: </label><%= dailyStartTime %>-<%= dailyFinishTime %></dd>
                    <dd><label>上课课时: </label><%= courseHourNum %>课时, 每课时<%= courseHourLength %>小时</dd>
                    <dd><label>班级类型: </label><%= seatsTotal %>人</dd>
                    <dd><label>开班要求: </label><%= openCourseRequirement%></dd>
                    <dd><label>报名日期: </label>至6月5日为止; 晚于此日期, 您将不再享有此特惠价格</dd>
                    <dd><label>机构全称: </label><%= wholeName %></dd>
                    <dd><label>机构荣誉: </label><%= partnerQualification %></dd>
                    <dd><label>机构概况: </label><%= partnerIntro %></dd>
                    <dd class="teacher clearfix">
                        <label>老师介绍: </label>
                        <div class="clearfix blank">
                            <div class="teacherInfo">
                                <img class="teacherPhoto" src="style/images/t1.jpg" width="120" height="120"/>
                                <div class="name">李红永</div>
                                <p class="">新东方高级讲师，毕业于英国爱丁堡大学英语文学系，授课风格轻松幽默，深受学生的喜爱</p>
                            </div>
                            <div class="teacherInfo">
                                <img class="teacherPhoto" src="style/images/t2.jpg" width="120" height="120"/>
                                <div class="name">邱永清</div>
                                <p class="">新东方高级讲师，毕业于英国爱丁堡大学英语文学系，授课风格轻松幽默，深受学生的喜爱</p>
                            </div>
                        </div>
                    </dd>
                </dl>
                <dl id="content_teaching">
                    <dt>教学信息</dt>
                    <dd><label>先修知识: </label><%= prerequest %></dd>
                    <dd><label>教学目标: </label><%= courseIntro %></dd>
                    <dd><label>上课形式: </label><%= teachingMethods %></dd>
                    <dd><label>教材介绍: </label><%= teachingMethodsIntro %></dd>
                    <dd><label>教材费用: </label><%= teachingMaterialCost %></dd>
                    <dd><label>课程介绍: </label><%= courseIntro %></dd>
                    <dd class="course_syllabus">
                         <label>课程提纲: </label>
                         <div>
                             <p>第一讲 </p>
                             <p>1、口语 Transport</p>
                             <p>2、听力专项训练</p> 
                             <p>3、精读文章</p> 
                             <p>4、课后美文欣赏</p>
                             <p>第二讲 </p>
                             <p>1、口语 Different shops</p> 
                             <p>2、听力专项训练</p> 
                             <p>3、精读文章</p> 
                             <p>4、课后美文欣赏</p> 
                             <p>第三讲</p> 
                             <p>1、口语　Ｉlove fashion</p> 
                             <p>2、听力专项训练</p>  
                         </div>
                    </dd>
                </dl>
                <dl id="content_etc">
                    <dt>教学补充</dt>
                    <dd><label>课件下载: </label><%= hasDownloadMaterials %></dd>
                    <dd><label>题库支持: </label><%= questionBank %></dd>
                    <dd><label>讲练结合: </label></dd>
                    <dd><label>阶段测评: </label><%= quiz %></dd>
                    <dd><label>课后答疑: </label></dd>
                    <dd><label>课后作业: </label><%= provideAssignments %></dd>
                    <dd><label>作业批改: </label><%= provideMarking %></dd>
                </dl>
                <dl id="content_guarantee">
                    <dt>教学保障</dt>
                    <dd><label>签约保过: </label><%= passAgreement %></dd>
                    <dd><label>高分奖励: </label><%= highScoreReward %></dd>
                </dl>
                <dl id="content_service">
                    <dt>特色服务</dt>
                    <dd><label>结业证书: </label><%= certification %></dd>
                    <dd><label>课后互动: </label><%= extracurricularIntro %></dd>
                    <dd><label>赠送服务: </label><%= extracurricularIntro %></dd>
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
            <tr id="courseName">
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
                    <a class="cashback">
                        <em>50元</em>
                        <div class="tip">
                            <div class="arrow"></div>
                            <div class="tip_content">
                                用“消费券”预订此课程，每人每课程返还50元现金！入学后7个工作日可至您的账户里提现。
                            </div>
                        </div>
                        </a>
                    </td>
                <% }); %>
            </tr>
            <tr id="logoUrl">
                <th>品牌展示</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><img src="<%= course.logoUrl %>"/></td>
                <% }); %>
            </tr>
            <tr id="startTime">
                <th>开课日期</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.startTime %>-<%= course.finishTime %></td>
                <% }); %>
            </tr>
            <tr id="dailyStartTime">
                <th>上课时间</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.dailyStartTime %>-<%= course.dailyFinishTime %>(<%= course.studyDays %>, <%= course.studyDaysNote %>)</td>
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
            <tr id="seatsTotal">
                <th>班级类型</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.seatsTotal %>人</td>
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
                    <% if (course.partnerIntro.length>30) { %>
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
                        <p><b class="F_green">刘明军</b> 南京新东方国内考试部项目主管；原沈阳新东方国内考试部助理总监；新东方优秀教师。</p>
                        <p><b class="F_green">何刚</b> 南京新东方国内考试部项目主管；原沈阳新东方国内考试部助理总监；新东方优秀教师。</p>
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
                        <p>1、对初一英语知识点达到灵活运用层次，夯实初一知识</p>
                        <p>2、对初二秋季知识点达到识记和理解层次，在新学期学习中占得先机。</p>
                    </td>
                <% }); %>
            </tr>
            <tr id="prerequest">
                <th>先修知识</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.prerequest %></td>
                <% }); %>
            </tr>
            <tr id="teachingMethods">
                <th>上课形式</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>"><%= course.teachingMethods %></td>
                <% }); %>
            </tr>
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
                        <p>第一讲</p>  
                        <p>1、口语 Transport</p> 
                        <p>2、听力专项训练 </p> 
                        <p>3、精读文章</p>  
                        <p>4、课后美文欣赏 </p> 
                        <p>第二讲 </p> 
                        <p>1、口语 Different shops</p>  
                        <p>2、听力专项训练</p>  
                        <p>3、精读文章 </p> 
                        <p>4、课后美文欣赏 </p> 
                        <p>第三讲 </p> 
                        <p>1、口语　Ｉlove fashion</p>  
                        <p>2、听力专项训练</p>  
                        <p>3、精读文章 </p> 
                        <p>4、课后美文欣赏</p>  
                        <p>第四讲 </p> 
                        <p>1、口语 Saving money </p> 
                        <p>2、听力专项训练</p>  
                        <p>3、精读文章 </p> 
                        <p>第五讲 </p> 
                        <p>1、口语 Rules and Regulations </p> 
                        <p>2、听力专项训练</p>  
                        <p>3、精读文章</p> 
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
                    <td class="courseId_<%= course.courseId %>">老师不定期跟进学员进度，灵活调整课程计划</td>
                <% }); %>
            </tr>
            <tr>
                <th>讲练结合</th>
                <% _.each(courses, function(course) { %>
                    <td class="courseId_<%= course.courseId %>">寄语特定教学目标，进行有针对的训练及讲解</td>
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
                    <td class="courseId_<%= course.courseId %>">支持课后多途径教学相关任何答疑问解答</td>
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
                    <td width="195" class="courseId_<%= course.courseId %>"><%= course.extracurricularIntro %></td>
                <% }); %>
            </tr>
        </table>
        
    </div>
</script>