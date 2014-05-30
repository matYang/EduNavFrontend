<script type="text/templates" id="tpl_adminLogin">
    <div class="form">
        <div class="user_name">
            <input id="login_username" type="text" class="text" value="" placeholder="用户名"/>
        </div>
        <div class="password">
            <input id="login_password" type="password" class="text" value="" placeholder="密码"/>
        </div>
        <div class="btn">
            <input id="login_button" type="button" class="btn_login" value="登录"/>
        </div>
    </div>    
</script>

<script type="text/templates" id="tpl_adminBase">
    <table id="wrap" class="clearfix" width="100%" cellpadding="0" cellspacing="0">
        <tr>
        <td width="225">
            <div id="sideBar" class="left_bar">
                <h1>
                    routea.ca拼车网
                </h1>
                <dl>
                    <dt>管理界面</dt>
                    <dd id="userManage" class="active">用户管理</dd>
                    <!-- <dd id="partnerManage">学校管理</dd> -->
                    <dd id="courseManage">课程管理</dd>
                    <dd id="bookingManage">订单管理</dd>
                    <dd id="adminManage">管理员管理</dd>
                </dl>
                <dl>
                    <dt>监控界面</dt>
                    <dd>监控子项1</dd>
                    <dd>监控子项2</dd>
                    <dd>监控子项3</dd>
                </dl>
                
            </div>
        </td>
        <td valign="top">
            <div id="main_content" class="main_content">
                
            </div>
        </td>
        </tr>
    </table> 
</script>

<script type="text/templates" id="tpl_adminUserManage">
    <div class="clearfix">
        <div class="fleft search">
            <input id="searchInput" class="text" type="text" placeholder="请输入姓名或id"/><input id="search" class="btn" type="button" value="搜索"/>
            
        </div>
        <div class="fright" style="line-height:40px">
            欢迎您，<span id="adminUserName" class="F_orange"></span>
        </div>
     </div>
     <table class="tablist" width="100%" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <td width="80">用户id</td>
                <td width="120">头像</td>
                <td width="120">姓名</td>
                <td width="80">性别</td>
                <td width="130">邮箱</td>
                <td width="100">电话</td>
                <td width="100">位置</td>
                <td width="100">生日</td>
                <td width="80">验证状态</td>
                <td width="100">申请日期</td>
                <td>--</td>
            </tr>
        </thead>
        <tbody id="searchResultContainer">

        </tbody>
     </table>
    <div id="userSearchNavigator" class="page clearfix">
    </div>
</script>


<script type="text/templates" id="tpl_adminCourseManage">
    <div class="tabs">
        <span id="createCourse">新建课程</span>
        <span id="updateCourse">修改课程</span>
    </div>
    <div id="createCourseContent">
        <form id="createCourseForm">
            <label>
                课程名: <input type="text" name="courseName"/>
            </label>
            <label>
                课程简介: <input type="text" name="courseIntro"/>
            </label>
            <label>
                上课时间: <input type="text" name="dailyStartTime"/>
            </label>
            <label>
                下课时间: <input type="text" name="dailyFinishTime"/>
            </label>
            <label>
                上课时间段: <input type="text" name="studyDays"/>
            </label>
            <label>
                上课时间段备注: <input type="text" name="studyDaysNote"/>
            </label>
            <label>
                开课日期: <input type="text" name="startTime"/>
            </label>
            <label>
                节课日期: <input type="text" name="finishTime"/>
            </label>
            <label>
                课时数目: <input type="text" name="courseHourNum"/>
            </label>
            <label>
                课时长度: <input type="text" name="courseHourLength"/>
            </label>
            <label>
                城市: <input type="text" name="city"/>
            </label>
            <label>
                行政区: <input type="text" name="district"/>
            </label>
            <label>
                具体地点: <input type="text" name="location"/>
            </label>
            <label>
                一级分类: <input type="text" name="category"/>
            </label>
            <label>
                二级分类: <input type="text" name="subCategory"/>
            </label>
            <label>
                价格: <input type="text" name="price"/>
            </label>
            <label>
                总共座位: <input type="text" name="seatsTotal"/>
            </label>
            <label>
                P-Ref: <input type="text" name="partnerCourseReference"/>
            </label>
            <label>
                班级类型: <input type="text" name="classModel"/>
            </label>
            <label>
                开班需求: <input type="text" name="openCourseRequirement"/>
            </label>
            <label>
                教室图片: <input type="text" name="classroomImgUrl"/>
            </label>
            <label>
                教室介绍: <input type="text" name="classroomIntro"/>
            </label>
            <input class="submit" type="submit" value="提交"/>
        </form>
    </div>
    <div id="updateCourseContent" class="hidden">
        <div class="clearfix">
            <div class="fleft search">
                <input id="searchInput" class="text" type="text" placeholder="请输入课程名，学校名，或者课程id"/><input id="search" class="btn" type="button" value="搜索"/>
                
            </div>
            <div class="fright" style="line-height:40px">
                欢迎您，<span id="adminUserName" class="F_orange"></span>
            </div>
         </div>
         <table class="tablist" width="100%" cellpadding="0" cellspacing="0">
            <thead>
                <tr>
                    <td width="80">课程id</td>
                    <td width="120">课程</td>
                    <td width="120">学校名</td>
                    <td width="130">等级</td>
                    <td width="100">开始时间</td>
                    <td width="100">结束时间</td>
                    <td width="100">价格</td>
                    <td>--</td>
                </tr>
            </thead>
            <tbody id="searchResultContainer">

            </tbody>
         </table>
        <div id="courseSearchNavigator" class="page clearfix">
        </div>
    </div>
