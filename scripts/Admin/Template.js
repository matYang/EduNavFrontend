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
                <div>
                    <div style="float:left">用户状态：</div><select id="status_Input">
                    <option value="0">正常</option>
                    <option value="1">ban</option>
                    </select>
                </div>
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
                    <select id="thirdCategory_Input">
                        <option value="" disabled selected>三级分类</option>
                    </select>
                    <select id="city_Input">
                        <option value="" disabled selected>城市</option>
                    </select>
                    <select id="district_Input">
                        <option value="" disabled selected>地区</option>
                    </select>
                    <div>开始日期:<input type="text" id="startTime_Input" placeholder="开始日期"/></div>
                    <div>结束日期:<input type="text" id="finishTime_Input" placeholder="结束日期"/></div>
                    <input id="institutionName_Input" class="text" type="text" placeholder="学校名"/>
                    <div>
                        最低价格：<input type="number" id="startPrice_Input" placeholder="最低价格"/>
                    </div>
                    <div>
                        最高价格：<input type="number" id="finishPrice_Input" placeholder="最高价格"/>
                    </div>
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
                <div>已经报道<input id="wasConfirmedIndex_Input" type="checkbox"></div>
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
        <td><%= couponRecord %></td>
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
    <div>userId: <span><%= userId %></span><span class="edit"><input type="hidden" name="userId"/ value="<%= userId %>"></span></div>
    <div>name: <span class="detail"><%= name %></span><span class="edit"><input type="text" name="name"/></span></div>  
    <div>email: <span class="detail"><%= name %></span><span class="edit"><input type="text" name="email"/></span></div>  
    <span class="detail">
        <div>
            coupons: 
            <div id="adminUserCouponsContainer">
            </div>
        </div>
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
        <div><label>courseId: </label><div class="detail"><%= courseId %></div><div class="edit"><input type="hidden" name="courseId"/ value="<%= courseId %>"></div></div>
        <div><label>合作伙伴Id: </label><div class="detail"><%= partnerId %></div><div class="edit"><input type="text" name="partnerId"/></div></div>
        <div><label>创建时间: </label><div class="detail"><%= creationTime %></div></div>
        <div><label>课程名: </label><div class="detail"><%= courseName %></div><div class="edit"><input type="text" name="courseName"/></div></div>
        <div><label>课程简介: </label><div class="detail"><%= courseIntro %></div><div class="edit"><input type="text" name="courseIntro"/></div></div>
        <div><label>开始日期: </label><div class="detail"><%= dailyStartTime %></div><div class="edit"><input type="text" name="dailyStartTime"/></div></div>
        <div><label>结束日期: </label><div class="detail"><%= dailyFinishTime %></div><div class="edit"><input type="text" name="dailyFinishTime"/></div></div>
        <div><label>上课日: </label><div class="detail"><%= studyDays %></div><div class="edit"><input type="text" name="studyDays"/></div></div>
        <div><label>上课日备注: </label><div class="detail"><%= studyDaysNote %></div><div class="edit"><input type="text" name="studyDaysNote"/></div></div>
        <div><label>上学时间: </label><div class="detail"><%= startTime %></div><div class="edit"><input type="text" name="startTime"/></div></div>
        <div><label>放学时间: </label><div class="detail"><%= finishTime %></div><div class="edit"><input type="text" name="finishTime"/></div></div>
        <div><label>学时: </label><div class="detail"><%= courseHourNum %></div><div class="edit"><input type="text" name="courseHourNum"/></div></div>
        <div><label>学时时间: </label><div class="detail"><%= courseHourLength %></div><div class="edit"><input type="text" name="courseHourLength"/></div></div>
        <div><label>城市: </label><div class="detail"><%= city %></div><div class="edit"><select name="city"></select></div></div>
        <div><label>地区: </label><div class="detail"><%= district %></div><div class="edit"><select name="district"></select></div></div>
        <div><label>地址: </label><div class="detail"><%= location %></div><div class="edit"><input type="text" name="location"/></div></div>
        <div><label>一级分类: </label><div class="detail"><%= category %></div><div class="edit"><select name="category"></select></div></div>
        <div><label>二级分类: </label><div class="detail"><%= subCategory %></div><div class="edit"><select name="subCategory"></select></div></div>
        <div><label>三级分类: </label><div class="detail"></div><div class="edit"><select name="thirdCategory"></select></div></div>
        <div><label>价格: </label><div class="detail"><%= price %></div><div class="edit"><input type="text" name="price"/></div></div>
        <div><label>招生人数: </label><div class="detail"><%= seatsTotal %></div><div class="edit"><input type="text" name="seatsTotal"/></div></div>
        <div><label>剩余人数: </label><div class="detail"><%= seatsLeft %></div><span class="edit"><input type="text" name="seatsLeft"/></span></div>
        <div><label>reference: </label><span class="detail"><%= reference %></span><span class="edit"><input type="text" name="reference"/></span></div>
        <div><label>partnerCourseReference: </label><span class="detail"><%= partnerCourseReference %></span><span class="edit"><input type="text" name="partnerCourseReference"/></span></div>
        <div><label>课程模式: </label><span class="detail"><%= classModel %></span><span class="edit"><input type="text" name="classModel"/></span></div>
        <div><label>开课要求: </label><span class="detail"><%= openCourseRequirement %></span><span class="edit"><input type="text" name="openCourseRequirement"/></span></div>
        <div><label>partnerQualification: </label><span class="detail"><%= partnerQualification %></span><span class="edit"><input type="text" name="partnerQualification"/></span></div>
        <div><label>partnerIntro: </label><span class="detail"><%= partnerIntro %></span><span class="edit"><input type="text" name="partnerIntro"/></span></div>
        <div><label>教学方式: </label><span class="detail"><%= teachingMethods %></span><span class="edit"><input type="text" name="teachingMethods"/></span></div>
        <div><label>教学方式简介: </label><span class="detail"><%= teachingMethodsIntro %></span><span class="edit"><input type="text" name="teachingMethodsIntro"/></span></div>
        <div><label>教材类型: </label><span class="detail"><%= teachingMaterialType %></span><span class="edit"><input type="text" name="teachingMaterialType"/></span></div>
        <div><label>教材名: </label><span class="detail"><%= teachingMaterialName %></span><span class="edit"><input type="text" name="teachingMaterialName"/></span></div>
        <div><label>教材简介: </label><span class="detail"><%= teachingMaterialIntro %></span><span class="edit"><input type="text" name="teachingMaterialIntro"/></span></div>
        <div><label>教材费用: </label><span class=  "detail"><%= teachingMaterialCost %></span><span class="edit"><input type="text" name="teachingMaterialCost"/></span></div>
        <div><label>teachingMaterialFree: </label><span class="detail"><%= teachingMaterialFree %></span><span class="edit"><input type="checkbox" name="teachingMaterialFree"/></span></div>
        <div><label>适合学生: </label><span class="detail"><%= suitableStudent %></span><span class="edit"><input type="text" name="suitableStudent"/></span></div>
        <div><label>学前要求: </label><span class="detail"><%= prerequest %></span><span class="edit"><input type="text" name="prerequest"/></span></div>

        <input type="button" class="edit" id="addTeacher" />
        <div><label>提纲：</label><span class="detail"></span></div>
        <div><label>下载材料: </label><span class="detail"><%= hasDownloadMaterials %></span><span class="edit"><input type="checkbox" name="hasDownloadMaterials"/></span></div>
        <div><label>题库: </label><span class="detail"><%= questionBank %></span><span class="edit"><input type="text" name="questionBank"/></span></div>
        <div><label>题库简介: </label><span class="detail"><%= questionBankIntro %></span><span class="edit"><input type="text" name="questionBankIntro"/></span></div>
        <div><label>高分奖励: </label><span class="detail"><%= highScoreReward %></span><span class="edit"><input type="text" name="highScoreReward"/></span></div>
        <div><label>保过协议: </label><span class="detail"><%= passAgreement %></span><span class="edit"><input type="text" name="passAgreement"/></span></div>
        <div><label>阶段评估: </label><span class="detail"><%= quiz %></span><span class="edit"><input type="text" name="quiz"/></span></div>
        <div><label>课后作业: </label><span class="detail"><%= provideAssignments %></span><span class="edit"><input type="checkbox" name="provideAssignments"/></span></div>
        <div><label>作业批改: </label><span class="detail"><%= provideMarking %></span><span class="edit"><input type="checkbox" name="provideMarking"/></span></div>
        <div><label>结业证书: </label><span class="detail"><%= certification %></span><span class="edit"><input type="text" name="certification"/></span></div>
        <div><label>课后活动: </label><span class="detail"><%= extracurricular %></span><span class="edit"><input type="text" name="extracurricular"/></span></div>
        <div><label>课后活动简介: </label><span class="detail"><%= extracurricularIntro %></span><span class="edit"><input type="text" name="extracurricularIntro"/></span></div>
        <div><label>状态: </label><span class="detail"><%= status %></span><span class="edit">
            <select name="status">
                <option value=0>activate</option>
                <option value=1>deactivate</option>
            </select>
        </span></div>
        <div><label>学校电话: </label><span class="detail"><%= phone %></span><span class="edit"><input type="text" name="phone"/></span></div>
        <div><label>logo: </label><span class="detail"><%= logoUrl %></span><span class="edit"><input type="text" name="logoUrl"/></span></div>
        <div><label>学校名: </label><span class="detail"><%= instName %></span><span class="edit"><input type="text" name="instName"/></span></div>
        <div><label>机构全称: </label><span class="detail"><%= wholeName %></span><span class="edit"><input type="text" name="wholeName"/></span></div> 

        <div><label>教室照片1: </label><span class="detail"><img src="<%= classroomImgUrl %>" /></span><span class="edit"><input type="file" name="classroomImgUrl"/><img id="preview1" class="preview"/></span></div>
        <div><label>教室照片2: </label><span class="detail"><img src="<%= classroomImgUrl %>" /></span><span class="edit"><input type="file" name="classroomImgUrl"/><img id="preview2" class="preview"/></span></div>
        <div><label>教室照片3: </label><span class="detail"><img src="<%= classroomImgUrl %>" /></span><span class="edit"><input type="file" name="classroomImgUrl"/><img id="preview3" class="preview"/></span></div>
        <div><label>教室照片4: </label><span class="detail"><img src="<%= classroomImgUrl %>" /></span><span class="edit"><input type="file" name="classroomImgUrl"/><img id="preview4" class="preview"/></span></div>
        <div><label>教室照片5: </label><span class="detail"><img src="<%= classroomImgUrl %>" /></span><span class="edit"><input type="file" name="classroomImgUrl"/><img id="preview5" class="preview"/></span></div>
        <div class="btns">
            <span class="detail">   
            <input type="button" id="createSimilarCourse" value="新建类似课程"/>
            <input type="button" id="deleteCourse" value="删除课程"/>
            <input type="button" id="editCourse" value="修改课程"/></span>
            <span class="edit"><input id="coursePostSubmit" type="submit" value="提交"><input id="cancel" value="取消" type="button"/></span>
        </div>
    </form>
