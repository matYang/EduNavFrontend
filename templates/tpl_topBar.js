<script type="text/template" id="tpl_topBar-loggedIn">
    <div class="topBar">
        <div class="topBar-inner clearfix">
            <h1 id="logo" class="topBar-logo">
                <a></a>
            </h1>
            <ul class="topBar-navigation">
                <li class = 'button navigate_main'>找事儿</li>
                <li class = 'button navigate_usersearch'>找人</li>
                <li class = 'button navigate_personal'>个人主页</li>
                <li class = 'button navigate_feedBack'>发布消息</li>
            </ul>
            <div id = 'dropdowns' class="topBar-dropdown">
                <dl id = 'notifications' class="message">
                    <dt>我的消息</dt>
                    <dd style="display:none">
                        <ul>
                            <li><a href="#">消息item1</a></li>
                            <li><a href="#">消息item2</a></li>
                            <li><a href="#">消息item3</a></li>
                            <li><a href="#">消息item4</a></li>
                        </ul>
                    </dd>
                </dl>
                <dl id = 'letters' class="email">
                    <dt>我的邮件</dt>
                    <dd style="display:none">
                        <ul>
                            <li><a href="#">邮件item1</a></li>
                            <li><a href="#">邮件item2</a></li>
                            <li><a href="#">邮件item3</a></li>
                            <li><a href="#">邮件item4</a></li>
                        </ul>
                    </dd>
                </dl>
                <dl id = 'favorites' class="collection">
                    <dt>我的收藏</dt>
                    <dd style="display:none">
                        <ul>
                            <li><a href="#">收藏item1</a></li>
                            <li><a href="#">收藏item2</a></li>
                            <li><a href="#">收藏item3</a></li>
                            <li><a href="#">收藏item4</a></li>
                        </ul>
                    </dd>
                </dl>
            </div>
            <div class="topBar-profileImage">
                <dl>
                    <dt> <a href="#"><img class="topBar-profileImage-tag" src="<%= imgPath %>" width="48" height="48"/></a> </dt>
                    <dd style="display:none">
                        <ul>
                            <li><a href="#">个人主页</a></li>
                            <li><a href="#">设置</a></li>
                            <li><a href="#">意见反馈</a></li>
                            <li class="quit"><a href="#">退出</a></li>
                        </ul>
                    </dd>
                </dl>
            </div>
        </div>
    </div>

    <div id='topNoticeBar'></div>
</script>


<script type="text/template" id="tpl_topBar-notLoggedIn">
    <div id = 'topBar'>
        <div class="topBar-inner clearfix">
            <h1 id = "logo" class="topBar-logo">
                <a> </a>
            </h1>
            <form id='login'>
                <input id='login_username' class = 'no-input-value' type = 'text' />
                <input id='login_password' class = 'no-input-value' type = 'password' />
                <div id='login_button' class='button' style='background-color: #ffffff; float:left;'>登陆</div>
                <div id='signup_button' class='button' style='background-color: #ffffff; float:left;'>注册</div>
            </form>
        </div>
    </div>
    <div id='topNoticeBar'></div>
</script>