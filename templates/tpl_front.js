<script type="text/template" id="tpl_front">
        <div class="frontPage">
            <div class="frontPage-searchBanner">
                <div class="frontPage-searchBanner_inner">
                    
                    <!--搜索框-->
                    <div class="frontPage-searchBanner-searchBox">
                        <div class="form">
                            <div id="from" class="from"><label></label><input class="text" type="text" value="出发地"/><span></span></div>
                            <div id="to" class="to"><label></label><input class="text" type="text" value="目的地"/><span></span></div>
                            <div class="clearfix">
                                <div class="date"><label></label><input class="text" type="text" value="出发日期"/><span></span></div>
                                <div class="btn_search"><input type="button" value="立即搜索"/></div>
                            </div>
                        </div>
                    </div>
                    
                    <!--介绍文字-->
                    <div class="frontPage-searchBanner-introText">
                        <h2>简单生活，我们拼车吧！</h2>
                        <p>方便，省钱，还可以交到志同“道”合的朋友</p>
                        <!--<p>您还可以 <a href="#">点击这里</a> 了解我们网站</p>-->
                    </div>
                    
                </div>
            </div>
            
            <div class="frontPage-middle clearfix">
                
                <!--最新拼车信息 start-->
                <div class="frontPage-recentMessage">
                  <h2>最新拼车信息</h2>
                  <div id='frontPage-resultPanel' class='frontPage-resultPanel'></div>
                </div>
                <!--最新拼车信息 end-->
                
                <!--目的地 start-->
                <div class="frontPage-destinations">
                    <h2>目的地</h2>
                    <div class="slider_container"> <a class="left_arr">&nbsp;</a> <a class="right_arr">&nbsp;</a>
                        <div class="slider cycle-slideshow" 
                          data-cycle-timeout=5000
                          data-cycle-caption="#frontPage-caption"
                          data-cycle-caption-template="<h3>{{cycleTitle}}</h3>"
                          data-cycle-prev=".left_arr"
                          data-cycle-next=".right_arr">
                          <img src="style/images/toronto_min.png" data-cycle-title="Toronto">
                          <img src="style/images/yorkdale_min.png" data-cycle-title="Yorkdale">
                          <img src="style/images/pearson_min.png" data-cycle-title="Pearson">
                        </div>
                    </div>
                    <div id="frontPage-caption" class="caption"></div>
                </div>
                <!--热门目的地 end-->
            </div>
            
            <!--经验之谈 start-->
            <div class="frontPage-lower">
                <div class="frontPage-experience">
                    <h2>经验之谈</h2>
                    <dl>
                        <dt id="exp1">
                        <span class="qu1"></span>
                        <span class="txt">Tired of the bloody Greghound. Arranging a carpool one night in advance is wise indeed. Haha, my Chinese is good enough to read the carpool page now. YAY
                        </span><span class="qu2"></span>
                        </dt>
                        <dt id="exp2">
                        <span class="qu1"></span>
                        <span class="txt">好些同学都贷款买了车，四个轮子就是方便，计划着再过段时间我也得买了，在这之前先以乘客身份拼车吧~这个网站真心让拼车变得特别容易！你值得拥有~
                        </span><span class="qu2"></span>
                        </dt >
                        <dt id="exp2">
                        <span class="qu1"></span>
                        <span class="txt">拼车这事儿以前从没坐过，听倒是有听说，总觉得不太靠谱儿，- -这次被胸大无脑的室友拖去尝试了一回，心情还是不错滴，大家聊聊也就到了~
                        </span><span class="qu2"></span>
                        </dt>
                        <dt id="exp3">
                        <span class="qu1"></span>
                        <span class="txt">把老爹的车开出来打算跟哥们儿去趟赌场玩，空余了三个座位，不坐也浪费了，学生嘛，能省点就省点，放了拼车信息上来，很快就联系到了人，这样路费省了大半，返程再发个消息上来。
                        </span><span class="qu2"></span>
                        </dt>
                        <dd id="frontPage-userButtons" class="clearfix"> 
                            <div class="user active clearfix"> <img class="userImg" src="style/images/user.png" width="70" height="70"/>
                                <div class="userInfo">
                                    <p>Toni Conlon</p>
                                    <p>Waterloo----Toronto Downtown</p>
                                </div>
                            </div>
                            <div class="user f-gray clearfix"> <img class="userImg" src="style/images/user1.png" width="70" height="70"/>
                                <div class="userInfo">
                                    <p>Lisa Xiao</p>
                                    <p>Waterloo----Markham</p>
                                </div>
                            </div>
                            <div class="user f-gray clearfix"> <img class="userImg" src="style/images/user2.png" width="70" height="70"/>
                                <div class="userInfo">
                                    <p>五角形小雪花</p>
                                    <p>Waterloo----Pearson Airport</p>
                                </div>
                            </div>
                            <div class="user f-gray clearfix"> <img class="userImg" src="style/images/user3.png" width="70" height="70"/>
                                <div class="userInfo">
                                    <p>V 4 Victor</p>
                                    <p>Waterloo----Niagra Falls</p>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
            <!--经验之谈 end-->
            
        </div>
</script>