</script>

<script type="text/templates" id="tpl_adminPartner">
    <form id="adminPartnerForm">
        <div><label>partner Id: </label><span class="detail"><%= partnerId %></span></div> 
        <div><label>机构全称: </label><span class="detail"><%= wholeName %></span><span class="edit"><input type="text" name="wholeName"/></span></div> 
        <div><label>执照: </label><span class="detail"><%= license %></span><span class="edit"><input type="text" name="license"/></span></div> 
        <div><label>机构号: </label><span class="detail"><%= organizationNum %></span><span class="edit"><input type="text" name="organizationNum"/></span></div> 
        <div><label>reference: </label><span class="detail"><%= reference %></span><span class="edit"><input type="text" name="reference"/></span></div> 
        <div><label>电话: </label><span class="detail"><%= phone %></span><span class="edit"><input type="text" name="phone"/></span></div> 
        <div><label>状态: </label><span class="detail"><%= status %></span><span class="edit"><input type="text" name="status"/></span></div> 
        <div><label>学校名: </label><span class="detail"><%= instName %></span><span class="edit"><input type="text" name="instName"/></span></div> 
        <div><label>logo: </label><span class="detail"><%= logoUrl %></span><span class="edit"><input type="text" name="logoUrl"/></span></div> 
        <span class="detail"><input type="button" id="deletePartner" value="delete" /></span>
        <span class="detail"><input type="button" id="editPartner" value="edit"/></span>
        <span class="edit"><input id="partnerPostSubmit" type="submit" value="submit"></span>
        <span class="edit"><div id="cancel">Cancel</div>
    </form>
