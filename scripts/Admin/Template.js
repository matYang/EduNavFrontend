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
        <tr style="vertical-align: top;">
        <td width="225">
            <div id="sideBar" class="left_bar">
                <h1>
                    routea.ca拼车网
                </h1>
                <dl>
                    <dt>管理界面</dt>
                    <dd id="userManage" class="active">用户管理</dd>
                    <dd id="partnerManage">合作伙伴管理</dd>
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
        <div class="fleft search" id="userSearchPanel">
            <div id="findUser">
                <input id="userId_Input" class="text" type="text" placeholder="请输入用户id"/>
                <input id="findUserBtn" class="btn" type="button" value="搜索"/>
                <a style="float:left" id="goTo_queryUser" class="button">Query</a>
            </div>
            <div id="queryUser" class="hidden">
                <input id="name_Input" class="text" type="text" placeholder="请输入姓名"/>
                <input id="phone_Input" class="text" type="text" placeholder="电话号码"/>
                <input id="email_Input" class="text" type="text" placeholder="email"/>
                <label>
                    <div style="float:left">用户状态：</div><select id="status_Input">
                    <option value="0">正常</option>
                    <option value="1">ban</option>
                    </select>
                </label>
                <input id="queryUserBtn" class="btn" type="button" value="搜索"/>
                <a style="float:left" id="goTo_findUser" class="button">Get</a>
            </div>
        </div>
        <div class="fright" style="line-height:40px">
            欢迎您，<span id="adminUserName" class="F_orange"></span>
        </div>
     </div>
     <table class="tablist" width="100%" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <td width="80">用户id</td>
                <td width="120">姓名</td>
                <td width="130">邮箱</td>
                <td width="100">电话</td>
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
    <div class="tabs manageTabButton">
        <div id="createCourse">新建课程</div>
        <div id="searchCourse">搜索课程</div>
    </div>
    <div id="searchResult">
        <div class="clearfix">
            <div id="courseSearchPanel" class="fleft search">
                <div id="findCourse">
                    <input id="courseId_Input" class="text" type="text" placeholder="课程id"/>
                    <input id="findCourseBtn" class="btn" type="button" value="进入课程"/>
                    <a style="float:left" id="goTo_queryCourse" class="button">Query</a>
                </div>
                <div id="queryCourse" class="hidden">
                    <select id="category_Input">
                        <option value="" disabled selected>一级分类</option>
                    </select>
                    <select id="subCategory_Input">
                        <option value="" disabled selected>二级分类</option>
                    </select>
                    <select id="city_Input">
                        <option value="" disabled selected>城市</option>
                    </select>
                    <select id="district_Input">
                        <option value="" disabled selected>地区</option>
                    </select>
                    <label>开始日期:<input type="text" id="startTime_Input" placeholder="开始日期"/></label>
                    <label>结束日期:<input type="text" id="finishTime_Input" placeholder="结束日期"/></label>
                    <input id="institutionName_Input" class="text" type="text" placeholder="学校名"/>
                    <label>
                        最低价格：<input type="number" id="startPrice_Input" placeholder="最低价格"/>
                    </label>
                    <label>
                        最高价格：<input type="number" id="finishPrice_Input" placeholder="最高价格"/>
                    </label>
                    <input id="partnerId_Input" class="text" type="text" placeholder="partner Id"/>
                    <input id="userId_Input" class="text" type="text" placeholder="用户id"/>
                    <input id="courseReference_Input" class="text" type="text" placeholder="course reference"/>
                    <input id="partnerReference_Input" class="text" type="text" placeholder="partner reference"/>
                    <input id="queryCourseBtn" class="btn" type="button" value="搜索"/>
                    <a style="float:left" id="goTo_findCourse" class="button">get</a>
                </div>
                
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
                    <td width="360">学校名</td>
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
    <div id="courseCRUDContainer">
    </div>
</script>

<script type="text/templates" id="tpl_adminPartnerManage">
    <div class="tabs manageTabButton">
        <div id="createPartner">新建伙伴</div>
        <div id="searchPartner">搜索伙伴</div>
    </div>
    <div id="searchResult">
        <div class="clearfix">
            <div class="fleft search">
                <input id="searchInput" class="text" type="text" placeholder="请输入学校名或者学校id"/><input id="search" class="btn" type="button" value="搜索"/>
                
            </div>
            <div class="fright" style="line-height:40px">
                欢迎您，<span id="adminUserName" class="F_orange"></span>
            </div>
         </div>
         <table class="tablist" width="100%" cellpadding="0" cellspacing="0">
            <thead>
                <tr>
                    <td width="100">partner id</td>
                    <td width="360">全名</td>
                    <td width="120">执照</td>
                    <td width="120">机构号</td>
                    <td width="100">Ref</td>
                    <td width="100">Phone</td>
                    <td width="100">状态</td>
                    <td width="100">新建时间</td>
                    <td>--</td>
                </tr>
            </thead>
            <tbody id="searchResultContainer">

            </tbody>
         </table>
        <div id="partnerSearchNavigator" class="page clearfix">
        </div>
    </div>
    <div id="partnerCRUDContainer">
    </div>