</script>


<script type="text/templates" id="tpl_adminBookingManage">
    <div class="clearfix">
        <div class="fleft search">
            <input id="searchInput" class="text" type="text" placeholder="请输入姓名或id"/><input id="search" class="btn" type="button" value="搜索"/>
            
        </div>
        <div class="fright" style="line-height:40px">
            欢迎您，<span id="adminUserName" class="F_orange"></span>
        </div>
     </div>
     <table class="tablist" width="100%" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <td width="80">订单id</td>
                <td width="80">用户id</td> 
                <td width="120">用户名</td>
                <td width="80">学校id</td> 
                <td width="120">学校</td>
                <td width="100">课程</td>
                <td width="130">订单日期</td>
                <td width="100">价格</td>
                <td>--</td>
            </tr>
        </thead>
        <tbody id="searchResultContainer">

        </tbody>
     </table>
    <div id="bookingSearchNavigator" class="page clearfix">
    </div>
</script>

<script type="text/templates" id="tpl_adminAdminManage">
    <div class="clearfix">
        <div class="fleft search">
            <input id="searchInput" class="text" type="text" placeholder="请输入姓名或id"/><input id="search" class="btn" type="button" value="搜索"/>
            
        </div>
        <div class="fright" style="line-height:40px">
            欢迎您，<span id="adminUserName" class="F_orange"></span>
        </div>
     </div>
     <table class="tablist" width="100%" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <td width="80">用户id</td>
                <td>--</td>
            </tr>
        </thead>
        <tbody id="searchResultContainer">

        </tbody>
     </table>
    <div id="bookingSearchNavigator" class="page clearfix">
    </div>
</script>

<script type="text/templates" id="tpl_adminUserRow">
    <tr class="userResult">
        <td><%= userId %></td>
        <td><img src="<%= imgPath %>" width="60" height="60"/></td>
        <td><%= name %></td>
        <td><%= gender %></td>
        <td><%= email %></td>
        <td><%= phone %></td>
        <td><%= location %></td>
        <td><%= birthday %></td>
        <td><%= passengerVerification.state %></td>
        <td><%= passengerVerification.submissionDate %></td>
        <td><a class="view" href="#">查看</a></td>
    </tr>
</script>

<script type="text/templates" id="tpl_adminCourseRow">
    
</script>

<script type="text/templates" id="tpl_adminBookingRow">
    
</script>

<script type="text/templates" id="tpl_adminAdminRow">
    
</script>

<script type="text/templates" id="tpl_adminUser">
    <label>
        userId: <%= userId %>
    </label>
    <label>
        name: <%= name %>
    </label>
    <label>
        phone: <%= phone %>
    </label>
    <label>
        email: <%= email %>
    </label>
    <label>
        balance: <%= balance %>
    </label>
    <label>
        credit: <%= credit %>
    </label>
    <label>
        status: <%= status %>
    </label>    
    <label>
        coupons: 
        <div id="adminUserCouponsContainer">
        </div>
    </label>
</script>

<script type="text/templates" id="tpl_adminUserCouponRow">
    <div class="userCoupon">
        <div>couponId <%= couponId %></div>
        <div>transactionId <%= transactionId %></div>
        <div>userId <%= userId %></div>
        <div>amount <%= amount %></div>
        <div>creationTime<%= creationTime %></div>
        <div>expireTime<%= expireTime %></div>
        <div>status<%= status %></div>
    </div>
</script>