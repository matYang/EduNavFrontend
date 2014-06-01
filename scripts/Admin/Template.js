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
                    <td width="100">开始时间</td>
                    <td width="100">结束时间</td>
                    <td width="100">价格</td>
                    <td width="100">座位数</td>
                    <td width="100">剩余座位</td>
                    <td width="100">新建时间</td>
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
    <tr class="userResult">
        <td><%= courseId %></td>
        <td><%= courseName %></td>
        <td><%= instName %></td>
        <td><%= startTime %></td>
        <td><%= finishTime %></td>
        <td><%= price %></td>
        <td><%= seatsTotal %></td>
        <td><%= seatsLeft %></td>
        <td><%= creationTime %></td>
        <td><a class="view" href="#">查看</a></td>
    </tr>
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

<script type="text/templates" id="tpl_adminCourseView">
    <form id="adminCourseForm">
        <label>courseId: <span class="detail"><%= courseId %></span><span class="edit"><input type="hidden" name="courseId"/ value="<%= courseId %>"></span></label>
        <label>partnerId: <span class="detail"><%= partnerId %></span><span class="edit"><input type="text" name="partnerId"/></span></label>
        <label>creationTime: <span class="detail"><%= creationTime %></span></label>
        <label>courseName: <span class="detail"><%= courseName %></span><span class="edit"><input type="text" name="courseName"/></span></label>
        <label>courseIntro: <span class="detail"><%= courseIntro %></span><span class="edit"><input type="text" name="courseIntro"/></span></label>
        <label>dailyStartTime: <span class="detail"><%= dailyStartTime %></span><span class="edit"><input type="text" name="dailyStartTime"/></span></label>
        <label>dailyFinishTime: <span class="detail"><%= dailyFinishTime %></span><span class="edit"><input type="text" name="dailyFinishTime"/></span></label>
        <label>studyDays: <span class="detail"><%= studyDays %></span><span class="edit"><input type="text" name="studyDays"/></span></label>
        <label>studyDaysNote: <span class="detail"><%= studyDaysNote %></span><span class="edit"><input type="text" name="studyDaysNote"/></span></label>
        <label>startTime: <span class="detail"><%= startTime %></span><span class="edit"><input type="text" name="startTime"/></span></label>
        <label>finishTime: <span class="detail"><%= finishTime %></span><span class="edit"><input type="text" name="finishTime"/></span></label>
        <label>courseHourNum: <span class="detail"><%= courseHourNum %></span><span class="edit"><input type="text" name="courseHourNum"/></span></label>
        <label>courseHourLength: <span class="detail"><%= courseHourLength %></span><span class="edit"><input type="text" name="courseHourLength"/></span></label>
        <label>city: <span class="detail"><%= city %></span><span class="edit"><input type="text" name="city"/></span></label>
        <label>district: <span class="detail"><%= district %></span><span class="edit"><input type="text" name="district"/></span></label>
        <label>location: <span class="detail"><%= location %></span><span class="edit"><input type="text" name="location"/></span></label>
        <label>category: <span class="detail"><%= category %></span><span class="edit"><input type="text" name="category"/></span></label>
        <label>subCategory: <span class="detail"><%= subCategory %></span><span class="edit"><input type="text" name="subCategory"/></span></label>
        <label>price: <span class="detail"><%= price %></span><span class="edit"><input type="text" name="price"/></span></label>
        <label>seatsTotal: <span class="detail"><%= seatsTotal %></span><span class="edit"><input type="text" name="seatsTotal"/></span></label>
        <label>seatsLeft: <span class="detail"><%= seatsLeft %></span><span class="edit"><input type="text" name="seatsLeft"/></span></label>
        <label>reference: <span class="detail"><%= reference %></span><span class="edit"><input type="text" name="reference"/></span></label>
        <label>partnerCourseReference: <span class="detail"><%= partnerCourseReference %></span><span class="edit"><input type="text" name="partnerCourseReference"/></span></label>
        <label>classModel: <span class="detail"><%= classModel %></span><span class="edit"><input type="text" name="classModel"/></span></label>
        <label>openCourseRequirement: <span class="detail"><%= openCourseRequirement %></span><span class="edit"><input type="text" name="openCourseRequirement"/></span></label>
        <label>classroomImgUrl: <span class="detail"><%= classroomImgUrl %></span><span class="edit"><input type="text" name="classroomImgUrl"/></span></label>
        <label>classroomIntro: <span class="detail"><%= classroomIntro %></span><span class="edit"><input type="text" name="classroomIntro"/></span></label>
        <label>partnerQualification: <span class="detail"><%= partnerQualification %></span><span class="edit"><input type="text" name="partnerQualification"/></span></label>
        <label>partnerIntro: <span class="detail"><%= partnerIntro %></span><span class="edit"><input type="text" name="partnerIntro"/></span></label>
        <label>teachingMethods: <span class="detail"><%= teachingMethods %></span><span class="edit"><input type="text" name="teachingMethods"/></span></label>
        <label>teachingMethodsIntro: <span class="detail"><%= teachingMethodsIntro %></span><span class="edit"><input type="text" name="teachingMethodsIntro"/></span></label>
        <label>teachingMaterialType: <span class="detail"><%= teachingMaterialType %></span><span class="edit"><input type="text" name="teachingMaterialType"/></span></label>
        <label>teachingMaterialName: <span class="detail"><%= teachingMaterialName %></span><span class="edit"><input type="text" name="teachingMaterialName"/></span></label>
        <label>teachingMaterialIntro: <span class="detail"><%= teachingMaterialIntro %></span><span class="edit"><input type="text" name="teachingMaterialIntro"/></span></label>
        <label>teachingMaterialCost: <span class="detail"><%= teachingMaterialCost %></span><span class="edit"><input type="text" name="teachingMaterialCost"/></span></label>
        <label>teachingMaterialFree: <span class="detail"><%= teachingMaterialFree %></span><span class="edit"><input type="text" name="teachingMaterialFree"/></span></label>
        <label>suitableStudent: <span class="detail"><%= suitableStudent %></span><span class="edit"><input type="text" name="suitableStudent"/></span></label>
        <label>prerequest: <span class="detail"><%= prerequest %></span><span class="edit"><input type="text" name="prerequest"/></span></label>
        <label>teacherImgUrl: <span class="detail"><%= teacherImgUrl %></span><span class="edit"><input type="text" name="teacherImgUrl"/></span></label>
        <label>teacherIntro: <span class="detail"><%= teacherIntro %></span><span class="edit"><input type="text" name="teacherIntro"/></span></label>
        <label>hasDownloadMaterials: <span class="detail"><%= hasDownloadMaterials %></span><span class="edit"><input type="text" name="hasDownloadMaterials"/></span></label>
        <label>questionBank: <span class="detail"><%= questionBank %></span><span class="edit"><input type="text" name="questionBank"/></span></label>
        <label>questionBankIntro: <span class="detail"><%= questionBankIntro %></span><span class="edit"><input type="text" name="questionBankIntro"/></span></label>
        <label>highScoreReward: <span class="detail"><%= highScoreReward %></span><span class="edit"><input type="text" name="highScoreReward"/></span></label>
        <label>passAgreement: <span class="detail"><%= passAgreement %></span><span class="edit"><input type="text" name="passAgreement"/></span></label>
        <label>quiz: <span class="detail"><%= quiz %></span><span class="edit"><input type="text" name="quiz"/></span></label>
        <label>provideAssignments: <span class="detail"><%= provideAssignments %></span><span class="edit"><input type="text" name="provideAssignments"/></span></label>
        <label>provideMarking: <span class="detail"><%= provideMarking %></span><span class="edit"><input type="text" name="provideMarking"/></span></label>
        <label>certification: <span class="detail"><%= certification %></span><span class="edit"><input type="text" name="certification"/></span></label>
        <label>extracurricular: <span class="detail"><%= extracurricular %></span><span class="edit"><input type="text" name="extracurricular"/></span></label>
        <label>extracurricularIntro: <span class="detail"><%= extracurricularIntro %></span><span class="edit"><input type="text" name="extracurricularIntro"/></span></label>
        <label>status: <span class="detail"><%= status %></span><span class="edit"><input type="text" name="status"/></span></label>
        <label>phone: <span class="detail"><%= phone %></span><span class="edit"><input type="text" name="phone"/></span></label>
        <label>logoUrl: <span class="detail"><%= logoUrl %></span><span class="edit"><input type="text" name="logoUrl"/></span></label>
        <label>instName: <span class="detail"><%= instName %></span><span class="edit"><input type="text" name="instName"/></span></label>
        <label>wholeName: <span class="detail"><%= wholeName %></span><span class="edit"><input type="text" name="wholeName"/></span></label> 
        <span class="detail"><button id="createSimilarCourse">create similar</button></span>
        <span class="detail"><button id="deleteCourse">delete</button></span>
        <span class="edit"><input type="submit" value="submit"></span>
    </form>
</script>