</script>


<script type="text/templates" id="tpl_adminBookingManage">
    <div id="searchResult">
    <div class="clearfix">
        <div id="bookingSearchPanel">
            <div id="findBooking" class="fleft search">
                <input id="bookingId_Input" class="text" type="text" placeholder="请输入订单id"/>
                <input id="getBookingBtn" class="btn" type="button" value="进入"/>
                <a style="float:left" id="goTo_queryBooking" class="button">Query</a>
            </div>
            <div id="queryBooking" class="fleft search hidden">
                <input id="userId_Input" class="text" type="text" placeholder="用户Id"/>
                <input id="name_Input" class="text" type="text" placeholder="姓名"/>
                <input id="phone_Input" class="text" type="text" placeholder="用户手机"/>
                <input id="courseId_Input" class="text" type="text" placeholder="course Id"/>
                <input id="partnerId_Input" class="text" type="text" placeholder="partner Id"/>
                <input id="reference_Input" class="text" type="text" placeholder="reference"/>
                <input id="startPrice_Input" class="text" type="text" placeholder="最低价格"/>
                <input id="finishPrice_Input" class="text" type="text" placeholder="最高价格"/>
                <input id="scheduledTime_Input" class="text" type="text" placeholder="预约时间"/>
                <label>已经报道<input id="wasConfirmedIndex_Input" type="checkbox"></label>
                <input id="queryBookingBtn" class="btn" type="button" value="搜索"/>
                <a style="float:left" id="goTo_findBooking" class="button">Get</a>
            </div>
        </div>
        <div class="fright" style="line-height:40px">
            欢迎您，<span id="adminUserName" class="F_orange"></span>
        </div>
     </div>
     <table class="tablist" width="100%" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <td width="120">订单id</td>
                <td width="120">用户id</td> 
                <td width="120">用户名</td>
                <td width="120">交易id</td>
                <td width="120">合作伙伴id</td> 
                <td width="120">优惠券Id</td>
                <td width="120">课程Id</td>
                <td width="130">订单日期</td>
                <td width="130">报道日期</td>
                <td width="100">价格</td>
                <td width="100">已确认</td>
                <td>--</td>
            </tr>
        </thead>
        <tbody id="searchResultContainer">

        </tbody>
     </table>
    <div id="bookingSearchNavigator" class="page clearfix">
    </div>
    </div>
    <div id="bookingCRUDContainer">
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
        <td><%= name %></td>
        <td><%= email %></td>
        <td><%= phone %></td>
        <td><a class="view" href="#">查看</a></td>
    </tr>
</script>

<script type="text/templates" id="tpl_adminCourseRow">
    <tr class="courseResult">
        <td><%= courseId %></td>
        <td><%= courseName %></td>
        <td><%= instName %></td>
        <td><%= startTime %></td>
        <td><%= finishTime %></td>
        <td><%= price %></td>
        <td><%= seatsTotal %></td>
        <td><%= seatsLeft %></td>
        <td><%= creationTime %></td>
        <td><a id="viewCourse_<%= courseId %>" class="view" href="#">查看</a></td>
    </tr>
</script>

<script type="text/templates" id="tpl_adminPartnerRow">
    <tr class="partnerResult">
        <td><%= partnerId %></td>
        <td><%= wholeName %></td>
        <td><%= license %></td>
        <td><%= organizationNum %></td>
        <td><%= reference %></td>
        <td><%= phone %></td>
        <td><%= status %></td>
        <td><%= creationTime %></td>
        <td><a class="view" href="#">查看</a></td>
    </tr>
</script>

<script type="text/templates" id="tpl_adminBookingRow">
    <tr class="bookingResult">
        <td><%= bookingId %></td>
        <td><%= userId %></td>
        <td><%= transactionId %></td>
        <td><%= partnerId %></td>
        <td><%= couponId %></td>
        <td><%= courseId %></td>
        <td><%= creationTime %></td>
        <td><%= scheduledTime %></td>
        <td><%= price %></td>
        <td><%= wasConfirmed %></td>
        <td><a class="view" href="#">查看</a></td>
    </tr>
</script>

<script type="text/templates" id="tpl_adminAdminRow">
    
</script>

