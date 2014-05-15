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
                    <dd id="userInfo" class="active">用户资料</dd>
                    <dd id="passengerVeri">乘客验证</dd>
                    <dd id="driverVeri">司机验证</dd>
                </dl>
                <dl>
                    <dt>监控界面</dt>
                    <dd>监控子项1</dd>
                    <dd>监控子项2</dd>
                    <dd>监控子项3</dd>
                </dl>
                <div id="sideBarClose" class="close" title="收起">收起</div>
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
            欢迎您，<span class="F_orange">管理员</span>
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