</script>

<script type="text/templates" id="tpl_adminBooking">
    <form id="adminBookingForm">
        <div style="height:450px">
            <div><label>订单ID: </label><%= bookingId %><input type="hidden" name="bookingId" value="<%= bookingId %>"/></div> 
            <div><label>transactionId: </label><%= transactionId %><input type="hidden" name="transactionId" value="<%= transactionId %>"/></div> 
            <div><label>用户Id: </label><%= userId %><input type="hidden" name="userId" value="<%= userId %>"/></div> 
            <div><label>合作伙伴: </label><%= partnerId %><input type="hidden" name="partnerId" value="<%= partnerId %>"/></div> 
            <div><label>课程Id: </label><%= courseId %><input type="hidden" name="courseId" value="<%= courseId %>"/></div> 
            <div><label>返金券记录: </label><%= couponRecord %></ul></div> 
            <div><label>操作记录: </label><ul><%= actionRecord %></ul></div> 
        </div>
        <div style="height:450px">
            <div><label>订单状态: </label><span class="detail"><%= status %></span>
            <span class="edit">
                <select name="status" value="<%= status %>" >
                    <option value="0">awaiting</option>
                    <option value="1">confirmed</option>
                    <option value="2">cancelled</option>
                    <option value="3">enter</option>
                    <option value="4">finished</option>
                    <option value="5">failed</option>
                    <option value="6">quit</option>
                    <option value="7">delivered</option>
                    <option value="8">consolidated</option>
                </select>
            </span></div>
            <div><label>姓名:</label> <span class="detail"><%= name %></span><span class="edit"><input type="text" name="name" value="<%= name %>"/></span></div>
            <div><label>电话:</label> <span class="detail"><%= phone %></span><span class="edit"><input type="text" name="phone" value="<%= phone %>"/></span></div>
            <div><label>邮箱:</label> <span class="detail"><%= email %></span><span class="edit"><input type="text" name="email" value="<%= email %>"/></span></div>
            <div><label>预约时间:</label> <span class="detail"><%= scheduledTime %></span><span class="edit"><input type="text" name="scheduledTime" value="<%= scheduledTime %>"/></span></div>
            <div><label>记录:</label> <span class="detail"><%= note %></span><span class="edit"><textarea name="note"><%= note %></textarea></span></div>
        </div>
        <div class="btns" style="width:100%">
            <span class="detail"><input type="button" id="editBooking" value="edit" /></span>
            <span class="edit"><input id="cancel" type="button" value="取消"></span>
            <span class="edit"><input id="bookingPostSubmit" type="button" value="提交"></span>
        </div>
    </form>
</script>