<script type="text/templates" id="tpl_adminUser">
    <form id="">
    <label>userId: <span><%= userId %></span><span class="edit"><input type="hidden" name="userId"/ value="<%= userId %>"></span></label>
    <label>name: <span class="detail"><%= name %></span><span class="edit"><input type="text" name="name"/></span></label>  
    <label>email: <span class="detail"><%= name %></span><span class="edit"><input type="text" name="email"/></span></label>  
    <span class="detail">
        <label>
            coupons: 
            <div id="adminUserCouponsContainer">
            </div>
        </label>
    </span>
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

<script type="text/templates" id="tpl_adminCourse">
    <form id="adminCourseForm" method="post">
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
        <label>city: <span class="detail"><%= city %></span><span class="edit"><select name="city"></select></span></label>
        <label>district: <span class="detail"><%= district %></span><span class="edit"><select name="district"></select></span></label>
        <label>location: <span class="detail"><%= location %></span><span class="edit"><input type="text" name="location"/></span></label>
        <label>category: <span class="detail"><%= category %></span><span class="edit"><select name="category"></select></span></label>
        <label>subCategory: <span class="detail"><%= subCategory %></span><span class="edit"><select name="subCategory"></select></span></label>
        <label>price: <span class="detail"><%= price %></span><span class="edit"><input type="text" name="price"/></span></label>
        <label>seatsTotal: <span class="detail"><%= seatsTotal %></span><span class="edit"><input type="text" name="seatsTotal"/></span></label>
        <label>seatsLeft: <span class="detail"><%= seatsLeft %></span><span class="edit"><input type="text" name="seatsLeft"/></span></label>
        <label>reference: <span class="detail"><%= reference %></span><span class="edit"><input type="text" name="reference"/></span></label>
        <label>partnerCourseReference: <span class="detail"><%= partnerCourseReference %></span><span class="edit"><input type="text" name="partnerCourseReference"/></span></label>
        <label>classModel: <span class="detail"><%= classModel %></span><span class="edit"><input type="text" name="classModel"/></span></label>
        <label>openCourseRequirement: <span class="detail"><%= openCourseRequirement %></span><span class="edit"><input type="text" name="openCourseRequirement"/></span></label>
        <label>classroomImgUrl: <span class="detail"><%= classroomImgUrl %></span><span class="edit"><input type="text" name="classroomImgUrl"/></span></label>
        <label>partnerQualification: <span class="detail"><%= partnerQualification %></span><span class="edit"><input type="text" name="partnerQualification"/></span></label>
        <label>partnerIntro: <span class="detail"><%= partnerIntro %></span><span class="edit"><input type="text" name="partnerIntro"/></span></label>
        <label>teachingMethods: <span class="detail"><%= teachingMethods %></span><span class="edit"><input type="text" name="teachingMethods"/></span></label>
        <label>teachingMethodsIntro: <span class="detail"><%= teachingMethodsIntro %></span><span class="edit"><input type="text" name="teachingMethodsIntro"/></span></label>
        <label>teachingMaterialType: <span class="detail"><%= teachingMaterialType %></span><span class="edit"><input type="text" name="teachingMaterialType"/></span></label>
        <label>teachingMaterialName: <span class="detail"><%= teachingMaterialName %></span><span class="edit"><input type="text" name="teachingMaterialName"/></span></label>
        <label>teachingMaterialIntro: <span class="detail"><%= teachingMaterialIntro %></span><span class="edit"><input type="text" name="teachingMaterialIntro"/></span></label>
        <label>teachingMaterialCost: <span class="detail"><%= teachingMaterialCost %></span><span class="edit"><input type="text" name="teachingMaterialCost"/></span></label>
        <label>teachingMaterialFree: <span class="detail"><%= teachingMaterialFree %></span><span class="edit"><input type="checkbox" name="teachingMaterialFree"/></span></label>
        <label>suitableStudent: <span class="detail"><%= suitableStudent %></span><span class="edit"><input type="text" name="suitableStudent"/></span></label>
        <label>prerequest: <span class="detail"><%= prerequest %></span><span class="edit"><input type="text" name="prerequest"/></span></label>

        <input type="button" class="edit" id="addTeacher" />
        <label>hasDownloadMaterials: <span class="detail"><%= hasDownloadMaterials %></span><span class="edit"><input type="checkbox" name="hasDownloadMaterials"/></span></label>
        <label>questionBank: <span class="detail"><%= questionBank %></span><span class="edit"><input type="text" name="questionBank"/></span></label>
        <label>questionBankIntro: <span class="detail"><%= questionBankIntro %></span><span class="edit"><input type="text" name="questionBankIntro"/></span></label>
        <label>highScoreReward: <span class="detail"><%= highScoreReward %></span><span class="edit"><input type="text" name="highScoreReward"/></span></label>
        <label>passAgreement: <span class="detail"><%= passAgreement %></span><span class="edit"><input type="text" name="passAgreement"/></span></label>
        <label>quiz: <span class="detail"><%= quiz %></span><span class="edit"><input type="text" name="quiz"/></span></label>
        <label>provideAssignments: <span class="detail"><%= provideAssignments %></span><span class="edit"><input type="checkbox" name="provideAssignments"/></span></label>
        <label>provideMarking: <span class="detail"><%= provideMarking %></span><span class="edit"><input type="checkbox" name="provideMarking"/></span></label>
        <label>certification: <span class="detail"><%= certification %></span><span class="edit"><input type="text" name="certification"/></span></label>
        <label>extracurricular: <span class="detail"><%= extracurricular %></span><span class="edit"><input type="text" name="extracurricular"/></span></label>
        <label>extracurricularIntro: <span class="detail"><%= extracurricularIntro %></span><span class="edit"><input type="text" name="extracurricularIntro"/></span></label>
        <label>status: <span class="detail"><%= status %></span><span class="edit">
            <select name="status">
                <option value=0>activate</option>
                <option value=1>deactivate</option>
            </select>
        </span></label>
        <label>phone: <span class="detail"><%= phone %></span><span class="edit"><input type="text" name="phone"/></span></label>
        <label>logoUrl: <span class="detail"><%= logoUrl %></span><span class="edit"><input type="text" name="logoUrl"/></span></label>
        <label>instName: <span class="detail"><%= instName %></span><span class="edit"><input type="text" name="instName"/></span></label>
        <label>wholeName: <span class="detail"><%= wholeName %></span><span class="edit"><input type="text" name="wholeName"/></span></label> 
        <span class="detail"><input type="button" id="createSimilarCourse" value="createsimilar"/></span>
        <span class="detail"><input type="button" id="deleteCourse" value="delete"/></span>
        <span class="detail"><input type="button" id="editCourse" value="edit"/></span>
        <span class="edit"><input id="coursePostSubmit" type="submit" value="submit"></span>
        <span class="edit"><div id="cancel">Cancel</div>
    </form>
</script>

<script type="text/templates" id="tpl_adminPartner">
    <form id="adminPartnerForm">
        <label>partnerId: <span class="detail"><%= partnerId %></span></label> 
        <label>wholeName: <span class="detail"><%= wholeName %></span><span class="edit"><input type="text" name="wholeName"/></span></label> 
        <label>license: <span class="detail"><%= license %></span><span class="edit"><input type="text" name="license"/></span></label> 
        <label>organizationNum: <span class="detail"><%= organizationNum %></span><span class="edit"><input type="text" name="organizationNum"/></span></label> 
        <label>reference: <span class="detail"><%= reference %></span><span class="edit"><input type="text" name="reference"/></span></label> 
        <label>phone: <span class="detail"><%= phone %></span><span class="edit"><input type="text" name="phone"/></span></label> 
        <label>status: <span class="detail"><%= status %></span><span class="edit"><input type="text" name="status"/></span></label> 
        <label>instName: <span class="detail"><%= instName %></span><span class="edit"><input type="text" name="instName"/></span></label> 
        <label>logoUrl: <span class="detail"><%= logoUrl %></span><span class="edit"><input type="text" name="logoUrl"/></span></label> 
        <span class="detail"><input type="button" id="deletePartner" value="delete" /></span>
        <span class="detail"><input type="button" id="editPartner" value="edit"/></span>
        <span class="edit"><input id="partnerPostSubmit" type="submit" value="submit"></span>
        <span class="edit"><div id="cancel">Cancel</div>
    </form>
</script>

<script type="text/templates" id="tpl_adminBooking">
    <form id="adminBookingForm">
        <label>bookingId: <%= bookingId %><input type="hidden" name="bookingId" value="<%= bookingId %>"/></label> 
        <label>transactionId: <%= transactionId %><input type="hidden" name="transactionId" value="<%= transactionId %>"/></label> 
        <label>userId: <%= userId %><input type="hidden" name="userId" value="<%= userId %>"/></label> 
        <label>partnerId: <%= partnerId %><input type="hidden" name="partnerId" value="<%= partnerId %>"/></label> 
        <label>couponId: <%= couponId %><input type="hidden" name="couponId" value="<%= couponId %>"/></label> 
        <label>courseId: <%= courseId %><input type="hidden" name="courseId" value="<%= courseId %>"/></label> 
        <label>name: <span class="detail"><%= name %></span><span class="edit"><input type="text" name="name" value="<%= name %>"/></span></label>
        <label>status: <span class="detail"><%= status %></span><span class="edit">
            <select name="status" value="<%= status %>" >
                <option value="0">activate</option>
                <option value="1">deactivate</option>
            </select>
        </span></label>
        <span class="detail"><input type="button" id="editBooking" value="edit" /></span>
        <span class="edit"><input id="bookingPostSubmit" type="submit" value="submit"></span>
        <span class="edit"><div id="cancel">Cancel</div>
    </form>
</script>